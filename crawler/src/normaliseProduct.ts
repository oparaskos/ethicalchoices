import { Brand, Organization, Text } from "schema-dts";
import { CarbonFootprint, Product } from "./Product";

declare type IdReference = { "@id": string };

export function normaliseBrand(brand: Brand | Organization | IdReference | any): Brand | Organization | undefined {
  if (typeof brand === 'undefined') return undefined;
  if (brand["@id"] && !brand["@type"]) return undefined;
  if (Array.isArray(brand)) return normaliseBrand(brand[0])
  if (typeof brand === "string") {
    brand = { "@type": "Brand", name: brand };
  }
  return brand;
}

export function normaliseCarbonFootprint(carbonFootprint: CarbonFootprint | any): CarbonFootprint | undefined {
  if (typeof carbonFootprint === 'undefined') return undefined;
  if (typeof carbonFootprint === 'string') return {
    estimate: `${carbonFootprint}`,
    basedOn: 'declaration found on the product page'
  };
  if (typeof carbonFootprint === 'object') {
    if (typeof carbonFootprint.estimate === 'number') carbonFootprint.estimate = `${carbonFootprint.estimate.toFixed(2)} kgCO2e`
    if (typeof carbonFootprint.measurement === 'number') carbonFootprint.measurement = `${carbonFootprint.estimate.toFixed(2)} kgCO2e`
    return carbonFootprint;
  };
  return undefined;
}

export function normaliseProduct(product: Product): Product {
  product.brand = normaliseBrand(product.brand);
  product.carbonFootprint = normaliseCarbonFootprint(product.carbonFootprint);
  return product;
}
