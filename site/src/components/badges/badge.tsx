import { css, cx } from '@emotion/css';

import React from 'react';

const columnStyle = css`
  width: 3rem;
  height: 3rem;
  padding: 0.5rem;
  background: #ACE1AF;
  border-radius: 100%;
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 10px;
  font-weight: bold;
  align-items: center;
`;

export const Badge: React.FC<{additionalStyles?: string[]}> = ({
  children,
  additionalStyles = []
}) => (
  <div data-badge className={cx(columnStyle, ...additionalStyles)}>
    {children}
  </div>
);
