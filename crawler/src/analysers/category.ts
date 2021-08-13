import { CrawlerRequestResponse } from "crawler";
import { Result } from "htmlmetaparser";
import { clothingIngredients } from './composition';

type Product = any;

const meatSynonyms = ['meat', 'pork', 'beef', 'lamb', 'chicken', 'veal', 'burger'];
const fishSynonyms = ['fish'];
const fruitVegSynonyms = ['fruit', 'vegetable'];
const oilFatSynonyms = ['oil', 'fat'];
const margarineSynonyms = ['margarine'];
const dairySynonyms = ['dairy', 'milk', 'butter', 'egg', 'cheese', 'cream'];
const grainStarchSynonyms = ['oat', 'wheat', 'rice' , 'cereal', 'starch', 'flour'];
const bakeryFlourContainingSynonyms = ['bread', 'bun', 'loaf', 'pane', 'croissant', 'tart', 'cake'];
const sugarSynonyms = ['sugar', 'glucose', 'fructose', 'galactose', 'sucrose'];
const chocolateSynonyms = ['chocolate', 'cocoa', 'coco'];
const teaCoffeeSynonyms = ['tea', 'coffee'];
const condimentSeasoningSynonyms = ['condiment', 'seasoning', 'sauce', 'vinaigrette'];
const preparedMealsSynonyms = ['ready', 'meal', 'microwave'];
const foodAnySynonyms = ['food', 'edible', 'delicious', 'snack'];
const spiritsSynonyms = ['spirit', 'vodka', 'whiskey', 'whisky', 'rum', 'liquor', 'sake', 'miju', 'cheongju', 'brandy', 'baiju', 'absinthe', 'tequila', 'limoncello'];
const grapeWineSynonyms = ['wine', 'malbec', 'shiraz', 'cabernet', 'rioja', 'tempranillo', 'sauvignon', 'merlot', 'cotes', 'reserva', 'bordeaux', 'zinfandel', 'brut', 'prosecco', 'pino', 'grigot', 'rose', 'chardonnay', 'chenin', 'champagne', 'medoc', 'port'];
const ciderSynonyms = ['cider'];
const fermentedSynonyms = ['fermented'];
const beerSynonyms = ['beer', 'ale', 'porter', 'lager', 'ipa', 'lambic', 'pilsner'];
const maltSynonyms = ['malt'];
const bottledWaterSynonyms = ['water', 'soft', 'juice', 'squash', 'cola', 'lemonade'];
const tobaccoSynonyms = ['tobacco', 'cigarette', 'cigar'];
const textileSynonyms = ['blanket', 'rug', 'bedding', 'duvet', 'sheet', 'curtain', 'fabric', 'textile', ...clothingIngredients];
const furApparelSynonyms = ['fur', 'mink'];
const leatherSynonyms = ['leather', 'calfskin'];
const footwearSynonyms = ['footwear', 'shoe', 'boot', 'slipper'];
const wearingApparelSynonyms = ['vest', 'sleeveless', 'waistline', 'sweatshirt', 'garment', 'clothing', 'wear', 't-shirt', 'jumper', 'cardigan', 'dress', 'shirt', 'trousers', 'chinos', 'jeans', 'waisted', 'crop', 'bra', 'panties', 'knickers', 'boxers', 'sock', 'shorts', 'jacket', 'coat', 'blouse', 'blazer', 'lingere', 'loungewear', 'nightwear', 'pyjama'];
const knitApparelSynonyms = ['knit', 'crochet', 'woven'];
const woodStrawNonFurnitureSynonyms = ['wood', 'straw', 'oak', 'cherry', 'walnut', 'sapele', 'mahogany', 'chestnut', 'pine', 'maple'];
const paperSynonyms = ['paper', 'parchment', 'paperboard', 'card', 'cardboard', 'greyboard', 'bookboard'];
const rubberPlasticSynonyms = ['rubber', 'plastic', 'tyre', 'acrylic', 'perspex'];
const computerElectronicOpticalSynonyms = ['electronic', 'disc', 'disk', 'dvd', 'bluray', 'cd', 'laptop', 'tablet', 'phone'];
const electricalSynonyms = ['motor', 'servo', 'machine', 'dishwasher', 'dryer', 'battery'];
const furnitureSynonyms = ['chair', 'table', 'recliner', 'counter', 'cupboard', 'bookshelf', 'bookcase', 'shelf', 'case', 'mattress'];

function containsSic(category: string | string[]): boolean {
    return false;
}

