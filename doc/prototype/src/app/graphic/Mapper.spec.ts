import { Mapper, Indices, Edges } from './Mapper';

import { expect } from 'chai';
import 'mocha';


describe('Edges', () => {
    describe('getEdges()', () => {
        it('should filter edges', () => {

            const vert = Mapper.vertices(3, 3);
            const result = Edges.getEdges(vert);

            const expected = [
                {x: 0, y: 0, z: 0},
                {x: 0, y: 3, z: 0},
                {x: 3, y: 0, z: 0},
                {x: 3, y: 3, z: 0}
            ];
            expect(expected).to.be.deep.equal(result);
        });

        it('should filter edges with more values', () => {
            const vert = Mapper.vertices(5, 3);
            const result = Edges.getEdges(vert);

            const expected = [
                {x: 0, y: 0, z: 0},
                {x: 0, y: 3, z: 0},
                {x: 3, y: 0, z: 0},
                {x: 3, y: 3, z: 0}
            ];
            expect(expected).to.be.deep.equal(result);
        });
    });
});

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
});


describe('Mapper', () => {


    describe('uv()', () => {
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
    });


    describe('vertices()', () => {

        it('should generate vertices 4', () => {
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
            const result = Mapper.vertices(4, 2);
            expect(expected).to.be.deep.equal(result);
        });
    });

    describe('map()', () => {
        it('should shift vertices one to bottom left', () => {
            const expected = [ 
                { x: 0, y: 0, z: 0 },
                { x: 0, y: 1, z: 0 },
                { x: 0, y: 2, z: 0 },
                { x: 0, y: 3, z: 0 },
                { x: 1, y: 0, z: 0 },
                { x: 1.1111111111111112, y: 1.1111111111111112, z: 0 },
                { x: 1.222222222222222, y: 2.2222222222222223, z: 0 },
                { x: 1.3333333333333333, y: 3.3333333333333335, z: 0 },
                { x: 2, y: 0, z: 0 },
                { x: 2.2222222222222223, y: 1.222222222222222, z: 0 },
                { x: 2.444444444444444, y: 2.444444444444444, z: 0 },
                { x: 2.6666666666666665, y: 3.6666666666666665, z: 0 },
                { x: 3, y: 0, z: 0 },
                { x: 3.3333333333333335, y: 1.3333333333333333, z: 0 },
                { x: 3.6666666666666665, y: 2.6666666666666665, z: 0 },
                { x: 4, y: 4, z: 0 } 
            ]
            const points =[
                {x: 0, y: 0, z: 0},
                {x: 0, y: 3, z: 0},
                {x: 3, y: 0, z: 0},
                {x: 4, y: 4, z: 0}
            ];

            const result = Mapper.map(4,points[0],points[1],points[2],points[3]);
            expect(expected).to.be.deep.equal(result);
        });
    });
});