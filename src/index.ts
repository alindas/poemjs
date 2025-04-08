import 'reflect-metadata';
import Koa from 'koa';
import koaBody from 'koa-body';

import useRoutes from './service/use-routes'
import { initIoC } from './service/ioc/init';

(async () => {
    initIoC()
    const app = new Koa();

    app.use(
        koaBody({
            multipart: true,
            patchKoa: true
        })
    )

    await useRoutes(app)

    app.listen(9644, () => {
        console.log('服务启动，端口: 9644')
    })


})();