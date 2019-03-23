import {Line, Sprite} from "three";

import {Config} from "../../config";
import {LineBuilder} from "./LineBuilder";
import {SpriteBuilder} from "./SpriteBuilder";
import {IVideoMaterial} from "./VideoMaterialBuilder";
import {VideoSceneHelper} from "./VideoSceneHelper";
import {IDimension} from "../math/DimensionTransformer";
import {Edges} from "../math/Edges";
import uuid = require("uuid");

export enum DragHandlerTypes {
    Mover = "move",
    Delete = "delete",
    Mapper = "mapper",
    Cutter = "cut",
}

export enum DragEventType {
    Click, Drag,
}

export interface IDragHandler {
    id: string;
    edges: IDimension[];
    type?: DragHandlerTypes;
    line?: Line;
    sprites: Sprite[];
    fn: (event?: any) => void;
    dragEventType: DragEventType;
    targetId?: string; // only for cutter
}

export class DragHandler {

    public static create(positions: IDimension[], type: DragHandlerTypes, fn: (event: any) => void): IDragHandler {

        const edges = Edges.getEdges(positions);
        return this.init(edges, type, fn);
    }


    public static init(edges: IDimension[], type: DragHandlerTypes, fn: (event: any) => void): IDragHandler {
        const id = uuid();

        const sprites = SpriteBuilder.generateDragHanldes(id, edges, Config.DragHandler.source, Config.DragHandler.scale);

        return {
            dragEventType: DragEventType.Drag,
            edges,
            fn,
            id,
            line: LineBuilder.addLines(id, edges),
            sprites,
            type,
        };
    }

    public static calcStartPoint(edges: IDimension[]): IDimension {
        const calcDelta =
            (x1: number, x2: number): number =>
                (x2 - x1) / 2 + x1;

        return {
            x: calcDelta(edges[0].x, edges[3].x),
            y: calcDelta(edges[0].y, edges[3].y),
            z: 0,
        };
    }

    public static createMover(video: IVideoMaterial, fn: (event) => void): IDragHandler {
        const id = uuid();

        const positions = VideoSceneHelper.getEdgesFromScene(video.mesh);
        const edges = Edges.getEdges(positions);

        const startPoint = this.calcStartPoint(edges);

        return {
            dragEventType: DragEventType.Drag,
            edges,
            fn,
            id,
            sprites: [
                SpriteBuilder.makeSprite(id, startPoint, Config.MoveHandler.source, Config.MoveHandler.scale),
            ],
            type: DragHandlerTypes.Mover,
        };
    }

    public static createDelete(video: IVideoMaterial, fn: (event) => void): IDragHandler {
        const id = uuid();

        const positions = VideoSceneHelper.getEdgesFromScene(video.mesh);
        const edges = Edges.getEdges(positions);

        const calcDelta =
            (x1: number, x2: number): number =>
                (x2 - x1) / 2 + x1;

        const startPoint = {
            x: calcDelta(edges[0].x, edges[3].x) + 0.4,
            y: calcDelta(edges[0].y, edges[3].y),
            z: 0,
        };

        return {
            dragEventType: DragEventType.Click,
            edges,
            fn,
            id,
            sprites: [
                SpriteBuilder.makeSprite(id, startPoint, Config.DeleteHandler.source, Config.DeleteHandler.scale),
            ],
            type: DragHandlerTypes.Delete,
        };
    }

    public static updateByVecotor(dragHandle: IDragHandler, vector: IDimension): IDragHandler {
        dragHandle.sprites.map((sprite: Sprite): Sprite => {
            sprite.position.setX(sprite.position.x + vector.x);
            sprite.position.setY(sprite.position.y + vector.y);
            return sprite;
        });

        const lineGeometry: any = dragHandle.line.geometry;
        lineGeometry.vertices.map((vert: IDimension): IDimension => {
            vert.x = vert.x + vector.x;
            vert.y = vert.y + vector.y;
            return vert;
        });
        lineGeometry.verticesNeedUpdate = true;
        return dragHandle;
    }

    public static visible(dragHandle: IDragHandler, toggle: boolean): void {
        SpriteBuilder.disable(dragHandle.sprites, toggle);
        LineBuilder.disable(dragHandle.line, toggle);
    }
}
