import { Badge } from '../badge'
import {ReactComponent as Icon} from './vegetables-broccoli-1.svg';
import React from 'react';
import { css } from '@emotion/css';

const badgeStyle = css`
    background: #ACE1AF;
`;

export const VeganBadge: React.FC<{additionalStyles?: string[]}> = ({
  additionalStyles = []
}) => (
  <Badge additionalStyles={[...additionalStyles, badgeStyle]}>
    <Icon />
    <span>Vegan</span>
  </Badge>
);
