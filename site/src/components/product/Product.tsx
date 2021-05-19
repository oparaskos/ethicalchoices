import { HeadingTwo, Paragraph } from '@tryflux/pixels-web-components';
import { Link, useLocation, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { TROPICAL_RAINFOREST_GREEN, TextColours } from '../../styles/local-color-palette';

import { ReactComponent as BackArrow } from './assets/arrow-left.svg';
import { Column } from '../shared/layout/column';
import { Container } from '../shared/layout/container'
import { OrganicBadge } from '../badges/organic/organic';
import { Row } from '../shared/layout/row';
import { VeganBadge } from '../badges/vegan/vegan';
import { css } from '@emotion/css';
import { getResults } from '../../services/search';

const productImageStyle = css`
  width: 14rem;
  height: 14rem;
  border-radius: 1rem;
  overflow: hidden;
  display: block;
  margin-right: 2rem;

  & > img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const backLinkStyle = css`
  display: block;
  color: white;
  line-height: 1rem;
  vertical-align: middle;
  margin-bottom: 1rem;
  > svg {
    fill: white;
    display: inline-block;
    vertical-align: middle;
    height: 1rem;
    width: 1rem;
    margin-right: 0.5rem;
  }
`;

const headerStyle = css`
  background: ${TROPICAL_RAINFOREST_GREEN.value};
  
  margin: 0;
  overflow: hidden;
  padding: 1rem;

  h1 {
    font-size: 5rem;
    text-align: center;
    color: ${TextColours.TEXT_WHITE.value};
    margin: 8rem 0;
  }
`;

function ProductImage({ product }: any) {
  let image = product.image;
  if (Array.isArray(image)) {
    image = image[0];
  }

  return <picture className={productImageStyle}>
    <img alt="Product" src={image}></img>
  </picture>
}

function Brand({ product }: any) {
  return <span>{product?.brand}</span>;
}

function Product() {
  const location = useLocation()
  const query = new URLSearchParams(location.search);
  const searchString = query.get('q') || '';
  const params = useParams<any>();

  const [product, setProduct] = useState({} as any);
  useEffect(() => {
    (async () => {
      const data = await getResults(`_id:${params.productId}`);
      setProduct(data.hits.hits.map((it: any) => ({ ...it._source, _id: it._id }))[0]);
    })();
  }, [setProduct, params]);

  return (
    <>
      <header className={headerStyle}>
        <Container>
          <Link className={backLinkStyle} to={`/products?q=${searchString}`}>
            <BackArrow />
            Back to Search Results
          </Link>
        </Container>
      </header>
      <main>
        <Container additionalStyles={[css`margin-top: 2rem; margin-bottom: 2rem;`]}>
          {product &&
            <Row>
              <Column additionalStyles={[css`flex-grow: 0;`]}>
                {product.image && <ProductImage product={product}></ProductImage>}
              </Column>
              <Column>
                <HeadingTwo><Brand product={product} /> {product.name}</HeadingTwo>
                <Paragraph>{product.description}</Paragraph>
                <div>
                  {product.isOrganic && <OrganicBadge></OrganicBadge>}
                  {product.isVegan && <VeganBadge></VeganBadge>}
                </div>
              </Column>
            </Row>
          }
        </Container>
      </main>
    </>
  );
}

export default Product;
