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

import { DimensionTransformer, Dimension ,Edges, Mapper } from './Mapper';

import { DataService } from "../service/DataService";
import { Config } from '../../config';
import { VideoMaterial } from './VideoMaterial';

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

    public static addLines(scene: Scene, id: string, edges: Dimension[]){

        const material = new LineBasicMaterial({color: 255255255255255255, linewidth: 5}); 
        let geometry: Geometry = new Geometry();

        geometry.vertices = this.prepareEdges(edges);

        let line = new Line( geometry, material );
        line.name = "line_" + id;
        scene.add(line);
    }



    public static reorderLines(scene, id: string, edges: Dimension[]){
        scene.children
            .filter((child:any) => child.name === "line_" + id)
            .forEach((child:any) => {
                child.geometry.vertices = this.prepareEdges(edges)
                child.geometry.verticesNeedUpdate = true; 
            })
    }
}

class SpriteBuilder{
    public static generateDragHanldes(edges: Dimension[]): Sprite[]{
        return edges.map(this.makeSprite);
    }

    private static makeSprite(point: Dimension): Sprite {
 
        const texture = new TextureLoader()
            .load(Config.DragHandler.source);
    
        const material: SpriteMaterial = new SpriteMaterial({map: texture});
        let sprite: Sprite = new Sprite(material);

        sprite.position.set(point.x, point.y, point.z);
        sprite.scale.set(Config.DragHandler.scale, Config.DragHandler.scale, 1);
    
        return sprite;
    }
}


export class DragHandler{

    public static initVertices(scene: any, renderer: WebGLRenderer, camera: PerspectiveCamera, video: VideoMaterial): Scene {

        const edges: Dimension[] = Edges.getEdges(video.positions);

        const sprites: Sprite[] = SpriteBuilder
            .generateDragHanldes(edges)
            .map((sprite: Sprite) => {
                scene.add(sprite);
                sprite.name = video.id;
                return sprite;
            });

        LineBuilder.addLines(scene, video.id, edges);

        new DragControls(sprites, camera, renderer.domElement)
            .addEventListener('drag', () => {
                this.loadPositions(video.id, scene, renderer, camera);
            });

        return scene;
    }

    public static loadPositions(id: string, scene: any, renderer: WebGLRenderer, camera: PerspectiveCamera) {
        const spriteEdges: Dimension[] = scene.children
            .filter((obj) => obj.type === "Sprite" && obj.name == id )
            .map((obj) => DimensionTransformer.fromVector3D(obj.position));

        LineBuilder.reorderLines(scene, id, spriteEdges);

        const vertices = Mapper.map(Config.Vertices.size, spriteEdges[0], spriteEdges[1], spriteEdges[2], spriteEdges[3])

        scene.children[0].geometry.attributes.position.needsUpdate = true
        scene.children[0].geometry.attributes.position.array = DimensionTransformer.toFloatArray(vertices);

        renderer.render(scene, camera);
    }
}   

