import {Renderer, EventType} from "./renderer";

export function init(mapper, config) {
    // set length of video in slider
    let video = document.getElementById("video");

    document.getElementById("video-slider").max = document.getElementById("video").duration;

    document.getElementById("video-stop")
        .addEventListener("click",
            () => {
                video.pause();
                Renderer.renderMappingWithWebSocket(mapper, config, EventType.video);
            });

    document.getElementById("video-start")
        .addEventListener("click",
            () => {
                video.play();
                Renderer.renderMappingWithWebSocket(mapper, config, EventType.video);
            });

    document.getElementById("video").ontimeupdate =
        () => {
            document.getElementById("video-slider").value = video.currentTime;
        };

    document.getElementById("video-slider").oninput = () => {
        video.currentTime = document.getElementById("video-slider").value;
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

