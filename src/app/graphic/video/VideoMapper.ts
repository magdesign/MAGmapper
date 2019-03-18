import {Config} from "../../../config";
import {DragHandler, DragHandlerTypes, IDragHandler} from "../../dragger/DragHandler";
import {LineBuilder} from "../../material/LineBuilder";
import {SpriteBuilder} from "../../material/SpriteBuilder";
import {IVideoMaterial, VideoMaterialBuilder} from "../../material/VideoMaterialBuilder";
import {VideoSceneHelper} from "../../material/VideoSceneHelper";
import {DimensionTransformer, IDimension} from "../../math/DimensionTransformer";
import {Mapper} from "../../math/Mapper";
import {Sprite} from "three";
import {EventHandler, EventTypes} from "../../event/EventHandler";

export class VideoMapper {


    public static create(video: HTMLVideoElement, startPoint: IDimension): IVideoMaterial {
        const videoMaterial: IVideoMaterial = VideoMaterialBuilder.create(video, startPoint);


        [
            DragHandler.create(videoMaterial.positions, DragHandlerTypes.Mapper, this.dragVideo(videoMaterial)),
            DragHandler.createMover(videoMaterial, this.moveVideo(videoMaterial)),
            DragHandler.createDelete(videoMaterial, () => EventHandler.throwEvent(EventTypes.RemoveQuad, videoMaterial)),
        ].forEach((dh: IDragHandler) => videoMaterial.dragHandler.push(dh));

        return videoMaterial;
    }

    private static dragVideo(videoMaterial: IVideoMaterial) {
        return () => {
            videoMaterial.dragHandler
                .filter((dh: IDragHandler) => dh.type === DragHandlerTypes.Mapper)
                .map((dh: IDragHandler) => {
                    const spriteEdges: IDimension[] = SpriteBuilder.loadSpriteEdges(dh.sprites);

                    LineBuilder.reorderLines(dh.line, spriteEdges);
                    const vertices = Mapper.map(Config.Vertices.size, spriteEdges[0], spriteEdges[1], spriteEdges[2], spriteEdges[3]);

                    VideoSceneHelper.changeVertices(vertices, videoMaterial.mesh);
                });
        };
    }

    private static moveVideo(videoMaterial: IVideoMaterial) {
        let refPoint = {
            x: 1,
            y: 1,
        };

        return (event) => {

            const delta = {
                x: event.object.position.x - (refPoint.x),
                y: event.object.position.y - (refPoint.y),
                z: 0,
            };

            const geometry: any = videoMaterial.mesh.geometry;
            const oldVertices = geometry.attributes.position.array;
            const newVertices = DimensionTransformer.vectorizeFloatArray(oldVertices, delta);

            VideoSceneHelper.changeVerticesWithFloatArray(newVertices, videoMaterial.mesh);


            videoMaterial.dragHandler
                .filter((dh: IDragHandler) => dh.type === DragHandlerTypes.Mapper)
                .map((dh: IDragHandler) => {
                    DragHandler.updateByVecotor(dh, delta);
                });


            videoMaterial.dragHandler
                .filter((dh: IDragHandler) => dh.type === DragHandlerTypes.Delete)
                .map((dh: IDragHandler) => {
                    dh.sprites.map((sprite: Sprite) => {
                        sprite.position.setX(sprite.position.x + delta.x);
                        sprite.position.setY(sprite.position.y + delta.y);
                    });
                });

            // sets new position for proper delta (i know it is not a proper solution -.-)
            refPoint = {...event.object.position};
        };
    }
}
