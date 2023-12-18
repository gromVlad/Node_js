type ProductType = {
  id: number;
  title: string;
};

const products: ProductType[] = [
  { id: 1, title: "tomato" },
  { id: 2, title: "orange" },
];

export const productsRepo = {
  async getAllProductWithTitle(
    search: string | null | undefined
  ): Promise<ProductType[]> {
    if (search) {
      return products.filter((el) => el.title?.indexOf(search) > -1);
    } else {
      return products;
    }
  },
  async getProductsId(id: number): Promise<ProductType | undefined> {
    return products.find((el) => el.id === id);
  },
  async deleteProduct(id: number): Promise<boolean | undefined> {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        products.splice(i, 1);
        return true;
      } else {
        return false;
      }
    }
  },
  async addProduct(title: string): Promise<ProductType | undefined> {
    let newProduct = {
      id: +new Date(),
      title: title,
    };
    products.push(newProduct);
    return newProduct;
  },
  async updateProduct(
    id: number,
    title: string
  ): Promise<ProductType | number> {
    let product = products.find((el) => el.id === id);
    if (product) {
      product.title = title;
      return product;
    } else {
      return 404;
    }
  },
};
