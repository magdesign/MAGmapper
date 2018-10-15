import {Renderer, EventType} from "./renderer";


function getVideoElement() {
    return document.getElementById("video");
}

export function init(mapper, config) {
    // set length of video in slider

    document.getElementById("video-slider").max = document.getElementById("video").duration;

    document.getElementById("video-stop")
        .addEventListener("click",
            () => {
                getVideoElement().pause();
                Renderer.renderMappingWithWebSocket(mapper, config, EventType.video);
            });

    document.getElementById("video-start")
        .addEventListener("click",
            () => {
                getVideoElement().play();
                Renderer.renderMappingWithWebSocket(mapper, config, EventType.video);
            });

    document.getElementById("video").ontimeupdate =
        () => {
            document.getElementById("video-slider").value = getVideoElement().currentTime;
        };

    document.getElementById("video-slider").oninput = () => {
        getVideoElement().currentTime = document.getElementById("video-slider").value;
        Renderer.renderMappingWithWebSocket(mapper, config, EventType.video);
    }
}


function loadSetting() {
    const video = document.getElementById("video");
    return {
        paused: video.paused,
        currentTime: video.currentTime
    }
}

function setSetting(state) {
    const video = document.getElementById("video");
    if (state.paused) {
        video.pause()
    } else {
        video.play()
    }
    video.currentTime = state.currentTime;
}


export const VideoBar = {
    init,
    loadSetting,
    setSetting
};

