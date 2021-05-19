export function getResults(searchString: string) {
    var url = new URL("http://localhost:9200/_search");
    if(searchString) url.searchParams.append('q', searchString);
    return fetch(url.toString()).then(data => data.json())
}