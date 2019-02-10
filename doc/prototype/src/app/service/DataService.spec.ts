import { DataService } from "./DataService";
import { expect } from 'chai';
import 'mocha';


describe('DataService', () => {
    describe('data()', () => {
        it('should set data', () => {
            DataService.Service.positions = [1,2,3];

            expect( [1,2,3]).to.be.deep.equal(DataService.Service.positions);
        });
    });
});