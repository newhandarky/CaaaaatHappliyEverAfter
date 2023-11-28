import Plyr from "plyr";

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

// 初始化 Plyr
const player = new Plyr("#myVideo", {
  controls: false, // 禁用控制欄
  autoplay: true, // 自動播放
  loop: { active: true }, // 循環播放
  fullscreen: { enabled: false, fallback: false, iosNative: false }, // 允許全屏
});
