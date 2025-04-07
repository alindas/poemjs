import { ParameterizedContext } from 'koa';
import Container from 'typedi';
// import pathToReg from 'path-to-regexp'

import { IApi } from '../contract/api';
import { RequestMetaData } from './request';

export * from './request'

export function buildApi(ctx: ParameterizedContext) {
    const { path, method } = ctx.request
    console.log('lhh-log-:', ctx.request)
    const target = RequestMetaData[method.toLowerCase()]?.[path]
    if (!target) {
        throw new Error('req method 404')
    }


    const api = Container.get<IApi>(target.api)

    return api
}