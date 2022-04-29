import Router from "koa-router";
import { accountValidationController } from "../controllers/accountValidation";

const router = new Router()

router.post('/user/validation', async (ctx) => {
  const { status, message} : any= await accountValidationController(ctx.request.body)
  ctx.body = message
  ctx.status = +status
})

export default router