import { useEffect, useState } from 'react';

const apiUrl = process.env.REACT_APP_API_URL;


export function useResult(id: string | null): any {
    const [results, setResults] = useState([]);
    useEffect(() => {
        fetch(`${apiUrl}/products/${id}`)
            .then(response => response.json())
            .then(data => setResults(data.hits.hits));
    }, [setResults, id]);
    return results;
}


export function useResults(query: string | null): any {
    const [results, setResults] = useState([]);
    useEffect(() => {
        fetch(`${apiUrl}/products?q=${query}`)
            .then(response => response.json())
            .then(data => setResults(data.hits.hits));
    }, [setResults, query]);
    return results;
}
