import Koa from  "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import cors from "koa2-cors";
import https from "https";

const app = new Koa()
const router = new Router()

/*
const config = {
    domain: '', 
    https: {
        port : 5555
    }
}
*/


router.get("/", (ctx: Router.RouterContext) => {
  ctx.body = "hello rom"
})

const httpsServer = https.createServer()

app
  .use(router.routes())
  .use(bodyParser())
  .use(cors({
    origin: "*"
  }))

/* httpsServer.listen(config.https.port, () => {
  console.log(config.https.port)
}) */
app.listen(5000, () => {
  console.log("listen : 5000")
})