import { Injectable } from "@nestjs/common";
import Productos from "src/products/products.model";
import Users from '../users/users.model'

@Injectable()
export class UsersService {

    async dbInit() {
        Users.sync({ alter: true }).catch(err => console.error(err));
    }

    async insertUser({
        usrName,
        usrEmail,
        prodTitle,
        prodDesc,
        prodPrice
    }) {
        const usrId = Math.random().toString();
        const prodId = Math.random().toString();
        const user = await Users
            .create({
                id: usrId,
                name: usrName,
                email: usrEmail,
                productos: {
                    id: prodId,
                    title: prodTitle,
                    description: prodDesc,
                    price: prodPrice
                }
            }, {
                include: [{ model: Productos, required: false }]
            })
            .catch(err => console.log(err));
        return user;
    }

    async getUser() {
        return Users.findAll({
            include: [{
                model: Productos
            }]
        });
    }

    async getSingleUser(usrId: string) {
        const user = await Users
            .findAll({
                where: {
                    id: usrId
                }
            })
            .catch(err => console.log(err));
        return user;
    }

    async updateUser(usrId: string, name: string) {

        const user = await Users
            .update({
                name: name
            }, {
                where: {
                    id: usrId
                }
            })
            .catch(err => console.log(err));
        return user;
    }

    async deleteUser(usrId: string) {
        const user = await Users
            .destroy({
                where: {
                    id: usrId
                }
            })
            .catch(err => console.log(err));
        return user;
    }

    //Helper
    // function createUser(shortVersion:boolean=false){
    //    return 0
    // }
}