import { CrawlerRequestResponse } from "crawler";
import { Result } from "htmlmetaparser";

type Product = any;

export default (result: Result, res: CrawlerRequestResponse, product: Product) => {
    if (product.offers) return {};
    // Search for obvious containers for price
    const price = res.$('.price,#price');
    if (price) {
        return { offers: price.map(function (this: any) {
            return {price: res.$(this).text()}
        }).toArray() };
    }
    return {};
}