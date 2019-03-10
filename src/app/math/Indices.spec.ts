import {expect} from "chai";
import "mocha";
import {Indices} from "./Indices";

describe("Indices", () => {
    describe("calcIndices()", () => {
        it("should indice with 2", () => {
            const expected = [
                0, 2, 1,
                1, 2, 3,
            ];

            const actual = Indices.calcIndices(2);
            expect(expected).to.be.deep.equal(actual);
        });

        it("should indice with 3", () => {
            const expected = [
                0, 3, 1,
                1, 3, 4,
                1, 4, 2,
                2, 4, 5,
                3, 6, 4,
                4, 6, 7,
                4, 7, 5,
                5, 7, 8,
            ];

            const actual = Indices.calcIndices(3);
            expect(expected).to.be.deep.equal(actual);
        });
    });
});
