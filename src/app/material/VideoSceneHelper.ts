import {Config} from "../../config";
import {DimensionTransformer, IDimension} from "../math/DimensionTransformer";
import {Edges} from "../math/Edges";
import {Mapper} from "../math/Mapper";
import {Mesh} from "three";

/**
 * filters scene elements and changes properties
 */
export class VideoSceneHelper {
    public static filterVideoScene(scene, id: string) {
        return scene.children
            .filter((obj) => obj.type === "Mesh" && obj.name === id);
    }

    public static getEdgesFromScene(scene, id: string): IDimension[] {
        return this.filterVideoScene(scene, id)
            .map((video: any) => video.geometry.attributes.position.array)
            .map(val => DimensionTransformer.fromFloatArrayToDimension(val))
            .map(val => Edges.getEdges(val))[0];
    }

    public static changeWireframe(wireframe: boolean, scene, id: string) {
        this.filterVideoScene(scene, id)
            .map((elmt => {
                elmt.material.wireframe = wireframe;
                return elmt;
            }));
    }

    public static changeVisibility(wireframe: boolean, scene, id: string) {
        this.filterVideoScene(scene, id)
            .map((elmt => {
                elmt.visible = wireframe;
                return elmt;
            }));
    }

    public static changeUv(uv: IDimension[], video: any): any {
        video.geometry.attributes.uv.needsUpdate = true;
        video.geometry.attributes.uv.array = DimensionTransformer.toFloatArray(Mapper.map(Config.Vertices.size, uv[0], uv[1], uv[2], uv[3]));
        return video;
    }

    public static changeVerticesWithFloatArray(vertices: Float32Array, scene, id: string) {
        this.filterVideoScene(scene, id)
            .map((elmt => {
                elmt.geometry.attributes.position.needsUpdate = true;
                elmt.geometry.attributes.position.array = vertices;
                return elmt;
            }));
    }

    public static changeVertices(vertices: IDimension[], video: any) {
        video.geometry.attributes.position.needsUpdate = true;
        video.geometry.attributes.position.array = DimensionTransformer.toFloatArray(vertices);
        return video;
    }
}
