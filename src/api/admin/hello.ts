import { Service } from 'typedi'

import { Get, Post } from '../../decorator';
import { IApi } from '../../contract/api';

@Get("/hello")
@Service({ transient: true })
class HelloGetAPI implements IApi {

    public async call() {
        return 'hello-get'
    }

}

@Post("/hello")
@Service({ transient: true })
class HelloPostAPI implements IApi {

    public async call() {
        return 'hello-post'
    }

}

export default {
    HelloGetAPI,
    HelloPostAPI
}