import seenreq from 'seenreq';
import Crawler, { CrawlerRequestOptions, CrawlerRequestResponse } from "crawler";
import { Handler, Result } from "htmlmetaparser";
import { Parser } from "htmlparser2";
const analysers = require('require-dir')('analysers');

type Product = any;

let queue = async (options: CrawlerRequestOptions) => null;

const shouldCrawl = (robots: string) => true;
const seen = new seenreq();

function parseProduct(product: Product, res: CrawlerRequestResponse, result: Result) {
    return {
        ...product,
        pageUri: res.request.uri.href
    }
}

function findProductInLinkedData(a: any, res: CrawlerRequestResponse, result: Result, d = 100): Product[] {
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


async function analysePage(result: Result, res: CrawlerRequestResponse, product: Product) {
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

function findProductWithNoLinkedData(result: Result, res: CrawlerRequestResponse, product: Product) {
    return [];
}

const crawler = new Crawler({
    maxConnections: 5,
    rateLimit: 10,
    // This will be called for each crawled page
    callback: function (error, res, done) {
        (new Promise((resolve, reject) => {
            if (error) {
                console.log(error);
            } else {
                const handler = new Handler((err, result) => {
                    try {
                        resolve(handlePage(res, err, result));
                    } catch (e) {
                        reject(e);
                    }
                }, { url: res.request.uri.href });
                const parser = new Parser(handler, { decodeEntities: true });
                parser.write(res.body.toString());
                parser.done();
            }
        })).then(done, done);
    }
});

queue = async (options: CrawlerRequestOptions) => {
    return seen.exists(options.uri)
        .then((wasSeen: boolean) => {
            if(!wasSeen) {
                console.log(options.uri)
                crawler.queue(options)
            }
        })
}

async function handlePage(res: CrawlerRequestResponse, err: Error | null, result: Result) {
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
    } else if (products.length > 0) {
        // console.log('multiple products found, skipping to avoid ambiguity');
    } else {
        // console.log('no products')
    }
    
    if (res.options.recurse && result.links) {
        const links = result.links
            .filter((it) => new URL(it.href).hostname === res.request.uri.hostname);
        for (const link of links) {
            await queue({ uri: link.href });
        }
    }
}


seen.initialize().then(async () => {
    await queue({
        uri: 'https://www.quorn.co.uk/products/sweet-chipotle-goujons',
    });
})