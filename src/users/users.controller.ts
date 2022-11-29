import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
        this.usersService.dbInit().catch(err => console.error(err));
    }

    @Post()
    addUser(
        @Body('name') usrName: string,
    ): any {
        const generatedId = this.usersService.insertUser({
            usrName: usrName
        }
        );
        return { id: generatedId }
    }

    @Get()
    getAllProducts() {
        return this.usersService.getUser();
    }

    @Get(':id')
    getProduct(@Param('id') usrId: string) {
        return this.usersService.getSingleUser(usrId);
    }

    @Patch(':id')
    updateUser(
        @Param('id') usrId: string,
        @Body('name') usrName: string
    ) {
        this.usersService.updateUser(usrId, usrName);
        return { "msg": "Updated record!" };
    }

    @Delete(':id')
    removeUser(@Param('id') usrId: string) {
        this.usersService.deleteUser(usrId);
        return { "msg": "Deleted record!" };
    }
}