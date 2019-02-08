import { Mapper, Indices } from './Mapper';

import { expect } from 'chai';
import 'mocha';


describe('Indices', () => {
    describe('calcIndices()', () => {
        it('should indice with 2', () => {
            const expected = [
                0, 2, 1, 
                1, 2, 3
            ];
            
            const actual = Indices.calcIndices(2);
            expect(expected).to.be.deep.equal(actual);
        });

        it('should indice with 3', () => {
            const expected =  [
                0, 3, 1, 
                1, 3, 4, 
                1, 4, 2, 
                2, 4, 5, 
                3, 6, 4, 
                4, 6, 7,
                4, 7, 5, 
                5, 7, 8
            ];
            
            const actual = Indices.calcIndices(3);
            expect(expected).to.be.deep.equal(actual);
        });
    });


    describe('vertices()', () => {
        it('should generate uv', () => {
            const result = Mapper.uv(2);
            const expected = [
                {x: 0, y: 0, z: 0},
                {x: 0, y: 1, z: 0},
                {x: 1, y: 0, z: 0},
                {x: 1, y: 1, z: 0}
            ];
            expect(expected).to.be.deep.equal(result);
        });

        it('should generate vertices 4', () => {
            const result = Mapper.vertices(4, 2);
            const expected = [
                { x: 0, y: 0, z: 0 },
    ​            { x: 0, y: 0.6666666666666666, z: 0 },
                { x: 0, y: 1.3333333333333333, z: 0 },
                { x: 0, y: 2, z: 0 },
                { x: 0.6666666666666666, y: 0, z: 0 },
                { x: 0.6666666666666666, y: 0.6666666666666666, z: 0 },
                { x: 0.6666666666666666, y: 1.3333333333333333, z: 0 },
                { x: 0.6666666666666666, y: 2, z: 0 },
                { x: 1.3333333333333333, y: 0, z: 0 },
                { x: 1.3333333333333333, y: 0.6666666666666666, z: 0 },
                { x: 1.3333333333333333, y: 1.3333333333333333, z: 0 },
                { x: 1.3333333333333333, y: 2, z: 0 },
                { x: 2, y: 0, z: 0 },
                { x: 2, y: 0.6666666666666666, z: 0 },
                { x: 2, y: 1.3333333333333333, z: 0 },
                {​ x: 2, y: 2, z: 0}
            ]
            expect(expected).to.be.deep.equal(result);

        });


    });

});