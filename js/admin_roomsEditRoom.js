import axios from "axios";
import { _url } from "./config";

// http://localhost:5173/CaaaaatHappliyEverAfter/pages/admin_accountEditMember.html?id=1052，把id文字跟數字拆開，方便後面 get rooms/id
console.log(location.href);
const id = location.href.split("=")[1];

const roomName = document.querySelector(".roomName");
const roomPrice = document.querySelector(".roomPrice");
const roomUrl = document.querySelector(".roomUrl");
const roomCatLimit = document.querySelector(".roomCatLimit");
const roomFacilities = document.querySelector(".roomFacilities");
const roomMustKnow = document.querySelector(".roomMustKnow");

//rooms?id=52 不能渲染出畫面 會顯示undefined
axios.get(`${_url}/rooms/${id}`).then(function (res) {
  roomName.value = res.data.name;
  roomPrice.value = res.data.price;
  roomUrl.value = "";
  roomCatLimit.value = "1";
  roomFacilities.textContent = res.data.facility;
  roomMustKnow.textContent = `1. 請入住前確認貓咪都已注射疫苗 2. 特殊需求請在訂房時告知，若未告知恕不負責 3. 房費均已含飲食費用 4. 逾時每貓每小時加收$300`;
});
