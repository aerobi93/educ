import Router from "koa-router";
import { newCodeController } from "../controllers/users/newCode";


const router = new Router()

router.patch('/user/newCode', async (ctx: Router.RouterContext) => {
  const {message, status} :any = await newCodeController(ctx.request.body, ctx.header.token)
  ctx.status = +status
  ctx.body = message
})

export default router