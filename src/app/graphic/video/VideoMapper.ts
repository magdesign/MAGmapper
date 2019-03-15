import {Scene, Sprite} from "three";
import {Config} from "../../../config";
import {DragHandler, IDragHandler} from "../../dragger/DragHandler";
import {LineBuilder} from "../../material/LineBuilder";
import {SpriteBuilder} from "../../material/SpriteBuilder";
import {IVideoMaterial, VideoMaterialBuilder} from "../../material/VideoMaterialBuilder";
import {VideoSceneHelper} from "../../material/VideoSceneHelper";
import {DimensionTransformer, IDimension} from "../../math/DimensionTransformer";
import {Mapper} from "../../math/Mapper";

export class VideoMapper {

    public static create(video: HTMLVideoElement, startPoint: IDimension): IVideoMaterial {
        const videoMaterial: IVideoMaterial = VideoMaterialBuilder.create(video, startPoint, () => {
            const spriteEdges: IDimension[] = SpriteBuilder.loadSpriteEdges(videoMaterial.dragHandler[0].sprites);

            LineBuilder.reorderLines(videoMaterial.dragHandler[0].line, spriteEdges);
            const vertices = Mapper.map(Config.Vertices.size, spriteEdges[0], spriteEdges[1], spriteEdges[2], spriteEdges[3]);

            VideoSceneHelper.changeVertices(vertices, videoMaterial.mesh);
        });

        let refPoint = {
            x: 1,
            y: 1,
        };
        videoMaterial.dragHandler.push(DragHandler.createMover(videoMaterial, (event) => {

            const delta = {
                x: event.object.position.x - (refPoint.x),
                y: event.object.position.y - (refPoint.y),
                z: 0,
            };

            const geometry: any = videoMaterial.mesh.geometry;
            const oldVertices = geometry.attributes.position.array;
            const newVertices = DimensionTransformer.vectorizeFloatArray(oldVertices, delta);

            VideoSceneHelper.changeVerticesWithFloatArray(newVertices, videoMaterial.mesh);

            // todo filter correct value
            DragHandler.updateByVecotor(videoMaterial.dragHandler[0], delta);

            // sets new position for proper delta (i know it is not a proper solution -.-)
            refPoint = {...event.object.position};
        }));

        return videoMaterial;
    }

    public static addToScene(video: IVideoMaterial, scene: Scene): Scene {
        scene.add(video.mesh);
        scene.add(video.dragHandler[0].line);

        video.dragHandler.forEach((dh: IDragHandler) => dh.sprites.forEach((sprite: Sprite) => scene.add(sprite)));

        return scene;
    }
}
