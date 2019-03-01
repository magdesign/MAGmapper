import { SpriteMaterial, TextureLoader, Sprite } from "three";
import { IDimension, DimensionTransformer } from "../math/DimensionTransformer";

export class SpriteBuilder{
    public static generateDragHanldes(edges: IDimension[], source: string, scale: number): Sprite[]{
        return edges.map((edge: IDimension) => this.makeSprite(edge, source, scale));
    }

    public static makeSprite(point: IDimension, source: string, scale: number): Sprite {

        const texture = new TextureLoader().load(source);

        const material: SpriteMaterial = new SpriteMaterial({map: texture});
        let sprite: Sprite = new Sprite(material);

        sprite.position.set(point.x, point.y, point.z);
        sprite.scale.set(scale, scale, 1);
        return sprite;
    }

    public static loadSpriteEdges(scene: any, id: string){
        return scene.children
                .filter((obj) => obj.type === "Sprite" && obj.name === id)
                .map((obj) => DimensionTransformer.fromVector3D(obj.position));
    }

    public static disable(sprites: Sprite[], enable: boolean){
        sprites
            .map((sprite: Sprite) => {
                sprite.visible = enable;
                return sprite;
            });
    }
}
