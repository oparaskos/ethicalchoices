import { CrawlerRequestResponse } from "crawler";
import { Result } from "htmlmetaparser";
type Product = any;

export default (result: Result, res: CrawlerRequestResponse, product: Product) => {
    const modernSlaveryActStatement = res.$('a:contains("slavery"),a:contains("Slavery")').first().attr("href")
    return { modernSlaveryActStatement }
}