import * as Dat from "dat.gui";
import {EventHandler, EventTypes} from "../event/EventHandler";

interface IGuiItem {
    key: string;
    value: any;
    keycode?: string;
    default?: any;
    fn: (value: any) => void;
}

interface IConfig {
    title: string;
    open: boolean;
    subitems: IGuiItem[];
}

const config: IConfig[] = [
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
            {
                key: "Play/Pause",
                value: true,
                keycode: "Space",
                default: true,
                fn: (value: any ) => EventHandler.throwEvent(EventTypes.PlayVideo, value),
            }
            /*
            I need an option to input 2 values under value, the min. and the max. range, how to this object based?
            {
                key: "Speed",
                value:  0, 2,
                default: 1,
                fn: (value: any ) => EventHandler.throwEvent(EventTypes.VideoSpeed, value),
            }
            */


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
    //closed: true,
    //closeOnTop: false,
    //hideable: false,
    //preset: "autoPlace",
    //dat.GUI.toggleHide() //this shoud do the trick
    
};

// create a gui element



const gui = new Dat.GUI(initConfig);
config.map((value: IConfig) => {
    const subfolder = gui.addFolder(value.title);
    if (value.open) {
        subfolder.open();
    }

    value.subitems.map((subitem: IGuiItem) => {
        switch (typeof controller[subitem.key]) {
            case "object" :
                subfolder.add(controller, subitem.key, subitem.value).onChange(subitem.fn);
            default:
                subfolder.add(controller, subitem.key).onChange(subitem.fn);
        }
    });
});

function getKeyCodes(conf: IConfig[]): IGuiItem[] {
    return conf
        .map((subconf: IConfig): IGuiItem[] =>
            subconf.subitems.filter((guiItem: IGuiItem): boolean => "keycode" in guiItem))
        .reduce((a, b) => a.concat(b));
}

const keyItems: IGuiItem[] = getKeyCodes(config);

document.addEventListener("keydown", (event) => {
    keyItems
        .filter((keyItem: IGuiItem) => keyItem.keycode === event.code)
        .map((keyItem: IGuiItem) => {
            keyItem.value = !keyItem.value;
            return keyItem;
        })
        .map((keyItem: IGuiItem) => {
            config.forEach((conf: IConfig) => {
                gui.__folders[conf.title].__controllers
                    .filter(ctrl => ctrl.property === keyItem.key)
                    .map(ctrl => ctrl.setValue(keyItem.value));
            });
            keyItem.fn(keyItem.value);
            return keyItem;
        });
});
