import {LineBuilder} from "../../material/LineBuilder";
import {SpriteBuilder} from "../../material/SpriteBuilder";
import {IVideoMaterial, VideoMaterialBuilder, VideoType} from "../../material/VideoMaterialBuilder";
import {VideoSceneHelper} from "../../material/VideoSceneHelper";
import {DimensionTransformer, IDimension} from "../../math/DimensionTransformer";
import {UvMapper} from "../../math/UvMapper";
import {DragHandler, DragHandlerTypes, IDragHandler} from "../../material/DragHandler";
import {Scene, Sprite} from "three";
import {Edges} from "../../math/Edges";

export class VideoCutter {


    public static init(videoSource: HTMLVideoElement, src: IVideoMaterial, targets: IVideoMaterial[]): IVideoMaterial {

        const videoMaterial: IVideoMaterial = VideoMaterialBuilder.init(videoSource, src);

        videoMaterial.type = VideoType.Cutter;
        targets.forEach((target, i) => {
            // draghandler[i] => grund dafür ist, dass paralel 2 listen abgearbeitet werden
            const result: IDragHandler = this.initCutterDragHandle(videoMaterial, src.dragHandler[i], target);
            videoMaterial.dragHandler.push(result);
        });

        return videoMaterial;
    }

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


    private static initCutterDragHandle(videoMaterial: IVideoMaterial, dragger: IDragHandler, target: IVideoMaterial): IDragHandler {
        const line: any = dragger.line;

        const spriteEdges = Edges.reorderLineEdgesForSprites(DimensionTransformer.fromFloatArrayToDimension(line.geometries[0].data.vertices));

        const edges = Edges.getEdges(videoMaterial.positions);

        return DragHandler.init(spriteEdges, DragHandlerTypes.Cutter, (event) => {
            const activeDragHandler = videoMaterial.dragHandler.filter((dh: IDragHandler) => dh.id === event.object.name)[0];

            // this line makes trouble because ref is not on the video edges

            const activeEdges: IDimension[] = SpriteBuilder.loadSpriteEdges(activeDragHandler.sprites);
            LineBuilder.reorderLines(activeDragHandler.line, activeEdges);

            const uv: IDimension[] = UvMapper.reorderUvMapping(activeEdges, edges);
            VideoSceneHelper.changeUv(uv, target.mesh);

        });
    }


    private static createCutterDragHandle(videoMaterial: IVideoMaterial, target: IVideoMaterial): IDragHandler {
        const cutter = DragHandler.create(videoMaterial.positions, DragHandlerTypes.Cutter, (event) => {
            const activeDragHandler = videoMaterial.dragHandler.filter((dh: IDragHandler) => dh.id === event.object.name)[0];
            const spriteEdges: IDimension[] = SpriteBuilder.loadSpriteEdges(activeDragHandler.sprites);

            LineBuilder.reorderLines(activeDragHandler.line, spriteEdges);

            const uv: IDimension[] = UvMapper.reorderUvMapping(spriteEdges, activeDragHandler.edges);

            console.log(uv);
            VideoSceneHelper.changeUv(uv, target.mesh);
        });

        cutter.targetId = target.id;
        return cutter;
    }

    public static removeCutterItem(videoMaterial: IVideoMaterial[], target: IVideoMaterial, scene: Scene) {
        videoMaterial
            .filter((video: IVideoMaterial) => video.type === VideoType.Cutter)
            .map((video: IVideoMaterial) => {
                video.dragHandler
                    .filter((dh: IDragHandler) => target.id === dh.targetId)
                    .map((dh: IDragHandler) => {

                        scene.remove(dh.line);
                        dh.sprites.forEach((sprite: Sprite) => {
                            scene.remove(sprite);
                        });
                        // removes draghandler from list
                        video.dragHandler = video.dragHandler.filter((drag) => drag.id !== dh.id);
                    });
            });
    }
}
