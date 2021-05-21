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
    for (const key in analysers) {
        try {
            if (analysers[key].hasOwnProperty('afterAll')) {
                const fn = analysers[key].afterAll
                if (typeof(fn) === 'function') {
                    Object.assign(meta, (await fn(result, res, product, meta)));
                }
            }
        } catch(e) {
            console.error(e);
        }
    }
    return meta;
}

function getRDFaProp(result: Result, propname: string) {
    const rdfaElement = result.rdfa?.find(it => !!it[propname])
    const value = rdfaElement?.[propname] as Array<{'@value': string}>
    return value[0]['@value']
}

export function findProductWithNoLinkedData(result: Result, res: CrawlerRequestResponse, product: Product) {
    const ogTitle = getRDFaProp(result, 'og:title')
    const ogDescription = getRDFaProp(result, 'og:description')
    const ogImage = getRDFaProp(result, 'og:image')
    const name = ogTitle ||  res.$('h1').first().text()
    const description = ogDescription || result.html?.description
    return [parseProduct({
        '@context': 'https://schema.org/',
        '@type': 'Product',
        name,
        description,
        image: [ ogImage ]
    }, res, result)];
}

export function parseProduct(product: Product, res: CrawlerRequestResponse, result: Result) {
    return {
        ...product,
        url: res.request.uri.href
    }
}
