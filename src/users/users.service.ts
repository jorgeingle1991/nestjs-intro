import { Injectable } from "@nestjs/common";
import Users from '../users/users.model'

@Injectable()
export class UsersService {

    async dbInit() {
        Users.sync({ alter: true }).catch(err => console.error(err));
    }

    async insertUser({
        usrName,

    }) {
        const usrId = Math.random().toString();
        const user = await Users
            .create({ id: usrId, name: usrName })
            .catch(err => console.log(err));
        return usrId;
    }

    async getUser() {
        return Users.findAll();
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