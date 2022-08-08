import Koa from  "koa";
import bodyParser from "koa-bodyparser";
import cors from "koa2-cors";



import config from './config/config';
import addUser from './routes/user'
import login from './routes/login'
import newCode from './routes/sendNewCode'
import accountValidation from './routes/accountValidation'
import countUser from './routes/countUser'
import content from './routes/content'
import results from './routes/results'
import isLogged from './routes/islogged'




const app = new Koa()

app
  .use(bodyParser())
  .use(
    cors({
        origin: "*",
        allowMethods :['GET','POST','DELETE','PATCH'],  
    })
) 
  .use(countUser.routes())
  .use(addUser.routes())
  .use(login.routes())
  .use(accountValidation.routes())
  .use(newCode.routes())
  .use(content.routes())
  .use(results.routes())
  .use(isLogged.routes())
  .listen(config.port, () => {
  console.log("listen :", config.port)
})
