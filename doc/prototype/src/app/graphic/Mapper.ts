export interface Dimension {
    x: number;
    y: number;
    z: number;
}

const Dimension =
    (x: number, y: number, z: number): Dimension => <Dimension>{x, y, z};

export const transformDimensionToFloatArray =
    (vertices: Dimension[]): Float32Array =>
        new Float32Array(vertices
            .map((cube: Dimension): number[] => [cube.x, cube.y, cube.z])
            .reduce((p: number[], c: number[]): number[] => p.concat(c)));


export class Edge {
    /**
     * checks if the given index is an edge or not
     * @param index
     * @param length
     */
    private static validateEdge =
        (index: number, length: number): boolean =>
            index === 0 ||
            index === Math.sqrt(length) - 1 ||
            index === length - Math.sqrt(length) ||
            index === length - 1;


    public static isEdge =
        (vertices: number[]): number[] =>
            vertices
                .filter((_, i: number): boolean =>
                    Edge.validateEdge(i, vertices.length));
}

export class Mapper {

}
