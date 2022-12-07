import { Injectable, Inject, HttpException, HttpStatus, NotFoundException, Res } from "@nestjs/common";
import { rejects } from "assert";
import { resolve } from "path";
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

        await Productos.
            findOne({ where: { userId: userId } }).
            then(
                (productResult) => {
                    debugger;
                    if (productResult !== null) {
                        throw new HttpException('A product already is assigned to a user ', HttpStatus.BAD_REQUEST);
                    }
                });

        const product = await Productos
            .create({ id: prodId, title: prodTitle, description: prodDesc, price: prodPrice, userId: userId })
            .then(() => {

            })
            .catch(exception => {
                if (exception.name === "SequelizeForeignKeyConstraintError") {
                    throw new HttpException('The product attempted to be assigned to a user that does not exist', HttpStatus.BAD_REQUEST)
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

        if (usrId !== undefined) {
            await Productos.findOne({ where: { userId: usrId } })
                .then((productAssignedToUserResult) => {
                    debugger;
                    if (productAssignedToUserResult !== null) {
                        throw new HttpException('A product already is assigned to a user ', HttpStatus.BAD_REQUEST);
                    }
                })

            const product = await Productos
                .update({
                    title: title,
                    description: desc,
                    price: price,
                    userId: usrId
                }, {
                    where: {
                        id: productId
                    },
                    returning: true
                }).then(res => {
                    return res['1'][0].dataValues
                })
                .catch(exception => {
                    if (exception.name === "SequelizeForeignKeyConstraintError") {
                        throw new HttpException('The product was attempted to be assigned to the user that does not exist', HttpStatus.BAD_REQUEST)
                    }
                })
            return product;
        }
        else {
            const product = await Productos
                .update({
                    title: title,
                    description: desc,
                    price: price,
                }, {
                    where: {
                        id: productId
                    },
                    returning: true
                }).then(res => {
                    return res['1'][0].dataValues
                })
                .catch(exception => {
                    if (exception.name === "SequelizeForeignKeyConstraintError") {
                        throw new HttpException('The product was attempted to be assigned to the user that does not exist', HttpStatus.BAD_REQUEST)
                    }
                })
            return product;
        }



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