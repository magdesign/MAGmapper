import { Vector3, Scene, Line, Geometry, LineBasicMaterial } from "three";
import { IDimension } from "../math/DimensionTransformer";
import { Config } from "../../config";

export class LineBuilder {

    public static addLines(scene: Scene, id: string, edges: IDimension[]): Line {

        const material = new LineBasicMaterial({color: 255255255255255255, linewidth: Config.DragHandler.line}); 
        let geometry: Geometry = new Geometry();

        geometry.vertices = this.prepareEdges(edges);

        let line = new Line( geometry, material );
        line.name = id;
        return line;
    }

    public static filterLines(scene, id: string): any[]{
        return scene.children
            .filter((child: any) => child.name === id && child.type === "Line");
    }

    public static reorderLines(scene, id: string, edges: IDimension[]){
        this.filterLines(scene, id)
            .map((child: any) => {
                child.geometry.vertices = this.prepareEdges(edges)
                child.geometry.verticesNeedUpdate = true; 
                return child;
            });
    }

    public static disable(line: Line, enable: boolean){
        line.visible = enable;
        return line;
    }

    private static prepareEdges(edges: IDimension[]): Vector3[]{
        return [
            edges[0],
            edges[1],
            edges[3],
            edges[2],
            edges[0],
        ].map(edge => new Vector3(edge.x, edge.y, edge.z));
    }

}
