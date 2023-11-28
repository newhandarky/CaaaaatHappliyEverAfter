//改變 nav Bar 當前頁面的顏色
const aboutusLink = document.getElementById("rooms");
aboutusLink.style.color = "#FA863E";

let catMotion_01 = bodymovin.loadAnimation({
  container: document.getElementById("catMotion_01"),
  render: "svg",
  loop: true,
  autoplay: true,
  path: "../js/catMotion_01.json",
});

let catMotion_02 = bodymovin.loadAnimation({
  container: document.getElementById("catMotion_02"),
  render: "svg",
  loop: true,
  autoplay: true,
  path: "../js/catMotion_02.json",
});

let catMotion_03 = bodymovin.loadAnimation({
  container: document.getElementById("catMotion_03"),
  render: "svg",
  loop: true,
  autoplay: true,
  path: "../js/catMotion_03.json",
});

// 使用JavaScript禁用影片的控制欄
const video = document.getElementById("myVideo");
video.removeAttribute("controls");

// 監聽影片播放完畢事件，並重新播放
video.addEventListener("ended", function () {
  video.play();
});
