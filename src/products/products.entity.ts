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
    title: string;

    @Column
    description: string;

    @Column
    price: number;

    @ForeignKey(() => Users)
    @Column
    userId: string;

    @BelongsTo(() => Users)
    user: Users
};


