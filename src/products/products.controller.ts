import { Controller, Post, Body, Get, Param, Patch, Delete, HttpStatus, Res } from "@nestjs/common";
import { ProductsService } from "./products.service";
@Controller('products')
export class ProductsController {

    constructor(private productsService: ProductsService) { }

    // @Post()
    // async addProduct(
    //     @Body('title') prodTitle: string,
    //     @Body('description') prodDesc: string,
    //     @Body('price') prodPrice: number,
    //     @Body('userId') userId: string
    // ): Promise<any> {
    //     const insertedProduct = await this.productsService.insertProduct({
    //         prodTitle,
    //         prodDesc,
    //         prodPrice,
    //         userId
    //     }
    //     );
    //     return insertedProduct;

    // }

    @Get()
    async getAllProducts() {
        return await this.productsService.getProducts();
    }

    // @Get(':id')
    // async getProduct(@Res() response, @Param('id') productId: string) {

    //     const product = await this.productsService.getSingleProduct(productId).then((res) => { return res });

    //     var STATUS = product.status;
    //     var MESSAGE = product.payload;

    //     return response.status(STATUS).send(MESSAGE);


    // }

    // @Patch(':id')
    // async updateProduct(
    //     @Param('id') prodId: string,
    //     @Body('title') prodTitle: string,
    //     @Body('description') prodDescription: string,
    //     @Body('price') prodPrice: number,
    //     @Body('userId') userId: string
    // ) {
    //     const updatedProduct = await this.productsService.updateProduct(prodId, prodTitle, prodDescription, prodPrice, userId);

    //     return updatedProduct;
    // }

    // @Delete(':id')
    // async removeProduct(@Param('id') productId: string) {
    //     const deletedProduct = await this.productsService.deleteProduct(productId);
    //     return { "msg": "Deleted record!" };
    // }
}