import assert from 'assert';
import {Mapper} from "../src/mapper";

/*
*
*
* 6-7-8
* 3-4-5
* 0-1-2
*/
describe('Mapper', () => {
    it('should calc Indices', () => {
        const indices1 = Mapper.calcIndices(1);
        assert.deepEqual(indices1, [
            0,1,2,
            1,2,3
        ]);

        const indices2 = Mapper.calcIndices(2);
        // assert.deepEqual(indices2, [
        //     0, 1, 3,
        //     1, 3, 4,
        //     2, 3, 4,
        //     3, 4, 5
        // ]);


    });
});