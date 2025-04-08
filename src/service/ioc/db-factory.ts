import { Sequelize } from 'sequelize-typescript';
import { Service } from 'typedi';

import { BuildDBOptions, DbFactoryBase } from '../../contract/db-factory-base';

@Service()
export class DBFactory extends DbFactoryBase {

    build(opt: BuildDBOptions) {

        return new Sequelize({
            host: '192.168.12.64',
            username: 'root',
            password: 'root',
            database: 'test',
            dialect: 'mysql',
            models: opt.models
        })
    }
}