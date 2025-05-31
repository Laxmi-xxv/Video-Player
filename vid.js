function Video(a, b, c) {
  //!create obj of video
  this.id = a; //^ index of vid
  this.name = b; //^ name of vid
  // this.imagePth = c;
  this.videoPth = c; //^ path of vid
}
//^ tino ko new obj banake store kiya
let storage = [
  new Video(1, "1.Kabira", "./Kabira.mp4"),
  new Video(2, "2.Ishq Risk", "./Ishq Risk.mp4"),
  new Video(3, "3.Na koi hai", "./Na koi hai.mp4"),
  new Video(4, "4.Snam re", "./Snam re.mp4"),
  new Video(5, "5.Thoda thoda pyarr hua ", "./Thoda thoda pyar.mp4"),
  new Video(6, "6.EK Mulakat", "./Ek mulakat.mp4"),
];
console.log(storage);

let video = document.querySelector("video");
let videoName = document.querySelector("h5");
// let audio = document.querySelector("audio");
let videoLength = document.querySelectorAll("input")[0];
let previousBtn = document.querySelector(".fa-backward");
let pauseBtn = document.querySelector(".fa-pause");
let playBtn = document.querySelector(".fa-play");
let forwardBtn = document.querySelector(".fa-forward");
let volumeSlider = document.querySelectorAll("input")[1];
let slider = document.getElementById("slider");
let value = document.querySelector("#value");
let shuffleBtn = document.querySelector(".fa-shuffle");
// value.textContent = volumeBtn.value;
// console.log(
//   image,
//   videoName,
//   audio,
//   videoLength,
//   previousBtn,
//   pauseBtn,
//   playBtn,
//   forwardBtn,
//   volumeBtn
// );

let index = 0; //^ start with 1st song
let realTime = 0; //^ help krega vid jaha pause hua vahi se resume krne me
let interval = null; //^ vid ke slider ko mange krne ke liye
videoLength.value = 0;
video.src = storage[index].videoPth;

//! >>>>>>>>>>>>>>>>> logic for song play <<<<<<<<<<<<<<<
function playSong() {
  videoName.innerHTML = storage[index].name;
  video.src = storage[index].videoPth;
  video.currentTime = realTime;

  interval = setInterval(() => {
    //^  ager video.duration =30sec or video.currentTime=15sec
    //^ to videoLength.value = 50 .. mtlb adha vid play hua to slider half age ana chahiye total slider ka

    videoLength.value = (video.currentTime / video.duration) * 100; //^ vid ke slider ko age shift kerne ke liye
    // audio.currentTime = (videoLength.value * audio.duration) / 100;
  }, 10); //^ yaha ager time 1000=1sec kru to slider 1 sec ke bad shift hoga .islieye 10milsec for smoothe slider
}
// playSong();

//!>>>>>>>>>>>>>>>> Play button <<<<<<<<<<<<<<<<<<<<
playBtn.addEventListener("click", () => {
  playSong();
  video.play();
  playBtn.classList.toggle("pp");
  pauseBtn.classList.toggle("pp");
});

//! >>>>>>>>>>>>>>>>>>>>> Pause button <<<<<<<<<<<<<<<<<<<<<
pauseBtn.addEventListener("click", () => {
  video.pause();
  realTime = video.currentTime; //^ jaha hai vahi ruk jaye
  playBtn.classList.toggle("pp");
  pauseBtn.classList.toggle("pp");
  // audio.pauseBtn.classList.toggle("pp");
  // playBtn.classList.toggle("pp");
});

//! >>>>>>>>>>>>>>>>>>>>>> Forward button <<<<<<<<<<<<<<<<<<
forwardBtn.addEventListener("click", () => {
  // index = (index + 1) % storage.length;
  // realTime = 0;
  // playSong();
  // audio.play();
  if (video.paused) {
    pauseBtn.classList.toggle("pp");
    playBtn.classList.toggle("pp");
  }
  index = (index + 1) % storage.length; //^ if index=1 n lenth =3 then...2%3=2 ..play 3rd song
  realTime = 0;
  playSong();
  video.play();
});

//! >>>>>>>>>>>>>>>>>>>> Previous button <<<<<<<<<<<<<<<<<<<<<<<
previousBtn.addEventListener("click", () => {
  if (video.paused) {
    pauseBtn.classList.toggle("pp");
    playBtn.classList.toggle("pp");
  }
  index = (index - 1 + storage.length) % storage.length;
  realTime = 0;
  playSong();
  video.play();
});

//! >>>>>>>>>>> Vidlength =  vidcurrentTime <<<<<<<<<<<<<<<
videoLength.addEventListener("input", () => {
  //^ vid jaha roka usi length or time se  fir se vid play hona chahiye
  video.currentTime = (videoLength.value * video.duration) / 100;
});

//! >>>>>>>>>> vid ending <<<<<<<<<<<<<
video.addEventListener("ended", () => {
  index = (index + 1) % storage.length;
  realTime = 0;
  playSong();
  video.play();
});

//! >>>>>>>>>>>>>>> shffle button <<<<<<<<<<<<<<<<<<
shuffleBtn.addEventListener("dblclick", () => {
  // if (video.paused) {
  //   pauseBtn.classList.toggle("pp");
  //   playBtn.classList.toggle("pp");
  // }
  index = Math.floor(Math.random() * storage.length);
  console.log(index);
  realTime = 0;
  playSong();
  video.play();
});

//! >>>>>>>>>>>>> Volume Button <<<<<<<<<<<<<<<<
volumeSlider.addEventListener("input", (e) => {
  let value = 0;
  value.innerHTML = slider.value;
  value.textContent = e.target.value;
  video.volume = volumeSlider.value / 100;
  realTime = video.currentTime;
  let display_vlm = document.querySelector(".display_vlm");
  display_vlm.innerHTML = volumeSlider.value;
  // console.log(value);
  // console.log(slider.value);
});

