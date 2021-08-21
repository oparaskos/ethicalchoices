import React from "react";
import { QuantitativeValue } from "./quantitative-value";

export interface CarbonFootprintProps {
    product: any;
}

export function CarbonFootprint({ product }: CarbonFootprintProps) {
    if (!product.carbonFootprint) {
        return <></>;
    }
    let valueElement = null;
    if (product.carbonFootprint.estimate) {
        if (product.carbonFootprint.estimate.value) {
            valueElement = <QuantitativeValue data={product.carbonFootprint.estimate} />
        } else {
            valueElement = <span>{product.carbonFootprint.estimate}</span>
        }
    } else if(product.carbonFootprint.measurement) {
        if (product.carbonFootprint.measurement.value) {
            valueElement = <QuantitativeValue data={product.carbonFootprint.measurement} />
        } else {
            valueElement = <span>{product.carbonFootprint.measurement}</span>
        }
    }

    const titleText = (product.carbonFootprint.measurement ? 'Measured ' : 'Estimated ') + `Carbon Footprint based on ${product.carbonFootprint.basedOn}`;

    return <span title={titleText}>{valueElement}</span>;
}
