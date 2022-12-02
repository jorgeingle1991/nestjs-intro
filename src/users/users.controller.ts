import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import Productos from "src/products/products.model";
import Users from "./Users.model";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
        this.usersService.dbInit().catch(err => console.error(err));
    }

    @Post()
    async addUser(
        @Body('usrName') usrName: string,
        @Body('usrEmail') usrEmail: string,
        @Body('prodTitle') prodTitle: string,
        @Body('prodDescription') prodDescription: string,
        @Body('prodPrice') prodPrice: number,

    ): Promise<any> {
        const createUser = await this.usersService.insertUser({
            usrName: usrName,
            usrEmail: usrEmail,
            prodTitle: prodTitle,
            prodDesc: prodDescription,
            prodPrice: prodPrice

        });
        const userInformation = createUser['dataValues'];
        console.log(userInformation['id'])
        const displayUser = await Users
            .findAll({
                where: {
                    id: userInformation['id']
                },
                include: [{
                    model: Productos,
                    attributes: ['id', 'title', 'description', 'price']
                }]
            })
            .catch(err => console.log(err));
        console.log(displayUser);
        return displayUser
    }

    @Get()
    async getAllProducts() {
        return this.usersService.getUser();
    }

    @Get(':id')
    async getProduct(@Param('id') usrId: string) {
        return this.usersService.getSingleUser(usrId);
    }

    @Patch(':id')
    async updateUser(
        @Param('id') usrId: string,
        @Body('name') usrName: string
    ) {
        this.usersService.updateUser(usrId, usrName);
        return { "msg": "Updated record!" };
    }

    @Delete(':id')
    async removeUser(@Param('id') usrId: string) {
        this.usersService.deleteUser(usrId);
        return { "msg": "Deleted record!" };
    }
}