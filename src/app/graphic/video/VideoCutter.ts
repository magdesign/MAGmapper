import {PerspectiveCamera, Scene, Sprite, WebGLRenderer} from "three";
import {DragHandler, IDragHandler} from "../../dragger/DragHandler";
import {LineBuilder} from "../../material/LineBuilder";
import {SpriteBuilder} from "../../material/SpriteBuilder";
import {IVideoMaterial, VideoMaterialBuilder} from "../../material/VideoMaterialBuilder";
import {VideoSceneHelper} from "../../material/VideoSceneHelper";
import {IDimension} from "../../math/DimensionTransformer";
import {UvMapper} from "../../math/UvMapper";
import DragControls from "three-dragcontrols";

export class VideoCutter {

    constructor(id: string, targetId: string, source: string, scene: Scene, startPoint: IDimension, renderer: WebGLRenderer, camera: PerspectiveCamera) {

        const videoMaterial: IVideoMaterial = VideoMaterialBuilder.create(id, source, startPoint);

        scene.add(videoMaterial.mesh);

        const dragHandler: IDragHandler = DragHandler.create(videoMaterial.positions);

        new DragControls(dragHandler.sprites, camera, renderer.domElement)
            .addEventListener("drag", () => {
                this.loadPositions(dragHandler, scene, targetId);
            });

        dragHandler.sprites.forEach((sprite: Sprite) => scene.add(sprite));
        scene.add(dragHandler.line);
    }



    private loadPositions(dragHandler: IDragHandler, scene: any, targetId: string) {
        const spriteEdges: IDimension[] = SpriteBuilder.loadSpriteEdges(dragHandler.sprites);
        LineBuilder.reorderLines(dragHandler.line, spriteEdges);

        const uve: IDimension[] = UvMapper.reorderUvMapping(spriteEdges, dragHandler.edges);
        VideoSceneHelper.changeUv(uve, scene, targetId);
    }

}
