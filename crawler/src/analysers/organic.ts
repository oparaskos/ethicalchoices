import { CrawlerRequestResponse } from "crawler";
import { Result } from "htmlmetaparser";
type Product = any;

export default (result: Result, res: CrawlerRequestResponse, product: Product) => {
    const isOrganic = (product.name + ' ' + product.description).toLowerCase().indexOf('organic') !== -1;
    return { isOrganic }
}