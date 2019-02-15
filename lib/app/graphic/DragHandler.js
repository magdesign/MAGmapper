"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const three_1 = require("three");
const three_dragcontrols_1 = require("three-dragcontrols");
const Mapper_1 = require("./Mapper");
const DataService_1 = require("../service/DataService");
const config_1 = require("../../config");
class SpriteBuilder {
    static generateDragHanldes(edges) {
        return edges.map(this.makeSprite);
    }
    static makeSprite(point) {
        const texture = new three_1.TextureLoader()
            .load(config_1.Config.dragHandleSource);
        const material = new three_1.SpriteMaterial({ map: texture });
        let sprite = new three_1.Sprite(material);
        sprite.position.set(point.x, point.y, point.z);
        sprite.scale.set(config_1.Config.dragHandleScale, config_1.Config.dragHandleScale, 1);
        return sprite;
    }
    static addLines(scene, id, edges) {
        var material = new three_1.LineBasicMaterial({ color: 255, linewidth: 2 });
        var geometry = new three_1.Geometry();
        geometry.name = "line_" + id;
        edges.map((edge) => {
            return edge.geometry;
        });
        geometry.vertices.push(new three_1.Vector3(0, 0, 0), new three_1.Vector3(0, 0, 0), new three_1.Vector3(1, 0, 0));
        var line = new three_1.Line(geometry, material);
        scene.add(line);
    }
}
class DragHandler {
    static generateEgdeSprites(id, scene, renderer, camera, points) {
        const sprites = SpriteBuilder.generateDragHanldes(Mapper_1.Edges.getEdges(points))
            .map((sprite) => {
            scene.add(sprite);
            sprite.name = id;
            return sprite;
        });
        SpriteBuilder.addLines(scene, id, sprites);
        new three_dragcontrols_1.default(sprites, camera, renderer.domElement)
            .addEventListener('drag', () => {
            this.loadPositions(id, scene, renderer, camera);
        });
        return scene;
    }
    static loadPositions(id, scene, renderer, camera) {
        const spriteEdges = scene.children
            .filter((obj) => obj.type === "Sprite" && obj.name == id)
            .map((obj) => Mapper_1.DimensionTransformer.fromVector3D(obj.position));
        DataService_1.DataService.Service.positions = Mapper_1.DimensionTransformer
            .toFloatArray(Mapper_1.Mapper.map(config_1.Config.verticesSize, spriteEdges[0], spriteEdges[1], spriteEdges[2], spriteEdges[3]));
    }
}
exports.DragHandler = DragHandler;
