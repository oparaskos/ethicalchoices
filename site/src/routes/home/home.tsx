import React from 'react';
import { EMAIL_SUPPORT, ROUTE_PRODUCTS, ROUTE_GUIDE } from '..';

export function HomePage() {
  return (
    <div>
      <section>
        <h1>Ethical Choices</h1>
        <form method="GET" action={ROUTE_PRODUCTS}>
          <input name="q" type="search" />
          <button>Search</button>
        </form>
      </section>
      <section>
        <h2>About This Database</h2>
        <p>
          This database is compiled through the collection of multiple publicly
          available sources of data and uses a web crawler to try to keep up to
          date and provide the most accurate information possible.
        </p>
      </section>
      <section>
        <h2>I want to feature my product here</h2>
        <p>
          Wherever possible the information in this database is collected
          directly from retailers. For more information
          <a href={ROUTE_GUIDE}>click here</a>.
        </p>
        <p>
          If the carbon footprint is already available on your site and is
          marked up ready to be found it should be picked up automatically.
        </p>
        <p>
          To index or re-index your site please enter the URL below.
        </p>
        <p>
          To learn more about how to make sure that our crawler can read
          and understand your product page correctly and accurately please
          see our <a href={ROUTE_GUIDE}>Guide</a>.
        </p>
      </section>
      <section>
        <h2>Something wrong?</h2>
        <p>
          If you've found inaccurate product information, do not want your
          products featured here, or just want to chat reach out to us at
          <a href={`mailto:${EMAIL_SUPPORT}`}>{EMAIL_SUPPORT}</a>.
        </p>
      </section>
    </div>
  );
}
