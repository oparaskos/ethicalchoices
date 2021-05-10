import { CrawlerRequestResponse } from "crawler";
import { Result } from "htmlmetaparser";
type Product = any;

export default (result: Result, res: CrawlerRequestResponse, product: Product) => {
    const declaresCarbonFootprint = res.$(':contains("CO2"), :contains("co2")').length > 0;
    return { declaresCarbonFootprint }
}