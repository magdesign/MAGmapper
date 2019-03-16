import {Scene, Sprite} from "three";
import {IVideoMaterial} from "../material/VideoMaterialBuilder";
import {DragHandlerTypes, IDragHandler} from "../dragger/DragHandler";


export interface IScreen {
    screenId: string;
    scene: Scene;
}

export class SceneManager {

    public static addVideoToScene(video: IVideoMaterial, scene: Scene): Scene {
        scene.add(video.mesh);
        video.dragHandler.forEach((dragHandler: IDragHandler) => {
            dragHandler.sprites.forEach((sprite: Sprite) => scene.add(sprite));
            if (dragHandler.type === DragHandlerTypes.Mapper ||
                dragHandler.type === DragHandlerTypes.Cutter) {
                scene.add(dragHandler.line);
            }
        });
        return scene;
    }

    public static addToScene(videos: IVideoMaterial[], scene: Scene): Scene {
        videos.forEach((video: IVideoMaterial) => {
            this.addVideoToScene(video, scene);
        });
        return scene;
    }
}
