import { Vector3 } from 'three';

export interface Dimension {
    x: number;
    y: number;
    z: number;
}

export class DimensionTransformer{
    public static fromVector3D(value: Vector3): Dimension{
        return {
            x: value.x,
            y: value.y,
            z: value.z,
        } as Dimension;
    }

    public static vectorizeFloatArray(vertices: Float32Array, vector: Dimension): Float32Array{
        const values = Array.from(vertices);

        for (let index = 0; index < values.length; index += 3) {
            values[index] = values[index] + vector.x;
            values[index + 1] = values[index + 1] + vector.y;
        }
        return new Float32Array(values);
    }

    public static fromFloatArrayToDimension(vertices: Float32Array): Dimension[]{
        const values = Array.from(vertices);
        const dimensions = [];
        for (let index = 0; index < values.length; index += 3) {
            dimensions.push({x: values[index], y: values[index + 1], z:  values[index + 2]});
        }
        return dimensions;
    }

    public static toFloatArray(vertices: Dimension[]): Float32Array{
        return new Float32Array(
            vertices
                .map((cube: Dimension): number[] => [
                    cube.x,
                    cube.y,
                    cube.z,
                ])
                .reduce((p, c) => p.concat(c)));
    }
}

export class Edges {
    public static isEdge(length: number, index: number): boolean {
        return index === 0 || 
               index === length - Math.sqrt(length) || 
               index === Math.sqrt(length) - 1 ||
               index === length - 1;
    }
     
    public static getEdges(vertices: Dimension[]): Dimension[] {
        return vertices.filter((_, i): boolean => this.isEdge(vertices.length, i));
    }
}

export class Indices {
    public static calcIndices(items: number): number[] {
        items--;
        let indices = [];

        const size = Math.pow(items, 2) + items - 1; 
    
        for (let i = 0; i < size; i++) {
            indices = this.calcCube(indices, i, items + 1);
        }
        return indices;
    }
    
    private static calcCube(values: number[], start: number, width: number): number[] {
        if (start !== width - 1) {
            values.push(
                start,
                start + width,
                start + 1,
                start + 1,
                start + width,
                start + width + 1,
            );
        }
        return values;
    }
}

export class Mapper {


    public static uv(size: number): Dimension[]{
        return this.map(
            size,
            {x:0, y:0, z:0},
            {x:0, y:1, z:0},
            {x:1, y:0, z:0},
            {x:1, y:1, z:0},
        ) 
    }



    public static verticesWithStartPoint(size: number, length: number, startPoint: Dimension): Dimension[]{
        return this.map(
            size,
            {x: startPoint.x, y: startPoint.y, z: 0},
            {x: startPoint.x, y: startPoint.y + length, z: 0},
            {x: startPoint.x + length , y: startPoint.y, z: 0},
            {x: startPoint.x + length, y: startPoint.y + length, z: 0},
        ) 
    }

    public static vertices(size: number, length: number): Dimension[]{
        return this.map(
            size,
            {x: 0, y: 0, z: 0},
            {x: 0, y: length, z: 0},
            {x: length , y: 0, z: 0},
            {x: length, y: length, z: 0},
        ) 
    }

    public static addVector(point: Dimension, vector: Dimension): Dimension{
        return {
            x: point.x + vector.x,
            y: point.y + vector.y,
            z: point.z + vector.z,
        }
    }

    public static map(size: number, bottomLeft: Dimension, topLeft: Dimension, bottomRight: Dimension, topRight: Dimension): Dimension[] {
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

        const result: Dimension[] = [];
        for (let i = 0; i < resultX.length; i++) {
            result.push({
                x: resultX[i], 
                y: resultY[i], 
                z: 0
            })
        }
        return result
    }
    
    private static getDeltaSide(size: number, start: number, end: number): number[] {
        let result: number[] = [];
        const part: number = end - start;
    
        for (let i = 0; i < size; i++) {
            result.push(part * i / (size - 1) + start);
        }

        return result;
    }
    
    private static parse(size: number, parsed: number[][]) {
        const result = [];
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                result.push(parsed[j][i])
            }
        }
        return result;
    }
}


interface UvEdgeValues{
    x: UvMappingCalculation,
    y: UvMappingCalculation
}

interface UvMappingCalculation{
    startPos: number;
    endPos: number;
    uvPos: number;
    fn: (x: number) => number;
}

export class UvMapper {
    public static reorderUvMapping(uvEdges: Dimension[], videoEdges: Dimension[]): Dimension[]{
        const fnEdge = (val:number): number => - (val - 1);
        const fnNoop = (val: number): number => val;

        const calcUvEdgePoint = 
            (start: number, end: number, uv: number, fn:(x: number) => number) =>
                fn(((end - start) + (start - uv)) /  (end - start));

        return [
            {
                x: {startPos: videoEdges[0].x, endPos: videoEdges[2].x, uvPos: uvEdges[0].x, fn: fnEdge },
                y: {startPos: videoEdges[0].y, endPos: videoEdges[1].y, uvPos: uvEdges[0].y, fn: fnEdge },
            },
            {
                x: {startPos: videoEdges[1].x, endPos: videoEdges[3].x, uvPos: uvEdges[1].x, fn: fnEdge },
                y: {startPos: videoEdges[1].y, endPos: videoEdges[0].y, uvPos: uvEdges[1].y, fn: fnNoop },
            },
            {
                x: {startPos: videoEdges[2].x, endPos: videoEdges[0].x, uvPos: uvEdges[2].x, fn: fnNoop },
                y: {startPos: videoEdges[2].y, endPos: videoEdges[3].y, uvPos: uvEdges[2].y, fn: fnEdge },
            },
            {
                x: {startPos: videoEdges[3].x, endPos: videoEdges[1].x, uvPos: uvEdges[3].x, fn: fnNoop },
                y: {startPos: videoEdges[3].y, endPos: videoEdges[2].y, uvPos: uvEdges[3].y, fn: fnNoop },
            }
        ].map((val: UvEdgeValues) => <Dimension>{
            x: calcUvEdgePoint(val.x.startPos, val.x.endPos, val.x.uvPos, val.x.fn),
            y: calcUvEdgePoint(val.y.startPos, val.y.endPos, val.y.uvPos, val.y.fn),
        });
    }
}