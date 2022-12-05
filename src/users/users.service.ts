import { Inject, Injectable } from "@nestjs/common";
import { Productos } from "src/products/products.entity";
import { Users } from './users.entity'

@Injectable()
export class UsersService {

    constructor(
        @Inject('USERS_REPOSITORY')
        private usersRepository: typeof Users
    ) { }


    async insertUser({
        usrName,
        usrEmail,
        prodTitle,
        prodDesc,
        prodPrice
    }) {
        const usrId = Math.random().toString();
        const prodId = Math.random().toString();

        const isProductCreated = (prodTitle !== undefined) &&
            (prodDesc !== undefined) &&
            (prodPrice !== undefined);
        if (isProductCreated) {
            const user = await Users
                .create({
                    id: usrId,
                    name: usrName,
                    email: usrEmail,
                    producto: {
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
        else {
            const user = await Users
                .create({
                    id: usrId,
                    name: usrName,
                    email: usrEmail,

                });
            return user;
        }
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

}