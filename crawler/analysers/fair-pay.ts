import { CrawlerRequestResponse } from "crawler";
import { Result } from "htmlmetaparser";
type Product = any;

export default (result: Result, res: CrawlerRequestResponse, product: Product) => {
    const modernSlaveryAct = res.$(':contains("slavery"),:contains("Slavery")').length > 0;
    const genderPayGap = res.$(':contains("Pay Gap"),:contains("pay gap"),:contains("Pay gap")').length > 0;
    const livingWage = res.$('a:contains("Living Wage"),a:contains("Living wage"),a:contains("living wage")').length > 0;
    return { modernSlaveryAct, genderPayGap, livingWage }
}