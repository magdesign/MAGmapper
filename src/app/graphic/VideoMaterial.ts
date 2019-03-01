import { Mesh, BufferGeometry, BufferAttribute, VideoTexture, ClampToEdgeWrapping, LinearFilter, MeshBasicMaterial, Scene, PerspectiveCamera, WebGLRenderer } from "three";
import { Indices, Mapper, DimensionTransformer, Dimension, Edges } from "./Mapper";
import { Config } from "../../config";
import { PositionDragHandler, UvDragHandler, DragHandler, VideoMover } from './DragHandler';
import { EventHandler, EventTypes } from '../ui/UiConfig';

export class VideoMaterial{

    private _id: string;
    private _videoMesh: Mesh;
    private _positions: Dimension[];
    private _uvs: Dimension[];
    private _scene: any;
    private _draghanlder: DragHandler;

    constructor(id: string, source: string, scene: Scene, startPoint: Dimension){
        this._id = id;
        this._scene = scene;

        const video: HTMLVideoElement = HtmlVideoMaterial.loadVideo();
        const indices: number[] = Indices.calcIndices(Config.Vertices.size);

        this._positions = Mapper.verticesWithStartPoint(Config.Vertices.size, 2, startPoint);
        this._uvs = Mapper.uv(Config.Vertices.size);

        const geometry = new BufferGeometry();

        geometry.setIndex(indices);
        geometry.addAttribute("position", new BufferAttribute(DimensionTransformer.toFloatArray(this._positions), 3));
        geometry.addAttribute("uv", new BufferAttribute(DimensionTransformer.toFloatArray(this._uvs), 3));

        const texture = new VideoTexture(video);

        texture.generateMipmaps = false;
        texture.wrapS = texture.wrapT = ClampToEdgeWrapping;
        texture.minFilter = LinearFilter;

        this._videoMesh = new Mesh(geometry, new MeshBasicMaterial({map: texture, wireframe: false}));
        this._videoMesh.name = this._id;
        this._scene.add(this._videoMesh);

        this.events(scene);
    }

    private events(scene: any): void{
        EventHandler.addEventListener(EventTypes.Wireframe, (e) => {
            VideoSceneHelper.changeWireframe(e.detail.value, scene, this._id);
        });

        EventHandler.addEventListener(EventTypes.Outlines, (e) => {
            this._draghanlder.visibility(e.detail.value);
        });
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

    public set draghanlder(draghandler: DragHandler) {
        this._draghanlder = draghandler;
    }

    public get draghanlder(){
        return this._draghanlder;
    }
}

export class VideoMapper extends VideoMaterial {
    constructor(id: string, source: string, scene: Scene, startPoint: Dimension, renderer: WebGLRenderer, camera:PerspectiveCamera){
        super(id, source, scene, startPoint);
        super.draghanlder = new PositionDragHandler(super.scene, renderer, camera, super.id, super.positions);
        console.log(super.id)
        new VideoMover(super.scene, renderer, camera, super.id, [super.draghanlder]);
    }
}


export class VideoCutter extends VideoMaterial {

    private _targetId: string;

    constructor(id: string, targetId: string, source: string, scene: Scene, startPoint: Dimension, renderer: WebGLRenderer, camera:PerspectiveCamera){
        super(id, source, scene, startPoint);
        this._targetId = targetId;
        console.log(super.id)
        
        super.draghanlder = new UvDragHandler(super.scene, renderer, camera, super.id, super.positions, this._targetId);
        new VideoMover(super.scene, renderer, camera, super.id, [super.draghanlder]);

        EventHandler.addEventListener(EventTypes.Cutter, (e) => {
            VideoSceneHelper.changeVisibility(e.detail.value, scene, super.id);
            super.draghanlder.visibility(e.detail.value)
        })
    }
}

/**
 * filters scene elements and changes properties
 */
export class VideoSceneHelper{
    
    public static filterVideoScene(scene, id: string){
        return scene.children
            .filter((obj) => obj.type === "Mesh" && obj.name == id)
    }

    public static getEdgesFromScene(scene, id: string): Dimension[]{
        return this.filterVideoScene(scene, id)
            .map((video: any) => video.geometry.attributes.position.array)
            .map(val => DimensionTransformer.fromFloatArrayToDimension(val))
            .map(val => Edges.getEdges(val))[0];
    }
    
    public static changeWireframe(wireframe: boolean, scene, id: string){
        this.filterVideoScene(scene, id)
            .map((elmt => {
                elmt.material.wireframe = wireframe;
                return elmt;
            }))
    }

    public static changeVisibility(wireframe: boolean, scene, id: string){
        this.filterVideoScene(scene, id)
            .map((elmt => {
                elmt.visible = wireframe;
                return elmt;
            }))
    }


    public static changeUv(uve: Dimension[], scene, id: string){
        this.filterVideoScene(scene, id)
            .map((elmt => {
                elmt.geometry.attributes.uv.needsUpdate = true
                elmt.geometry.attributes.uv.array = DimensionTransformer.toFloatArray(Mapper.map(Config.Vertices.size, uve[0],uve[1], uve[2],uve[3]));
                return elmt;
            }))
    }

    public static changeVerticesWithFloatArray(vertices: Float32Array, scene, id: string){
        this.filterVideoScene(scene, id)
        .map((elmt => {
            elmt.geometry.attributes.position.needsUpdate = true;
            elmt.geometry.attributes.position.array = vertices;
            return elmt;
        })) 
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

interface IAttribute {
    qualifiedName: string;
    value: string;
}

class HtmlVideoMaterial {

    public static loadVideo(): HTMLVideoElement {
        let video = this.init();
        document
            .getElementsByTagName("body")[0]
            .appendChild(video);

        video.play();
        return video;
    }  

    // todo set loop
    private static attributes: IAttribute[] = [
        {qualifiedName: "id", value: "video"},
        {qualifiedName: "controls", value: "true"},
        {qualifiedName: "src", value: "assets/testvideo.mp4"},
        {qualifiedName: "codecs", value: "avc1.42E01E, mp4a.40.2"},
        {qualifiedName: "style", value: "display:none"}
    ];

    private static init(): HTMLVideoElement {
        let video: HTMLVideoElement = document.createElement("video");
        this.attributes.map((attr: IAttribute) => video.setAttribute(attr.qualifiedName, attr.value));
        return video;
    }
}
