import {DragHandler} from "../dragger/DragHandler";
import {SpriteBuilder} from "../material/SpriteBuilder";
import {IVideoMaterial} from "../material/VideoMaterialBuilder";
import {VideoSceneHelper} from "../material/VideoSceneHelper";
import {EventHandler, EventTypes} from "./EventHandler";

export class EventManager {

    public static init(videoCutter: IVideoMaterial, videoMapper: IVideoMaterial): void {

        EventHandler.addEventListener(EventTypes.Cutter, (value) => {
            VideoSceneHelper.changeVisibility(videoCutter.mesh, value.detail.value);
            DragHandler.visible(videoCutter.dragHandler, value.detail.value);
        });

        EventHandler.addEventListener(EventTypes.Wireframe, (value) => {
            VideoSceneHelper.changeWireframe(videoMapper.mesh, value.detail.value);
            VideoSceneHelper.changeWireframe(videoCutter.mesh, value.detail.value);
        });

        EventHandler.addEventListener(EventTypes.Outlines, (value) => {
            DragHandler.visible(videoMapper.dragHandler, value.detail.value);
            SpriteBuilder.disable(videoMapper.mover.sprites, value.detail.value);
        });

    }
}
