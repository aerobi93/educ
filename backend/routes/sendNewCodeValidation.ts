import Router from "koa-router";
import { newValidationCodeController } from "../controllers/newValidationCode";


const router = new Router()

router.patch('/user/newValidationCode', async (ctx) => {
  const {message, status} :any = await newValidationCodeController(ctx.request.body)
  ctx.status = +status
  ctx.body = message
})

export default router