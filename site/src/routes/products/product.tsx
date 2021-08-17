import React from 'react';
import { useParams } from 'react-router-dom';

export function ResultPage() {
  const params = useParams<{id: string}>();
  
  return (
    <section>
        <pre>{params.id}</pre>
    </section>
  );
}
