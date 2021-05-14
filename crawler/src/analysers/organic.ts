import { CrawlerRequestResponse } from "crawler";
import { Result } from "htmlmetaparser";
type Product = any;

export default (result: Result, res: CrawlerRequestResponse, product: Product) => {
    const isOrganic = res.$(':contains("Organic"),:contains("organic")').length > 0;
    return { isOrganic }
}