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

    describe('test indices', () => {
        it('should add indices with 1', () => {
            const result = Mapper.calcIndices(1);
            const excpection = [
                0, 2, 1,
                1, 2, 3
            ];

            Assert.equal(result.length / 6, 1);
            Assert.deepEqual(result, excpection);
        });

        it('should add indices with 2', () => {
            const result = Mapper.calcIndices(2);
            const excpection = [
                0, 3, 1,
                1, 3, 4,

                1, 4, 2,
                2, 4, 5,

                3, 6, 4,
                4, 6, 7,

                4, 7, 5,
                5, 7, 8
            ];

            Assert.equal(result.length / 6, 4);
            Assert.deepEqual(result, excpection);
        });
    });

    describe('test vertices', () => {
        const SIZE = 2;

        it('should generate vertices ' + SIZE, () => {
            Assert.deepEqual(Mapper.transform(Mapper.vertices(SIZE, 1)), [
                0, 0, 0,
                0, 1, 0,
                1, 0, 0,
                1, 1, 0
            ]);
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


    describe('test cartesis', () => {

        it('should generate vertices', () => {
            Assert.deepEqual(Mapper.transform(Mapper.cartesis(3)(i => i)), [
                0, 0, 0,
                0, 1, 0,
                0, 2, 0,
                1, 0, 0,
                1, 1, 0,
                1, 2, 0,
                2, 0, 0,
                2, 1, 0,
                2, 2, 0,
            ]);
        });

        it('should generate functional uv mapping', () => {

            const size = 4;
            const result = Mapper.uv(size);

            Assert.deepEqual(result, [
                {x: 0, y: 0, z: 0},
                {x: 0, y: 0.3333333333333333, z: 0},
                {x: 0, y: 0.6666666666666666, z: 0},
                {x: 0, y: 1, z: 0},
                {x: 0.3333333333333333, y: 0, z: 0},
                {x: 0.3333333333333333, y: 0.3333333333333333, z: 0},
                {x: 0.3333333333333333, y: 0.6666666666666666, z: 0},
                {x: 0.3333333333333333, y: 1, z: 0},
                {x: 0.6666666666666666, y: 0, z: 0},
                {x: 0.6666666666666666, y: 0.3333333333333333, z: 0},
                {x: 0.6666666666666666, y: 0.6666666666666666, z: 0},
                {x: 0.6666666666666666, y: 1, z: 0},
                {x: 1, y: 0, z: 0},
                {x: 1, y: 0.3333333333333333, z: 0},
                {x: 1, y: 0.6666666666666666, z: 0},
                {x: 1, y: 1, z: 0}]);
        });
    });

});