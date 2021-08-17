import { useEffect, useState } from 'react';

const apiUrl = process.env.REACT_APP_API_URL;


export function useProduct(id: string | null): any {
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetch(`${apiUrl}/products/${id}`)
            .then(async (response) => {
                const data = await response.json();
                setResults(data._source);
                setError(null);
                setLoading(false);
            }, (e) => {
                setResults(null);
                setLoading(false);
                setError(e);
            });
    }, [setResults, setLoading, setError, id]);
    return [results, loading, error];
}


export function useProducts(query: string | null): any {
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetch(`${apiUrl}/products?q=${query}`)
        .then(async (response) => {
            const data = await response.json();
            setResults(data.hits.hits);
            setError(null);
            setLoading(false);
        }, (e) => {
            console.error(e);
            setResults(null);
            setLoading(false);
            setError(e);
        });
    }, [setResults, setLoading, setError, query]);
    return [results, loading, error];
}
