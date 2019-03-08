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

// todo: MAG should hide frame
const initConfig: Dat.GUIParams = {
    closed: true,
    closeOnTop: true,
    hideable: true,
    preset: "autoPlace"
}

// create a gui element
const gui: Dat.GUI = new Dat.GUI(initConfig);

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
