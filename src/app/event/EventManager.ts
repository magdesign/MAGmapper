import {DragHandler, DragHandlerTypes, IDragHandler} from "../dragger/DragHandler";
import {SpriteBuilder} from "../material/SpriteBuilder";
import {IVideoMaterial, VideoType} from "../material/VideoMaterialBuilder";
import {VideoSceneHelper} from "../material/VideoSceneHelper";
import {EventHandler, EventTypes} from "./EventHandler";
import {VideoMapper} from "../graphic/video/VideoMapper";
import {SceneManager} from "../graphic/SceneManager";
import {VideoCutter} from "../graphic/video/VideoCutter";

export class EventManager {

    public static init(videos: IVideoMaterial[]): void {

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
