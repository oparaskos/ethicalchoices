import { GAINSBORO_GREY, TROPICAL_RAINFOREST_GREEN, TextColours } from '../../styles/local-color-palette';
import { Link, useHistory, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import { ReactComponent as BackArrow } from './assets/arrow-left.svg';
import { Container } from '../shared/layout/container'
import { FONT_FACE } from '@tryflux/pixels-typography';
import { History } from 'history';
import SearchResult from './SearchResult';
import { css } from '@emotion/css';
import { getResults } from '../../services/search';

const searchInputStyle = css`
  width: 100%;
  height: 3rem;
  padding: 0.2rem 1rem;
  outline: none;
  border: 1px solid ${GAINSBORO_GREY.value};
  font-size: 1.5rem;
  border-radius: 0.5rem;
  background-position: calc(100% - 1rem) center;
  background-size: 2rem 2rem;
  background-repeat: no-repeat;
  box-sizing: border-box;
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

const resultsSummaryStyle = css`
  color: ${TextColours.TEXT_WHITE.value};
  font-family: ${FONT_FACE.SANS_REGULAR};
  text-align: right;
  margin-top: 1rem;
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

let debounceInterval: NodeJS.Timeout;
function changeQueryString(query: URLSearchParams, documentTitle: string, history: History<unknown>) {
  if (debounceInterval) clearTimeout(debounceInterval);
  debounceInterval = setTimeout(() => {
    documentTitle = typeof documentTitle !== 'undefined' ? documentTitle : document.title;
    history.push(window.location.pathname + '?' + query.toString());
  }, 1500);
}

function Search() {
  const location = useLocation()
  const history = useHistory()
  const query = new URLSearchParams(location.search);
  const [numResults, setNumResults] = useState(0);
  const [timeTaken, setTimeTaken] = useState('0.1005ms');
  const [searchString, setSearch] = useState(query.get('q') || '')

  const [results, setResults] = useState([] as any[]);
  useEffect(() => {
    (async () => {
      window.performance.mark('searchMark');
      const data = await getResults(searchString);
      window.performance.measure('Search API Call Time', 'searchMark')
      setResults(data.hits.hits.map((it: any) => ({...it._source, _id: it._id })));
      setNumResults(data.hits.total.value);
      const measures = window.performance.getEntriesByName('Search API Call Time');
      setTimeTaken(measures[measures.length - 1].duration + 'ms')
    })();
  }, [setResults, searchString]);
  
  return (
    <>
      <header className={headerStyle}>
        <Container>
          <Link className={backLinkStyle} to="/">
            <BackArrow />
            Back to Landing page
          </Link>
          <input className={searchInputStyle} placeholder="Type a product name to begin" value={searchString} onChange={e => {
              query.set('q', e.target.value);
              changeQueryString(query, 'Product Search', history);
              setSearch(e.target.value)
            }
          } />
          <div className={resultsSummaryStyle}>Got {numResults} Results in {timeTaken}</div>
        </Container>
      </header>
      <main>
        <Container>
          { results.map(result => <SearchResult searchString={searchString} key={result.pageUri} result={result} />) }
        </Container>
      </main>
    </>
  );
}

export default Search;
