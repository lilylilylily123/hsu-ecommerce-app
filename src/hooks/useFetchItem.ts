export default async function useFetchItem() {
    const fetchResponse = await fetch("https://fakestoreapi.com/products?limit=30");
    return await fetchResponse.json();
}