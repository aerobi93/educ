import Router from "koa-router";
import { countUserController } from "../controllers/count";

const router = new Router()

router.post('/user/count', async(ctx) => {
  let {message, status} : any = await countUserController(ctx.request.body)
  ctx.body = message
  ctx.status = +status
  console.log( await countUserController(ctx.request.body), 'countt')
})

export default router