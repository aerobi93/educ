import Router from "koa-router";
import { accountValidationController } from "../controllers/users/accountValidation";

const router = new Router()

router.post('/user/validation', async (ctx) => {
  const { status, message} : any= await accountValidationController(ctx.request.body)
  ctx.body = message

})

export default router