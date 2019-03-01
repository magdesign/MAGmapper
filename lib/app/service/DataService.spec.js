"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataService_1 = require("./DataService");
const chai_1 = require("chai");
require("mocha");
describe('DataService', () => {
    describe('data()', () => {
        it('should set data', () => {
            DataService_1.DataService.Service.positions = [1, 2, 3];
            chai_1.expect([1, 2, 3]).to.be.deep.equal(DataService_1.DataService.Service.positions);
        });
    });
});
