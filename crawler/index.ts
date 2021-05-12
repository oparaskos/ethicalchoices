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
        (res.request.uri.href.indexOf("product") !== -1) ||
        result.rdfa?.some((it) => (it['og:type'] as any)[0]['@value'] == 'product')
    ))
  ) {
    products.push(...findProductWithNoLinkedData(result, res, result));
  }

  if (products.length === 1) {
    const analyses = await analysePage(result, res, products[0]);
    const product = { ...products[0], ...analyses };
    console.log({ product });
    writeStream.write(JSON.stringify(product) + "\n");
  }
}

initialize("", { recurse: true }, handlePage).then(
  async ({ queue }) => {
    await queue({
      uri: "https://www.quorn.co.uk/products/mini-cocktail-sausages",
    });
    await queue({
      uri: "https://nudefood.co.uk/product/provamel-organic-chocolate-soya-drink-single-carton-250ml/",
    });
    await queue({
      uri: "https://www.naturli-foods.com/products/chick-free-nuggets/",
    });
    await queue({ uri: "https://www.brewdog.com/uk/punk-ipa-4-can" });
    await queue({ uri: "https://www.decathlon.co.uk/" });
  }
);
