
import Router from "koa-router";
import  {create as createAccount} from "../controllers/users/userCreate";
import { findUser } from "../controllers/users/userFindAll";
import { deleteController } from "../controllers/users/userDelete";
import { updateController } from "../controllers/users/userUpdate";
import { createAccountChild } from "../controllers/users/createAccountChild";
import {deleteChildController} from "../controllers/users/deleteAccountChild";


const router = new Router()

router.get("/user/findAll", async(ctx: Router.RouterContext) => {
  const { message, status, data } =  await findUser(ctx.request.header.token)  
  ctx.status = status
  ctx.body = data
  ctx.message = message

})

router.post("/user/adduser", async(ctx: Router.RouterContext) => {
  const { message, status } =  await createAccount(ctx.request.body)  
  ctx.status = status
  ctx.message = message
})

router.post("/user/adduserChild", async(ctx: Router.RouterContext) => {  
  const { message, status } =  await createAccountChild(ctx.request.body,ctx.request.header.token) 
  ctx.status = status
  ctx.message = message
})

router.patch('/user/update', async (ctx : Router.RouterContext) => {
  
  const  {message, status} : any = await updateController(ctx.request.body, ctx.request.header.token) 
  ctx.status = +status
  ctx.message = message
  console.log(message, status)
 
})

router.delete('/user/delete', async (ctx : Router.RouterContext) => {
  const {message, status} : any = await deleteController(ctx.request.header.token)
  ctx.status = +status
  ctx.message = message
})

router.post("/user/deleteChild" , async(ctx : Router.RouterContext) => {
  const {message, status} : any = await deleteChildController(ctx.request.body, ctx.request.header.token)
  ctx.status = +status
  ctx.message = message
})


export default router