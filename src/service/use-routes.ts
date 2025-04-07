import fs from 'fs';
import Koa from 'koa';
import Router from 'koa-router';
import path from 'path';

import { buildApi, GetApiMetaData } from '../decorator';

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

    router.get('/:pre', async ctx => {
        try {
            const { api } = buildApi(GetApiMetaData, ctx.request.path)

            const res = await api.call()

            ctx.body = {
                code: 200,
                data: res
            }
        } catch (error) {
            ctx.body = {
                code: 404,
                data: error.message
            };
        }
    })



    app.use(router.routes())
    app.use(router.allowedMethods())
}