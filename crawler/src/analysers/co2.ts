import { CrawlerRequestResponse } from "crawler";
import { Result } from "htmlmetaparser";
type Product = any;

function containsCo2Disclosure($: any, i: number): (this: any) => boolean {
    return function(this: any) { 
        const txt = $(this).text()
        return txt.length < i &&  /[\d\.]+\s*k?g.{1,20}c\s*o\s*2\s*e?/sig.test(txt);
    }
}

export default (result: Result, res: CrawlerRequestResponse, product: Product) => {
    let carbonFootprint;
    let carbonFootprintStmts = res.$('p, span')
        .filter(containsCo2Disclosure(res.$, 200))
        .toArray()
        .map(function (value) {
            return res.$(value).text()
        });
    carbonFootprintStmts = carbonFootprintStmts.sort((s) => s.length)
    const packSizeContainer = carbonFootprintStmts[carbonFootprintStmts.length - 1]
    if (packSizeContainer) {
        carbonFootprint = packSizeContainer;
    }
    carbonFootprint = carbonFootprint?.trim();
    return { carbonFootprint }
}