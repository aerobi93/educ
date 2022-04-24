import { IConfig } from "../interfaceTS"


const config: IConfig = {
    port : process.env.PORT  || 6000
}

export default config