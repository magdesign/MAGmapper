import {
    BufferAttribute,
    BufferGeometry,
    ClampToEdgeWrapping,
    LinearFilter,
    Mesh,
    MeshBasicMaterial,
    VideoTexture,
} from "three";
import {Config} from "../../config";
import {DragHandler,  IDragHandler} from "../dragger/DragHandler";
import {DimensionTransformer, IDimension} from "../math/DimensionTransformer";
import {Indices} from "../math/Indices";
import {Mapper} from "../math/Mapper";

export interface IVideoMaterial {
    mesh: Mesh;
    positions: IDimension[];
    dragHandler?: IDragHandler[];
}

export class VideoMaterialBuilder {

    public static create(video: HTMLVideoElement, startPoint: IDimension, fn: () => void): IVideoMaterial {

        const indices: number[] = Indices.calcIndices(Config.Vertices.size);

        const positions = Mapper.verticesWithStartPoint(Config.Vertices.size, 2, startPoint);

        const uvs = Mapper.uv(Config.Vertices.size);

        const texture = this.loadTexture(video);
        const geometry = this.loadGeometry(indices, uvs, positions);

        const videoMesh = new Mesh(geometry, new MeshBasicMaterial({map: texture, wireframe: false}));

        return {
            dragHandler: [
                DragHandler.create(positions, fn),
            ],
            mesh: videoMesh,
            positions,
        };
    }

    private static loadGeometry(indices, uvs, positions): BufferGeometry {
        const geometry = new BufferGeometry();
        geometry.setIndex(indices);
        geometry.addAttribute("position", new BufferAttribute(DimensionTransformer.toFloatArray(positions), 3));
        geometry.addAttribute("uv", new BufferAttribute(DimensionTransformer.toFloatArray(uvs), 3));
        return geometry;
    }

    private static loadTexture(video: HTMLVideoElement): VideoTexture {
        const texture = new VideoTexture(video);
        texture.generateMipmaps = false;
        texture.wrapS = texture.wrapT = ClampToEdgeWrapping;
        texture.minFilter = LinearFilter;
        return texture;
    }
}
