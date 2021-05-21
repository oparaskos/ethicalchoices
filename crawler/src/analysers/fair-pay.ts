import { CrawlerRequestResponse } from "crawler";
import { Result } from "htmlmetaparser";
type Product = any;

export default (result: Result, res: CrawlerRequestResponse, product: Product) => {
    const genderPayGap = res.$('a:contains("Pay Gap"),a:contains("pay gap"),a:contains("Pay gap")').first().attr("href");
    const livingWage = res.$('a:contains("Living Wage"),a:contains("Living wage"),a:contains("living wage")').first().attr("href");
    return {
        genderPayGap: genderPayGap ? new URL(genderPayGap, res.request.uri.href).href : undefined,
        livingWage: livingWage ? new URL(livingWage, res.request.uri.href).href : undefined
    };
}