// Find best matching SIC category code from keywords in the name and description
function findSicManufacturingCategory(productName: string, productDescription: string): string[] {
    const corpus = (productName + ' ' + productDescription).toLowerCase()
        .replace(/[^\w\d\-]+/ig, ' ')
        .split(/\s+/)
        .filter((it) => it.length > 3)
        .filter((v, i, a) => a.indexOf(v) === i);
    // console.debug(corpus);
    let matchedCategories = [];
    // Division 10: Manufacture of food products
    // Group 10.1: Processing and preserving of meat and production of meat products
    if (meatSynonyms.some(it => corpus.indexOf(it) !== -1)) matchedCategories.push('10.1');
    // Group 10.2: Processing and preserving of fish, crustaceans and molluscs
    if (fishSynonyms.some(it => corpus.indexOf(it) !== -1)) matchedCategories.push('10.2');
    // Group 10.3: Processing and preserving of fruit and vegetables
    if (fruitVegSynonyms.some(it => corpus.indexOf(it) !== -1)) matchedCategories.push('10.3');
    // Group 10.4: Manufacture of vegetable and animal oils and fats
    // Class 10.41: Manufacture of oils and fats
    if (oilFatSynonyms.some(it => corpus.indexOf(it) !== -1)) matchedCategories.push('10.41');
    // Class 10.42: Manufacture of margarine and similar edible fats
    if (margarineSynonyms.some(it => corpus.indexOf(it) !== -1)) matchedCategories.push('10.42');
    // Group 10.5: Manufacture of dairy products
    if (dairySynonyms.some(it => corpus.indexOf(it) !== -1)) matchedCategories.push('10.5');
    // Group 10.6: Manufacture of grain mill products, starches and starch products
    if (grainStarchSynonyms.some(it => corpus.indexOf(it) !== -1)) matchedCategories.push('10.6');
    // Group 10.7: Manufacture of bakery and farinaceous products
    if (bakeryFlourContainingSynonyms.some(it => corpus.indexOf(it) !== -1)) matchedCategories.push('10.7');
    // Class 10.81: Manufacture of sugar
    if (sugarSynonyms.some(it => corpus.indexOf(it) !== -1)) matchedCategories.push('10.81');
    // Class 10.82: Manufacture of cocoa, chocolate and sugar confectionery
    if (chocolateSynonyms.some(it => corpus.indexOf(it) !== -1)) matchedCategories.push('10.82');
    // Class 10.83: Processing of tea and coffee
    if (teaCoffeeSynonyms.some(it => corpus.indexOf(it) !== -1)) matchedCategories.push('10.83');
    // Class 10.84: Manufacture of condiments and seasonings
    if (condimentSeasoningSynonyms.some(it => corpus.indexOf(it) !== -1)) matchedCategories.push('10.84');
    // Class 10.85: Manufacture of prepared meals and dishes
    if (preparedMealsSynonyms.some(it => corpus.indexOf(it) !== -1)) matchedCategories.push('10.85');
    if (foodAnySynonyms.some(it => corpus.indexOf(it) !== -1)) matchedCategories.push('10');
    // Division 11: Manufacture of beverages
    // Group 11.0: Manufacture of beverages
    // Class 11.01: Distilling, rectifying and blending of spirits
    if (spiritsSynonyms.some(it => corpus.indexOf(it) !== -1)) matchedCategories.push('11.01');
    // Class 11.02: Manufacture of wine from grape
    if (grapeWineSynonyms.some(it => corpus.indexOf(it) !== -1)) matchedCategories.push('11.02');
    // Class 11.03: Manufacture of cider and other fruit wines
    if (ciderSynonyms.some(it => corpus.indexOf(it) !== -1)) matchedCategories.push('11.03');
    // Class 11.04: Manufacture of other non-distilled fermented beverages
    if (fermentedSynonyms.some(it => corpus.indexOf(it) !== -1)) matchedCategories.push('11.04');
    // Class 11.05: Manufacture of beer
    if (beerSynonyms.some(it => corpus.indexOf(it) !== -1)) matchedCategories.push('11.05');
    // Class 11.06: Manufacture of malt
    if (maltSynonyms.some(it => corpus.indexOf(it) !== -1)) matchedCategories.push('11.06');
    // Class 11.07: Manufacture of soft drinks; production of mineral waters and other bottled waters
    if (bottledWaterSynonyms.some(it => corpus.indexOf(it) !== -1)) matchedCategories.push('11.07');
    // Division 12: Manufacture of tobacco products
    if (tobaccoSynonyms.some(it => corpus.indexOf(it) !== -1)) matchedCategories.push('12');
    // Division 13: Manufacture of textiles
    if (textileSynonyms.some(it => corpus.indexOf(it) !== -1)) matchedCategories.push('13');
    // Division 14: Manufacture of wearing apparel
    // Group 14.1: Manufacture of wearing apparel, except fur apparel
    if (wearingApparelSynonyms.some(it => corpus.indexOf(it) !== -1)) matchedCategories.push('14.1');
    // Group 14.2: Manufacture of articles of fur
    if (furApparelSynonyms.some(it => corpus.indexOf(it) !== -1)) matchedCategories.push('14.2');
    // Group 14.3: Manufacture of knitted and crocheted apparel
    if (knitApparelSynonyms.some(it => corpus.indexOf(it) !== -1)) matchedCategories.push('14.3');
    // Division 15: Manufacture of leather and related products
    if (leatherSynonyms.some(it => corpus.indexOf(it) !== -1)) matchedCategories.push('15');
    // Group 15.2: Manufacture of footwear
    if (footwearSynonyms.some(it => corpus.indexOf(it) !== -1)) matchedCategories.push('15.2');
    // Division 16: Manufacture of wood and of products of wood and cork, except furniture; manufacture of articles of straw and plaiting materials
    if (woodStrawNonFurnitureSynonyms.some(it => corpus.indexOf(it) !== -1)) matchedCategories.push('16');
    // Division 17: Manufacture of paper and paper products
    if (paperSynonyms.some(it => corpus.indexOf(it) !== -1)) matchedCategories.push('17');
    // Division 22: Manufacture of rubber and plastic products
    if (rubberPlasticSynonyms.some(it => corpus.indexOf(it) !== -1)) matchedCategories.push('22');
    // Division 26: Manufacture of computer, electronic and optical products
    if (computerElectronicOpticalSynonyms.some(it => corpus.indexOf(it) !== -1)) matchedCategories.push('26');
    // Division 27: Manufacture of electrical equipment
    if (electricalSynonyms.some(it => corpus.indexOf(it) !== -1)) matchedCategories.push('27');
    // Division 31: Manufacture of furniture
    if (furnitureSynonyms.some(it => corpus.indexOf(it) !== -1)) matchedCategories.push('31');
    // console.debug({ matchedCategories });
    // Fix-up matches in multiple categories for beverages
    if (matchedCategories
        .find(it => it.startsWith('11') && it != '11.07')) {
        // Beers, spirits etc often frame themselves in terms of fruits/veg etc.
        matchedCategories = matchedCategories.filter(it => !it.startsWith('10'));
        const softDrinkElem = matchedCategories.indexOf('11.07');
        if (softDrinkElem != -1) {
            // If it matched non soft-drink categories then remove the soft-drink category
            matchedCategories.splice(softDrinkElem, 1);
        }
    }
    
    // If we have wood _and_ furniture, then choose furniture.
    if (matchedCategories.find(it => it.startsWith('31'))) {
        var i = 0;
        do {
            i = matchedCategories.findIndex(it => it.startsWith('16'))
            if (i !== -1) matchedCategories.splice(i, 1);
        } while (i !== -1);
    }

    // If we have fashion _and_ food/drink, then choose fashion as food and drink are often used to describe colour/texture (cream, creamy, peach, merlot etc.)
    if (matchedCategories.find(it => it.startsWith('14') || it.startsWith('13') || it.startsWith('15.2'))) {
        var i = 0;
        do {
            i = matchedCategories.findIndex(it => it.startsWith('10') || it.startsWith('11'))
            if (i !== -1) matchedCategories.splice(i, 1);
        } while (i !== -1);
    }

    // Treat wearing apparel as more-specific than textiles
    if (matchedCategories.find(it => it.startsWith('14'))) {
        var i = 0;
        do {
            i = matchedCategories.findIndex(it => it.startsWith('13') || it.startsWith('15.2'))
            if (i !== -1) matchedCategories.splice(i, 1);
        } while (i !== -1);
    }

    matchedCategories.forEach((cat) => {
        const split = cat.split('.');
        if (split.length > 1) {
            matchedCategories.push(split[0]);
        }
    })

    return Array.from(new Set(matchedCategories));
}

export default (result: Result, res: CrawlerRequestResponse, product: Product) => {
    const sic = findSicManufacturingCategory(product.name, product.description);
    if (!containsSic(product.category)) {
        if (product.category) {
            if(Array.isArray(product.category)) {
                return { category: [...product.category, ...sic].filter(it => !!it)};
            }
        } else {
            return { category: [product.category, ...sic].filter(it => !!it)};
        }
    }
    return {};
}