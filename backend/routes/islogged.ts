import Router from "koa-router";
import verifyJWT from "../middleware/authJWt";

const router = new Router()

router.get('/token/verifyToken', async(ctx) => {
  const  verif = await verifyJWT(ctx.header.token) 
    let {message}: any = verif
    if(message === "autoriser") {
      ctx.body=  {message : 'logged'}
      ctx.status = 200
    }
    else  { 
      ctx.body = { message : 'nologged'}
      ctx.status = 403
    }
  })
export default router