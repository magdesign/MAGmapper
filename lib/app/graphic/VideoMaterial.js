"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const three_1 = require("three");
const Mapper_1 = require("./Mapper");
const config_1 = require("../../config");
class VideoMaterial {
    constructor(id, source, scene) {
        this._id = id;
        this._scene = scene;
        const video = HtmlVideoMaterial.loadVideo();
        const indices = Mapper_1.Indices.calcIndices(config_1.Config.Vertices.size);
        this._positions = Mapper_1.Mapper.vertices(config_1.Config.Vertices.size, 2);
        this._uvs = Mapper_1.Mapper.uv(config_1.Config.Vertices.size);
        let geometry = new three_1.BufferGeometry();
        geometry.setIndex(indices);
        geometry.addAttribute('position', new three_1.BufferAttribute(Mapper_1.DimensionTransformer.toFloatArray(this._positions), 3));
        geometry.addAttribute('uv', new three_1.BufferAttribute(Mapper_1.DimensionTransformer.toFloatArray(this._uvs), 3));
        const texture = new three_1.VideoTexture(video);
        texture.generateMipmaps = false;
        texture.wrapS = texture.wrapT = three_1.ClampToEdgeWrapping;
        texture.minFilter = three_1.LinearFilter;
        this._videoMesh = new three_1.Mesh(geometry, new three_1.MeshBasicMaterial({ map: texture, wireframe: false }));
        this._videoMesh.name = this._id;
        this._scene.add(this._videoMesh);
    }
    getEdgesFromScene() {
        return this._scene.children
            .filter((obj) => obj.type === "Mesh" && obj.name == this._id)
            .map((video) => video.geometry.attributes.position.array)
            .map(val => Mapper_1.DimensionTransformer.fromFloatArrayToDimension(val))
            .map(val => Mapper_1.Edges.getEdges(val))[0];
    }
    get id() {
        return this._id;
    }
    get videoMesh() {
        return this._videoMesh;
    }
    get positions() {
        return this._positions;
    }
}
exports.VideoMaterial = VideoMaterial;
class HtmlVideoMaterial {
    static init() {
        let video = document.createElement("video");
        this.attributes.map((attr) => video.setAttribute(attr.qualifiedName, attr.value));
        return video;
    }
    static loadVideo() {
        let video = this.init();
        document
            .getElementsByTagName("body")[0]
            .appendChild(video);
        video.play();
        return video;
    }
}
// todo set loop
HtmlVideoMaterial.attributes = [
    { qualifiedName: "id", value: "video" },
    { qualifiedName: "controls", value: "true" },
    { qualifiedName: "src", value: "assets/testvideo.mp4" },
    { qualifiedName: "codecs", value: "avc1.42E01E, mp4a.40.2" },
    { qualifiedName: "style", value: "display:none" }
];
