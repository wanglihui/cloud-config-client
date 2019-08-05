import _ from 'lodash';
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
            console.debug(err);
        }
        obj = replaceEnv(obj);
        for(let key in obj) {
            this[key] = obj[key];
        }
        if (this.name === undefined || this.port === undefined || this.env === undefined) {
            throw E.CUSTOMER_ERROR(400, 'config.yml config.name or config.port or config.env maybe undefined!');
        }
        return this;
    }
}

const reg = /\$\{([^}^{]+)\}/;
function replaceEnv(obj: any) {
    return _.transform(obj, function(result: any, value: any, index: string) {
        if (typeof value == 'string') {
            let groups = reg.exec(value);
            if (groups && groups.length) {
                let val = groups[1];
                let idx = val.indexOf(":");
                let envName = val.substr(0, idx);
                let defaultVal = val.substr(idx+1);
                defaultVal = defaultVal.replace(/^(\"|\')/, '');
                defaultVal = defaultVal.replace(/[\"\']\s*$/, '');
                //替换环境变量
                let envVal = process.env[envName];
                if (!envVal) {
                    envVal = defaultVal;
                }
                value = value.replace(reg, envVal);
            }
        }
        if (value instanceof RegExp) {
            value = value.toString();
        }
        if (value instanceof Date) {
            value = value.toISOString();
        }
        if (typeof value == 'object') {
            value = replaceEnv(value);
        }
        result[index] = value;
        return result;
    })
}

const C = new Config();
export default C;