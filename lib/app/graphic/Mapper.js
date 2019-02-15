"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DimensionTransformer {
    static fromVector3D(value) {
        return {
            x: value.x,
            y: value.y,
            z: value.z
        };
    }
    static toFloatArray(vertices) {
        return new Float32Array(vertices
            .map((cube) => [
            cube.x,
            cube.y,
            cube.z
        ])
            .reduce((p, c) => p.concat(c)));
    }
}
exports.DimensionTransformer = DimensionTransformer;
class Edges {
    static isEdge(length, index) {
        return index === 0 ||
            index === length - Math.sqrt(length) ||
            index === Math.sqrt(length) - 1 ||
            index === length - 1;
    }
    static getEdges(vertices) {
        return vertices.filter((_, i) => this.isEdge(vertices.length, i));
    }
}
exports.Edges = Edges;
class Indices {
    static calcIndices(items) {
        items--;
        let indices = [];
        const size = Math.pow(items, 2) + items - 1;
        for (let i = 0; i < size; i++) {
            indices = this.calcCube(indices, i, items + 1);
        }
        return indices;
    }
    static calcCube(values, start, width) {
        if (start !== width - 1) {
            values.push(start, start + width, start + 1, start + 1, start + width, start + width + 1);
        }
        return values;
    }
}
exports.Indices = Indices;
class Mapper {
    static uv(size) {
        return this.map(size, { x: 0, y: 0, z: 0 }, { x: 0, y: 1, z: 0 }, { x: 1, y: 0, z: 0 }, { x: 1, y: 1, z: 0 });
    }
    static vertices(size, length) {
        return this.map(size, { x: 0, y: 0, z: 0 }, { x: 0, y: length, z: 0 }, { x: length, y: 0, z: 0 }, { x: length, y: length, z: 0 });
    }
    static map(size, bottomLeft, topLeft, bottomRight, topRight) {
        const leftX = this.getDeltaSide(size, bottomLeft.x, topLeft.x);
        const rightX = this.getDeltaSide(size, bottomRight.x, topRight.x);
        const bottomY = this.getDeltaSide(size, topLeft.y, topRight.y);
        const topY = this.getDeltaSide(size, bottomLeft.y, bottomRight.y);
        let resultX = [];
        let resultY = [];
        for (let i = 0; i < size; i++) {
            resultX.push(this.getDeltaSide(size, leftX[i], rightX[i]));
            resultY.push(this.getDeltaSide(size, topY[i], bottomY[i]));
        }
        resultY = resultY.reduce((a, b) => a.concat(b));
        resultX = this.parse(size, resultX);
        const result = [];
        for (let i = 0; i < resultX.length; i++) {
            result.push({
                x: resultX[i],
                y: resultY[i],
                z: 0
            });
        }
        return result;
    }
    static getDeltaSide(size, start, end) {
        let result = [];
        const part = end - start;
        for (let i = 0; i < size; i++) {
            result.push(part * i / (size - 1) + start);
        }
        return result;
    }
    static parse(size, parsed) {
        const result = [];
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                result.push(parsed[j][i]);
            }
        }
        return result;
    }
}
exports.Mapper = Mapper;
