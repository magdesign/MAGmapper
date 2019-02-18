import { Mesh, BufferGeometry, BufferAttribute, VideoTexture, ClampToEdgeWrapping, LinearFilter, MeshBasicMaterial, Scene } from "three";
import { Indices, Mapper, DimensionTransformer, Dimension, Edges } from "./Mapper";
import { Config } from "../../config";
import { PositionDragHandler } from './DragHandler';



export class VideoMaterial{

    private _id: string;
    private _videoMesh: Mesh;
    private _positions: Dimension[];
    private _uvs: Dimension[];
    private _scene: any;
    
    constructor(id: string, source: string, scene: Scene){
        this._id = id;
        this._scene = scene;

        const video: HTMLVideoElement = HtmlVideoMaterial.loadVideo();



        const indices: number[] = Indices.calcIndices(Config.Vertices.size);
        this._positions = Mapper.vertices(Config.Vertices.size, 2);
        this._uvs = Mapper.uv(Config.Vertices.size);
        
        let geometry = new BufferGeometry();
        geometry.setIndex(indices);
        geometry.addAttribute('position', new BufferAttribute(DimensionTransformer.toFloatArray(this._positions), 3));
        geometry.addAttribute('uv', new BufferAttribute(DimensionTransformer.toFloatArray(this._uvs), 3));

        const texture = new VideoTexture(video);

        texture.generateMipmaps = false;
        texture.wrapS = texture.wrapT = ClampToEdgeWrapping;
        texture.minFilter = LinearFilter;

        this._videoMesh = new Mesh(geometry, new MeshBasicMaterial({map: texture, wireframe: false}));
        this._videoMesh.name = this._id;
        this._scene.add(this._videoMesh);
    }

    public get scene(){
        return this._scene;
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



export class VideoMapperElement{

    
}

export class VideoSceneHelper{

    public static filterVideoScene(scene, id: string){
        return scene.children
            .filter((obj) => obj.type === "Mesh" && obj.name == id)
    }

    public static changeUv(uve: Dimension[], scene, id: string){
        this.filterVideoScene(scene, id)
            .map((elmt => {
                elmt.geometry.attributes.uv.needsUpdate = true
                elmt.geometry.attributes.uv.array = DimensionTransformer.toFloatArray(Mapper.map(Config.Vertices.size, uve[0],uve[1], uve[2],uve[3]));
                return elmt;
            }))
    }

    public static getEdgesFromScene(scene, id: string): Dimension[]{
        return this.filterVideoScene(scene, id)
            .map((video: any) => video.geometry.attributes.position.array)
            .map(val => DimensionTransformer.fromFloatArrayToDimension(val))
            .map(val => Edges.getEdges(val))[0];
    }

    public static changeVertices(vertices: Dimension[], scene, id: string){
        this.filterVideoScene(scene, id)
            .map((elmt => {
                elmt.geometry.attributes.position.needsUpdate = true
                elmt.geometry.attributes.position.array = DimensionTransformer.toFloatArray(vertices)
                return elmt;
            }))
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

