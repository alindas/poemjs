import { ParameterizedContext } from 'koa';
import Container from 'typedi';
// import pathToReg from 'path-to-regexp'

import { IApi } from '../contract/api';
import { RequestMetaData } from './request';
import { validate } from 'class-validator';

export * from './request'

async function validateDTO(targetCls: any, body: any) {
    const target = new targetCls();
    Object.assign(target, body);

    const errors = await validate(target, {
        stopAtFirstError: true // 遇到第一个错误就停止
    });

    return errors;
}

export async function runApi(ctx: ParameterizedContext, router: string) {
    const { method, query, body, header, files } = ctx.request
    const target = RequestMetaData[method.toLowerCase()]?.[router]
    if (!target) {
        throw new Error('Method Not Allowed')
    }

    // validate
    if (target.validate) {
        const result = await validateDTO(target.validate, body)
        if (result.length > 0) {
            const error = result[0].constraints;
            return Object.values(error)[0];
        }
    }

    const api = Container.get<IApi>(target.api)
    api.params = ctx.params
    api.query = query
    api.body = body
    api.files = files
    api.header = header

    return api.call()
}