import React from 'react';
import { useLocation } from 'react-router-dom';
import { useResults } from '../../api';

function SearchResult({ query, data }: { query: string | null, data: any }) {
  return (
    <li>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </li>
  );
}

export function SearchResultsPage() {
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const query = search.get('q');
  const results = useResults(query)
  return (
    <section>
      You searched for {query}
      <ul>
        {results.map((r: any, i: number) => <SearchResult key={i} data={r} query={query} />)}
      </ul>
    </section>
  );
}
