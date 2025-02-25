import path from 'node:path'
import Koa from 'koa'
import { koaBody } from 'koa-body'
import koaStatic from 'koa-static'
import dotenv from 'dotenv'
import { router } from './router'
import { exceptionInterceptor, faviconInterceptor } from './middleware'

dotenv.config()
if (process.env.NODE_ENV === 'production')
  dotenv.config({ path: path.resolve(import.meta.dirname, '../.env.production') })

const app = new Koa()

app.use(exceptionInterceptor())
  .use(koaBody())
  .use(faviconInterceptor())
  .use(router.routes())
  .use(koaStatic(path.resolve(import.meta.dirname, '../public')))

app.listen(process.env.PORT)
