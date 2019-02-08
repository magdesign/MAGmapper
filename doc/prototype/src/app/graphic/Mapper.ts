export interface Dimension {
    x: number;
    y: number;
    z: number;
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
    
    
    public static transform(vertices: Dimension[]): Float32Array{
        return new Float32Array(
            vertices
                .map((cube: Dimension): number[] => [
                    cube.x, 
                    cube.y,
                    cube.z
                ])
                .reduce((p, c) => p.concat(c)));
    }

    public static uv(size: number): Dimension[]{
        return this.map(
            size,
            {x:0,y:0,z:0},
            {x:0,y:1,z:0},
            {x:1,y:0,z:0},
            {x:1,y:1,z:0},
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
