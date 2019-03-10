import {PerspectiveCamera, Scene, WebGLRenderer} from "three";
import DragControls from 'three-dragcontrols';
import {LineBuilder} from "../material/LineBuilder";
import {SpriteBuilder} from "../material/SpriteBuilder";
import {VideoSceneHelper} from "../material/VideoSceneHelper";
import {IDimension} from "../math/DimensionTransformer";
import {UvMapper} from "../math/UvMapper";
import {DragHandler} from "./DragHandler";

export class UvDragHandler extends DragHandler {

    constructor(scene: Scene, renderer: WebGLRenderer, camera: PerspectiveCamera, id: string, positions: IDimension[], targetId: string) {
        super(scene, renderer, camera, id, positions);

        new DragControls(super.sprites, camera, renderer.domElement)
            .addEventListener('drag', () => {
                this.loadPositions(id, scene, renderer, camera, this.edges, targetId);
            });
    }

    private loadPositions(id: string, scene: any, renderer: WebGLRenderer, camera: PerspectiveCamera, edges: IDimension[], targetId: string) {
        const spriteEdges: IDimension[] = SpriteBuilder.loadSpriteEdges(scene, id);
        LineBuilder.reorderLines(scene, id, spriteEdges);

        const uve: IDimension[] = UvMapper.reorderUvMapping(spriteEdges, edges);
        VideoSceneHelper.changeUv(uve, scene, targetId);
        renderer.render(scene, camera);
    }
}
