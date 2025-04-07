import { ReqMetaData, ReqOption } from '../contract/api';

const GetApiMetaData: ReqMetaData = Object.create(null)
const PostApiMetaData: ReqMetaData = Object.create(null)

export const RequestMetaData = {
    get: GetApiMetaData,
    post: PostApiMetaData
}

export function Get(opt: string | ReqOption): ClassDecorator {
    return (target: any) => { // target 为类构造函数
        const url = typeof opt === 'string' ? opt : opt?.url
        RequestMetaData.get[url] = {
            api: target,
        }
    }
}

export function Post(opt: string | ReqOption): ClassDecorator {
    return (target: any) => { // target 为类构造函数
        const url = typeof opt === 'string' ? opt : opt?.url
        RequestMetaData.post[url] = {
            api: target,
        }
    }
}