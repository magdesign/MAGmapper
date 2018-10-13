
export function init() {
    // set length of video in slider
    document.getElementById("video-slider").max = document.getElementById("video").duration;

    document.getElementById("video-stop")
        .addEventListener("click",
            () => document.getElementById("video").pause());

    document.getElementById("video-start")
        .addEventListener("click",
            () => document.getElementById("video").play());

    document.getElementById("video").ontimeupdate =
        () => document.getElementById("video-slider").value = document.getElementById("video").currentTime;

    document.getElementById("video-slider").oninput =
        () => document.getElementById("video").currentTime = document.getElementById("video-slider").value;
}


function loadSetting(){
    const video = document.getElementById("video");
    return{
        paused: video.paused,
        currentTime: video.currentTime
    }
}

function setSetting(state) {
    const video = document.getElementById("video");
    if (state.paused){
        video.pause()
    } else{
        video.play()
    }
    video.currentTime = state.currentTime;
}


export const VideoBar = {
    init,
    loadSetting,
    setSetting
};

