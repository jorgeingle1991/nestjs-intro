import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { productosProvider } from "./products.provider"
import { DatabaseModule } from "src/database/database.module";

@Module({
    imports: [DatabaseModule],
    controllers: [ProductsController],
    providers: [
        ProductsService,
        ...productosProvider
    ]
})
export class ProductsModules { }