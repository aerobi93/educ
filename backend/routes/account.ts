import Router from "koa-router";
import  {create as createAccount} from "../controllers/account";

const router = new Router()

router.post("/user/adduser", async(ctx: Router.RouterContext) => {
    ctx.body =  await createAccount(ctx.request.body)  
})

export default router