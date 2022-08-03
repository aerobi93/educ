import Router from "koa-router";
import { create } from "../controllers/content/contentCreate";
import { findAll } from "../controllers/content/contentFindAll";
import { update } from "../controllers/content/contentUpdate";
import { deleteC } from "../controllers/content/contentDelete";



const router = new Router()

router.post('/content/add', async (ctx: Router.RouterContext) => {
  const { status, message} : any= await create(ctx.request.body)
  ctx.body = message
  ctx.status = status
})
router.get('/content/findAll', async (ctx: Router.RouterContext) => {
  const { status, message} : any= await findAll()
  ctx.body = message
  ctx.status = status
})
router.patch('/content/update', async (ctx: Router.RouterContext) => {
  const { status, message} : any= await update(ctx.request.body)
  ctx.body = message
  ctx.status = status
})
router.delete('/content/delete', async (ctx: Router.RouterContext) => {
  const { status, message} : any= await deleteC(ctx.request.body)
  ctx.body = message
  ctx.status = status
})

export default router