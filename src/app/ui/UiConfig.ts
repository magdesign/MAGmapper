import * as Dat from 'dat.gui';
import { Mapper } from "../math/Mapper";

export enum EventTypes{
    Wireframe = "wireframe",
    Cutter = "cutter",
    Outlines = "outlines",
}

export class EventHandler{

    public static addEventListener(type: EventTypes, fn: (val: any ) => void): void {
        this.getEventHandler()
            .addEventListener(type, fn, false);;
    }

    



    public static throwEvent(type: EventTypes, value: any): void {
            const event = new CustomEvent(type, { detail: {value}});
            this.getEventHandler().dispatchEvent(event);
    }

    private static getEventHandler(): any {
        return document.getElementsByTagName("body")[0];
    }
}

const config = [
    {
        title: "Sync",
        subitems: [
            {
                key: "Wireframe",
                value: false,
                fn: (value) => EventHandler.throwEvent(EventTypes.Wireframe, value),
            },
            {
                key: "Outlines",
                value: true,
                fn: (value) => EventHandler.throwEvent(EventTypes.Outlines, value),
            },
            {
                key: "Cutter",
                value: true,
                fn: (value) => EventHandler.throwEvent(EventTypes.Cutter, value),
            }
        ]
    }
]

const controller = config
    .map(val => val.subitems)
    .reduce((a, b) => a.concat(b))
    .map(val => {
        let  obj = {};
        obj[val.key] = val.value;
        return obj;
    })
    .reduce((a,b)=> <any>{...a, ...b});

// create a gui element
let gui: Dat.GUI = new Dat.GUI();

config.map((value) => {
    const subfolder = gui.addFolder(value.title);
    value.subitems.map((subitem: any) => {
        subfolder.add(controller, subitem.key).onChange(subitem.fn);
    });
})
