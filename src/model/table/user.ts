import { Column, Model, Table } from 'sequelize-typescript';

@Table({
    tableName: 'user',
    underscored: false, // 转换字段名为下划线
    freezeTableName: true, // 禁用默认复数表名
    timestamps: false // 禁用默认字段 createAt 和 updateAt
})
export class User extends Model<User> {

    @Column
    name: string

    @Column
    age: number

    @Column
    birthday: Date
}