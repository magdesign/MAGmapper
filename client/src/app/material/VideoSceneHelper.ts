import {Config} from "../../config";
import {DimensionTransformer, IDimension} from "../math/DimensionTransformer";
import {Edges} from "../math/Edges";
import {Mapper} from "../math/Mapper";

/**
 * filters scene elements and changes properties
 */
export class VideoSceneHelper {

    public static getEdgesFromScene(video: any): IDimension[] {
        const positions = video.geometry.attributes.position.array;
        return Edges.getEdges(DimensionTransformer.fromFloatArrayToDimension(positions));

    }

    public static changeWireframe(video: any, wireframe: boolean) {
        video.material.wireframe = wireframe;
        return video;
    }

    public static changeVisibility(video: any, visible: boolean) {
        video.visible = visible;
        return video;
    }

    public static changeUv(uv: IDimension[], video: any): any {
        video.geometry.attributes.uv.array = DimensionTransformer.toFloatArray(Mapper.map(Config.Vertices.size, uv[0], uv[1], uv[2], uv[3]));
        video.geometry.attributes.uv.needsUpdate = true;
        return video;
    }

    public static changeVerticesWithFloatArray(vertices: Float32Array, video: any) {
        video.geometry.attributes.position.array = vertices;
        video.geometry.attributes.position.needsUpdate = true;

        return video;
    }

    public static changeVertices(vertices: IDimension[], video: any) {
        video.geometry.attributes.position.needsUpdate = true;
        video.geometry.attributes.position.array = DimensionTransformer.toFloatArray(vertices);
        return video;
    }
}
