import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript'

import { Users } from '../users/users.entity'

@Table
export class Productos extends Model {

    @Column({
        type: DataType.STRING,
        primaryKey: true
    })
    id: string;

    @Column
    name: string;

    @Column
    age: number;

    @Column
    email: string;

    @ForeignKey(() => Users)
    @Column
    userId: string;

    @BelongsTo(() => Users)
    user: Users
};


// Users.hasMany(Productos)

