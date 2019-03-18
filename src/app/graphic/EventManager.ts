import {DragHandler, DragHandlerTypes, IDragHandler} from "../dragger/DragHandler";
import {SpriteBuilder} from "../material/SpriteBuilder";
import {IVideoMaterial} from "../material/VideoMaterialBuilder";
import {VideoSceneHelper} from "../material/VideoSceneHelper";
import {EventHandler, EventTypes} from "../event/EventHandler";
import {Scene, Sprite} from "three";
import {VideoCutter} from "./video/VideoCutter";

export class EventManager {

    public static init(videos: IVideoMaterial[], scene: Scene): void {


        EventHandler.addEventListener(EventTypes.RemoveQuad, (event) => {
            const video: IVideoMaterial = event.detail.value;
            scene.remove(video.mesh);
            video.dragHandler.forEach((dh: IDragHandler) => {
                scene.remove(dh.line);
                dh.sprites.forEach((sprite: Sprite) => {
                    scene.remove(sprite);
                });
            });
            VideoCutter.removeCutterItem(videos, video, scene);
            videos.splice(videos.indexOf(video), 1 );
        });

        EventHandler.addEventListener(EventTypes.Cutter, (value) => {
            videos.forEach((video: IVideoMaterial) => {
                video.dragHandler.forEach((dh: IDragHandler) => {
                    switch (dh.type) {
                        case  DragHandlerTypes.Cutter:
                            DragHandler.visible(dh, value.detail.value);
                            VideoSceneHelper.changeVisibility(video.mesh, value.detail.value);
                    }
                });
            });
        });

        EventHandler.addEventListener(EventTypes.Wireframe, (value) => {
            videos.forEach((video: IVideoMaterial) => VideoSceneHelper.changeWireframe(video.mesh, value.detail.value));
        });

        EventHandler.addEventListener(EventTypes.Outlines, (value) => {
            videos.forEach((video: IVideoMaterial) => {
                video.dragHandler.forEach((dh: IDragHandler) => {
                    switch (dh.type) {
                        case  DragHandlerTypes.Mapper:
                            DragHandler.visible(dh, value.detail.value);
                            break;
                        case  DragHandlerTypes.Mover:
                            SpriteBuilder.disable(dh.sprites, value.detail.value);
                            break;
                    }
                });
            });
        });
    }
}
