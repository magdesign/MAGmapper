import {Mesh, PerspectiveCamera, Scene, Sprite, WebGLRenderer} from "three";
import DragControls from "three-dragcontrols";
import {DragHandler, IDragHandler} from "../../dragger/DragHandler";
import {LineBuilder} from "../../material/LineBuilder";
import {SpriteBuilder} from "../../material/SpriteBuilder";
import {IVideoMaterial, VideoMaterialBuilder} from "../../material/VideoMaterialBuilder";
import {VideoSceneHelper} from "../../material/VideoSceneHelper";
import {IDimension} from "../../math/DimensionTransformer";
import {UvMapper} from "../../math/UvMapper";

export class VideoCutter {

    public static create(target: IVideoMaterial, source: string, startPoint: IDimension): IVideoMaterial {

        const videoMaterial: IVideoMaterial = VideoMaterialBuilder.create(source, startPoint);

        videoMaterial.dragHandlerFn = () => {
            const spriteEdges: IDimension[] = SpriteBuilder.loadSpriteEdges(videoMaterial.dragHandler.sprites);
            LineBuilder.reorderLines(videoMaterial.dragHandler.line, spriteEdges);

            const uv: IDimension[] = UvMapper.reorderUvMapping(spriteEdges, videoMaterial.dragHandler.edges);
            VideoSceneHelper.changeUv(uv, target.mesh);
        };

        return videoMaterial;
    }

    private loadPositions(dragHandler: IDragHandler, video: Mesh) {
        const spriteEdges: IDimension[] = SpriteBuilder.loadSpriteEdges(dragHandler.sprites);
        LineBuilder.reorderLines(dragHandler.line, spriteEdges);

        const uv: IDimension[] = UvMapper.reorderUvMapping(spriteEdges, dragHandler.edges);
        VideoSceneHelper.changeUv(uv, video);
    }


}
