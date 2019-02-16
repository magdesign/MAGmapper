"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const three_1 = require("three");
const VideoMaterial_1 = require("./VideoMaterial");
const DragHandler_1 = require("./DragHandler");
const uuid_1 = require("uuid");
class Graphic {
    static init() {
        const id = uuid_1.v4();
        let scene = new three_1.Scene();
        let videoMaterial = new VideoMaterial_1.VideoMaterial(id, "", scene);
        let camera = this.loadCamera(scene);
        let renderer = this.loadRenderer();
        DragHandler_1.PositionDragHandler.initVertices(scene, renderer, camera, videoMaterial);
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
            render();
        }
        function render() {
            renderer.render(scene, camera);
        }
        animate();
    }
}
Graphic.init();
