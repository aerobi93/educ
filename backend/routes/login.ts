import Router from "koa-router";
import { loginController } from "../controllers/users/login";

const router = new Router()

router.post('/login', async(ctx) => {
  let {message, status} : any = await loginController(ctx.request.body)
  ctx.body = message
  ctx.status = +status

})

export default router