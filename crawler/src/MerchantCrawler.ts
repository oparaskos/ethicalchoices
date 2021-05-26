import { CrawlerRequestResponse, CreateCrawlerOptions } from "crawler";
import {
  analysePage,
  findProductInLinkedData,
  findProductWithNoLinkedData,
  shouldCrawl,
} from "./analysePage";

import { Client } from "@elastic/elasticsearch";
import { DomainCrawler } from "./DomainCrawler";
import { Product } from "./Product";
import { Result } from "htmlmetaparser";
import { normaliseProduct } from "./normaliseProduct";

export class MerchantCrawler extends DomainCrawler {
  private esClient = new Client({ node: "http://localhost:9200" });

  constructor(
    domain: URL,
    merchantName: string,
    merchantId: string,
    crawlerOptions: CreateCrawlerOptions
  ) {
    super(domain, crawlerOptions);
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
        this.log(result.html?.title, "No Products");
        return;
      } else if (products.length > 1) {
        this.log(
          result.html?.title,
          `${products.length} Products; Skipping to avoid ambiguity`
        );
        return;
      }
      const analyses = await analysePage(result, response, products[0]);
      let product = { ...products[0], ...analyses } as Product;
      product = normaliseProduct(product);

      this.log(result.html?.title, product);
      this.esClient.index({
        id: this.getProductId(product),
        refresh: true,
        index: "products",
        body: product,
      });
    } catch (e) {
      this.onError(e);
    }
  }

  public getProductId(product: Product): string {
    const a = product.name?.toString() || "";
    const b = product.url?.toString() || "";
    return Buffer.from(`${a}:${b}`).toString("base64url");
  }
}
