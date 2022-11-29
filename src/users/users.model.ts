import { DataTypes, Model } from 'sequelize'
import Productos from 'src/products/products.model';
import sequelizeConnection from '../sequelize/config'


class Users extends Model {
    declare id: string;
    declare name: string;
    // declare productoId: string
};

Users.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false,
    sequelize: sequelizeConnection,
    paranoid: false,
    modelName: "users"
});

export default Users;