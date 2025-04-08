import { ParameterizedContext } from 'koa';
import Container from 'typedi';
// import pathToReg from 'path-to-regexp'

import { IApi } from '../contract/api';
import { RequestMetaData } from './request';

export * from './request'

export function runApi(ctx: ParameterizedContext, router: string) {
    const { method } = ctx.request
    const target = RequestMetaData[method.toLowerCase()]?.[router]
    if (!target) {
        throw new Error('Method Not Allowed')
    }

    const api = Container.get<IApi>(target.api)
    api.params = ctx.params
    api.body = ctx.body
    api.header = ctx.header

    return api.call()
}