import { Inject, Service } from 'typedi'
import { Redis } from 'ioredis';

import { RedisFactoryBase } from '../../contract/redis-factory-base';
import { ConfigFactoryBase } from '../../contract/config-factory-base';

@Service({ id: RedisFactoryBase })
export class RedisFactory extends RedisFactoryBase {
    @Inject()
    private configFactory: ConfigFactoryBase;

    build() {
        const config = this.configFactory.build();
        const { host, port, password, select = 0 } = config.redis;

        const redis = new Redis({
            host,
            port,
            password,
            db: select,
        })

        return redis;
    }

}