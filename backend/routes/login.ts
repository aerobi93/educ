import Router from "koa-router";
import { loginController } from "../controllers/login";

const router = new Router()

router.post('/login', async(ctx) => {
console.log(await loginController(ctx.request.body), 'routes');

ctx.body = await loginController(ctx.request.body)
})

export default router