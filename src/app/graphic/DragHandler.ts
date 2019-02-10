import {
    Mesh, 
    MeshStandardMaterial,
     PerspectiveCamera, 
     Scene, 
     Sprite, 
     SpriteMaterial, 
     TextureLoader,
     WebGLRenderer,
    Vector3
} from 'three';
import DragControls from 'three-dragcontrols';

import { Dimension, DimensionTransformer, Edges, Mapper } from './Mapper';

import { DataService } from "../service/DataService";

const source = "../assets/draghandle.png";
const scale = 0.3;
const size = 30;

export class DragHandler{

    private static generateDragHanldes(edges: Dimension[]): Sprite[]{
        return edges.map(this.makeSprite);
    }

    private static makeSprite(point: Dimension): Sprite {
 
        const texture = new TextureLoader()
            .load(source);
    
        const material: SpriteMaterial = new SpriteMaterial({map: texture});
        let sprite: Sprite = new Sprite(material);

        sprite.position.set(point.x, point.y, point.z);
        sprite.scale.set(scale, scale, 1);
    
        return sprite;
    }


    public static generateEgdeSprites(id: string, scene: Scene, renderer: WebGLRenderer, camera: PerspectiveCamera, points: Dimension[]): Scene {

        const sprites: Sprite[] = this.generateDragHanldes(Edges.getEdges(points))
            .map((sprite: Sprite) => {
                scene.add(sprite)
                sprite.name = id;
                return sprite;
            });      


        new DragControls(sprites, camera, renderer.domElement)
            .addEventListener('drag', () => {
                this.loadPositions(id, scene, renderer, camera);
            });

        return scene
    }

    public static loadPositions(id: string, scene: Scene, renderer: WebGLRenderer, camera) {
        const spriteEdges = scene.children
            .filter((obj) => obj.type === "Sprite" && obj.name == id )
            .map((obj)=> DimensionTransformer.fromVector3D(obj.position))

        DataService.Service.positions = DimensionTransformer
                    .toFloatArray(Mapper
                                .map(size, spriteEdges[0], spriteEdges[1], spriteEdges[2], spriteEdges[3]));
    }
}   