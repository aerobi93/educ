
import Router from "koa-router";
import  {create as createAccount} from "../controllers/userCreate";
import { deleteController } from "../controllers/userDelete";
import { updateController } from "../controllers/userUpdate";


const router = new Router()

router.post("/user/adduser", async(ctx: Router.RouterContext) => {
  const { message, status } =  await createAccount(ctx.request.body)  
  ctx.body = message
  ctx.status = +status
  console.log(message, status);
  
})

router.patch('/user/update', async (ctx : Router.RouterContext) => {
  const  {message, status} : any = await updateController(ctx.request.body, ctx.request.header) 
  ctx.body = message
  ctx.status = +status
})

router.delete('/user/delete', async (ctx : Router.RouterContext) => {
  const {message, status} : any = await deleteController(ctx.request.header)
  ctx.body = message
  ctx.status = +status
})
export default router