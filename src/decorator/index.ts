import Container from 'typedi';
import { IApi, ReqMetaData } from '../contract/api';

export * from './get'

export function buildApi(metadata: ReqMetaData, route: string) {
    const target = metadata[route]
    if (!target) {
        throw new Error('req method 404')
    }

    return {
        api: Container.get<IApi>(target.api)
    }
}