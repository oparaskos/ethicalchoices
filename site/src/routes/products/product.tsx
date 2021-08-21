import React from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../../api/api';
import { jsonLdAny } from '../../api/jsonLdAny';
import { CarbonFootprint } from '../../components/carbon-footprint';

export function ResultPage() {
  const params = useParams<{id: string}>();
  const [product, loading, error] = useProduct(params.id);
  
  if(loading) {
    return <>Loading...</>
  }
  if(error) {
    return <>Something went wrong!</>
  }
  return (
    <section>
      <h1>{jsonLdAny(product.name)}</h1>
      <img alt="product" src={jsonLdAny(product.image)} />
      <p>{jsonLdAny(product.description)}</p>
      <CarbonFootprint product={product} />
      <hr />
      <pre>{JSON.stringify(product, null, 4)}</pre>
    </section>
  );
}
