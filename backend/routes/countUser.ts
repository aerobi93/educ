import Router from "koa-router";
import { countUserController } from "../controllers/users/count";

const router = new Router()

router.post('/user/count', async(ctx: Router.RouterContext) => {
  let {message, status} : any = await countUserController(ctx.request.body)
  ctx.body = message
  ctx.status = +status
})

export default router