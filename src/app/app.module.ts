import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModules } from '../products/products.module';
import { UsersModules } from '../users/users.module'

@Module({
  imports: [UsersModules, ProductsModules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
