import { CrawlerRequestResponse } from "crawler";
import { Result } from "htmlmetaparser";
type Product = any;

export default (result: Result, res: CrawlerRequestResponse, product: Product) => {
    const sustainabilityPolicy = res.$('a:contains("Sustainability"),a:contains("sustainability")').length > 0;
    return { sustainabilityPolicy }
}