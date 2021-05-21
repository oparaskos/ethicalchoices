import { Badge } from '../badge'
import {ReactComponent as Icon} from './pollution-co2.svg';
import React from 'react';
import { css } from '@emotion/css';

const badgeStyle = css`
  background: #91C4F2;
`;

const co2Style = css`
  white-space: nowrap;
  overflow: ellipsis;
`;

const unitStyle = css`
  font-size: 0.4rem;
  vertical-align: text-top;
`;

function toFootprintString(carbonFootprint: any): React.ReactNode {
  if (Array.isArray(carbonFootprint)) {
    return toFootprintString(carbonFootprint[0]);
  } else if (typeof carbonFootprint === 'number') {
    return <>{carbonFootprint.toFixed(1)} <span className={unitStyle}>kgCO2<sup>e</sup></span></>
  } else if (typeof carbonFootprint !== 'string') {
    if(carbonFootprint?.estimate) {
      return toFootprintString(carbonFootprint?.estimate)
    } else if(carbonFootprint?.measurement) {
      return toFootprintString(carbonFootprint?.measurement);
    }
  }

  return <>carbonFootprint</>;
}

export const CarbonFootprintBadge: React.FC<{additionalStyles?: string[], carbonFootprint: string | any | any[] | string[]}> = ({
  carbonFootprint,
  additionalStyles = []
}) => {
  let co2string = toFootprintString(carbonFootprint);
  
  return (
  <Badge additionalStyles={[...additionalStyles, badgeStyle]}>
    <Icon />
    <span className={co2Style}>{co2string}</span>
  </Badge>
)};
