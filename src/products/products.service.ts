import { Injectable, Inject, HttpException, HttpStatus, NotFoundException } from "@nestjs/common";
import { Sequelize, UniqueConstraintError } from "sequelize";
import { Users } from "src/users/users.entity";
import { Productos } from './products.entity'


@Injectable()
export class ProductsService {

    constructor(
        @Inject('PRODUCTOS_REPOSITORY')
        private productosRepository: typeof Productos
    ) { }

    async insertProduct({
        prodTitle,
        prodDesc,
        prodPrice,
        userId
    }) {
        const prodId = Math.random().toString();
        const product = await Productos
            .create({ id: prodId, title: prodTitle, description: prodDesc, price: prodPrice, userId: userId })
            .catch(exception => {
                if (exception.name === "SequelizeForeignKeyConstraintError") {
                    return new HttpException('The product attempted to be assigned to a user that does not exist', HttpStatus.BAD_REQUEST)
                }
            })
        return product;
    }

    async getProducts(): Promise<Productos[]> {
        const products = this.productosRepository.findAll(
            {
                attributes: ['id', 'title', 'description', 'price'],
                include: [{
                    model: Users,
                    attributes: ['name'],
                }]
            });
        return products;
    }

    async getSingleProduct(productId: string) {

        const singleProduct = await Productos
            .findAll({
                where: {
                    id: productId
                }
            })
        return singleProduct;
    }


    async updateProduct(productId: string, title: string, desc: string, price: number, usrId: string) {

        await Productos
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
            .catch(exception => {
                if (exception.name === "SequelizeForeignKeyConstraintError") {
                    return new HttpException('The product was attempted to be assigned to the user that does not exist', HttpStatus.BAD_REQUEST)
                }
            })

        const alreadyUpdatedProduct = Productos.findOne({
            where: {
                id: productId
            },
            include: [{
                model: Users
            }]
        });

        return alreadyUpdatedProduct;

    }

    async deleteProduct(prodId: string) {

        const product = await Productos
            .destroy({
                where: {
                    id: prodId
                }
            })
        return product;
    }

}