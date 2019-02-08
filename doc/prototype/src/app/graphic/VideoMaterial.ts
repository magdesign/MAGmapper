interface Attribute {
    qualifiedName: string;
    value: string;
}

export class VideoMaterial {



    // todo set loop
    private static attributes: Attribute[] = [
        {qualifiedName: "id", value: "video"},
        {qualifiedName: "controls", value: "true"},
        {qualifiedName: "src", value: "assets/testvideo.mp4"},
        {qualifiedName: "codecs", value: "avc1.42E01E, mp4a.40.2"},
        {qualifiedName: "style", value: "display:none"}
    ];

    private static init(): HTMLVideoElement {
        let video: HTMLVideoElement = document.createElement("video");
        this.attributes.map((attr: Attribute) => video.setAttribute(attr.qualifiedName, attr.value));
        return video;
    }

    
    static loadVideo(): HTMLVideoElement {
        let video = this.init();
        document
            .getElementsByTagName("body")[0]
            .appendChild(video);

        video.play();
        return video;
    }
}
