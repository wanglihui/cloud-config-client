const pwd = process.cwd();
const yaml = require("node-yaml");
import * as path from 'path';
import E from 'cloud-error';

export class Config {
    public name!: string;
    public port!: number;
    public env!: string;

    [index: string]: any;
    async ready(){
        //分析
        let obj = await yaml.read(path.resolve(pwd, 'config.yml'));
        try {
            const localConfig = await yaml.read(path.resolve(pwd, 'config.local.yml'));
            obj = Object.assign(obj, localConfig);
        } catch(err) {
        }
        for(let key in obj) {
            this[key] = obj[key];
        }
        if (this.name === undefined || this.port === undefined || this.env === undefined) {
            throw E.CUSTOMER_ERROR(400, 'config.yml config.name or config.port or config.env maybe undefined!');
        }
        return this;
    }
}

const C = new Config();
export default C;