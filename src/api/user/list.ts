import { Inject, Service } from 'typedi'

import { Get } from '../../decorator';
import { IApi } from '../../contract/api';
import { DbFactoryBase } from '../../contract/db-factory-base';
import { User } from '../../model/table/user';

@Get("/user-list")
@Service({ transient: true })
class GetUserListAPI implements IApi {

    @Inject()
    public dbFactory: DbFactoryBase;

    public async call() {
        this.dbFactory.build({
            models: [User]
        })
        const res = User.findAll()

        return res
    }

}

export default {
    GetUserListAPI,
}