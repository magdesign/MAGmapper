import { EventHandler, EventTypes } from "../event/EventHandler";

interface IAttribute {
    qualifiedName: string;
    value: string;
}

export class HtmlVideoMaterial {


    // set loop and autoplay, since sometimes it works, sometimes not
    private static attributes: IAttribute[] = [
        //{qualifiedName: "id", value: "myFile"},
        {qualifiedName: "autoplay", value: "autoplay"},
        {qualifiedName: "loop", value: "loop"},
        //{qualifiedName: "src", value: "assets/testvideo.mp4"},
        //{qualifiedName: "controls", value: "controls"},
        {qualifiedName: "codecs", value: "avc1.42E01E, mp4a.40.2"},
        {qualifiedName: "style", value: "display:none"},
    ];

    public static loadVideo(id: string,  src: string): HTMLVideoElement {
        const video = this.init(id, src);
        
        document
            .getElementsByTagName("body")[0]
            .appendChild(video);

        EventHandler.addEventListener(EventTypes.PlayVideo, (value) => {
            if (value.detail.value){
                video.play(); // wenn value.details
            } else {
                video.pause();
            }
        })
        return video;
    }

    private static init(id: string, src: string): HTMLVideoElement {
        const video: HTMLVideoElement = document.createElement("video");
        
        this.attributes.map((attr: IAttribute) => {
            video.setAttribute(attr.qualifiedName, attr.value);
        });
               
        video.setAttribute("id", id);
        video.setAttribute("src", src);

        return video;
    }
}
