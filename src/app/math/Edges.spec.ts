
import 'mocha';

import { Mapper } from './Mapper';
import { expect } from 'chai';
import { Edges } from './Edges';


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