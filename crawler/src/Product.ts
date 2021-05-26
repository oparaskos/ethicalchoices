import { Product as BaseProduct, Number, QuantitativeValue, Text } from 'schema-dts'

export interface CarbonFootprint {
    estimate?: Number | Text,
    measurement?: Number | Text,
    basedOn?: Text,
}
export interface ProductExt {
    composition?: Text | Text[];
    carbonFootprint?: Text | CarbonFootprint;
    [key: string]: any;
}

export interface ProductComponent {
    '@type': 'Product',
    name: string;
    description: string;
    weight: QuantitativeValue;
    [key: string]: any;
}


export type Product = BaseProduct & ProductExt;