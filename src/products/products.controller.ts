import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {
        this.productsService.dbInit().catch(err => console.error(err));
    }

    @Post()
    addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
    ): any {
        const generatedId = this.productsService.insertProduct({
            prodTitle,
            prodDesc,
            prodPrice
        }
        );
        return { id: generatedId }
    }

    @Get()
    getAllProducts() {
        return this.productsService.getProducts();
    }

    @Get(':id')
    getProduct(@Param('id') productId: string) {
        return this.productsService.getSingleProduct(productId);
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDescription: string,
        @Body('price') prodPrice: number
    ) {
        this.productsService.updateProduct(prodId, prodTitle, prodDescription, prodPrice);
        return { "msg": "Updated record!" };
    }

    @Delete(':id')
    removeProduct(@Param('id') productId: string) {
        this.productsService.deleteProduct(productId);
        return { "msg": "Deleted record!" };
    }
}