"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const three_1 = require("three");
const VideoMaterial_1 = require("./VideoMaterial");
const Mapper_1 = require("./Mapper");
const DragHandler_1 = require("./DragHandler");
const uuid_1 = require("uuid");
const DataService_1 = require("../service/DataService");
const config_1 = require("../../config");
class Graphic {
    static init() {
        let scene = new three_1.Scene();
        const video = VideoMaterial_1.VideoMaterial.loadVideo();
        let geometry = new three_1.BufferGeometry();
        const indices = Mapper_1.Indices.calcIndices(config_1.Config.verticesSize);
        const pos = Mapper_1.Mapper.vertices(config_1.Config.verticesSize, config_1.Config.verticesLength);
        const uv = Mapper_1.DimensionTransformer.toFloatArray(Mapper_1.Mapper.uv(config_1.Config.verticesSize));
        geometry.setIndex(indices);
        geometry.addAttribute('position', new three_1.BufferAttribute(Mapper_1.DimensionTransformer.toFloatArray(pos), 3));
        geometry.addAttribute('uv', new three_1.BufferAttribute(uv, 3));
        const texture = new three_1.VideoTexture(video);
        texture.generateMipmaps = false;
        texture.wrapS = texture.wrapT = three_1.ClampToEdgeWrapping;
        texture.minFilter = three_1.LinearFilter;
        let mesh = new three_1.Mesh(geometry, new three_1.MeshBasicMaterial({ map: texture, wireframe: false }));
        const id = uuid_1.v4();
        mesh.name = id;
        scene.add(mesh);
        let camera = this.loadCamera(scene);
        let renderer = this.loadRenderer();
        DragHandler_1.DragHandler.generateEgdeSprites(id, scene, renderer, camera, pos);
        this.rendermagic(renderer, camera, scene);
    }
    static loadRenderer() {
        let renderer = new three_1.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        return renderer;
    }
    static loadCamera(scene) {
        let camera = new three_1.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 5;
        camera.lookAt(scene.position);
        return camera;
    }
    static rendermagic(renderer, camera, scene) {
        function animate() {
            requestAnimationFrame(animate);
            if (DataService_1.DataService.Service.update) {
                scene.children[0].geometry.attributes.position.needsUpdate = DataService_1.DataService.Service.update;
                scene.children[0].geometry.attributes.position.array = DataService_1.DataService.Service.positions;
            }
            render();
        }
        function render() {
            renderer.render(scene, camera);
        }
        animate();
    }
}
Graphic.init();
