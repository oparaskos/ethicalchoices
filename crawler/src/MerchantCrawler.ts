import { CrawlerRequestResponse, CreateCrawlerOptions } from "crawler";
import { URL as SchemaURL } from "schema-dts";
import { ThingBase, addToSchemaValue } from "./schema";
import { writeFileSync } from "fs";
import {
  analysePage,
  findProductInLinkedData,
  findProductWithNoLinkedData,
  shouldCrawl,
} from "./analysePage";

import { Client } from "@elastic/elasticsearch";
import { DomainCrawler } from "./DomainCrawler";
import { Merchant } from "./Merchant";
import { Product } from "./Product";
import { Result } from "htmlmetaparser";
import { normaliseProduct } from "./normaliseProduct";
import slugify from "slugify";

export class MerchantCrawler extends DomainCrawler {
  private esClient = new Client({ node: "http://localhost:9200" });
  public merchant = this.organization as Merchant;

  constructor(
    domain: URL,
    merchantName?: string,
    crawlerOptions: CreateCrawlerOptions = {},
  ) {
    super(domain, crawlerOptions);
    this.merchant.name = merchantName;
  }

  public log(...messages: any[]): void {
    console.log(...messages);
  }

  public onError(...messages: any[]): void {
    console.error(...messages);
  }

  public async onPage(
    response: CrawlerRequestResponse,
    result: Result
  ): Promise<unknown> {
    try {
      if (result.html?.language && result.html.language.indexOf("en") === -1)
        return;
      if (result.html?.robots && !shouldCrawl(result.html.robots)) return;

      const products = [];
      products.push(...findProductInLinkedData(result.rdfa, response, result));
      products.push(
        ...findProductInLinkedData(result.microdata, response, result)
      );
      products.push(
        ...findProductInLinkedData(result.jsonld, response, result)
      );

      if (
        (products.length == 1 && !products[0].name) ||
        (products.length === 0 &&
          // (res.request.uri.href.indexOf("product") !== -1) || -- Too crude
          result.rdfa?.some(
            (it) => (it["og:type"] as any)?.[0]?.["@value"] == "product"
          ))
      ) {
        products.push(...findProductWithNoLinkedData(result, response, result));
      }

      if (products.length == 0) {
        // this.log(result.html?.title, "No Products");
        return;
      } else if (products.length > 1) {
        // this.log(
        //   result.html?.title,
        //   `${products.length} Products; Skipping to avoid ambiguity`
        // );
        return;
      }
      const analyses = await analysePage(result, response, products[0]);
      let product = { ...products[0], ...analyses } as Product;
      product = normaliseProduct(product);
      this.updateMerchant(product);
      const esProductId = this.getId(product)
      product.brand = addToSchemaValue(this.merchant, product.brand);
      product.identifier = addToSchemaValue(`urn:ethicalchoices:product:${esProductId}`, product.identifier);
      const esMerchantId = this.getId(this.merchant);
      product.identifier = addToSchemaValue(`urn:ethicalchoices:merchant:${esMerchantId}`, this.merchant.identifier);
      this.esClient.index({
        id: esMerchantId,
        refresh: true,
        index: "merchants",
        body: this.merchant,
      });
      writeFileSync(`out/merchant_${esMerchantId}.json`, JSON.stringify(this.merchant));
      this.log("Indexing Product", product.name);
      this.esClient.index({
        id: esProductId,
        refresh: true,
        index: "products",
        body: product,
      });
      writeFileSync(`out/product_${esProductId}.json`, JSON.stringify(product));
    } catch (e) {
      this.onError(e);
    }
  }

  private updateMerchant(product: Product) {
    if (product.genderPayGap) {
      this.merchant.ethicsPolicy = addToSchemaValue({
        "@type": "EthicalPolicy",
        description: 'Gender Pay Gap',
        url: product.genderPayGap as SchemaURL
      }, this.merchant.ethicsPolicy)
      delete product['genderPayGap'];
    }
    if (product.livingWage) {
      this.merchant.ethicsPolicy = addToSchemaValue({
        "@type": "EthicalPolicy",
        description: 'Living Wage',
        url: product.livingWage as SchemaURL
      }, this.merchant.ethicsPolicy);
      delete product['livingWage'];
    }
    if(product.modernSlaveryActStatement) {
      this.merchant.ethicsPolicy = addToSchemaValue({
        "@type": "EthicalPolicy",
        description: 'Modern Slavery Act Statement',
        url: product.modernSlaveryActStatement as SchemaURL
      }, this.merchant.ethicsPolicy);
      delete product['modernSlaveryActStatement'];
    }
    if (product.sustainabilityPolicy) {
      this.merchant.ethicsPolicy = addToSchemaValue({
        "@type": "EthicalPolicy",
        description: 'Sustainability',
        url: product.sustainabilityPolicy as SchemaURL
      }, this.merchant.ethicsPolicy);
      delete product['sustainabilityPolicy'];
    }
  }

  public getId(product: ThingBase): string {
    const partA = (this.merchant?.name?.toString() || this.domain.host.toString()).replace(/^(www\d?|store|shop)\./i, '');
    const init_string = [
      partA.split('.')[0],
      product.name?.toString() || product.url?.toString() || JSON.stringify(product)
    ].join(' ');
    return slugify(init_string, {
      replacement: '_',  // replace spaces with replacement character, defaults to `-`
      remove: /[*+~.()'"!:@]/g, // remove characters that match regex, defaults to `undefined`
      lower: true,      // convert to lower case, defaults to `false`
      strict: true,     // strip special characters except replacement, defaults to `false`
      locale: 'en'       // language code of the locale to use
    });
  }
}
