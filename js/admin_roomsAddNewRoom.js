import axios from "axios";
import { _url } from "./config";
import { headerObj } from "./admin_config";

// http://localhost:5173/CaaaaatHappliyEverAfter/pages/admin_roomsEditRoom.html?id=51，把id文字跟數字拆開，方便後面 get rooms/id

const id = location.href.split("=")[1];

// DOM
const roomName = document.querySelector(".roomName");
const roomPrice = document.querySelector(".roomPrice");
const roomUrl = document.querySelector(".roomUrl");
const previewImage = document.querySelector(".previewImage");
const roomImage = document.querySelector(".roomImage");
const roomFacilities = document.querySelector(".roomFacilities");
const saveRoomBtn = document.querySelector(".saveRoomBtn");

// 新增房型功能
saveRoomBtn.addEventListener("click", function () {
  let obj = {
    name: roomName.value,
    imageUrl: roomUrl.value,
    price: Number(roomPrice.value),
    // rooms facility 要用.split呈現陣列包字串
    facility: roomFacilities.textContent.split(","),
  };

  // 使用 post 傳遞新房型到資料庫，headerObj 驗證需放最後參數
  axios.post(`${_url}/660/rooms/${id}`, obj, headerObj).catch(function (error) {
    console.log(error);
  });
});

// 預覽房型圖片
previewImage.addEventListener("click", renderImage);

function renderImage() {
  roomImage.setAttribute("src", roomUrl.value);
}
