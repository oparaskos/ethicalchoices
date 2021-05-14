import { css, cx } from '@emotion/css';

import { MEDIA_QUERIES } from '@tryflux/pixels-web-components';
import React from 'react';

const containerStyle = css`
  max-width: ${MEDIA_QUERIES.SCREEN_SIZE_MAX};
  margin: 0 auto;
`;

export const Container: React.FC<{additionalStyles?: string[]}> = ({
  children,
  additionalStyles = []
}) => {
  return (
    <div data-container className={cx(containerStyle, ...additionalStyles)}>
      {children}
    </div>
  );
};
