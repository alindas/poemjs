import { Inject, Service } from 'typedi';

import { IApi } from '../../contract/api';
import { RedisFactoryBase } from '../../contract/redis-factory-base';
import { Get } from '../../decorator';

@Get('/test-redis')
@Service({ transient: true })
class TestRedisAPI implements IApi {

    @Inject()
    public redisFactory: RedisFactoryBase;

    public async call() {
        const redis = this.redisFactory.build();
        const res = await redis.get('test');
        if (!res) {
            await redis.set('test', 'test');
            return 'test';
        }

        return res;
    }
}

export default {
    TestRedisAPI
}