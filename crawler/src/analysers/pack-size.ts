import { CrawlerRequestResponse } from "crawler";
import { Result } from "htmlmetaparser";
type Product = any;

function maxTextLength($: any, i: number): (this: any) => boolean {
    return function(this: any) { 
        const txt = $(this).text()
        return txt.length < i && txt.length > 1;
    }
}

export default (result: Result, res: CrawlerRequestResponse, product: Product) => {

    if (product.weight) return {};

    let weight;
    let packSizeContainers = res.$(':contains("Pack Size"), :contains("pack size"), :contains("Pack size")')
        .filter(maxTextLength(res.$, 200))
        .toArray()
        .map(function (value) {
            return res.$(value).text()
        });
    packSizeContainers = packSizeContainers.sort((s) => s.length)
    const packSizeContainer = packSizeContainers[packSizeContainers.length - 1]
    if (packSizeContainer) {
        weight = packSizeContainer;
    }
    const re = new RegExp(`${product.name}\s*[\(\)\[\]]?\d+(k?g)`, 'ig');

    res.$(`:contains("${product.name}")`).each((k, v) => {
        const match = res.$(v).text().match(re)
        if(match) weight = match[1];
    });
    weight = weight?.trim();
    return { weight }
}