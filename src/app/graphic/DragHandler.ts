import {
    Mesh, 
    MeshStandardMaterial,
     PerspectiveCamera, 
     Scene, 
     Sprite, 
     SpriteMaterial, 
     TextureLoader,
     WebGLRenderer,
    Vector3,
    Geometry,
    LineBasicMaterial,
    Line,
    BufferGeometry
} from 'three';
import DragControls from 'three-dragcontrols';

import { DimensionTransformer, Dimension ,Edges, Mapper, UvMapper } from './Mapper';

import { DataService } from "../service/DataService";
import { Config } from '../../config';
import { VideoMaterial, VideoSceneHelper } from './VideoMaterial';

class LineBuilder{

    private static prepareEdges(edges: Dimension[]): Vector3[]{
        return [
            edges[0],
            edges[1],
            edges[3],
            edges[2],
            edges[0],
        ].map(edge => new Vector3(edge.x, edge.y, edge.z));
    }

    public static addLines(scene: Scene, id: string, edges: Dimension[], prefix: string){

        const material = new LineBasicMaterial({color: 255255255255255255, linewidth: 5}); 
        let geometry: Geometry = new Geometry();

        geometry.vertices = this.prepareEdges(edges);

        let line = new Line( geometry, material );
        line.name = prefix + id;
        scene.add(line);
    }

    public static reorderLines(scene, id: string, edges: Dimension[],  prefix: string){
        scene.children
            .filter((child: any) => child.name === prefix + id && child.type === "Line")
            .map((child: any) => {
                child.geometry.vertices = this.prepareEdges(edges)
                child.geometry.verticesNeedUpdate = true; 
                return child;
            })
    }

    public static disable(scene, id: string, enable: boolean, prefix: string){
        scene.children
            .filter((child: any) => child.name === prefix + id && child.type === "Line")
            .map((child: any) => {
                child.visible = enable; 
                return child;
            })
    }
}

class SpriteBuilder{
    public static generateDragHanldes(edges: Dimension[], source: string, scale: number): Sprite[]{
        return edges.map((edge: Dimension) => this.makeSprite(edge, source, scale));
    }

    private static makeSprite(point: Dimension, source: string, scale: number): Sprite {
 
        const texture = new TextureLoader()
            .load(source);
    
        const material: SpriteMaterial = new SpriteMaterial({map: texture});
        let sprite: Sprite = new Sprite(material);


        function getRandomIntInclusive(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min +1)) + min; 
          }

        sprite.position.set(point.x, point.y, point.z);
        sprite.scale.set(scale, scale, 1);
    
        return sprite;
    }


    public static disable(scene, id: string, enable: boolean, prefix: string){
        scene.children
            .filter((child: any) => child.name === prefix + id && child.type === "Sprite")
            .map((child: any) => {
                child.visible = enable; 
                return child;
            })
    }
}

export class PositionDragHandler{

    private prefix: string = "vert";

    constructor(scene: Scene, renderer: WebGLRenderer, camera: PerspectiveCamera, video: VideoMaterial) {


        const edges: Dimension[] = Edges.getEdges(video.positions);


        const sprites: Sprite[] = SpriteBuilder
            .generateDragHanldes(edges, Config.DragHandler.source, Config.DragHandler.scale)
            .map((sprite: Sprite) => {
                scene.add(sprite);
                sprite.name = this.prefix + video.id;
                return sprite;
            });

        LineBuilder.addLines(scene, video.id, edges, this.prefix);

        new DragControls(sprites, camera, renderer.domElement)
            .addEventListener('drag', () => {
                this.loadPositions(video.id, scene, renderer, camera);
            });

    
    }

    public loadPositions(id: string, scene: any, renderer: WebGLRenderer, camera: PerspectiveCamera) {
        const spriteEdges: Dimension[] = scene.children
            .filter((obj) => obj.type === "Sprite" && obj.name == this.prefix + id)
            .map((obj) => DimensionTransformer.fromVector3D(obj.position));

        LineBuilder.reorderLines(scene, id, spriteEdges, this.prefix);

        const vertices = Mapper.map(Config.Vertices.size, spriteEdges[0], spriteEdges[1], spriteEdges[2], spriteEdges[3])
        VideoSceneHelper.changeVertices(vertices, scene, id);

        renderer.render(scene, camera);
    }
}   



export class UvDragHandler{

    private _scene: Scene;
    private prefix: string = "uv";

    constructor(scene: Scene, renderer: WebGLRenderer, camera: PerspectiveCamera, video: VideoMaterial,  targetId: string) {
        this._scene = scene;

        const edges: Dimension[] = Edges.getEdges(video.positions);
        const sprites: Sprite[] = SpriteBuilder.generateDragHanldes(edges, Config.DragHandler.source, Config.DragHandler.scale)
            .map((sprite: Sprite) => {
                scene.add(sprite);
                sprite.name = this.prefix + video.id;
                return sprite;
            });

        LineBuilder.addLines(scene, video.id, edges, this.prefix);

        new DragControls(sprites, camera, renderer.domElement)
            .addEventListener('drag', () => {
                this.loadPositions(video.id, scene, renderer, camera, VideoSceneHelper.getEdgesFromScene(scene, video.id), targetId);
            });
    }

    public loadPositions(id: string, scene: any, renderer: WebGLRenderer, camera: PerspectiveCamera, edges: Dimension[], targetId: string) {
        const spriteEdges: Dimension[] = scene.children
            .filter((obj) => obj.type === "Sprite" && obj.name == this.prefix + id )
            .map((obj) => DimensionTransformer.fromVector3D(obj.position));

        LineBuilder.reorderLines(scene, id, spriteEdges, this.prefix);
        
        const uve:Dimension[] =  UvMapper.reorderUvMapping(spriteEdges, edges);
        VideoSceneHelper.changeUv(uve, scene, targetId);
        renderer.render(scene, camera);
    }
}   

