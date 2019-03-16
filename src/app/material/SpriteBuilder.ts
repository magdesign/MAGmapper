import {Sprite, SpriteMaterial, TextureLoader} from "three";
import {DimensionTransformer, IDimension} from "../math/DimensionTransformer";

export class SpriteBuilder {
    public static generateDragHanldes(name: string, edges: IDimension[], source: string, scale: number): Sprite[] {
        return edges.map((edge: IDimension) => this.makeSprite(name, edge, source, scale));
    }

    public static makeSprite(name: string, point: IDimension, source: string, scale: number): Sprite {

        const texture = new TextureLoader().load(source);

        const material: SpriteMaterial = new SpriteMaterial({map: texture});
        const sprite: Sprite = new Sprite(material);

        sprite.position.set(point.x, point.y, point.z);
        sprite.name = name;


        const randomZ = Math.random() * 10;
        sprite.scale.set(scale, scale, randomZ);

        return sprite;
    }

    public static loadSpriteEdges(sprites: Sprite[]) {
        return sprites
            .map((obj) => DimensionTransformer.fromVector3D(obj.position));
    }

    public static disable(sprites: Sprite[], enable: boolean) {
        sprites
            .map((sprite: Sprite) => {
                sprite.visible = enable;
                return sprite;
            });
    }
}
