import Redis from 'ioredis';

export abstract class RedisFactoryBase {

    abstract build(): Redis

}