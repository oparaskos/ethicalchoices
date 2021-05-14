import { css, cx } from '@emotion/css';

import { MEDIA_QUERIES } from '@tryflux/pixels-web-components';
import React from 'react';

const rowStyleStyle = css`
  display: flex;
  flex-direction: row;
  ${MEDIA_QUERIES.MOBILE_QUERY} {
    flex-direction: column;
  }
`;

export const Row: React.FC<{additionalStyles?: string[]}> = ({
  children,
  additionalStyles = []
}) => (
  <div data-row className={cx(rowStyleStyle, ...additionalStyles)}>
    {children}
  </div>
);
