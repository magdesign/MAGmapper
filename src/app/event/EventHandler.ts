export enum EventTypes {
    Wireframe = "wireframe",
    Cutter = "cutter",
    Outlines = "outlines",
    PlayVideo = "PlayVideo",
    NewQuad = "newQuad",
    RemoveQuad = "removeQuad",
    DragQuad = "dragQuad",
    MoveQuad = "moveQuad",
}

export class EventHandler {

    public static addEventListener(type: EventTypes, fn: (val: any) => void): void {
        this.getEventHandler()
            .addEventListener(type, fn, false);
    }

    public static throwEvent(type: EventTypes, value: any): void {
        const event = new CustomEvent(type, {detail: {value}});
        this.getEventHandler().dispatchEvent(event);
    }

    private static getEventHandler(): any {
        return document.getElementsByTagName("body")[0];
    }
}
