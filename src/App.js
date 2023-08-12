import ProductManager from "../Clases/productManager.js";
import Product from "../Clases/Productos.js";

///IMPORTACIONES Y SERVIDORES
import express from "express";

const PORT = 4000;

///inicio servidor

const app = express()

app.get("/", (req,res)=>{
  res.send("Hola Buenos días")
})

app.listen(PORT, ()=>{
  console.log(`Server on port ${PORT}`)
})

//pedido de productos por ID
app.get("/products/:pid", async (req,res)=>{
  const pid = req.params.pid
  res.send(await ejecutar.getProductById(parseInt(pid)))
})

//Pedido de listado completo
app.get("/products", async (req,res)=>{
  res.send(await ejecutar.getProducts())
})

////////////////////////////////////////////////////////////////////////////////////////
///CREACION DE ITEMS

const producto1 = new Product(
  "manzana",
  "roja",
  550,
  "http://thumbnail.com",
  "MM284",
  76
);
const producto2 = new Product(
  "pera",
  "verde",
  687,
  "http://thumbnail.com",
  "MM248",
  54
);
const producto3 = new Product(
  "mandarina",
  "naranja",
  354,
  "http://thumbnail.com",
  "MA275",
  206
);
const producto4 = new Product("Piña", "dulce", 845, [], "PI265", 126);
const productofallido = new Product("casona de la esquina antigua", "", "");

const ejecutar = new ProductManager();

ejecutar.addProduct(producto1);
ejecutar.addProduct(producto2);
ejecutar.addProduct(producto3);
ejecutar.addProduct(producto4); // producto con array vacio


//////////////////////////////////////////////////////////////////////////////////////

//console.log(await ejecutar.getProducts()); // DEVUELVE EL LISTADO COMPLETO
//console.log(await ejecutar.getProductById(4)); /// BUSCAR PRODUCTO POR ID
//console.log(await ejecutar.getProductById(18)); /// ID NO ENCONTRADO
//console.log(await ejecutar.updateProduct(1, {title: "lasagña"})) // EDITAR PRODUCTO
//console.log(await ejecutar.deleteProduct(3)) // ELIMINAR PRODUCTO
