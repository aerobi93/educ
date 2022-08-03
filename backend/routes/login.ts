import Router from "koa-router";
import { loginController } from "../controllers/users/login";

const router = new Router()

router.post('/login', async(ctx: Router.RouterContext) => {
  let {message, status} : any = await loginController(ctx.request.body, ctx.request.header.token)
  ctx.body = message
  ctx.status = +status

})

export default router