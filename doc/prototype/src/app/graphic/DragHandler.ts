import {
    TextureLoader,
    Sprite,
    SpriteMaterial,
} from "three"
import { Dimension } from "./Mapper";

const SPRITE = "../assets/draghandle.png";

export class DragHandler{


    

    public static makeSprite(point: Dimension) {
        const texture = new TextureLoader()
            .load(SPRITE);
    
        const material: SpriteMaterial = new SpriteMaterial({map: texture});
        let sprite: Sprite = new Sprite(material);

        sprite.position.set(point.x, point.y, point.z);
        sprite.scale.set(0.3, 0.3, 1);
        return sprite;
    }

}