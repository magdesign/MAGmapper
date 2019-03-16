import {Geometry, Line, LineBasicMaterial, Scene, Vector3} from "three";
import {Config} from "../../config";
import {IDimension} from "../math/DimensionTransformer";

export class LineBuilder {

    public static addLines(name: string, edges: IDimension[]): Line {

        const material = new LineBasicMaterial({
            color: 255255255255255255,
            linewidth: Config.DragHandler.line,
        });
        const geometry: Geometry = new Geometry();

        geometry.vertices = this.prepareEdges(edges);

        const line = new Line(geometry, material);
        line.name = name;
        return line;
    }

    public static filterLines(scene, id: string): any[] {
        return scene.children
            .filter((child: any) => child.name === id && child.type === "Line");
    }

    public static reorderLines(line: any, edges: IDimension[]): Line {
        line.geometry.vertices = this.prepareEdges(edges);
        line.geometry.verticesNeedUpdate = true;
        return line;
    }

    public static disable(line: Line, enable: boolean): Line {
        line.visible = enable;
        return line;
    }

    private static prepareEdges(edges: IDimension[]): Vector3[] {
        return [
            edges[0],
            edges[1],
            edges[3],
            edges[2],
            edges[0],
        ].map((edge: IDimension) => new Vector3(edge.x, edge.y, edge.z));
    }

}
