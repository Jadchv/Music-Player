const musicContainer = document.querySelector(".music-container");
const playBtn = document.querySelector("#play");
const playIcon = document.querySelector(".icon-play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");
const timer = document.querySelector(".current-time");
const timeLeft = document.querySelector(".duration");

// Song titles

const songs = ["gladiator", "titanic", "frodo"];

//keep track of the songs
//ici gladiator par défaut

let songIndex = 0;

//initially load song info DOM

loadSong(songs[songIndex]);

//Update song details

function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.png`;
}

function playSong() {
  musicContainer.classList.add("play");

  playIcon.src = "images/Stop_fill.svg";
  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");

  playIcon.src = "images/Play_fill.svg";
  audio.pause();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}
// Event Listeners

//1 - the play button

playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// 2 Change song events

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// 3 Progress bar
audio.addEventListener("timeupdate", updateProgress);

progressContainer.addEventListener("click", setProgress);

// Go to the next song automatically

audio.addEventListener("ended", nextSong);
