import {IDimension} from "./DimensionTransformer";

export interface IEdges {
    topLeft: IDimension;
    bottomRight: IDimension;
    topRight: IDimension;
    bottomLeft: IDimension;
}

export class Edges {
    public static isEdge(length: number, index: number): boolean {
        return index === 0 ||
            index === length - Math.sqrt(length) ||
            index === Math.sqrt(length) - 1 ||
            index === length - 1;
    }

    /**
     * @JKU dirty hack for cutter save function
     * needs to be rewritten in a clean way.
     * @param edges
     */
    public static reorderLineEdgesForSprites(edges: IDimension[]){
        return [
            edges[0],
            edges[1],
            edges[3],
            edges[2],
        ];
    }

    public static getEdges(vertices: IDimension[]): IDimension[] {
        return vertices.filter((_, i): boolean => this.isEdge(vertices.length, i));
    }
}
