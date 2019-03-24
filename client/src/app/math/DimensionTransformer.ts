import {Vector3} from "three";

export interface IDimension {
    x: number;
    y: number;
    z: number;
}

export class DimensionTransformer {

    public static fromVector3D(value: Vector3): IDimension {
        return {
            x: value.x,
            y: value.y,
            z: value.z,
        } as IDimension;
    }

    public static vectorizeFloatArray(vertices: Float32Array, vector: IDimension): Float32Array {
        const values = Array.from(vertices);

        for (let index = 0; index < values.length; index += 3) {
            values[index] = values[index] + vector.x;
            values[index + 1] = values[index + 1] + vector.y;
        }
        return new Float32Array(values);
    }

    public static fromFloatArrayToDimension(vertices: Float32Array): IDimension[] {
        const values = Array.from(vertices);
        const dimensions = [];
        for (let index = 0; index < values.length; index += 3) {
            dimensions.push({x: values[index], y: values[index + 1], z: values[index + 2]});
        }
        return dimensions;
    }

    public static toFloatArray(vertices: IDimension[]): Float32Array {
        return new Float32Array(
            vertices
                .map((cube: IDimension): number[] => [
                    cube.x,
                    cube.y,
                    cube.z,
                ])
                .reduce((p, c) => p.concat(c)));
    }
}
