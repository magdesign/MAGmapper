"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const three_1 = require("three");
const three_dragcontrols_1 = require("three-dragcontrols");
const Mapper_1 = require("./Mapper");
const config_1 = require("../../config");
class LineBuilder {
    static prepareEdges(edges) {
        return [
            edges[0],
            edges[1],
            edges[3],
            edges[2],
            edges[0],
        ].map(edge => new three_1.Vector3(edge.x, edge.y, edge.z));
    }
    static addLines(scene, id, edges, prefix) {
        const material = new three_1.LineBasicMaterial({ color: 255255255255255255, linewidth: 5 });
        let geometry = new three_1.Geometry();
        geometry.vertices = this.prepareEdges(edges);
        let line = new three_1.Line(geometry, material);
        line.name = prefix + id;
        scene.add(line);
    }
    static reorderLines(scene, id, edges, prefix) {
        scene.children
            .filter((child) => child.name === prefix + id)
            .forEach((child) => {
            child.geometry.vertices = this.prepareEdges(edges);
            child.geometry.verticesNeedUpdate = true;
        });
    }
}
class SpriteBuilder {
    static generateDragHanldes(edges, source) {
        return edges.map((edge) => this.makeSprite(edge, source));
    }
    static makeSprite(point, source) {
        const texture = new three_1.TextureLoader()
            .load(source);
        const material = new three_1.SpriteMaterial({ map: texture });
        let sprite = new three_1.Sprite(material);
        sprite.position.set(point.x, point.y, point.z);
        sprite.scale.set(config_1.Config.DragHandler.scale, config_1.Config.DragHandler.scale, 1);
        return sprite;
    }
}
class PositionDragHandler {
    static initVertices(scene, renderer, camera, video) {
        new UvDragHandler(scene, renderer, camera, video);
        /*
            const edges: Dimension[] = Edges.getEdges(video.positions);
    
            const sprites: Sprite[] = SpriteBuilder.generateDragHanldes(edges, Config.DragHandler.source)
                .map((sprite: Sprite) => {
                    scene.add(sprite);
                    sprite.name = video.id;
                    return sprite;
                });
    
            LineBuilder.addLines(scene, video.id, edges, this.prefix);
    
            new DragControls(sprites, camera, renderer.domElement)
                .addEventListener('drag', () => {
                    this.loadPositions(video.id, scene, renderer, camera);
                });
        */
    }
    static loadPositions(id, scene, renderer, camera) {
        const spriteEdges = scene.children
            .filter((obj) => obj.type === "Sprite" && obj.name == id)
            .map((obj) => Mapper_1.DimensionTransformer.fromVector3D(obj.position));
        LineBuilder.reorderLines(scene, id, spriteEdges, this.prefix);
        const vertices = Mapper_1.Mapper.map(config_1.Config.Vertices.size, spriteEdges[0], spriteEdges[1], spriteEdges[2], spriteEdges[3]);
        scene.children[0].geometry.attributes.position.needsUpdate = true;
        scene.children[0].geometry.attributes.position.array = Mapper_1.DimensionTransformer.toFloatArray(vertices);
        renderer.render(scene, camera);
    }
}
PositionDragHandler.prefix = "vert";
exports.PositionDragHandler = PositionDragHandler;
class UvDragHandler {
    constructor(scene, renderer, camera, video) {
        this.prefix = "uv";
        this._scene = scene;
        const edges = Mapper_1.Edges.getEdges(video.positions);
        const sprites = SpriteBuilder.generateDragHanldes(edges, config_1.Config.DragHandler.source)
            .map((sprite) => {
            scene.add(sprite);
            sprite.name = video.id;
            return sprite;
        });
        LineBuilder.addLines(scene, video.id, edges, this.prefix);
        new three_dragcontrols_1.default(sprites, camera, renderer.domElement)
            .addEventListener('drag', () => {
            this.loadPositions(video.id, scene, renderer, camera, video.getEdgesFromScene());
        });
    }
    loadPositions(id, scene, renderer, camera, edges) {
        const spriteEdges = scene.children
            .filter((obj) => obj.type === "Sprite" && obj.name == id)
            .map((obj) => Mapper_1.DimensionTransformer.fromVector3D(obj.position));
        const uve = Mapper_1.UvMapper.reorderUvMapping(spriteEdges, edges);
        // const edges: Dimension[] = Edges.getEdges(video.positions);
        LineBuilder.reorderLines(scene, id, spriteEdges, this.prefix);
        renderer.render(scene, camera);
    }
}
exports.UvDragHandler = UvDragHandler;
