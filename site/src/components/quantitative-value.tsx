import React from "react";
import { CEFACT_UNIT_CODE } from "../util/cefact";

export interface QuantitativeValueProps {
    data: any;
    title?: string | undefined;
}

const nf = new Intl.NumberFormat()

function lookupUnitCode(unitCode: string): string {
    return CEFACT_UNIT_CODE[unitCode]?.Symbol;
}

export function QuantitativeValue({ data, title }: QuantitativeValueProps) {
    if (!data) {
        return <></>;
    }
    const value = data.value;
    const unitText = data.unitText || lookupUnitCode(data.unitCode) || '';
    const minValue = data.minValue;
    const maxValue = data.maxValue;

    return <data title={title} value={value} data-units={unitText} data-min={minValue} data-max={maxValue}>
        {nf.format(value)}{' '}{unitText}
    </data>;
}
