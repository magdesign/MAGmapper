import {
    TextureLoader,
    Sprite,
    SpriteMaterial,
} from "three"

const SPRITE = "textures/sprite0.png";

function setDragHandleButtons(children, points) {
    children[4].position.x = points.topRight.x;
    children[4].position.y = points.topRight.y;

    children[2].position.x = points.topLeft.x;
    children[2].position.y = points.topLeft.y;

    children[3].position.x = points.bottomRight.x;
    children[3].position.y = points.bottomRight.y;

    children[1].position.x = points.bottomLeft.x;
    children[1].position.y = points.bottomLeft.y;
    return children
}

function makeSprite(x, y) {
    const texture = new TextureLoader()
        .load(SPRITE);

    const material = new SpriteMaterial({map: texture});

    let sprite = new Sprite(material);
    sprite.position.set(x, y, 0);
    sprite.scale.set(0.3, 0.3, 1);
    return sprite;
}


export const DragHandle = {
    setDragHandleButtons,
    makeSprite
};