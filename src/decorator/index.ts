import { ParameterizedContext } from 'koa';
import Container from 'typedi';
// import pathToReg from 'path-to-regexp'

import { IApi } from '../contract/api';
import { RequestMetaData } from './request';

export * from './request'

export function runApi(ctx: ParameterizedContext, router: string) {
    const { method, query, body, header, files } = ctx.request
    const target = RequestMetaData[method.toLowerCase()]?.[router]
    if (!target) {
        throw new Error('Method Not Allowed')
    }
    const api = Container.get<IApi>(target.api)
    api.params = ctx.params
    api.query = query
    api.body = body
    api.files = files
    api.header = header

    return api.call()
}