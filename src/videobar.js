const id = "videobar";

export function VideoBar() {


    setVideoLengthInSlider();


    document.getElementById("video-stop")
        .addEventListener("click", () => document.getElementById("video").pause());

    document.getElementById("video-start")
        .addEventListener("click", () => document.getElementById("video").play());

    document.getElementById("video").ontimeupdate = function () {
        const length = document.getElementById("video").currentTime;
        document.getElementById("video-slider").value = length;


    };


    document
        .getElementById("video-slider")
        .oninput = () => output.innerHTML = this.value;


}

function setVideoLengthInSlider() {
    const length = document.getElementById("video").duration;
    document.getElementById("video-slider").max = length
}