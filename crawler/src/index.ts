import {
  analysePage,
  findProductInLinkedData,
  findProductWithNoLinkedData,
  shouldCrawl,
} from "./analysePage";

import { CrawlerRequestResponse } from "crawler";
import { Result } from "htmlmetaparser";
import { createWriteStream } from "fs";
import { initialize } from "./crawl";

const writeStream = createWriteStream("results.jsonnd");

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
      console.log(res.request.uri.href, product.name);
      writeStream.write(JSON.stringify(product) + "\n");
    }
  } catch(e) {
    console.error('Something went wrong with a page parse!')
  }
}

const domains = [
  "https://www.weirdfish.co.uk/p/new-arrivals/all/i/ponte-bamboo-maxi-dress-pearl-grey-marl-18660",
  // "https://www.quorn.co.uk/",
  // "https://nudefood.co.uk/",
  // "https://www.naturli-foods.com/",
  // "https://www.brewdog.com/",
  // "https://www.decathlon.co.uk/"
  // "https://uk.oneill.com/"
  // "https://www.homebase.co.uk/"
];

Promise.all(domains.map((domain) => initialize(domain, { recurse: true }, handlePage)
  .then(async ({ queue }) => queue({ uri: domain }))));
