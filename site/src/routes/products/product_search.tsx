import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTE_PRODUCT } from '..';
import { useProducts } from '../../api/api';
import { jsonLdAny } from '../../api/jsonLdAny';

function SearchResult({ product, id }: { product: any, id: string }) {
  return (
    <li>
      <h3>{jsonLdAny(product.name)}</h3>
      <img alt="product" src={jsonLdAny(product.image)} />
      <p>{jsonLdAny(product.description)}</p>
      <Link to={ROUTE_PRODUCT.replace(':id', jsonLdAny(id))}>More info</Link>
    </li>
  );
}

export function SearchResultsPage() {
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const query = search.get('q');
  const [results, loading, error] = useProducts(query);
  if (loading) {
    return <>Loading...</>
  }
  if (error) {
    return <>Something went wrong!</>
  }
  return (
    <section>
      You searched for {query}
      <ul>
        {results.map((r: any, i: number) => <SearchResult key={i} product={r._source} id={r._id} />)}
      </ul>
    </section>
  );
}
