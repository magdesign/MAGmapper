import {Scene, Sprite} from "three";
import {LineBuilder} from "../../material/LineBuilder";
import {SpriteBuilder} from "../../material/SpriteBuilder";
import {IVideoMaterial, VideoMaterialBuilder} from "../../material/VideoMaterialBuilder";
import {VideoSceneHelper} from "../../material/VideoSceneHelper";
import {IDimension} from "../../math/DimensionTransformer";
import {UvMapper} from "../../math/UvMapper";

export class VideoCutter {

    public static create(target: IVideoMaterial, source: string, startPoint: IDimension): IVideoMaterial {

        const videoMaterial: IVideoMaterial = VideoMaterialBuilder.create(source, startPoint, () => {
            const spriteEdges: IDimension[] = SpriteBuilder.loadSpriteEdges(videoMaterial.dragHandler.sprites);
            LineBuilder.reorderLines(videoMaterial.dragHandler.line, spriteEdges);

            const uv: IDimension[] = UvMapper.reorderUvMapping(spriteEdges, videoMaterial.dragHandler.edges);
            VideoSceneHelper.changeUv(uv, target.mesh);
        });


        return videoMaterial;
    }

    public static addToScene(video: IVideoMaterial, scene: Scene): Scene {
        scene.add(video.mesh);
        scene.add(video.dragHandler.line);

        video.dragHandler.sprites.forEach((sprite: Sprite) => scene.add(sprite));

        return scene;
    }

    public static view(video: any, value: boolean) {
        video.visible = value;
        video.visible = value;
    }

}
