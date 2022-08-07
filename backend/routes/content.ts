import Router from "koa-router";
import { create } from "../controllers/content/contentCreate";
import { findAll } from "../controllers/content/contentFindAll";
import { update } from "../controllers/content/contentUpdate";
import { deleteC } from "../controllers/content/contentDelete";



const router = new Router()

router.post('/content/add', async (ctx: Router.RouterContext) => {
  const { status, message} : any= await create(ctx.request.body)
  ctx.status = status
  ctx.message = message
  
})
router.get('/content/findAll', async (ctx: Router.RouterContext) => {
  const { status, message, data} : any= await findAll()
  ctx.status = status
  ctx.body = data
  ctx.message = message
})
router.patch('/content/update', async (ctx: Router.RouterContext) => {
  const { status, message} : any= await update(ctx.request.body)
  ctx.status = status
  ctx.message = message
})
router.delete('/content/delete', async (ctx: Router.RouterContext) => {
  const { status, message} : any= await deleteC(ctx.request.body)
  ctx.status = status
  ctx.message = message
})

export default router