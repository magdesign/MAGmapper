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
import {DimensionTransformer, IDimension} from "../math/DimensionTransformer";
import {Indices} from "../math/Indices";
import {Mapper} from "../math/Mapper";
import {HtmlVideoMaterial} from "./HtmlVideoMaterial";

export interface IVideoMaterial {
    id: string;
    mesh: Mesh;
    positions: IDimension[];
}

export class VideoMaterialBuilder {

    public static create(id: string, source: string, startPoint: IDimension): IVideoMaterial {

        const video: HTMLVideoElement = HtmlVideoMaterial.loadVideo(id, source);
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
        videoMesh.name = id;

        return {
            id,
            mesh: videoMesh,
            positions,
        };
        // this.events(scene);
    }

    /*    private events(scene: any): void {
            EventHandler.addEventListener(EventTypes.Wireframe, (e) => {
                VideoSceneHelper.changeWireframe(e.detail.value, scene, this._id);
            });

            EventHandler.addEventListener(EventTypes.Outlines, (e) => {
                this._draghanlder.visible(e.detail.value);
            });
        }*/
}
