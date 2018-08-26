import Assert from 'assert';
import {Shift} from "../src/shift"
import {Mapper} from "../src/mapper";


describe('Shift', () => {
    describe('test cube index', () => {
        it('should shift vertices one to top => 1*1', () => {
            const vertices = Mapper.vertices(4, 3);

            const result = Shift.topRigth(vertices, 4, 4);

            const exp = [
                {x: 0, y: 0, z: 0},
                {x: 0, y: 1, z: 0},
                {x: 0, y: 2, z: 0},
                {x: 0, y: 3, z: 0},
                {x: 1, y: 0, z: 0},
                {x: 1.1111111111111112, y: 1.1111111111111112, z: 0},
                {x: 1.222222222222222, y: 2.2222222222222223, z: 0},
                {x: 1.3333333333333333, y: 3.3333333333333335, z: 0},
                {x: 2, y: 0, z: 0},
                {x: 2.2222222222222223, y: 1.222222222222222, z: 0},
                {x: 2.444444444444444, y: 2.444444444444444, z: 0},
                {x: 2.6666666666666665, y: 3.666666666666666, z: 0},
                {x: 3, y: 0, z: 0},
                {x: 3.3333333333333335, y: 1.3333333333333333, z: 0},
                {x: 3.666666666666666, y: 2.6666666666666665, z: 0},
                {x: 4, y: 4, z: 0}
            ];

            Assert.deepEqual(result, exp);
        });

        it('should shift vertices one to top => 2*1', () => {
            const vertices = Mapper.vertices(4, 3);

            const result = Shift.topRigth(vertices, 3, 4);
            const result2 = Shift.topLeft(result, -1, 4);
            console.log(result2);


            const exp = [
                { x: 0, y: 0, z: 0 },
                { x: -0.3333333333333333, y: 1.3333333333333333, z: 0 },
                { x: -0.6666666666666666, y: 2.6666666666666665, z: 0 },
                { x: -1, y: 4, z: 0 },
                { x: 1, y: 0, z: 0 },
                { x: 0.7777777777777779, y: 1.3333333333333333, z: 0 },
                { x: 0.5555555555555555, y: 2.6666666666666665, z: 0 },
                { x: 0.33333333333333326, y: 4, z: 0 },
                { x: 2, y: 0, z: 0 },
                { x: 1.888888888888889, y: 1.3333333333333335, z: 0 },
                { x: 1.7777777777777777, y: 2.666666666666667, z: 0 },
                { x: 1.6666666666666665, y: 4, z: 0 },
                { x: 3, y: 0, z: 0 },
                { x: 3, y: 1.3333333333333333, z: 0 },
                { x: 2.9999999999999996, y: 2.6666666666666665, z: 0 },
                { x: 3, y: 4, z: 0 }
            ];
            Assert.deepEqual(result2, exp);
        });

        it('should shift vertices one to bottom left', () => {
            const vertices = Mapper.vertices(4, 3);

            const points =
                [
                    {x: 0, y: 0, z: 0},
                    {x: 0, y: 3, z: 0},
                    {x: 3, y: 0, z: 0},
                    {x: 4, y: 5, z: 0}
                ];


            const result2 = Shift.shift(4,points[0],points[1],points[2],points[3]);
            Assert.deepEqual(result2, "");
        });
    });
});