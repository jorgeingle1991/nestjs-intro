import { Sequelize } from "sequelize-typescript";
import { Users } from "src/users/users.entity";
import { Productos } from "src/products/products.entity";



export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelizeConnection = new Sequelize({
                dialect: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'jorgeingle',
                password: 'sa',
                database: 'Test'
            });
            sequelizeConnection.addModels([Users, Productos]);
            await sequelizeConnection.sync({ alter: true });
            return sequelizeConnection;
        },
    },
];