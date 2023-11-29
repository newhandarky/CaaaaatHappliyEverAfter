//改變 nav Bar 當前頁面的顏色
const aboutusLink = document.getElementById("rooms");
aboutusLink.style.color = "#FA863E";

// 使用JavaScript禁用影片的控制欄
const video = document.getElementById("myVideo");
video.removeAttribute("controls");

// 監聽影片播放完畢事件，並重新播放
video.addEventListener("ended", function () {
  video.play();
});
