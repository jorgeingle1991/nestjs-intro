import { Controller, Post, Body, Get, Param, Patch, Delete, Res, HttpException, HttpStatus, UseFilters } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { HttpExceptionFilter } from "./exceptions/http-exception.filter";
import { Productos } from "./products.entity";

@Controller('products')
export class ProductsController {

    constructor(private productsService: ProductsService) { }

    @Post()
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
            .then(() => {
                if (existingProductWithSameUserId == null) {
                    //            throw new HttpException('A product already is assigned to a user ', HttpStatus.BAD_REQUEST);
                }
            })
            .catch(/***error => new HttpException(error.message, error.status,)***/);

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
    async updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDescription: string,
        @Body('price') prodPrice: number,
        @Body('userId') userId: string
    ) {
        const updatedProduct = await this.productsService.updateProduct(prodId, prodTitle, prodDescription, prodPrice, userId);

        return updatedProduct;
    }

    @Delete(':id')
    async removeProduct(@Param('id') productId: string) {
        const deletedProduct = await this.productsService.deleteProduct(productId);
        return { "msg": "Deleted record!" };
    }
}

function UserFilters() {
    throw new Error("Function not implemented.");
}
