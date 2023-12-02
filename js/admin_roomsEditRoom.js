import axios from "axios";
import { _url } from "./config";

// http://localhost:5173/CaaaaatHappliyEverAfter/pages/admin_roomsEditRoom.html?id=51，把id文字跟數字拆開，方便後面 get rooms/id

const id = location.href.split("=")[1];

// DOM
const roomName = document.querySelector(".roomName");
const roomPrice = document.querySelector(".roomPrice");
const roomUrl = document.querySelector(".roomUrl");
const roomImage = document.querySelector(".roomImage");
const roomCatLimit = document.querySelector(".roomCatLimit");
const roomFacilities = document.querySelector(".roomFacilities");
const roomMustKnow = document.querySelector(".roomMustKnow");
const saveRoomBtn = document.querySelector(".saveRoomBtn");

// 用 rooms?id=${id} 時，下面的 value 要 =res.data[0].屬性，因為回傳的是一筆陣列包物件
function init() {
  axios
    .get(`${_url}/rooms/${id}`)
    .then(function (res) {
      renderData(res);
    })
    .catch(function (error) {
      console.log(error);
    });
}

init();

function renderData(res) {
  console.log(res.data);
  roomName.value = res.data.name;
  roomPrice.value = res.data.price;
  roomUrl.value = res.data.imageUrl;
  roomImage.setAttribute("src", res.data.imageUrl);
  roomCatLimit.value = "1";
  roomFacilities.textContent = res.data.facility;
  roomMustKnow.textContent = `1. 請入住前確認貓咪都已注射疫苗 2. 特殊需求請在訂房時告知，若未告知恕不負責 3. 房費均已含飲食費用 4. 逾時每貓每小時加收$300`;
}

saveRoomBtn.addEventListener("click", function () {
  let obj = {
    name: roomName.value,
    imageUrl: roomUrl.value,
    price: Number(roomPrice.value),
    // rooms facility 要用.split呈現陣列包字串
    facility: roomFacilities.textContent.split(","),
  };

  // 使用 patch 更新部分內容
  axios.patch(`${_url}/rooms/${id}`, obj).catch(function (error) {
    console.log(error);
  });
});
