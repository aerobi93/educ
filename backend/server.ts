import Koa from  "koa";
import bodyParser from "koa-bodyparser";
import cors from "koa2-cors";


import config from './config';
import addUser from './routes/account'

const app = new Koa()
app
  .use(bodyParser())
  .use(
    cors({
        origin: "*"
    })
)
  .use(addUser.routes())
  .listen(config.port, () => {
  console.log("listen :", config.port)
})