import { ReqMetaData, ReqOption } from '../contract/api';

export const GetApiMetaData: ReqMetaData = Object.create(null)

export function Get(opt: string | ReqOption): ClassDecorator {
    return (target: any) => { // target 为类构造函数
        const url = typeof opt === 'string' ? opt : opt?.url
        GetApiMetaData[url] = {
            api: target,
        }
    }
}