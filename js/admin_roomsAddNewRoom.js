import axios from "axios";
import Swal from "sweetalert2";
import { _url } from "./config";
import { headerObj } from "./admin_config";
import { reLogin } from "./loginIsTimeUp";

// http://localhost:5173/CaaaaatHappliyEverAfter/pages/admin_roomsEditRoom.html?id=51，把id文字跟數字拆開，方便後面 get rooms/id

const id = location.href.split("=")[1];

// DOM
const roomName = document.querySelector(".roomName");
const roomPrice = document.querySelector(".roomPrice");
const roomUrl = document.querySelector(".roomUrl");
const previewImage = document.querySelector(".previewImage");
const roomImage = document.querySelector(".roomImage");
const roomFacilities = document.querySelector(".roomFacilities");
const addNewRoomForm = document.querySelector(".addNewRoomForm");
const cancelAddNewRoomBtn = document.querySelector(".cancelAddNewRoomBtn");

// 取消新增按鈕
cancelAddNewRoomBtn.addEventListener("click", function (e) {
  e.preventDefault();
  Swal.fire({
    title: "是否要取消新增",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#20c997",
    cancelButtonColor: "#dc3545",
    confirmButtonText: '<span class="text-white fs-4 px-1">是</span>',
    cancelButtonText: '<span class="text-white fs-4 px-1">否</span>',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "已取消新增",
        icon: "success",
        showConfirmButton: false,
      });

      // 1 秒後回到人員管理頁面
      setTimeout(() => {
        window.location.href = "./admin_rooms.html";
      }, 1000);
    }
  });
});

// 新增房型按鈕
addNewRoomForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let obj = {
    name: roomName.value,
    imageUrl: roomUrl.value,
    state: "",
    quantity: "",
    price: Number(roomPrice.value),
    // rooms facility 要用 .value 取值再用 .split 呈現陣列包字串
    facility: roomFacilities.value.split(","),
    size: [105, 145, 300],
  };
  // console.log(obj.facility);
  Swal.fire({
    title: "是否確定新增",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#20c997",
    cancelButtonColor: "#dc3545",
    confirmButtonText: '<span class="text-white fs-4 px-1">是</span>',
    cancelButtonText: '<span class="text-white fs-4 px-1">否</span>',
  }).then((result) => {
    if (result.isConfirmed) {
      // 使用 post 傳遞新房型到資料庫。headerObj 為身份驗證，需放最後參數
      axios
        .post(`${_url}/660/rooms`, obj, headerObj)
        .then(function () {
          Swal.fire({
            title: "房型新增成功",
            icon: "success",
            showConfirmButton: false,
          });

          // 1 秒後回到房型管理頁面
          setTimeout(() => {
            window.location.href = "./admin_rooms.html";
          }, 1000);
        })
        .catch(function (error) {
          reLogin(error.response.data);
        });
    }
  });
});

// 預覽圖片按鈕
previewImage.addEventListener("click", renderImage);

function renderImage() {
  roomImage.setAttribute("src", roomUrl.value);
}
