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
    static fromFloatArrayToDimension(vertices) {
        const values = Array.from(vertices);
        let dimensions = [];
        for (let index = 0; index < values.length; index += 3) {
            dimensions.push({ x: values[index], y: values[index + 1], z: values[index + 2] });
        }
        return dimensions;
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
class UvMapper {
    static reorderUvMapping(uvEdges, videoEdges) {
        const fnEdge = (val) => -(val - 1);
        const fnNoop = (val) => val;
        const calcUvEdgePoint = (start, end, uv, fn) => fn(((end - start) + (end - uv)) / (end - start));
        return [
            {
                x: { startPos: videoEdges[0].x, endPos: videoEdges[2].x, uvPos: uvEdges[0].x, fn: fnEdge },
                y: { startPos: videoEdges[0].y, endPos: videoEdges[1].y, uvPos: uvEdges[0].x, fn: fnEdge },
            },
            {
                x: { startPos: videoEdges[1].x, endPos: videoEdges[3].x, uvPos: uvEdges[1].x, fn: fnEdge },
                y: { startPos: videoEdges[1].y, endPos: videoEdges[0].y, uvPos: uvEdges[1].x, fn: fnNoop },
            },
            {
                x: { startPos: videoEdges[2].x, endPos: videoEdges[0].x, uvPos: uvEdges[2].x, fn: fnNoop },
                y: { startPos: videoEdges[2].y, endPos: videoEdges[3].y, uvPos: uvEdges[2].x, fn: fnEdge },
            },
            {
                x: { startPos: videoEdges[3].x, endPos: videoEdges[1].x, uvPos: uvEdges[3].x, fn: fnNoop },
                y: { startPos: videoEdges[3].y, endPos: videoEdges[2].y, uvPos: uvEdges[3].x, fn: fnNoop },
            }
        ].map((val) => ({
            x: calcUvEdgePoint(val.x.startPos, val.x.endPos, val.x.uvPos, val.x.fn),
            y: calcUvEdgePoint(val.y.startPos, val.y.endPos, val.y.uvPos, val.y.fn),
        }));
    }
}
exports.UvMapper = UvMapper;
