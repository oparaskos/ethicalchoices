import { CrawlerRequestResponse } from "crawler";
import { Result } from "htmlmetaparser";
type Product = any;

export default (result: Result, res: CrawlerRequestResponse, product: Product) => {
    const sustainabilityPolicy = res.$('a:contains("Sustainability"),a:contains("sustainability"),'+
    'a:contains("Responsibility"),a:contains("responsibility")'+
    'a:contains("Environment"),a:contains("environment")').first().attr("href");
    return {
        sustainabilityPolicy: sustainabilityPolicy ? new URL(sustainabilityPolicy, res.request.uri.href).href : undefined,
    };
}