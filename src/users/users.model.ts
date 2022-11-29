import { DataTypes, Model } from 'sequelize'
import sequelizeConnection from '../sequelize/config'


class Users extends Model {
    declare id: string;
    declare name: string;
    declare email: string;
};

Users.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    }

}, {
    timestamps: false,
    sequelize: sequelizeConnection,
    paranoid: false,
    modelName: "users"
});

export default Users;