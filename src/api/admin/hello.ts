import { Service } from 'typedi'

import { Get } from '../../decorator';
import { IApi } from '../../contract/api';

@Get("/hello")
@Service({ transient: true })
export default class HelloAPI implements IApi {

    public async call() {
        return 'hello'
    }

}