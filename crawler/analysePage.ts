import { CrawlerRequestResponse } from "crawler";
import { Result } from "htmlmetaparser";

const analysers = require('require-dir')('analysers');

type Product = any;

export function shouldCrawl(robots: string | null) {
    return !robots || robots.indexOf("noindex") == -1
};

export function findProductInLinkedData(a: any, res: CrawlerRequestResponse, result: Result, d = 100): Product[] {
    if (d <= 0) return [];

    const products = [];
    if(a && a.hasOwnProperty('@type') && a['@type'] === 'Product') {
        products.push(parseProduct(a, res, result));
    } else {
        for(const key in a) {
            const deeperProducts = findProductInLinkedData(a[key], res, result, d - 1);
            if(deeperProducts && deeperProducts.length > 0) products.push(...deeperProducts);
        }
    }
    return products;
}


export async function analysePage(result: Result, res: CrawlerRequestResponse, product: Product) {
    const meta = {};
    for (const key in analysers) {
        try {
            let fn = analysers[key];
            if (typeof(fn.default) === 'function') {
                Object.assign(meta, (await fn.default(result, res, product)));
            }
        } catch(e) {
            console.error(e);
        }
    }
    return meta;
}

export function findProductWithNoLinkedData(result: Result, res: CrawlerRequestResponse, product: Product) {
    return [];
}

export function parseProduct(product: Product, res: CrawlerRequestResponse, result: Result) {
    return {
        ...product,
        pageUri: res.request.uri.href
    }
}
