import Router from "koa-router";
import { create } from "../controllers/results/resultsCreate";
import { findAll } from "../controllers/results/resultsFindAll";
import { update } from "../controllers/results/resultsUpdate";
import { deleteR } from "../controllers/results/resultsDeletes";



const router = new Router()

router.post('/results/add', async (ctx: Router.RouterContext) => {
  const { status, message} : any= await create(ctx.request.body, ctx.request.header.token)
  ctx.status = status
  ctx.message = message
  
})
router.get('/results/findAll', async (ctx: Router.RouterContext) => {
  const { status, message, data} : any= await findAll(ctx.request.header.token)
  ctx.status = status
  ctx.body = data
  ctx.message = message
})
router.patch('/results/update', async (ctx: Router.RouterContext) => {
  const { status, message} : any= await update(ctx.request.body, ctx.request.header.token)
  ctx.status = status
  ctx.message = message
})
router.delete('/results/delete', async (ctx: Router.RouterContext) => {
  const { status, message} : any= await deleteR(ctx.request.body, ctx.request.header.token)
  ctx.status = status
  ctx.message = message
})

export default router