import C from '../index';
import * as assert from 'assert';

describe("index", () => {

    it("#ready should be ok", async ()=> {
        await C.ready();
        assert.equal(C.name, 'test');
        assert.equal(C.env, 'public');
    });
})