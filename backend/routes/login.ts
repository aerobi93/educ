import Router from "koa-router";
import { loginController } from "../controllers/users/login";

const router = new Router()

router.post('/login', async(ctx: Router.RouterContext) => {
  const {message, status, role, token} : any = await loginController(ctx.request.body, ctx.request.header.token)

  ctx.body = {role, token}
  ctx.status = +status
  ctx.message = message

})

export default router