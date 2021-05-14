import { Product as BaseProduct, QuantitativeValue, Text } from 'schema-dts'

export interface ProductExt {
    composition: Text | Text[];
}

export interface ProductComponent {
    '@type': 'Product',
    name: string;
    description: string;
    weight: QuantitativeValue;
    [key: string]: any;
}


export type Product = BaseProduct & ProductExt;