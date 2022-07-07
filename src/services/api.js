export async function getCategories() {
  return fetch('https://api.mercadolibre.com/sites/MLB/categories').then((res) => res.json()).then(((data) => data));
}

export async function getProductsFromCategoryAndQuery(id, query) {
  return fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${id}&q=${query}`).then((res) => res.json()).then((data) => data);
}
