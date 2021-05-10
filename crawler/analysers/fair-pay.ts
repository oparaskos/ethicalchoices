import { CrawlerRequestResponse } from "crawler";
import { Result } from "htmlmetaparser";
type Product = any;

export default (result: Result, res: CrawlerRequestResponse, product: Product) => {
    const modernSlaveryAct = res.$('a:contains("slavery"),a:contains("Slavery")').first().attr("href");
    const genderPayGap = res.$('a:contains("Pay Gap"),a:contains("pay gap"),a:contains("Pay gap")').first().attr("href");
    const livingWage = res.$('a:contains("Living Wage"),a:contains("Living wage"),a:contains("living wage")').first().attr("href");
    return { modernSlaveryAct, genderPayGap, livingWage }
}