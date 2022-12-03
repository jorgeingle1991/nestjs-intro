import { Table, Column, Model, PrimaryKey, HasOne, DataType } from 'sequelize-typescript'
import { Productos } from 'src/products/products.entity';

@Table
export class Users extends Model {

    @Column({
        type: DataType.STRING,
        primaryKey: true
    })
    id: string;

    @Column
    name: string;

    @Column
    email: string;

    @HasOne(() => Productos)
    producto: Productos[]
};