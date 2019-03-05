import * as Dat from "dat.gui";
import { Mapper } from "../math/Mapper";
import { EventHandler, EventTypes } from "../event/EventHandler";
import { type } from "os";

const config = [
    {
        title: "Sync",
        open: true,
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
            },
            {
                key: "test",
                value: [0,1,2,3],
                default: 0,
                fn: (value) => EventHandler.throwEvent(EventTypes.Screen, value),
            },
        ],
    },
];

const controller = config
    .map((val) => val.subitems)
    .reduce((a, b) => a.concat(b))
    .map((val) => {
        const obj = {};
        obj[val.key] = val.value;
        return obj;
    })
    .reduce((a, b) => {
        return {...a, ...b};
    });


// create a gui element
const gui: Dat.GUI = new Dat.GUI();

//close gui element as default, it somehow does not find the closeOnTop definition, but its written in index.d.ts:
// do I have to manally add it in index.d.ts or what do I wrong?
//gui.closeOnTop = true;
//interface.gui.closeOnTop = true;
//closeOnTop = true;

//Dat.GUI.closeOnTop = true;
//gui.closeOnTop = ();




config.map((value) => {
    const subfolder = gui.addFolder(value.title);
    if (value.open) {
        subfolder.open();
    }

    value.subitems.map((subitem: any) => {
        switch (typeof controller[subitem.key]) {
            case "object" :
                subfolder.add(controller, subitem.key, subitem.value).onChange(subitem.fn);
            default:
                subfolder.add(controller, subitem.key).onChange(subitem.fn);
        }
    });
});
