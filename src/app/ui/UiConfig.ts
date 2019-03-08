import * as Dat from "dat.gui";
import { Mapper } from "../math/Mapper";
import { EventHandler, EventTypes } from "../event/EventHandler";
import { type } from "os";
import { exists } from "fs";


interface GuiItem {
    key: string;
    value: any;
    keycode?: string;
    default?: any;
    fn: (value:any) => void
}

interface Config {
    title: string;
    open: boolean;
    subitems: GuiItem[];
}


const config: Config[] = [
    {
        title: "Sync",
        open: true,
        subitems: [
            {
                key: "Wireframe",
                value: false,
                keycode: "KeyW",
                fn: (value) => EventHandler.throwEvent(EventTypes.Wireframe, value),
            },
            {
                key: "Outlines",
                value: false,
                keycode: "KeyO",
                fn: (value) => EventHandler.throwEvent(EventTypes.Outlines, value),
            },
            {
                key: "Cutter",
                value: true,
                keycode: "KeyC",
                fn: (value: any) => EventHandler.throwEvent(EventTypes.Cutter, value),
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
    closeOnTop: false,
    hideable: false,

    preset: "autoPlace"
}

// create a gui element
const gui = new Dat.GUI(initConfig);

config.map((value: Config) => {
    const subfolder = gui.addFolder(value.title);
    if (value.open) {
        subfolder.open();
    }

    value.subitems.map((subitem: GuiItem) => {
        switch (typeof controller[subitem.key]) {
            case "object" :
                subfolder.add(controller, subitem.key, subitem.value).onChange(subitem.fn);
            default:
                subfolder.add(controller, subitem.key).onChange(subitem.fn);
        }
    });
});


function getKeyCodes(config: Config[]): GuiItem[]{
    return config
                .map((conf: Config): GuiItem[]  => 
                    conf.subitems.filter((guiItem: GuiItem): boolean =>  'keycode' in guiItem))
                .reduce((a, b) => a.concat(b));
}

function getTitleValues(config: Config[]){
    return config.map(conf => conf.title);
}

const keyItems: GuiItem[] = getKeyCodes(config);

document.addEventListener('keydown', (event) => {
    keyItems
        .filter((keyItem: GuiItem) => keyItem.keycode === event.code)
        .map((keyItem: GuiItem) => {
            keyItem.value  = !keyItem.value
            return keyItem;
        })
        .map((keyItem: GuiItem) => {
            config.forEach(conf => {
                gui.__folders[conf.title].__controllers
                            .filter(ctrl => ctrl.property === keyItem.key)
                            .map(ctrl => ctrl.setValue(keyItem.value));
            });
            keyItem.fn(keyItem.value);
            return keyItem;
        })
})
