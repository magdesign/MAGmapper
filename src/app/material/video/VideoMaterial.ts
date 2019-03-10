import {
    BufferAttribute,
    BufferGeometry,
    ClampToEdgeWrapping,
    LinearFilter,
    Mesh,
    MeshBasicMaterial,
    Scene,
    VideoTexture
} from "three";
import {Config} from "../../../config";
import {DragHandler} from "../../dragger/DragHandler";
import {EventHandler, EventTypes} from "../../event/EventHandler";
import {DimensionTransformer, IDimension} from "../../math/DimensionTransformer";
import {Indices} from "../../math/Indices";
import {Mapper} from "../../math/Mapper";
import {HtmlVideoMaterial} from '../HtmlVideoMaterial';
import {VideoSceneHelper} from "../VideoSceneHelper";

interface IVideoMaterial {
    id: string;
    videoMesh: Mesh;
    scene: any;
    draghanlder: DragHandler;
}

export class VideoMaterial {

    private _id: string;
    private _videoMesh: Mesh;
    private _positions: IDimension[];
    private _uvs: IDimension[];
    private _scene: any;
    private _draghanlder: DragHandler;

    constructor(id: string, source: string, scene: Scene, startPoint: IDimension) {
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

    private events(scene: any): void {
        EventHandler.addEventListener(EventTypes.Wireframe, (e) => {
            VideoSceneHelper.changeWireframe(e.detail.value, scene, this._id);
        });

        EventHandler.addEventListener(EventTypes.Outlines, (e) => {
            this._draghanlder.visible(e.detail.value);
        });
    }

    public get scene() {
        return this._scene;
    }

    public get id(): string {
        return this._id;
    }

    public get videoMesh(): Mesh {
        return this._videoMesh;
    }

    public get positions(): IDimension[] {
        return this._positions;
    }

    public set draghanlder(draghandler: DragHandler) {
        this._draghanlder = draghandler;
    }

    public get draghanlder() {
        return this._draghanlder;
    }
}
