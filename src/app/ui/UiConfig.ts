import * as Dat from 'dat.gui';
import { Mapper } from '../graphic/Mapper';

export enum EventTypes{
    Wireframe = "wireframe",
    Cutter = "cutter",
    Outlines = "outlines"
}


export class EventHandler{

    private static getEventHandler(): any{
        return document.getElementsByTagName("body")[0];
    }

    public static addEventListener(type: EventTypes, fn: (val: any )=> void){
        this.getEventHandler()
            .addEventListener(EventTypes.Wireframe, fn, false);;
    }

    public static throwEvent(type: EventTypes, value: any): void {
            let event = new CustomEvent(EventTypes.Wireframe, { detail: {
                value: value,
                type: type
            }});
            this.getEventHandler()
                .dispatchEvent(event)
        
    }

}


const config = [
    {
        title: "Sync",
        subitems: [
            { 
                key: 'Wireframe', 
                value: false,    
                fn: (value) => EventHandler.throwEvent(EventTypes.Wireframe, value)
            },
            { key: 'Outlines',      value: false,      fn: (value) => EventHandler.throwEvent(EventTypes.Cutter, value)},
            { key: 'Cutter',    value: true,    fn: (value) => EventHandler.throwEvent(EventTypes.Cutter, value)}
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


config.map(value => {
    let subfolder = gui.addFolder(value.title);
    value.subitems.map(subitem => {
        subfolder.add(controller, subitem.key).onChange(subitem.fn)
    })
})
