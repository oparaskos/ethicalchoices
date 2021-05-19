import { GAINSBORO_GREY, TROPICAL_RAINFOREST_GREEN, TextColours } from '../../styles/local-color-palette';
import { HeadingOne, HeadingTwo, Paragraph } from '@tryflux/pixels-web-components';
import { useHistory, useLocation } from 'react-router';

import { Container } from '../shared/layout/container'
import React from 'react';
import { css } from '@emotion/css';
import nature from './assets/natural-4821583.svg';
import searchIcon from './assets/search-1.svg';

const searchInputStyle = css`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 0.2rem 1rem;
  outline: none;
  border: 1px solid ${GAINSBORO_GREY.value};
  font-size: 1.5rem;
  border-radius: 0.5rem;
  box-sizing: border-box;
`;
const searchButtonStyle = css`
  position: absolute;
  z-index: 2;
  right: 1rem;
  top: 0.5rem;
  border: 0 none;
  width: 2rem;
  height: 2rem;
  padding: 0.2rem 1rem;
  outline: none;
  font-size: 1.5rem;
  border-radius: 0.5rem;
  background: transparent;
  background-image: url(${searchIcon});
  background-position: center;
  background-size: 2rem 2rem;
  background-repeat: no-repeat;
  color: transparent;
`;

const searchContainerStyle = css`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 3rem;
`;

const headerStyle = css`
  background: ${TROPICAL_RAINFOREST_GREEN.value};
  background-image: url('${nature}');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  
  margin: 0;
  overflow: hidden;
  padding: 1rem;
  min-height: 75vh;

  h1 {
    font-size: 5rem;
    text-align: center;
    color: ${TextColours.TEXT_WHITE.value};
    margin: 8rem 0;
  }
`;

function App() {
  const history = useHistory();
  function doSearch(e: any) {
    if (e.target.search?.value) {
      history.push(`/products?q=${e.target.search?.value}`);
    }
    e.preventDefault();
    return false;
  }
  return (
    <>
      <header className={headerStyle}>
        <Container>
          <HeadingOne>Product Carbon Footprint Database</HeadingOne>
          <form onSubmit={doSearch} className={searchContainerStyle}>
            <input name='search' className={searchInputStyle} placeholder="Type a product name to begin" />
            <button className={searchButtonStyle} type="submit">Search</button>
          </form>
        </Container>
      </header>
      <main>
        <section>
          <Container>
            <HeadingTwo>About this database</HeadingTwo>
            <Paragraph>
              This database is compiled through the collection of multiple publicly available sources of data and uses a
              "Web Crawler" to try to keep up to date and provide the most accurate information possible.
            </Paragraph>
          </Container>
        </section>
        <section>
          <Container>
            <HeadingTwo>I want to feature my product(s) here</HeadingTwo>
            <Paragraph>
              Where possible the information on this databse is collected directly from retailers.
              For more information Click here. If the carbon footprint information is already available on your site you
              can submit a URL below and our crawler will get to work...
            </Paragraph>

            <Paragraph>
              To learn more about how to make sure that our crawler can read an understand your product page,
              and to ensure that the data you provide is accurate and up to date. Click here
            </Paragraph>
          </Container>
        </section>
        <section>
          <Container>
            <HeadingTwo>I've found inaccurate data, or don't want my products to show here</HeadingTwo>
          </Container>
        </section>
      </main>
    </>
  );
}

export default App;
