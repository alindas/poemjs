import 'reflect-metadata';

import Koa from 'koa';
import koaBody from 'koa-body';

import useRoutes from './service/use-routes'

(async () => {
    const app = new Koa();

    app.use(
        koaBody({
            multipart: true,
            patchKoa: true
        })
    )

    await useRoutes(app)

    app.listen(9644)


})();