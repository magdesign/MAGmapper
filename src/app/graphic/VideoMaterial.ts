import { Mesh, BufferGeometry, BufferAttribute, VideoTexture, ClampToEdgeWrapping, LinearFilter, MeshBasicMaterial } from "three";
import { Indices, Mapper, DimensionTransformer, Dimension } from "./Mapper";
import { Config } from "../../config";



export class VideoMaterial{private _id: string;


    private _videoMesh: Mesh;
    private _positions: Dimension[];
    private _uvs: Dimension[];


    
    constructor(id: string, source: string){
        this._id = id;

        const video: HTMLVideoElement = HtmlVideoMaterial.loadVideo();

        let geometry = new BufferGeometry();

        const indices: number[] = Indices.calcIndices(Config.Vertices.size);
        this._positions = Mapper.vertices(Config.Vertices.size, 2);
        this._uvs = Mapper.uv(Config.Vertices.size);

        geometry.setIndex(indices);
        geometry.addAttribute('position', new BufferAttribute(DimensionTransformer.toFloatArray(this._positions), 3));
        geometry.addAttribute('uv', new BufferAttribute(DimensionTransformer.toFloatArray(this._uvs), 3));

        const texture = new VideoTexture(video);

        texture.generateMipmaps = false;
        texture.wrapS = texture.wrapT = ClampToEdgeWrapping;
        texture.minFilter = LinearFilter;

        this._videoMesh = new Mesh(geometry, new MeshBasicMaterial({map: texture, wireframe: false}));
        this._videoMesh.name = this._id;
    }



    public get id(): string{
        return this._id;
    }


    public get videoMesh(): Mesh{
        return this._videoMesh;
    }
    
    public get positions(): Dimension[]{
        return this._positions;
    }
}

interface Attribute {
    qualifiedName: string;
    value: string;
}

class HtmlVideoMaterial {

    // todo set loop
    private static attributes: Attribute[] = [
        {qualifiedName: "id", value: "video"},
        {qualifiedName: "controls", value: "true"},
        {qualifiedName: "src", value: "assets/testvideo.mp4"},
        {qualifiedName: "codecs", value: "avc1.42E01E, mp4a.40.2"},
        {qualifiedName: "style", value: "display:none"}
    ];

    private static init(): HTMLVideoElement {
        let video: HTMLVideoElement = document.createElement("video");
        this.attributes.map((attr: Attribute) => video.setAttribute(attr.qualifiedName, attr.value));
        return video;
    }

    
    public static loadVideo(): HTMLVideoElement {
        let video = this.init();
        document
            .getElementsByTagName("body")[0]
            .appendChild(video);

        video.play();
        return video;
    }    
}
