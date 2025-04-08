import fs from 'fs';
import Koa, { ParameterizedContext } from 'koa';
import Router from 'koa-router';
import path from 'path';

import { runApi, RequestMetaData } from '../decorator';

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

export default async function useRoutes(app: Koa) {
    const router = new Router();

    await loadAllApiFiles(`${process.cwd()}/src/api`)

    AllowedMethods.forEach(method => {
        const routers = RequestMetaData[method.toLowerCase()]
        if (routers) {
            Object.keys(routers).forEach(r => {
                router[method](r, async (ctx: ParameterizedContext) => {
                    try {
                        const res = await runApi(ctx, r)

                        ctx.body = {
                            code: 200,
                            data: res
                        }
                    } catch (error) {
                        console.log('lhh-log-:', error)
                        ctx.body = {
                            code: 404,
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