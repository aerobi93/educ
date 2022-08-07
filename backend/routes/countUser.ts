import Router from "koa-router";
import { countUserController } from "../controllers/users/count";

const router = new Router()

router.post('/user/count', async(ctx: Router.RouterContext) => {
  const {message, status} : any = await countUserController(ctx.request.body)
  
  ctx.status = +status
  ctx.message = message
})

export default router