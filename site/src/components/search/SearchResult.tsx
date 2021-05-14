import { HeadingTwo, Paragraph } from '@tryflux/pixels-web-components';

import { Column } from '../shared/layout/column'
import React from 'react';
import { Row } from '../shared/layout/row'
import { css } from '@emotion/css';

interface SearchResultData {
  url?: string;
  name?: string;
  description?: string;
  image?: string[];
  brand?: string;
}

const rowStyle = css`
  height: 8rem;
  margin: 1rem;
`;

const productImageStyle = css`
  width: 8rem;
  height: 8rem;
  border-radius: 4rem;
  overflow: hidden;
  display: block;
  margin-right: 2rem;

  & > img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const productHeadingStyle = css`
  font-size: 2rem;
`;

const contentColumnStyle = css`
  display: flex;
  flex-direction: column;
  flex-basis: calc(100% - 8rem);
  width: calc(100% - 8rem);
`;

const productDescriptionStyle = css`
  max-width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

function SearchResult({ result }: { result: SearchResultData }) {

  return (
    <Row additionalStyles={[rowStyle]}>
      <Column additionalStyles={[css`flex: 0 1 8rem`]}>
        <picture className={productImageStyle}>
          <img src={result.image?.[0] || ''} />
        </picture>
      </Column>
      <Column additionalStyles={[contentColumnStyle]}>
        <HeadingTwo additionalStyles={[productHeadingStyle]}>{result.name}</HeadingTwo>
        <Paragraph additionalStyles={[productDescriptionStyle]}>{result.description}</Paragraph>
      </Column>
    </Row>
  );
}

export default SearchResult;
