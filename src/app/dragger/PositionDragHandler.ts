import {PerspectiveCamera, Scene, WebGLRenderer} from "three";
import DragControls from "three-dragcontrols";
import {Config} from "../../config";
import {LineBuilder} from "../material/LineBuilder";
import {SpriteBuilder} from "../material/SpriteBuilder";
import {VideoSceneHelper} from "../material/VideoSceneHelper";
import {IDimension} from "../math/DimensionTransformer";
import {Mapper} from "../math/Mapper";
import {DragHandler} from "./DragHandler";

export class PositionDragHandler extends DragHandler {

    constructor(scene: Scene, renderer: WebGLRenderer, camera: PerspectiveCamera, id: string, positions: IDimension[]) {
        super(scene, renderer, camera, id, positions);

        new DragControls(super.sprites, camera, renderer.domElement)
            .addEventListener("drag", () => {
                this.loadPositions(id, scene, renderer, camera);
            });
    }

    private loadPositions(id: string, scene: any, renderer: WebGLRenderer, camera: PerspectiveCamera) {
        const spriteEdges: IDimension[] = SpriteBuilder.loadSpriteEdges(scene, id);

        LineBuilder.reorderLines(scene, id, spriteEdges);

        const vertices = Mapper.map(Config.Vertices.size, spriteEdges[0], spriteEdges[1], spriteEdges[2], spriteEdges[3]);
        VideoSceneHelper.changeVertices(vertices, scene, id);

        renderer.render(scene, camera);
    }
}
