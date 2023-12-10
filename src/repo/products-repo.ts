const products = [
  { id: 1, title: "tomato" },
  { id: 2, title: "orange" },
];

export const productsRepo = {
  getAllProductWithTitle(search: string | null | undefined) {
    if (search) {
      return products.filter((el) => el.title?.indexOf(search) > -1);
    } else {
      return products
    }
  },
  getProductsId (id:number){
    return products.find((el) => el.id === id);
  },
  deleteProduct(id:number){
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        products.splice(i, 1);
        return true
      } else {
        return false
      }
    }
  },
  addProduct(title:string){
    let newProduct = {
      id: +new Date(),
      title: title,
    };
    products.push(newProduct);
    return newProduct
  },
  updateProduct(id:number,title:string){
    let product = products.find((el) => el.id === id);
    if (product) {
      product.title = title;
      return product
    } else {
      return 404
    }
  }
};
