import { ModelCtor, Sequelize } from 'sequelize-typescript';

export interface BuildDBOptions {
    models: string[] | ModelCtor[]
}

export abstract class DbFactoryBase {

    abstract build(opt: BuildDBOptions): Sequelize;

}