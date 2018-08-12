import assert from 'assert';
import {Mapper} from "../src/mapper"
/*
*
*
* 6-7-8
* 3-4-5
* 0-1-2
*/
describe('Mapper', () => {
    describe('test cube index', () => {
        it('should calc Indices with 1', () => {
            const result = Mapper.calcCube([], 0, 2);
            const expectedReuslt = [0, 1, 2, 1, 2, 3];
            assert.deepEqual(result.length, expectedReuslt.length);
            assert.deepEqual(result, expectedReuslt);
        });

        it('should calc Indices with 2', () => {
            const result = Mapper.calcCube([], 0, 3);
            const expectedReuslt = [0, 1, 3, 1, 3, 4];
            assert.deepEqual(result.length, expectedReuslt.length);
            assert.deepEqual(result, expectedReuslt);
        });

        it('should calc Indices with 2 start 1', () => {
            const result = Mapper.calcCube([], 1, 3);
            const expectedReuslt = [1, 2, 4, 2, 4, 5];
            assert.deepEqual(result.length, expectedReuslt.length);
            assert.deepEqual(result, expectedReuslt);
        });


        it('should calc Indices with 4 start 1', () => {
            const result = Mapper.calcCube([], 1, 4);
            const expectedReuslt = [1, 2, 5, 2, 5, 6];

            assert.deepEqual(result.length, expectedReuslt.length);
            assert.deepEqual(result, expectedReuslt);
        });

        it('should test end of map', () => {
            const result = Mapper.calcCube([], 2, 3);

            const expectedReuslt = [];
            assert.deepEqual(result, expectedReuslt);
        });
    });

    describe('test indices', () => {
        it('should add indices with 1', () => {
            const result = Mapper.calcIndices(1);
            assert.equal(result.length / 6, 1);
            assert.deepEqual(result, [0, 1, 2, 1, 2, 3]);
        });

        it('should add indices with 2', () => {
            const result = Mapper.calcIndices(2);
            const excpectedResult = [
                0, 1, 3,
                1, 3, 4,

                1, 2, 4,
                2, 4, 5,

                3, 4, 6,
                4, 6, 7,

                4, 5, 7,
                5, 7, 8
            ];

            assert.equal(result.length / 6, 4);
            assert.deepEqual(result, excpectedResult);
        });
    });
});