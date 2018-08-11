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
    it('should calc Indices with 1', () => {
        const indices = Mapper.calcIndices(1);
        assert.deepEqual(indices, [
            0, 1, 2,
            1, 2, 3
        ]);


    });

    it('should calc Indices with 2', () => {
        const indices = Mapper.calcIndices(2);
        assert.deepEqual(indices, [
            0, 1, 3,
            1, 3, 4,

            1, 2, 4,
            2, 4, 5,

            3, 4, 6,
            4, 6, 7,

            4, 5, 7,
            5, 7, 8
        ]);
    });
});