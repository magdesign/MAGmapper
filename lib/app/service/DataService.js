"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RenderTypes;
(function (RenderTypes) {
    RenderTypes[RenderTypes["Edges"] = 0] = "Edges";
    RenderTypes[RenderTypes["Uv"] = 1] = "Uv";
    RenderTypes[RenderTypes["None"] = 2] = "None";
})(RenderTypes = exports.RenderTypes || (exports.RenderTypes = {}));
/** Singleton
 *
 */
class DataService {
    constructor() {
        // will be set to false everytime the position getter is called
        this._update = false;
    }
    get update() {
        return this._update;
    }
    get positions() {
        this._update = false;
        return this._positions;
    }
    set positions(positions) {
        this._update = true;
        this._positions = positions;
    }
    static get Service() {
        return this._service || (this._service = new this());
    }
}
exports.DataService = DataService;
