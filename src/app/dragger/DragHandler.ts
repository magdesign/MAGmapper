import {Line, PerspectiveCamera, Scene, Sprite, WebGLRenderer,} from "three";

import {Config} from "../../config";
import {LineBuilder} from "../material/LineBuilder";
import {SpriteBuilder} from "../material/SpriteBuilder";
import {IDimension} from "../math/DimensionTransformer";
import {Edges} from "../math/Edges";

export interface IDragHandler {
    edges: IDimension[];
    line?: Line;
    sprites: Sprite[];
}

export class DragHandler {

    public static create( positions: IDimension[]): IDragHandler {
        const edges = Edges.getEdges(positions);
        const sprites = SpriteBuilder.generateDragHanldes(edges, Config.DragHandler.source, Config.DragHandler.scale)

        return {
            edges,
            line: LineBuilder.addLines(edges),
            sprites,
        };
    }

    public static updateByVecotor(dragHandle: IDragHandler, vector: IDimension): void {
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
    }

    public static visible(dragHandle: IDragHandler, toggle: boolean): void {
        SpriteBuilder.disable(dragHandle.sprites, toggle);
        LineBuilder.disable(dragHandle.line, toggle);
    }
}
