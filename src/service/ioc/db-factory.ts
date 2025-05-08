import { Sequelize } from 'sequelize-typescript';
import { Service, Inject } from 'typedi';

import { BuildDBOptions, DbFactoryBase } from '../../contract/db-factory-base';
import { ConfigFactoryBase } from '../../contract/config-factory-base';

@Service({ id: DbFactoryBase })
export class DBFactory extends DbFactoryBase {
    @Inject()
    private configFactory: ConfigFactoryBase;

    build(opt: BuildDBOptions) {
        const config = this.configFactory.build();
        const { host, username, password, database, dialect } = config.database;

        const db = new Sequelize({
            host,
            username,
            password,
            database,
            dialect: dialect || 'mysql',
            models: opt.models
        });

        return db;
    }
}