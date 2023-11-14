import axios from "axios";
import { _url } from "./config";

// http://localhost:5173/CaaaaatHappliyEverAfter/pages/admin_accountEditMember.html?id=1052，把id文字跟數字拆開，方便後面 get rooms/id
const id = location.href.split("=")[1];
const roomName = document.querySelector(".roomName");
const roomPrice = document.querySelector(".roomPrice");
const roomUrl = document.querySelector(".roomUrl");
const roomCatLimit = document.querySelector(".roomCatLimit");
const roomFacilities = document.querySelector(".roomFacilities");
const roomMustKnow = document.querySelector(".roomMustKnow");

axios.get(`${_url}/rooms/${id}`).then(function (res) {
  roomName.value = res.data.name;
  roomPrice.value = res.data.price;
  roomName.value = res.data.name;
  roomName.value = res.data.name;
  roomName.value = res.data.name;
  roomName.value = res.data.name;
});
