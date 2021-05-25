import { CrawlerRequestResponse } from "crawler";
import { Result } from "htmlmetaparser";
type Product = any;

export default (result: Result, res: CrawlerRequestResponse, product: Product) => {
    const isVegan = (product.name + ' ' + product.description).toLowerCase().indexOf('vegan') !== -1;
    const isVegetarian = isVegan || (product.name + ' ' + product.description).toLowerCase().indexOf('vegetarian') !== -1;
    return { isVegan, isVegetarian }
}