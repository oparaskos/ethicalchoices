import {
  analysePage,
  findProductInLinkedData,
  findProductWithNoLinkedData,
  shouldCrawl,
} from "./analysePage";

import { Client } from "@elastic/elasticsearch";
import { CrawlerRequestResponse } from "crawler";
import { Product } from "schema-dts";
import { Result } from "htmlmetaparser";
import { createHash } from "crypto";
import { createWriteStream } from "fs";
import { initialize } from "./crawl";

const writeStream = createWriteStream("results.jsonnd");
let client = new Client({ node: 'http://localhost:9200' })

function genId(product: Product) {
  const a = product.name?.toString();
  const b = product.url?.toString();
  const hash = createHash('md5');
  hash.push(a);
  hash.push(b);
  return hash.digest().toString('base64');
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

    if (products.length === 1) {
      const analyses = await analysePage(result, res, products[0]);
      const product = { ...products[0], ...analyses };
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
    console.error('Something went wrong with a page parse!')
  }
}

const domains = [
  "https://www.weirdfish.co.uk/",
  "https://www.quorn.co.uk/",
  "https://nudefood.co.uk/",
  "https://www.naturli-foods.com/",
  // "https://www.brewdog.com/",
  "https://www.decathlon.co.uk/",
  "https://uk.oneill.com/",
  "https://www.homebase.co.uk/",
  "https://www.diy.com/",
  "https://www.wickes.co.uk/",
  "https://www.fjallraven.com/uk/en-gb",
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
  "https://www.oddbox.co.uk/"
];

Promise.all(domains.map((domain) => initialize(domain, { recurse: true }, handlePage)
  .then(async ({ queue }) => queue({ uri: domain }))));
