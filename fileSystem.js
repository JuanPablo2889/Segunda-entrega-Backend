import { promises as fs } from "fs";

class ProductManager {
    constructor() {
        this.patch = "./productos.txt";
        this.products = [];
    }

    static id = 0;

    addProduct = async (title, description, price, imagen, code, stock) => {
        ProductManager.id++;
        let newProduct = {
            title,
            description,
            price,
            imagen,
            code,
            stock,
            id: ProductManager.id,
        };

        this.products.push(newProduct);

        await fs.writeFile(this.patch, JSON.stringify(this.products));
    };

    readProducts = async () => {
        let respuesta = await fs.readFile(this.patch, "utf-8");
        return JSON.parse(respuesta);
    };

    getProducts = async () => {
        let respuesta2 = await this.readProducts();
        return console.log(respuesta2);
    };

    getProductsById = async (id) => {
        let respuesta3 = await this.readProducts();
        if (!respuesta3.find((product) => product.id === id)) {
            console.log("Producto no Encontrado");
        } else {
            console.log(respuesta3.find((product) => product.id === id));
        }
    };

    deleteProductsById = async (id) => {
        let respuesta3 = await this.readProducts();
        let productFilter = respuesta3.filter((products) => this.products.id != id);
        await fs.writeFile(this.patch, JSON.stringify(productFilter));
        console.log("Producto Eliminado");
    };

    updateProducts = async ({ id, ...producto }) => {
        await this.deleteProductsById(id);
        let productOld = await this.readProducts();

        let productModif = [{ ...producto, id }, ...productOld];
        await fs.writeFile(this.patch, JSON.stringify(productModif));
    };
}

const productos = new ProductManager();

/*productos.addProduct("Titulo1", "Description1", 1000, "Imagen1", "abc123", 5);
productos.addProduct("Titulo2", "Description2", 2000, "Imagen2", "abc123", 10);*/

/*productos.getProducts();*/

/*productos.getProductsById(2);
productos.deleteProductsById(2);*/
productos.updateProducts({
    title: "Titulo2",
    description: "Description2",
    price: 4200,
    imagen: "Imagen2",
    code: "abc123",
    stock: 10,
    id: 2,
});
