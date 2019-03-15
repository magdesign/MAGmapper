import {Scene} from "three";
import {IVideoMaterial} from "../material/VideoMaterialBuilder";


export interface IScreen {
    screenId: string;
    scene: Scene;
}
