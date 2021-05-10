
import { CrawlerRequestResponse } from 'crawler';
import { Result } from 'htmlmetaparser';
import { shouldCrawl, findProductInLinkedData, findProductWithNoLinkedData, analysePage } from './analysePage';
import { initialize } from './crawl';
import { createWriteStream } from 'fs';

const writeStream = createWriteStream('results.jsonnd')
async function handlePage(res: CrawlerRequestResponse, err: Error | null, result: Result) {
    console.trace(`handling page ${res.request.uri.href}`);
    if (result.html?.language && result.html.language.indexOf('en') === -1)
        return;
    if (result.html?.robots && !shouldCrawl(result.html.robots))
        return;
        
    const products = [];
    products.push(...findProductInLinkedData(result.rdfa, res, result));
    products.push(...findProductInLinkedData(result.microdata, res, result));
    products.push(...findProductInLinkedData(result.jsonld, res, result));
    if (products.length === 0 && res.request.uri.href.indexOf('product') !== -1) {
        products.push(...findProductWithNoLinkedData(result, res, result));
    }
    
    if (products.length === 1) {
        const analyses = await analysePage(result, res, products[0]);
        const product = { ...products[0], ...analyses };
        console.log({ product });
        writeStream.write(JSON.stringify(product) + '\n');
    } else if (products.length > 0) {
        console.trace('multiple products found, skipping to avoid ambiguity');
    } else {
        console.trace('no products')
    }
}

initialize('www.quorn.co.uk', handlePage)
    .then(async ({ queue }) => {
        await queue({
            uri: 'https://www.quorn.co.uk/products/sweet-chipotle-goujons',
        });
    })