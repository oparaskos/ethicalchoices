import { Product, ProductComponent } from "../Product";
import { QuantitativeValue, Text } from "schema-dts";

export enum UnitCode {
    PERCENT = 'P1',
    GRAM = 'GRM',
    KILOGRAM = 'KGM'
}

export function codeFromUnitText(input: string): UnitCode | null {
    if (input.trim() === '%') return UnitCode.PERCENT;
    if (input.toLowerCase().trim() === 'g') return UnitCode.GRAM;
    if (input.toLowerCase().trim() === 'kg') return UnitCode.KILOGRAM;
    return null;
}

export function parseMass(input: QuantitativeValue | string) {
    if (typeof input == 'string') {
        const match = input.match(/(?<value>[\.\d]+)\s*(?<unit>\w+)/)
        if (match && match.groups) {
            return {
                value: parseFloat(match.groups.value),
                unitText: match.groups.unit,
                unitCode: codeFromUnitText(match.groups.unit)
            };
        } else {
            return null;
        }
    }
    return input as QuantitativeValue;

}
export function decompose(input: Text, product: Product | null = null): any[] {
    const str = input.toString();
    return str.trim().split(/[,&]|and/i).map((part) => {
        let percent = part.match(/\d+\s*%/)?.[0];
        let material = part.replace(/\d+\s*%/, '')?.toLowerCase()?.trim();
        const result = {} as ProductComponent;

        result.weight = {
            '@type': 'QuantitativeValue',
            unitCode: UnitCode.PERCENT,
            unitText: '%',
            value: parseFloat(percent?.replace('%', '') || '0')
        };

        if (product?.weight) {
            const productMass = parseMass(product.weight as QuantitativeValue);
            if (productMass && productMass.unitCode) {
                result.weight.unitCode = productMass.unitCode,
                result.weight.unitText = productMass.unitText,
                result.weight.value = parseFloat(productMass.value as string) * parseFloat(result.weight.value as string) / 100
            }
        }


        if (material.indexOf('organic') !== -1) {
            material = material.replace('organic', '').trim();
            result.isOrganic = true;
        }
        result.name = material;
        result.description = part.trim();
        return result;
    })
}