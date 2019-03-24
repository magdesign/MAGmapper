import {IDimension} from "./DimensionTransformer";

interface IUvEdgeValues {
    x: IUvMappingCalculation;
    y: IUvMappingCalculation;
}

interface IUvMappingCalculation {
    startPos: number;
    endPos: number;
    uvPos: number;
    fn: (x: number) => number;
}

export class UvMapper {
    public static reorderUvMapping(uvEdges: IDimension[], videoEdges: IDimension[]): IDimension[] {
        const fnEdge = (val: number): number => -(val - 1);
        const fnNoop = (val: number): number => val;

        const calcUvEdgePoint =
            (start: number, end: number, uv: number, fn: (x: number) => number) =>
                fn(((end - start) + (start - uv)) / (end - start));

        return [
            {
                x: {startPos: videoEdges[0].x, endPos: videoEdges[2].x, uvPos: uvEdges[0].x, fn: fnEdge},
                y: {startPos: videoEdges[0].y, endPos: videoEdges[1].y, uvPos: uvEdges[0].y, fn: fnEdge},
            },
            {
                x: {startPos: videoEdges[1].x, endPos: videoEdges[3].x, uvPos: uvEdges[1].x, fn: fnEdge},
                y: {startPos: videoEdges[1].y, endPos: videoEdges[0].y, uvPos: uvEdges[1].y, fn: fnNoop},
            },
            {
                x: {startPos: videoEdges[2].x, endPos: videoEdges[0].x, uvPos: uvEdges[2].x, fn: fnNoop},
                y: {startPos: videoEdges[2].y, endPos: videoEdges[3].y, uvPos: uvEdges[2].y, fn: fnEdge},
            },
            {
                x: {startPos: videoEdges[3].x, endPos: videoEdges[1].x, uvPos: uvEdges[3].x, fn: fnNoop},
                y: {startPos: videoEdges[3].y, endPos: videoEdges[2].y, uvPos: uvEdges[3].y, fn: fnNoop},
            },
        ].map((val: IUvEdgeValues): IDimension => {
            return {
                x: calcUvEdgePoint(val.x.startPos, val.x.endPos, val.x.uvPos, val.x.fn),
                y: calcUvEdgePoint(val.y.startPos, val.y.endPos, val.y.uvPos, val.y.fn),
                z: 0,
            };
        });
    }
}
