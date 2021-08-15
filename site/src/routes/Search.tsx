import React from 'react';

function Search() {
  return (
    <div>
      <form method="GET" action="/search">
        <input name="q" type="search" />
        <button>Search</button>
      </form>
    </div>
  );
}

export default Search;
