import Router from "koa-router";
import { accountValidationController } from "../controllers/users/accountValidation";

const router = new Router()

router.post('/user/validation', async (ctx : Router.RouterContext) => {
  const { status, message, token, role} : any= await accountValidationController(ctx.request.body)
 
  ctx.status = status 
  ctx.body = {token, role} 
  ctx.message = message
})
export default router