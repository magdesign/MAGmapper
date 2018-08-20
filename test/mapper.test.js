import Assert from 'assert';
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
            const expectedReuslt = [
                0, 2, 1,
                1, 2, 3
            ];

            Assert.deepEqual(result.length, expectedReuslt.length);
            Assert.deepEqual(result, expectedReuslt);
        });

        it('should calc Indices with 2', () => {
            const result = Mapper.calcCube([], 0, 3);
            const expectedReuslt = [
                0, 3, 1,
                1, 3, 4
            ];

            Assert.deepEqual(result.length, expectedReuslt.length);
            Assert.deepEqual(result, expectedReuslt);
        });

        it('should calc Indices with 2 start 1', () => {
            const result = Mapper.calcCube([], 1, 3);
            const expectedReuslt = [
                1, 4, 2,
                2, 4, 5
            ];

            Assert.deepEqual(result.length, expectedReuslt.length);
            Assert.deepEqual(result, expectedReuslt);
        });

        it('should calc Indices with 4 start 1', () => {
            const result = Mapper.calcCube([], 1, 4);
            const expectedReuslt = [
                1, 5, 2,
                2, 5, 6
            ];

            Assert.deepEqual(result.length, expectedReuslt.length);
            Assert.deepEqual(result, expectedReuslt);
        });

        it('should test end of map', () => {
            const result = Mapper.calcCube([], 2, 3);

            const expectedReuslt = [];
            Assert.deepEqual(result, expectedReuslt);
        });
    });


    describe('test vertices', () => {
        const SIZE = 2;

        it('should generate vertices ' + SIZE, () => {
            const result = Mapper.vertices(SIZE, 1);
            const expected = [
                {x: 0, y: 0, z: 0},
                {x: 0, y: 1, z: 0},
                {x: 1, y: 0, z: 0},
                {x: 1, y: 1, z: 0}
            ];

            Assert.deepEqual(expected, result);
        });

        it('should generate uv ' + SIZE, () => {
            const expected = [
                {x: 0, y: 0, z: 0},
                {x: 0, y: 1, z: 0},
                {x: 1, y: 0, z: 0},
                {x: 1, y: 1, z: 0}
            ];
            const actual = Mapper.uv(SIZE);
            Assert.deepEqual(expected, actual);
        });

        it('should generate indices ' + SIZE, () => {
            const expected = [
                0, 2, 1,
                1, 2, 3
            ];
            const actual = Mapper.calcIndices(2);
            Assert.deepEqual(expected, actual);
        });
    });

    describe('test edges', () => {

        it('should generate edges ', () => {

            const vert = Mapper.vertices(3, 3);
            const result = Mapper.edges(vert);

            const expected = [
                {x: 0, y: 0, z: 0},
                {x: 0, y: 3, z: 0},
                {x: 3, y: 0, z: 0},
                {x: 3, y: 3, z: 0}
            ];
            Assert.deepEqual(expected, result);

        });
    })
});