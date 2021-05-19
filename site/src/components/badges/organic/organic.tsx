import { Badge } from '../badge'
import {ReactComponent as Icon} from './organic-plant.svg';
import React from 'react';
import { css } from '@emotion/css';

const badgeStyle = css`
    background: #ACE1AF;
`;

export const OrganicBadge: React.FC<{additionalStyles?: string[]}> = ({
  additionalStyles = []
}) => (
  <Badge additionalStyles={[...additionalStyles, badgeStyle]}>
    <Icon />
    <span>Organic</span>
  </Badge>
);
