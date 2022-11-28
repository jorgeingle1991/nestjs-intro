import { Injectable } from "@nestjs/common";
import Productos from '../products/products.model'

@Injectable()
export class ProductsService {

    async dbInit() {
        Productos.sync().catch(err => console.error(err));
    }

    async insertProduct({
        prodTitle,
        prodDesc,
        prodPrice
    }) {
        const prodId = Math.random().toString().slice(0, 5);
        const product = await Productos
            .create({ id: prodId, title: prodTitle, description: prodDesc, price: prodPrice })
            .catch(err => console.log(err));
        return product;
    }

    async getProducts() {
        return Productos.findAll();
    }

    async getSingleProduct(productId: string) {
        const product = await Productos
            .findAll({
                where: {
                    id: productId
                }
            })
            .catch(err => console.log(err));
        return product;
    }

    async updateProduct(productId: string, title: string, desc: string, price: number) {

        const product = await Productos
            .update({
                title,
                desc,
                price
            }, {
                where: {
                    id: productId
                }
            })
            .catch(err => console.log(err));
        return product;

    }

    async deleteProduct(prodId: string) {
        const product = await Productos
            .destroy({
                where: {
                    id: prodId
                }
            })
            .catch(err => console.log(err));
        return product;
    }


}