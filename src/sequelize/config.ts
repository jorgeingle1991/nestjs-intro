import { Sequelize, Model } from "sequelize";

const sequelizeConnection = new Sequelize('Test', 'jorgeingle', 'sa', {
    host: 'localhost',
    dialect: 'postgres'
});

export default sequelizeConnection