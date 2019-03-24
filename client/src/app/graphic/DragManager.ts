import {IVideoMaterial} from "../material/VideoMaterialBuilder";
import {DragEventType, IDragHandler} from "../material/DragHandler";
import DragControls from "three-dragcontrols";
import {Sprite} from "three";

enum Event {
    Drag = "drag",
    DragStart = "dragstart",
}

export interface IDragManager {
    click: DragControls;
    move: DragControls;
}

export class DragManager {

    private static loadDragHandler(materials: IVideoMaterial[], eventType: DragEventType): IDragHandler[] {
        return materials
            .map((material: IVideoMaterial) =>
                material.dragHandler
                    .filter((dh: IDragHandler) => dh.dragEventType === eventType))
            .reduce((a, b) => a.concat(b));
    }

    private static loadSprites(dragHandler: IDragHandler[]): Sprite[] {
        return dragHandler
            .map((dh) => dh.sprites)
            .reduce((a, b) => a.concat(b));
    }

    private static initDragHandler(dragHandler: IDragHandler[], event: Event, camera, renderer): DragControls {

        const sprites = this.loadSprites(dragHandler);
        const dragControls = new DragControls(sprites, camera, renderer.domElement);

        dragControls.addEventListener(event, (value) => {
            // Filter handles event only on same quad
            dragHandler
                .filter((dh) =>
                    dh.sprites.filter((sprite: Sprite) => sprite.uuid === value.object.uuid).length > 0)
                .map((dh) => dh.fn(value));
        });
        return dragControls;
    }

    public static createDragManager(materials: IVideoMaterial[], camera, renderer): IDragManager {
        const dragHandler: IDragHandler[] = this.loadDragHandler(materials, DragEventType.Drag);
        const clickHandler: IDragHandler[] = this.loadDragHandler(materials, DragEventType.Click);

        return {
            click: this.initDragHandler(clickHandler, Event.DragStart, camera, renderer),
            move: this.initDragHandler(dragHandler, Event.Drag, camera, renderer),
        };
    }

    public static resetDragManager(dragmanager: IDragManager): void {
        dragmanager.click.dispose();
        dragmanager.move.dispose();
    }
}
