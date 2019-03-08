import DragControls from "three-dragcontrols";

import { Config } from "../../config";
import { DragHandler } from "./DragHandler";

import { Edges } from "../math/Edges";
import { Sprite } from "three";
import { IDimension, DimensionTransformer } from "../math/DimensionTransformer";
import { PerspectiveCamera } from "three";
import { SpriteBuilder } from "../material/SpriteBuilder";
import { VideoSceneHelper } from "../material/VideoSceneHelper";
import { WebGLRenderer, Scene } from "three";

export class VideoMover {
    private startPoint: IDimension;
    private sprite: Sprite;

    constructor(scene: Scene, renderer: WebGLRenderer, camera: PerspectiveCamera, id: string, dragHandles: DragHandler[]) {

        const positions = VideoSceneHelper.getEdgesFromScene(scene, id);
        const edges = Edges.getEdges(positions);

        const calcDelta =
            (x1: number, x2: number): number =>
                (x2 - x1) / 2 + x1;

        this.startPoint = {
            x: calcDelta(edges[0].x, edges[3].x),
            y: calcDelta(edges[0].y, edges[3].y),
            z: 0,
        };

        this.sprite = SpriteBuilder.makeSprite(this.startPoint, Config.MoveHandler.source, Config.MoveHandler.scale);
        scene.add(this.sprite);

        new DragControls([this.sprite], camera, renderer.domElement)
            .addEventListener("drag", (event) => {
                this.loadPositions(id, scene, event.object.position, renderer, camera, dragHandles);
            });
    }

    public visible(toggle: boolean): void {
        SpriteBuilder.disable([this.sprite], toggle);
    }

    private loadPositions(id: string, scene: any, position: IDimension, renderer: WebGLRenderer, camera: PerspectiveCamera, dragHandles: DragHandler[]) {

        const delta = {
            x: position.x - this.startPoint.x,
            y: position.y - this.startPoint.y,
            z: 0,
        };

        const oldVertices = VideoSceneHelper.filterVideoScene(scene, id)[0].geometry.attributes.position.array;
        const newVertices = DimensionTransformer.vectorizeFloatArray(oldVertices, delta);

        VideoSceneHelper.changeVerticesWithFloatArray(newVertices, scene, id);

        dragHandles.map((dragHandle) => dragHandle.updateByVecotor(delta));

        // sets new position for proper delta (i know it is not a proper solution -.-)
        this.startPoint = {...position};

        renderer.render(scene, camera);
    }
}
