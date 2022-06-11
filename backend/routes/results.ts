import Router from "koa-router";
import { create } from "../controllers/results/resultsCreate";
import { findAll } from "../controllers/results/resultsFindAll";
import { update } from "../controllers/results/resultsUpdate";
import { deleteR } from "../controllers/results/resultsDeletes";



const router = new Router()

router.post('/results/add', async (ctx) => {
  const { status, message} : any= await create(ctx.request.body, ctx.request.header)
  ctx.body = message
  ctx.status = status
})
router.get('/results/findAll', async (ctx) => {
  const { status, message} : any= await findAll(ctx.request.header)
  ctx.body = message
  ctx.status = status
})
router.patch('/results/update', async (ctx) => {
  const { status, message} : any= await update(ctx.request.body, ctx.request.header)
  ctx.body = message
  ctx.status = status
})
router.delete('/results/delete', async (ctx) => {
  const { status, message} : any= await deleteR(ctx.request.body, ctx.request.header)
  ctx.body = message
  ctx.status = status
})

export default router