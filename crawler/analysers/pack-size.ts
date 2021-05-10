import { CrawlerRequestResponse } from "crawler";
import { Result } from "htmlmetaparser";
type Product = any;

export default (result: Result, res: CrawlerRequestResponse, product: Product) => {
    let declaresPackQuantity = false;
    if(res.$(':contains("Pack Size"), :contains("pack size"), :contains("Pack size")').length > 0)
        declaresPackQuantity = true;
    const re = new RegExp(`${product.name}\s*[\(\)\[\]]?\d+(k?g)`, 'ig');

    res.$(`:contains("${product.name}")`).each((k, v) => {
        if(res.$(this).text().match(re))
            declaresPackQuantity = true;
    });
    return { declaresPackQuantity }
}