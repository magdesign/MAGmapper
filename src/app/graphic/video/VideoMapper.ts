import {Scene, Sprite} from "three";
import {Config} from "../../../config";
import {DragHandler} from "../../dragger/DragHandler";
import {LineBuilder} from "../../material/LineBuilder";
import {SpriteBuilder} from "../../material/SpriteBuilder";
import {IVideoMaterial, VideoMaterialBuilder} from "../../material/VideoMaterialBuilder";
import {VideoSceneHelper} from "../../material/VideoSceneHelper";
import {IDimension} from "../../math/DimensionTransformer";
import {Mapper} from "../../math/Mapper";

export class VideoMapper {

    public static create(source: string, startPoint: IDimension): IVideoMaterial {
        const videoMaterial: IVideoMaterial = VideoMaterialBuilder.create(source, startPoint);
        videoMaterial.dragHandlerFn = () => {
            const spriteEdges: IDimension[] = SpriteBuilder.loadSpriteEdges(videoMaterial.dragHandler.sprites);

            LineBuilder.reorderLines(videoMaterial.dragHandler.line, spriteEdges);

            const vertices = Mapper.map(Config.Vertices.size, spriteEdges[0], spriteEdges[1], spriteEdges[2], spriteEdges[3]);
            VideoSceneHelper.changeVertices(vertices, videoMaterial.mesh);
        };

        return videoMaterial;
    }

    public static addToScene(video: IVideoMaterial, scene: Scene): Scene {
        scene.add(video.mesh);
        scene.add(video.dragHandler.line);
        video.dragHandler.sprites.forEach((sprite: Sprite) => scene.add(sprite));
        return scene;
    }
}
