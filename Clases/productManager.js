import { promises as fs } from "fs";

const ruta = "./products.json";

export default class ProductManager {
  constructor() {
    this.products = [];
  }

  async addProduct(input) {
    //chequeo si todos los campos estan completos para agregar el producto
    const check = Object.values(input).some((valor) => valor === undefined);
    //transformo a objeto el archivo json para chequear por duplicados
    const producto = JSON.parse(await fs.readFile(ruta, "utf-8"));
    //chequeo si el producto no esta repetido
    const prod = producto.some((prod) => prod.code === input.code);

    if (check) {
      console.log("Producto Incompleto");
      return;
    }

    if (prod) {
      console.log("Producto ya agregado");
      return;
    } else {
      this.products.push(input);
      await fs.writeFile(ruta, JSON.stringify(this.products));
    }
  }

  async getProducts() {
    const producto = JSON.parse(await fs.readFile(ruta, "utf-8"));
    return(JSON.stringify(producto));
  }

  async getProductById(id) {
    const producto = JSON.parse(await fs.readFile(ruta, "utf-8"));
    const produ = producto.find((prod) => prod.id === id);
    console.log(produ)
    if (produ) {
      return(produ);
    } else {
      return("Producto no encontrado");
    }
  }

  async updateProduct(id, edicion) {
    const producto = JSON.parse(await fs.readFile(ruta, "utf-8"));
    const index = producto.findIndex((prod) => prod.id === id);

    if (index !== -1) {
      this.products[index].title = edicion.title;
      this.products[index].description = edicion.description;
      this.products[index].price = edicion.price;
      this.products[index].code = edicion.code;
      this.products[index].stock = edicion.stock;
      this.products[index].thumbnail = edicion.thumbnail;
      await fs.writeFile(ruta, JSON.stringify(this.products));
    } else {
      console.log("Producto no encontrado");
    }
  }

  async deleteProduct(id) {
    const producto = JSON.parse(await fs.readFile(ruta, "utf-8"));
    const produ = producto.find((prod) => prod.id === id);

    if (produ) {
      await fs.writeFile(
        ruta,
        JSON.stringify(producto.filter((prod) => prod.id != id))
      );
    } else {
      console.log("producto no encontrado");
    }
  }
}
