import { DataTypes, Model } from 'sequelize'
import sequelizeConnection from '../sequelize/config'
import Users from '../users/users.model'

class Productos extends Model {
    declare id: string;
    declare title: string;
    declare description: string;
    declare price: number;
};

Productos.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.INTEGER
    }

}, {
    timestamps: false,
    sequelize: sequelizeConnection,
    paranoid: false,
    modelName: "productos"
});

Productos.belongsTo(Users);

Users.hasMany(Productos)

export default Productos;