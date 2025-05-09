import { Service } from 'typedi';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { Post } from '../../decorator';
import { IApi } from '../../contract/api';

class TestValidateBody {
    @IsNumber()
    @IsNotEmpty()
    public id: number;

    @IsString()
    @IsNotEmpty()
    public name: string;
}


@Post({ url: '/test-validate', validate: TestValidateBody })
@Service({ transient: true })
export class TestValidateAPI implements IApi {

    public body: TestValidateBody;

    public async call() {
        return `pass: ${this.body.id}`;
    }

}