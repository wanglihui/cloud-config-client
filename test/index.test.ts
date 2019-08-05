import C from '../index';
import * as assert from 'assert';

describe("index", () => {

    it("#ready should be ok", async ()=> {
        await C.ready();
        assert.equal(C.name, 'test');
        assert.equal(C.env, 'public');
        console.log(C);
    });


    it("#ready with enviroment should be ok", async ()=> {
        const host = 'https://google.com'
        process.env['HOST'] = host;
        await C.ready();
        assert.equal(C.name, 'test');
        assert.equal(C.env, 'public');
        assert.equal(C.host, host);
        console.log(C);
    });

    it("#ready with enviroment should be ok", async ()=> {
        const host = 'https://google.com'
        process.env['HOST'] = host;
        await C.ready();
        assert.equal(C.name, 'test');
        assert.equal(C.env, 'public');
        assert.equal(C.host, host);
        console.log(C);
    });
})