import { SNOW_WHITE, TROPICAL_RAINFOREST_GREEN } from '../../../styles/local-color-palette';
import { css, cx } from '@emotion/css';

import { Badge } from '../badge'
import React from 'react';

const badgeStyle = css`
  display: inline-block;
  background: ${SNOW_WHITE.value};
  color: ${TROPICAL_RAINFOREST_GREEN.value};
  font-weight: bold;
  text-decoration: none;
  height: 2rem;
  padding: .2rem 1rem;
  line-height: 2rem;
  vertical-align: middle;
  align-self: center;
  position: relative;
  z-index: 0;
  &:after {
    content: ' ';
    display: block;
    position: absolute;
    right: -0.85rem;
    top: 0.36rem;
    width: 1.7rem;
    height: 1.7rem;
    background: ${SNOW_WHITE.value};
    transform: rotate(45deg);
    z-index: -1;
  }
`;

export const PriceBadge: React.FC<{ additionalStyles?: string[], offers?: any[], url?: string }> = ({
  additionalStyles = [],
  offers = [],
  url = null
}) => {
  const bestOffer = offers.filter(it => !!it.price)[0]
  const price = isNaN(bestOffer?.price) ? null : bestOffer.price;
  const location = (bestOffer?.url || url) && new URL(bestOffer?.url || url)
  return (
    <a className={cx(...additionalStyles, badgeStyle)} href={location?.href}>
      <span>
        { price && <>£{parseFloat(bestOffer.price).toFixed(2)}{' '}</> }
        { location && <>at {location?.hostname}</> }
      </span>
    </a>
  )
};
