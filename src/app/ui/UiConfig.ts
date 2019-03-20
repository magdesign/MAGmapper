import * as Dat from "dat.gui";
import {EventHandler, EventTypes} from "../event/EventHandler";

interface IGuiItem {
    key: string;
    value?: any;
    keycode?: string;
    default?: any;
    fn: (value: any) => void;
}

interface IConfig {
    title: string;
    open: boolean;
    subitemsValues: IGuiItem[];
    subitemsButtons: IGuiItem[];
}

const config: IConfig[] = [
    {
        title: "Sync",
        open: true,
        subitemsValues: [
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
                keycode: "KeyC",
                value: true,
                fn: (value: any) => EventHandler.throwEvent(EventTypes.Cutter, value),
            },

        ],
        subitemsButtons: [],
    },
    {
        title: "Quads",
        open: true,
        subitemsValues: [],
        subitemsButtons: [
            {
                key: "Add",
                value: true,
                fn: (value: any) => EventHandler.throwEvent(EventTypes.NewQuad, value),
            },
            {
                key: "Save",
                value: true,
                fn: (value: any) => EventHandler.throwEvent(EventTypes.Save, value),
            },
            {
                key: "Load",
                value: true,
                fn: (value: any) => EventHandler.throwEvent(EventTypes.Load, value),
            },
        ],
    },
    {
        title: "Video",
        open: true,
        subitemsValues: [
            {
                key: "Play/Pause",
                keycode: "Space",
                value: true,
                fn: (value: any) => EventHandler.throwEvent(EventTypes.PlayVideo, value),
            },
            {
                key: "Speed",
                value: 1,
                fn: (value: any) => EventHandler.throwEvent(EventTypes.VideoSpeed, value),
            },
        ],
        subitemsButtons: [],
    },
];

class ConfigManager {
    public static generateConfig(config: IConfig[], fnSubitem: (conf: IConfig) => any, fnValue: (val: any) => any) {
        return config
            .map(fnSubitem)
            .reduce((a, b) => a.concat(b))
            .map(fnValue)
            .reduce((a, b) => {
                return {...a, ...b};
            });
    }
}

const controller = ConfigManager.generateConfig(config,
    (val) => val.subitemsValues,
    (val) => {
        const obj = {};
        obj[val.key] = val.value;
        return obj;
    });

const controllerButton = ConfigManager.generateConfig(config,
    (val) => val.subitemsButtons,
    (val) => {
        const obj = {};
        obj[val.key] = val.fn;
        return obj;
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

    value.subitemsValues.map((subitem: IGuiItem) => {
        switch (typeof controller[subitem.key]) {
            case "object" :
                subfolder.add(controller, subitem.key, subitem.value).onChange(subitem.fn);

            default:
                subfolder.add(controller, subitem.key).onChange(subitem.fn);
        }
    });

    value.subitemsButtons.map((subitem: IGuiItem) => {
        subfolder.add(controllerButton, subitem.key);
    });
});

function getKeyCodes(conf: IConfig[]): IGuiItem[] {
    return conf
        .map((subconf: IConfig): IGuiItem[] =>
            subconf.subitemsValues.filter((guiItem: IGuiItem): boolean => "keycode" in guiItem))
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
