import { HeadingThree, HeadingTwo, Paragraph } from '@tryflux/pixels-web-components';
import { Link, useLocation, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { SNOW_PINK, TROPICAL_RAINFOREST_GREEN, TextColours } from '../../styles/local-color-palette';

import { ReactComponent as BackArrow } from './assets/arrow-left.svg';
import { CarbonFootprintBadge } from '../badges/carbon-footprint/carbon-footprint';
import { Column } from '../shared/layout/column';
import { Container } from '../shared/layout/container'
import { OrganicBadge } from '../badges/organic/organic';
import { PriceBadge } from '../badges/price/price';
import { Row } from '../shared/layout/row';
import { VeganBadge } from '../badges/vegan/vegan';
import { css } from '@emotion/css';
import { findCategory } from './categories';
import { getById } from '../../services/search';

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
  [data-paragraph], [data-heading-two] {
    color: ${TROPICAL_RAINFOREST_GREEN.contrastText?.value};
  }
`;

const categoryStyle = css`
  display: inline-block;
  background: ${SNOW_PINK.value};
  color: ${SNOW_PINK.contrastText?.value};
  border-radius: 2px;
  padding: 0.1rem 0.4rem;
  margin: 0.1rem 0.2rem;
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
  return <span>{product?.brand?.name}</span>;
}


function categoryName(categoryId: string): null | string {
  const parts = categoryId.split('.');
  const division = parts[0];
  const group = parts.length > 1 && parts[1][0];
  const groupClass = parts.length > 1 && parts[1].length > 1 && parts[1][1];
  return findCategory(division, group, groupClass)?.name || null;
}

function Product() {
  const location = useLocation()
  const query = new URLSearchParams(location.search);
  const searchString = query.get('q') || '';
  const params = useParams<any>();

  const [product, setProduct] = useState({} as any);
  useEffect(() => {
    (async () => {
      const data = await getById(params.productId);
      setProduct(data._source);
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
          {product &&
            <Row>
              <Column additionalStyles={[css`flex-grow: 0;`]}>
                {product.image && <ProductImage product={product}></ProductImage>}
              </Column>
              <Column>
                <HeadingTwo><Brand product={product} /> {product.name}</HeadingTwo>
                <Paragraph>{product.description}</Paragraph>
                <div className={css`display: flex; flex-direction: row;`}>
                  {product.carbonFootprint && <CarbonFootprintBadge carbonFootprint={product.carbonFootprint} />}
                  {product.isOrganic && <OrganicBadge />}
                  {product.isVegan && <VeganBadge />}
                  <span className={css`flex-grow: 1`} />
                  {product.offers?.length > 0 && <PriceBadge offers={product.offers} url={product.url}/>}
                </div>
              </Column>
            </Row>
          }
          <Row>
            { product?.category?.map((category: string) => <div className={categoryStyle}>{categoryName(category)}</div>) }
          </Row>
        </Container>
      </header>
      <main>
        <Container additionalStyles={[css`margin-top: 2rem; margin-bottom: 2rem;`]}>
          {product &&
            <>
              {product?.material &&
                <section>
                  <HeadingThree>Composition</HeadingThree>
                  <ul>
                    {product?.material?.map((material: any, i: number) => <li key={i}>{material.description}</li>)}
                  </ul>
                </section>
              }
              {/* {product?.category &&
                <section>
                  <HeadingThree>{categoryName(product.category[0])}</HeadingThree>

                </section>
              } */}
              <hr />
              <section>
                <div>{JSON.stringify(product)}</div>
              </section>
            </>
          }
        </Container>
      </main>
    </>
  );
}

export default Product;
