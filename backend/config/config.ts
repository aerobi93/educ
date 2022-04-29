import { IConfig } from "../interfaceTS"


const config: IConfig = {
    port : process.env.PORT  || 9000
}

export default config