import {
    BufferAttribute,
    BufferGeometry,
    ClampToEdgeWrapping,
    LinearFilter,
    Mesh,
    MeshBasicMaterial, Scene,
    VideoTexture,
} from "three";
import {Config} from "../../config";
import {DragHandler, IDragHandler} from "../dragger/DragHandler";
import {DimensionTransformer, IDimension} from "../math/DimensionTransformer";
import {Indices} from "../math/Indices";
import {Mapper} from "../math/Mapper";
import {HtmlVideoMaterial} from "./HtmlVideoMaterial";

export interface IVideoMaterial {
    mesh: Mesh;
    dragHandler?: IDragHandler;
    dragHandlerFn?: () => void;
}

export class VideoMaterialBuilder {

    public static create(source: string, startPoint: IDimension): IVideoMaterial {

        const video: HTMLVideoElement = HtmlVideoMaterial.loadVideo();
        const indices: number[] = Indices.calcIndices(Config.Vertices.size);

        const positions = Mapper.verticesWithStartPoint(Config.Vertices.size, 2, startPoint);
        const uvs = Mapper.uv(Config.Vertices.size);

        const geometry = new BufferGeometry();

        geometry.setIndex(indices);
        geometry.addAttribute("position", new BufferAttribute(DimensionTransformer.toFloatArray(positions), 3));
        geometry.addAttribute("uv", new BufferAttribute(DimensionTransformer.toFloatArray(uvs), 3));

        const texture = new VideoTexture(video);

        texture.generateMipmaps = false;
        texture.wrapS = texture.wrapT = ClampToEdgeWrapping;
        texture.minFilter = LinearFilter;

        const videoMesh = new Mesh(geometry, new MeshBasicMaterial({map: texture, wireframe: false}));

        return {
            dragHandler: DragHandler.create(positions),
            mesh: videoMesh,
        };
    }


}