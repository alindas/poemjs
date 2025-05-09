import { Service } from 'typedi';

import { Post, IsNumber, IsString, IsNotEmpty } from '../../decorator';
import { IApi } from '../../contract/api';

class TestValidateBody {
    @IsNumber()
    @IsNotEmpty()
    public id: number;

    @IsString()
    @IsNotEmpty()
    public name: string;

    @IsNotEmpty({ message: '性别为男或女' })
    public gender: string;
}


@Post({ url: '/test-validate', validate: TestValidateBody })
@Service({ transient: true })
export class TestValidateAPI implements IApi {

    public body: TestValidateBody;

    public async call() {
        return `pass: ${this.body.id}`;
    }

}