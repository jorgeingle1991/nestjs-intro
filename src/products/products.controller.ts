import { Controller, Post, Body, Get, Param, Patch, Delete, Res, HttpException, HttpStatus, UseFilters } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { HttpExceptionFilter } from "./exceptions/http-exception.filter";
import { Productos } from "./products.entity";

@Controller('products')
export class ProductsController {

    constructor(private productsService: ProductsService) { }

    @Post()
    @UseFilters(new HttpExceptionFilter())
    async addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number,
        @Body('userId') userId: string
    ): Promise<any> {

        const existingProductWithSameUserId = await Productos.findOne({ where: { userId: userId } });

        const insertedProduct = await this.productsService.insertProduct({
            prodTitle,
            prodDesc,
            prodPrice,
            userId
        })
            .then((result) => {
                if (existingProductWithSameUserId !== null) {
                    throw new HttpException('A product already is assigned to a user ', HttpStatus.BAD_REQUEST);
                }
                if (result instanceof HttpException) {
                    throw result
                }
                return result
            })
            .catch((error) => {
                throw new HttpException(error.message, error.status)
            });

        return insertedProduct;

    }

    @Get()
    async getAllProducts() {
        return await this.productsService.getProducts();
    }

    @Get(':id')
    @UseFilters(new HttpExceptionFilter())
    async getProduct(@Param('id') productId: string) {

        return await this.productsService.getSingleProduct(productId)
            .then((result) => {
                if (result.length != 0) {
                    return result;
                } else {
                    throw new Error;
                }
            })
            .catch(() => {
                throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
            })
    }

    @Patch(':id')
    @UseFilters(new HttpExceptionFilter())
    async updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDescription: string,
        @Body('price') prodPrice: number,
        @Body('userId') userId: string
    ) {


        const updatedProduct = await this.productsService.updateProduct(prodId, prodTitle, prodDescription, prodPrice, userId)
            .then((updatedProductResult) => {

                Productos.findOne({ where: { userId: userId } })
                    .then((productAssignedToUserResult) => {
                        if (productAssignedToUserResult !== null) {
                            return new HttpException('A product already is assigned to a user ', HttpStatus.BAD_REQUEST);
                        }
                    });

                return updatedProductResult;

            })
            .catch((error) => {
                return new HttpException(error.message, error.status)
            });


        return updatedProduct;
    }

    @Delete(':id')
    @UseFilters(new HttpExceptionFilter())
    async removeProduct(@Param('id') productId: string) {

        await Productos.findOne({ where: { id: productId } })
            .then((result) => {
                if (result == null) {
                    throw new HttpException('The record does not exists', HttpStatus.BAD_REQUEST);
                }
            });

        await this.productsService.deleteProduct(productId);
        return { "msg": "Deleted record!" };
    }
}

