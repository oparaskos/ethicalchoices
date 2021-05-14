import { css, cx } from '@emotion/css';

import React from 'react';

const columnStyle = css`
  flex: 1;
`;

export const Column: React.FC<{additionalStyles?: string[]}> = ({
  children,
  additionalStyles = []
}) => (
  <div data-column className={cx(columnStyle, ...additionalStyles)}>
    {children}
  </div>
);
