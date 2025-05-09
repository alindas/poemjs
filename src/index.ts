import 'reflect-metadata';
import Koa from 'koa';
import koaBody from 'koa-body';

import initRoutes from './service/init-routes'
import { initIoC } from './service/ioc/init';

(async () => {
    initIoC()
    const app = new Koa();

    app.use(
        koaBody({
            multipart: true, // 支持文件上传
            patchKoa: true
        })
    )

    await initRoutes(app)

    app.listen(9644, () => {
        console.log('服务启动，端口: 9644')
    })


})();