const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumeButton");
const fullScreenBtn = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("jsVolume");
const videoTime = document.getElementById("jsVideoTime");

const registerView = () => {
  const videoId = window.location.href.split("/videos/")[1];
  fetch(`/api/${videoId}/view`, {
    method: "POST",
  });
};

const formatDate = (seconds) => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = `<i class="fas fa-play"></i>`;
  }
}

function handleVolumeClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
    volumeRange.value = videoPlayer.volume;
  } else {
    videoPlayer.muted = true;
    volumeBtn.innerHTML = `<i class="fas fa-volume-mute"></i>`;
    volumeRange.value = 0;
  }
}

function HandleVolumeDrag(event) {
  const {
    target: { value },
  } = event;
  videoPlayer.volume = value;
  if (value >= 0.6) {
    volumeBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
  } else if (value >= 0.2) {
    volumeBtn.innerHTML = `<i class="fas fa-volume-down"></i>`;
  } else {
    volumeBtn.innerHTML = `<i class="fas fa-volume-off"></i>`;
  }
}

function handleFullScreenClick() {
  if (!document.fullscreenElement) {
    videoContainer.requestFullscreen();
    fullScreenBtn.innerHTML = `<i class="fas fa-compress"></i>`;
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      fullScreenBtn.innerHTML = `<i class="fas fa-expand"></i>`;
    }
  }
}

function setTotalTime() {
  const totalTimeString = formatDate(videoPlayer.duration);
  totalTime.innerHTML = totalTimeString;
  videoTime.max = Math.ceil(videoPlayer.duration);
  getCurrentTime();
}
function getCurrentTime() {
  setInterval(() => {
    const currentTimeString = formatDate(Math.floor(videoPlayer.currentTime));
    currentTime.innerHTML = currentTimeString;
    videoTime.value = Math.ceil(videoPlayer.currentTime);
  }, 100);
}

function HandleVideoTimeDrag() {
  videoPlayer.currentTime = videoTime.value;
}

function handleEnded() {
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = `<i class="fas fa-play"></i>`;
  registerView();
}

function init() {
  videoPlayer.addEventListener("click", handlePlayClick);
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeClick);
  fullScreenBtn.addEventListener("click", handleFullScreenClick);
  videoPlayer.addEventListener("dblclick", handleFullScreenClick);
  document.addEventListener("DOMContentLoaded", setTotalTime);
  videoPlayer.addEventListener("ended", handleEnded);
  volumeRange.addEventListener("input", HandleVolumeDrag);
  videoTime.addEventListener("input", HandleVideoTimeDrag);
}

if (videoContainer) {
  init();
}
