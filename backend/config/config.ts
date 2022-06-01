import { IConfig } from "../interfaceTS"


const config: IConfig = {
    port : process.env.PORT  || 5000
}

export default config