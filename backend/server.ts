import Koa from  "koa";
import bodyParser from "koa-bodyparser";
import cors from "koa2-cors";

import config from './config/config';
import addUser from './routes/user'
import login from './routes/login'
import accountValidation from './routes/accountValidation'


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
  .use(accountValidation.routes())
  .listen(config.port, () => {
  console.log("listen :", config.port)
})