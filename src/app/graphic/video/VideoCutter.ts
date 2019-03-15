import {Scene, Sprite} from "three";
import {LineBuilder} from "../../material/LineBuilder";
import {SpriteBuilder} from "../../material/SpriteBuilder";
import {IVideoMaterial, VideoMaterialBuilder} from "../../material/VideoMaterialBuilder";
import {VideoSceneHelper} from "../../material/VideoSceneHelper";
import {IDimension} from "../../math/DimensionTransformer";
import {UvMapper} from "../../math/UvMapper";

export class VideoCutter {

    public static create(target: IVideoMaterial, video: HTMLVideoElement, startPoint: IDimension): IVideoMaterial {

        const videoMaterial: IVideoMaterial = VideoMaterialBuilder.create(video, startPoint, () => {
            const spriteEdges: IDimension[] = SpriteBuilder.loadSpriteEdges(videoMaterial.dragHandler[0].sprites);
            LineBuilder.reorderLines(videoMaterial.dragHandler[0].line, spriteEdges);

            const uv: IDimension[] = UvMapper.reorderUvMapping(spriteEdges, videoMaterial.dragHandler[0].edges);
            VideoSceneHelper.changeUv(uv, target.mesh);
        });
        return videoMaterial;
    }

    public static addToScene(video: IVideoMaterial, scene: Scene): Scene {
        scene.add(video.mesh);
        scene.add(video.dragHandler[0].line);

        video.dragHandler[0].sprites.forEach((sprite: Sprite) => scene.add(sprite));

        return scene;
    }
}
