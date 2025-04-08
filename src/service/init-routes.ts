import fs from 'fs';
import Koa, { ParameterizedContext } from 'koa';
import Router from 'koa-router';
import path from 'path';

import { runApi, RequestMetaData } from '../decorator';
import { ResponseCode } from '../enum/response-code';
import { LogFactoryBase } from '../contract/log-factory-base';
import Container from 'typedi';

export const AllowedMethods = ['get', 'post', 'put', 'delete']

async function loadAllApiFiles(dir: string,) {
    const items = fs.readdirSync(dir);

    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            await loadAllApiFiles(fullPath);
        } else if ( // 仅处理 .ts 文件
            item.endsWith('.ts') &&
            !item.endsWith('.d.ts') &&
            !item.includes('.test') &&
            !item.includes('.spec')
        ) {
            await import(fullPath)
        }
    }
}

export default async function initRoutes(app: Koa) {
    const router = new Router();
    const logger = Container.get(LogFactoryBase)

    await loadAllApiFiles(`${process.cwd()}/src/api`)

    AllowedMethods.forEach(method => {
        const routers = RequestMetaData[method.toLowerCase()]
        if (routers) {
            Object.keys(routers).forEach(r => {
                router[method](r, async (ctx: ParameterizedContext) => {
                    try {
                        const res = await runApi(ctx, r)

                        ctx.body = {
                            code: ResponseCode.Success,
                            data: res
                        }
                    } catch (error) {
                        console.log('lhh-log-:', error)
                        logger.addField(error.message)
                        ctx.body = {
                            code: ResponseCode.ServiceError,
                            data: error.message
                        };
                    }
                })
            })
        }
    })

    app.use(router.routes())
    app.use(router.allowedMethods())
}