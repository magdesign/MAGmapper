import {LineBuilder} from "../../material/LineBuilder";
import {SpriteBuilder} from "../../material/SpriteBuilder";
import {IVideoMaterial, VideoMaterialBuilder, VideoType} from "../../material/VideoMaterialBuilder";
import {VideoSceneHelper} from "../../material/VideoSceneHelper";
import {IDimension} from "../../math/DimensionTransformer";
import {UvMapper} from "../../math/UvMapper";
import {DragHandler, DragHandlerTypes, IDragHandler} from "../../dragger/DragHandler";

export class VideoCutter {

    public static create(targets: IVideoMaterial[], video: HTMLVideoElement, startPoint: IDimension): IVideoMaterial {

        const videoMaterial: IVideoMaterial = VideoMaterialBuilder.create(video, startPoint);
        videoMaterial.type = VideoType.Cutter;
        targets.forEach((target) => {
            videoMaterial.dragHandler.push(this.createCutterDragHandle(videoMaterial, target));
        });

        return videoMaterial;
    }


    public static addVideoCutterOutlines(videoMaterial: IVideoMaterial, target: IVideoMaterial): IVideoMaterial {
        videoMaterial.dragHandler.push(this.createCutterDragHandle(videoMaterial, target));
        return videoMaterial;
    }


    private static createCutterDragHandle(videoMaterial: IVideoMaterial, target: IVideoMaterial): IDragHandler {
        return DragHandler.create(videoMaterial.positions, DragHandlerTypes.Cutter, (event) => {

            const activeDragHandler = videoMaterial.dragHandler.filter((dh: IDragHandler) => dh.id === event.object.name)[0];
            const spriteEdges: IDimension[] = SpriteBuilder.loadSpriteEdges(activeDragHandler.sprites);
            LineBuilder.reorderLines(activeDragHandler.line, spriteEdges);

            const uv: IDimension[] = UvMapper.reorderUvMapping(spriteEdges, activeDragHandler.edges);
            VideoSceneHelper.changeUv(uv, target.mesh);
        });
    }
}
