import { CrawlerRequestResponse } from "crawler";
import { Product } from "../Product";
import { Result } from "htmlmetaparser";
import { decompose } from "../composition/decompose";

const clothingIngredients = [
    'cotton',
    'elastane',
    'flax',
    'linen',
    'wool',
    'silk',
    'ramine',
    'rayon',
    'leather',
    'nylon',
    'polyester',
    'spandex',
    'acetate',
    'pvc',
    'neoprene',
    'acrylic'
]

export function afterAll(result: Result, res: CrawlerRequestResponse, product: Product, meta: Product) {
    console.log(product)
    if (!product.composition && meta.composition) {
        let comp = meta.composition;
        if (Array.isArray(comp)) {
            comp = comp.join(', ');
        }
        return { material: decompose(comp, { ...product, ...meta }) }
    }
    return {};
}

export default (result: Result, res: CrawlerRequestResponse, product: Product) => {
    if (product.composition) return {};
    let composition: string | undefined;
    const re = new RegExp(`(${clothingIngredients.join('|')})\\s*[\\.\\,\\d]+\\s*%|\\d+\\s*%\\s*(${clothingIngredients.join('|')})`, 'ig');
    res.$(`:contains("%")`).each((k, v) => {
        const text = res.$(v).text()
        if(text.match(re)) composition = text;
    });

    return { composition }
}