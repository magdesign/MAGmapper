import {Line, PerspectiveCamera, Scene, Sprite, WebGLRenderer,} from "three";

import {Config} from "../../config";
import {LineBuilder} from "../material/LineBuilder";
import {SpriteBuilder} from "../material/SpriteBuilder";
import {IVideoMaterial} from "../material/VideoMaterialBuilder";
import {VideoSceneHelper} from "../material/VideoSceneHelper";
import {IDimension} from "../math/DimensionTransformer";
import {Edges} from "../math/Edges";
import uuid = require("uuid");

export enum DragHandlerTypes {
    Mover = "move",
    Mapper = "drag",
    Cutter = "cut",
}

export interface IDragHandler {
    id: string;
    edges: IDimension[];
    type?: DragHandlerTypes;
    line?: Line;
    sprites: Sprite[];
    fn: (event?: any) => void;
}

export class DragHandler {

    public static create(positions: IDimension[], type: DragHandlerTypes, fn: (event: any) => void): IDragHandler {

        const id = uuid();
        const edges = Edges.getEdges(positions);
        const sprites = SpriteBuilder.generateDragHanldes(id, edges, Config.DragHandler.source, Config.DragHandler.scale);

        return {
            edges,
            fn,
            id,
            line: LineBuilder.addLines(id, edges),
            sprites,
            type,
        };
    }

    public static createMover(video: IVideoMaterial, fn: (event) => void): IDragHandler {
        const id = uuid();

        const positions = VideoSceneHelper.getEdgesFromScene(video.mesh);
        const edges = Edges.getEdges(positions);

        const calcDelta =
            (x1: number, x2: number): number =>
                (x2 - x1) / 2 + x1;

        const startPoint = {
            x: calcDelta(edges[0].x, edges[3].x),
            y: calcDelta(edges[0].y, edges[3].y),
            z: 0,
        };

        return {
            edges,
            fn,
            id,
            sprites: [SpriteBuilder.makeSprite(id, startPoint, Config.MoveHandler.source, Config.MoveHandler.scale)],
            type: DragHandlerTypes.Mover,
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
