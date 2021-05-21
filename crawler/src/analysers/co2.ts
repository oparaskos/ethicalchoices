import { CrawlerRequestResponse } from "crawler";
import { Result } from "htmlmetaparser";
import e from "express";
type Product = any;

// From https://www.gov.uk/government/statistics/uks-carbon-footprint
// Data https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/404542/Table_13_Indirect_emissions_from_supply_chain_2007-2011.xls
const emissionsByGBP = [
    // [SIC Code, Product category, Supply chain emission factors for spending on products: kgCO2e per £]
    ['10.1', 'Preserved meat and meat products', 1.40085318842038],
	['10.2', 'Processed and preserved fish, crustaceans, molluscs', 0.974966644233465],
	['10.3', 'fruit and vegetables', 0.974966644233465],
	['10.4', 'Vegetable and animal oils and fats', 0.988703556759594],
	['10.5', 'Dairy products', 1.82047679317293],
	['10.6', 'Grain mill products, starches and starch products', 1.32564386801348],
	['10.7', 'Bakery and farinaceous products', 0.780460929835626],
	['10.8', 'Other food products', 0.95752512457371],

	['11.01', 'Alcoholic beverages', 0.739718989938269],
    ['11.02', 'Alcoholic beverages', 0.739718989938269],
    ['11.03', 'Alcoholic beverages', 0.739718989938269],
    ['11.04', 'Alcoholic beverages', 0.739718989938269],
    ['11.05', 'Alcoholic beverages', 0.739718989938269],
    ['11.06', 'Alcoholic beverages', 0.739718989938269],
	['11.07', 'Soft drinks', 0.596855212976087],

    ['12', 'Tobacco products', 0.563192873988017],
	['13', 'Textiles', 0.962518293911498],
	['14', 'Wearing apparel', 0.675703113718228],
	['15', 'Leather products', 0.543144840369357],
	['16', 'Wood and wood products', 1.02455975566015],
	['17', 'Paper and paper products', 1.18447561340646],
	['22', 'Rubber and plastic products', 0.960169128932651]
];

function containsCo2Disclosure($: any, i: number): (this: any) => boolean {
    return function(this: any) { 
        const txt = $(this).text()
        if (txt.indexOf('offset') !== -1) return false;
        return txt.length < i &&  /[\d\.]+\s*k?g.{1,20}c\s*o\s*2\s*e?/sig.test(txt);
    }
}

export function afterAll(result: Result, res: CrawlerRequestResponse, product: Product, meta: Product) {
    const p = {...product, ...meta};
    const categories = p.category;
    let esimatedEmissionsByGBP = categories.map((it: string) => {
        if (/\d{2}\.?\d+/.test(it)) {
            var next = it;
            do {
                const matched = emissionsByGBP.find(em => em[0] == next)
                if (matched) { return {
                    'kgCO2e/GBP': matched[2],
                    because: `product matched the category ${matched[0]} (${matched[1]})`
                }; }
                next = it.substring(-1);
            } while(next.length >= 2);
        }
    })
    .filter((it: any) => !!it);
    if (!p.carbonFootprint && p.offers?.length > 0) {
        const prices = p.offers
            .map((it: any) => it.price)
            .map((it: string) => {
                try {
                    return parseFloat(it.replace('£', ''))
                } catch(e) {
                    return;
                }
            })
            .filter ((it: any) => typeof it === 'number')
            .filter((it: any) => !isNaN(it))
            .filter((it: any) => isFinite(it))
        const emissionsFactor = Math.max(...(esimatedEmissionsByGBP.map((it: any) => it['kgCO2e/GBP'])))
        const price = Math.max(...prices);
        const co2eFromPrice = price * emissionsFactor
        console.log({prices, emissionsFactor})
        return {
            esimatedEmissionsByGBP,
            carbonFootprint: {
                estimate: co2eFromPrice,
                basedOn: `Estimated emissions of ${emissionsFactor} kgCO2e per £1 for products in this category, and the cost of £${price} of the item`
            }
        }
    }
    return { esimatedEmissionsByGBP };
}

export default (result: Result, res: CrawlerRequestResponse, product: Product) => {
    let carbonFootprint;
    let carbonFootprintStmts = res.$('p, span')
        .filter(containsCo2Disclosure(res.$, 200))
        .toArray()
        .map(function (value) {
            return res.$(value).text()
        });
    carbonFootprintStmts = carbonFootprintStmts.sort((s) => s.length)
    const packSizeContainer = carbonFootprintStmts[carbonFootprintStmts.length - 1]
    if (packSizeContainer) {
        carbonFootprint = packSizeContainer;
    }
    carbonFootprint = carbonFootprint?.trim();
    return { carbonFootprint }
}