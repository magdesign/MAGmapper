import {
    TextureLoader,
    Sprite,
    SpriteMaterial,
    Scene,
    PerspectiveCamera,
    Vector3,
    MeshStandardMaterial,
    Mesh,
} from "three"


import DragControls from "three-dragcontrols";
import { Dimension, Edges, DimensionTransformer, Mapper } from "./Mapper";

const source = "../assets/draghandle.png";
const scale = 0.3;
const size = 10;


export class DragHandler{


    public static generateDragHanldes(edges: Dimension[]): Sprite[]{
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


    public static generateEgdeSprites(id: string, scene: Scene, dom: HTMLCanvasElement, camera: PerspectiveCamera, points: Dimension[]): Scene{
    

        const sprites: Sprite[] = this.generateDragHanldes(Edges.getEdges(points))
            .map((sprite: Sprite) => {
                scene.add(sprite)
                sprite.name = id;
                return sprite;
            });      


        new DragControls(sprites, camera, dom)
            .addEventListener('drag', () => {
                this.loadPositions(id, scene);
            });

        return scene
    }




    public static loadPositions(id: string, scene:Scene){


        const spriteEdges = scene.children
            .filter((obj) => obj.type === "Sprite" && obj.name == id )
            .map((obj)=> DimensionTransformer.fromVector3D(obj.position)) 


        const mesh = scene.children
            .filter((obj) => {
                return obj.type === "Mesh" && obj.name === id
            });

        Mapper.map(size, spriteEdges[0], spriteEdges[2], spriteEdges[1], spriteEdges[3])
        
        console.log(spriteEdges)



    }




}