import Router from "koa-router";
import verifyJWT from "../middleware/authJWt";

const router = new Router()

router.get('/token/verifyToken', async(ctx: Router.RouterContext) => {
  const  verif = await verifyJWT(ctx.header.token) 
    const {status}: any = verif
    if(status === 200) {
     
      ctx.status = 200 
      ctx.message = 'logged'
    }
    else  {  
      ctx.status = 403 
      ctx.message = 'nologged'
    }
  })
export default router