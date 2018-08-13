import Assert from 'assert';
import {Shift} from "../src/shift"
import {Mapper} from "../src/mapper";



describe('Shift', () => {
    describe('test cube index', () => {
        it('should calc Indices with 1', () => {
            const vertices = Mapper.calcVertices(1);

            Shift.top(vertices,1);
        });
    });

});