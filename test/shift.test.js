import Assert from 'assert';
import {Shift} from "../src/shift"
import {Mapper} from "../src/mapper";


describe('Shift', () => {
    describe('test cube index', () => {
        it('should shift vertices one to top => 1*1', () => {
            const vertices = Mapper.calcVertices(1);
            const result = Shift.top(vertices, 0, 0, 3, 1);

            const exp = [
                0, 0, 0,
                0, 1, 0,
                1, 0, 0,
                1, 1.3333333730697632, 0
            ];

            Assert.deepEqual(result, exp);
        });

        it('should shift vertices one to top => 3*3', () => {
            const vertices = Mapper.calcVertices(3);
            const result = Shift.top(vertices, 0, 0, 3, 1);

            const exp = [
                0,0,0,
                0,1,0,
                0,2,0,
                0,3,0,
                1,0,0,
                1,1.1111111640930176,0,
                1,2.222222328186035,0,
                1,3.3333332538604736,0,
                2,0,0,
                2,1.2222222089767456,0,
                2,2.444444417953491,0,
                2,3.6666667461395264,0,
                3,0,0,
                3,1.3333333730697632,0,
                3,2.6666667461395264,0,
                3,4,0
            ];
            Assert.deepEqual(result, exp);
        });
    });

});