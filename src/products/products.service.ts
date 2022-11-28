import { Injectable } from "@nestjs/common";
import Users from "src/users/Users.model";
import Productos from '../products/products.model'

@Injectable()
export class ProductsService {

    async dbInit() {
        Productos.sync({ alter: true }).catch(err => console.error(err));

    }

    async insertProduct({
        prodTitle,
        prodDesc,
        prodPrice,
        userId
    }) {
        const prodId = Math.random().toString();
        const product = await Productos
            .create({ id: prodId, title: prodTitle, description: prodDesc, price: prodPrice, userId: userId })
            .catch(err => console.log(err));
        return product;
    }

    async getProducts() {
        return Productos.findAll({ include: Users });
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

    async updateProduct(productId: string, title: string, desc: string, price: number, usrId: string) {

        const product = await Productos
            .update({
                title: title,
                description: desc,
                price: price,
                userId: usrId
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