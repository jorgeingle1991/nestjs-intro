import { HttpStatus, Injectable } from "@nestjs/common";
import { find } from "rxjs";
import Users from "src/users/Users.model";
import Productos from '../products/products.model'
import { Tipo } from '../products/Tipo'


@Injectable()
export class ProductsService {

    async dbInit() {
        Productos.sync().catch(err => console.error(err));

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
        const products = Productos.findAll(
            {
                attributes: ['id', 'title', 'description', 'price'],
                include: [{
                    model: Users,
                    attributes: ['name'],
                }]
            });
        return products;
    }

    async getSingleProduct(productId: string): Promise<Tipo> {

        const singleProduct = await Productos
            .findAll({
                where: {
                    id: productId
                }
            })
            .then((result) => {
                if (result.length === 0) {
                    return { status: HttpStatus.NOT_FOUND, payload: { message: "Product not found" } }
                }
                return { status: HttpStatus.OK, payload: result };
            })
            .catch(err => console.log(err));
        if (this.responseIsValid(singleProduct)) {
            return singleProduct;
        }
    }

    responseIsValid(response: Tipo | void): response is Tipo {
        return (response as Tipo).status !== undefined
    }

    async updateProduct(productId: string, title: string, desc: string, price: number, usrId: string) {

        const updatedProduct = await Productos
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

        const alreadyUpdatedProduct = Productos.findOne({
            where: {
                id: productId
            },
            include: [{
                model: Users
            }]
        })

        return alreadyUpdatedProduct;

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