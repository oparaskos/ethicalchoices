import { CrawlerRequestResponse } from "crawler";
import { Result } from "htmlmetaparser";
type Product = any;

export default (result: Result, res: CrawlerRequestResponse, product: Product) => {
    const isVegan = res.$(':contains("vegan"),:contains("Vegan")').length > 0;
    const isVegetarian = isVegan || res.$(':contains("Vegetarian"),:contains("vegetarian")').length > 0;
    return { isVegan, isVegetarian }
}