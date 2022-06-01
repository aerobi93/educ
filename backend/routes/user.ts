
import Router from "koa-router";
import  {create as createAccount} from "../controllers/userCreate";
import { findUser } from "../controllers/userFindAll";
import { deleteController } from "../controllers/userDelete";
import { updateController } from "../controllers/userUpdate";
import { createAccountChild } from "../controllers/createAccountChild";


const router = new Router()

router.get("/user/findAll", async(ctx: Router.RouterContext) => {
  const { message, status } =  await findUser(ctx.request.header)  
  ctx.body = message
  ctx.status = +status
  
})

router.post("/user/adduser", async(ctx: Router.RouterContext) => {
  const { message, status } =  await createAccount(ctx.request.body)  
  ctx.body = message
  ctx.status = +status
})

router.post("/user/adduserChild", async(ctx: Router.RouterContext) => {
  const { message, status } =  await createAccountChild(ctx.request.body,ctx.request.header) 
  ctx.body = message
  ctx.status = +status
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