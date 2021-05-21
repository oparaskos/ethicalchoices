import { GAINSBORO_GREY, TROPICAL_RAINFOREST_GREEN, TextColours } from '../../styles/local-color-palette';
import { HeadingOne, HeadingTwo, Paragraph } from '@tryflux/pixels-web-components';
import { useHistory, useLocation } from 'react-router';

import { Container } from '../shared/layout/container'
import { Link } from 'react-router-dom';
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

const mainStyle = css`
  section {
    margin: 2rem 0;
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
      <main className={mainStyle}>
        <Container>
          <section>
            <HeadingTwo>About this database</HeadingTwo>
            <Paragraph>
              This database is compiled through the collection of multiple publicly available sources of data and uses a
              <a href="https://www.cloudflare.com/en-gb/learning/bots/what-is-a-web-crawler/">"Web Crawler"</a> to try to keep up to
              date and provide the most accurate information possible.
            </Paragraph>
            <Paragraph>
              Where available the Web Crawler will pull semantic information from linked-data
              structures on the page such as RDFa or microdata markup, or <a href="https://moz.com/blog/json-ld-for-beginners">JSON-LD</a> scripts.
              If no structured data is available the crawler will attempt to make a best guess
              about the core product metadata from the content on the page.
            </Paragraph>
            <Paragraph>
              Where not directly available, then a guess is made the carbon footprint is based on the weight of the item
              or the cost and a carbon emissions factor, the breakdown may be based on a different set of data and so
              may not line up exactly.
            </Paragraph>
          </section>
          <section>
            <HeadingTwo>I want to add to or update the database</HeadingTwo>
            <Paragraph>
              Where possible the information on this database is collected directly from retailers.
              For more information <Link to="/how-it-works">Click here</Link>. If the carbon footprint
              information is already available on your site you can submit a URL below and our
              crawler will get to work...
            </Paragraph>

            <Paragraph>
              To learn more about how to make sure that our crawler can read an understand your product page,
              and to ensure that the data you provide is accurate and up to date <Link to="/retailers">Click here</Link>.
            </Paragraph>

            <form>
              <input name='domain' placeholder="https://shop.example.com" />
              <button>Add</button>
            </form>
          </section>
        </Container>
      </main>
    </>
  );
}

export default App;
