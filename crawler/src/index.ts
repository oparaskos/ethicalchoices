import {
  analysePage,
  findProductInLinkedData,
  findProductWithNoLinkedData,
  shouldCrawl,
} from "./analysePage";

import { Brand } from "schema-dts";
import { Client } from "@elastic/elasticsearch";
import { CrawlerRequestResponse } from "crawler";
import { Product } from "./Product";
import { Result } from "htmlmetaparser";
import { createWriteStream } from "fs";
import { gzipSync } from "zlib";
import { initialize } from "./crawl";
import { normaliseProduct } from "./normaliseProduct";

console.debug = () => {};

const writeStream = createWriteStream("results.jsonnd");
const client = new Client({ node: 'http://localhost:9200' })

function genId(product: Product) {
  const a = product.name?.toString() || '';
  const b = product.url?.toString() || '';
  return gzipSync(Buffer.from(a + b)).toString('base64url');
}

async function handlePage(
  res: CrawlerRequestResponse,
  err: Error | null,
  result: Result
) {
  try {
    if (result.html?.language && result.html.language.indexOf("en") === -1)
      return;
    if (result.html?.robots && !shouldCrawl(result.html.robots)) return;

    const products = [];
    products.push(...findProductInLinkedData(result.rdfa, res, result));
    products.push(...findProductInLinkedData(result.microdata, res, result));
    products.push(...findProductInLinkedData(result.jsonld, res, result));

    if (
      (products.length == 1 &&  !products[0].name) || 
      (products.length === 0 && (
          // (res.request.uri.href.indexOf("product") !== -1) || -- Too crude
          result.rdfa?.some((it) => (it['og:type'] as any)?.[0]?.['@value'] == 'product')
      ))
    ) {
      products.push(...findProductWithNoLinkedData(result, res, result));
    }

    console.log(result.html?.title, products.length + ' products');
    if (products.length === 1) {
      const analyses = await analysePage(result, res, products[0]);
      let product = { ...products[0], ...analyses } as Product;
      product = normaliseProduct(product);
      
      console.log(product);
      writeStream.write(JSON.stringify(product) + "\n");
      client.index({
        id: genId(product),
        refresh: true,
        index: 'products',
        body: product
      });
    }
  } catch(e) {
    console.error(e)
  }
}

const domains = [
  "https://www.weirdfish.co.uk/",
  "https://www.quorn.co.uk/",
  "https://nudefood.co.uk/",
  "https://www.naturli-foods.com/",
  "https://www.brewdog.com/",
  "https://www.decathlon.co.uk/",
  "https://uk.oneill.com/",
  "https://www.homebase.co.uk/",
  "https://www.diy.com/",
  "https://www.wickes.co.uk/",
  "https://www.fjallraven.com/",
  "https://uk.huel.com/",
  "https://www.myprotein.com/",
  "https://www.thehut.com",
  "https://www.majestic.co.uk/",
  "https://birdandwild.co.uk/",
  "https://www.gozney.com/",
  "https://www.weber.com/GB/en/home/",
  "https://www.lilyskitchen.co.uk/",
  "https://uk.pedigree.com/",
  "https://www.iams.co.uk",
  "https://www.petsathome.com/",
  "https://www.bighams.com",
  "https://www.abelandcole.co.uk/",
  "https://www.oddbox.co.uk/",
  "https://www.seasaltcornwall.co.uk/",
  "https://www.fatface.com/",
  "https://www.clarks.co.uk/",
  "https://www.nike.com/gb/",
  "https://www.adidas.co.uk/",
  "https://www.next.co.uk/",
  "https://www.drmartens.com/",
  "https://www.thenorthface.co.uk/",

];

Promise.all(domains.map((domain) => initialize(domain, { recurse: true }, handlePage)
  .then(async ({ queue }) => queue({ uri: domain }), (e) => console.error(e))));
