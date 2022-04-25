import Koa from  "koa";
import bodyParser from "koa-bodyparser";
import cors from "koa2-cors";

import config from './config/config';
import addUser from './routes/user'
import login from './routes/login'


const app = new Koa()
app
  .use(bodyParser())
  .use(
    cors({
        origin: "*"
    })
)
  .use(addUser.routes())
  .use(login.routes())
  .listen(config.port, () => {
  console.log("listen :", config.port)
})