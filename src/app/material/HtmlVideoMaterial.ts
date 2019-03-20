import {EventHandler, EventTypes} from "../event/EventHandler";
import doc = Mocha.reporters.doc;

interface IAttribute {
    qualifiedName: string;
    value: string;
}

export class HtmlVideoMaterial {

    // set loop and autoplay, since sometimes it works, sometimes not
    private static attributes: IAttribute[] = [
        {qualifiedName: "autoplay", value: "autoplay"},
        {qualifiedName: "loop", value: "loop"},
        {qualifiedName: "codecs", value: "avc1.42E01E, mp4a.40.2"},
        {qualifiedName: "style", value: "display:none"},
    ];

    public static loadVideo(src: string): any {
        return document
            .getElementsByName("video");
    }


    public static initVideo(src: string): HTMLVideoElement {
        const video: HTMLVideoElement = this.createVideoElement(src);
        video.setAttribute("id", src);


        document
            .getElementsByTagName("body")[0]
            .appendChild(video);

        // das Teil macht play oder pause

        this.handleEvents(video);
        return video;
    }

    private static handleEvents(video: HTMLVideoElement) {
        EventHandler.addEventListener(EventTypes.PlayVideo, (event) => {
            if (event.detail.value) {
                video.play(); // wenn value.details.value true ist
            } else {
                video.pause();
            }
        });

        EventHandler.addEventListener(EventTypes.VideoSpeed, (event) => {
            video.playbackRate = event.detail.value;
        });
    }


    private static createVideoElement(src: string): HTMLVideoElement {
        const video: HTMLVideoElement = document.createElement("video");

        this.attributes.map((attr: IAttribute) => {
            video.setAttribute(attr.qualifiedName, attr.value);
        });

        video.setAttribute("src", src);

        return video;
    }
}
