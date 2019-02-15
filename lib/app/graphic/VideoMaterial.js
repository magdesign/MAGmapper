"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VideoMaterial {
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
VideoMaterial.attributes = [
    { qualifiedName: "id", value: "video" },
    { qualifiedName: "controls", value: "true" },
    { qualifiedName: "src", value: "assets/testvideo.mp4" },
    { qualifiedName: "codecs", value: "avc1.42E01E, mp4a.40.2" },
    { qualifiedName: "style", value: "display:none" }
];
exports.VideoMaterial = VideoMaterial;
