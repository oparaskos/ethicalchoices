import '@tryflux/pixels-typography/src/lib/fonts.css';

import { TextColours, WHITE } from './local-color-palette';

import { FONT_FACE } from '@tryflux/pixels-typography';
import { injectGlobal } from '@emotion/css';

injectGlobal`
  *, *::after, *::before {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-smoothing: antialiased;
  }
  body {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    position: relative;
    font-family: ${FONT_FACE.SANS_REGULAR};
    background-color: ${WHITE.value};
    color: ${TextColours.TEXT_BLACK.value};
  }
`;
