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
const roomCatLimit = document.querySelector(".roomCatLimit");
const roomFacilities = document.querySelector(".roomFacilities");
const roomMustKnow = document.querySelector(".roomMustKnow");
const roomEditForm = document.querySelector(".roomEditForm");
const deleteRoomBtn = document.querySelector(".deleteRoomBtn");

let data;

// 載入初始化
// 用 rooms?id=${id} 時，下面的 value 要 =res.data[0].屬性，因為回傳的是一筆陣列包物件
function init() {
  axios
    .get(`${_url}/660/rooms/${id}`, headerObj)
    .then(function (res) {
      data = res.data;
      renderData(data);
    })
    .catch(function (error) {
      reLogin(error.response.data);
    });
}

init();

// 渲染資料
function renderData(data) {
  roomName.value = data.name;
  roomPrice.value = data.price;
  roomUrl.value = data.imageUrl;
  roomImage.setAttribute("src", data.imageUrl);
  roomCatLimit.value = "1";
  roomFacilities.textContent = data.facility;
  roomMustKnow.textContent = `1. 請入住前確認貓咪都已注射疫苗 2. 特殊需求請在訂房時告知，若未告知恕不負責 3. 房費均已含飲食費用 4. 逾時每貓每小時加收$300`;
}

// 儲存變更功能
roomEditForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let obj = {
    name: roomName.value,
    imageUrl: roomUrl.value,
    price: Number(roomPrice.value),
    // rooms facility 要用.split呈現陣列包字串
    facility: roomFacilities.textContent.split(","),
  };

  Swal.fire({
    title: "是否要儲存變更",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#20c997",
    cancelButtonColor: "#dc3545",
    confirmButtonText: '<span class="text-white fs-4 px-1">是</span>',
    cancelButtonText: '<span class="text-white fs-4 px-1">否</span>',
  }).then((result) => {
    if (result.isConfirmed) {
      // 使用 patch 更新部分內容
      axios
        .patch(`${_url}/660/rooms/${id}`, obj, headerObj)
        .then(function () {
          Swal.fire({
            title: "房型編輯成功",
            icon: "success",
            showConfirmButton: false,
          });

          // 1 秒後回到人員管理頁面
          setTimeout(() => {
            window.location.href = "./admin_rooms.html";
          }, 1000);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  });
});

// 刪除房型按鈕
deleteRoomBtn.addEventListener("click", function (e) {
  e.preventDefault();
  // 加入判斷，如果狀態為「已預訂」就不能刪除
  if (data.state === "已預訂") {
    Swal.fire({
      title: "房型已預訂，禁止刪除！是否要繼續編輯",
      icon: "error",
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: "#20c997",
      cancelButtonColor: "#dc3545",
      confirmButtonText: '<span class="text-white fs-4 px-1">是</span>',
      cancelButtonText: '<span class="text-white fs-4 px-1">否</span>',
    }).then((result) => {
      if (result.isConfirmed) {
        // 按「是」代表要繼續編輯，使用 Swal.close() 關閉彈跳視窗
        Swal.close();
      } else if (result.isDismissed) {
        Swal.fire({
          title: "即將返回房型總覽",
          icon: "success",
          showConfirmButton: false,
        });

        // 1 秒後回到人員管理頁面
        setTimeout(() => {
          window.location.href = "./admin_rooms.html";
        }, 1000);
      }
    });
  } else {
    Swal.fire({
      title: "是否要刪除房型",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#20c997",
      cancelButtonColor: "#dc3545",
      confirmButtonText: '<span class="text-white fs-4 px-1">是</span>',
      cancelButtonText: '<span class="text-white fs-4 px-1">否</span>',
    }).then((result) => {
      if (result.isConfirmed) {
        // 從資料庫刪除房型
        axios
          .delete(`${_url}/660/rooms/${id}`, headerObj)
          .then(function () {
            Swal.fire({
              title: "已成功刪除房型",
              icon: "success",
              showConfirmButton: false,
            });

            // 1 秒後回到房型總覽
            setTimeout(() => {
              window.location.href = "./admin_rooms.html";
            }, 1000);
          })
          .catch(function (error) {
            reLogin(error.response.data);
          });
      }
    });
  }
});

// 預覽圖片按鈕
previewImage.addEventListener("click", renderImage);

function renderImage() {
  roomImage.setAttribute("src", roomUrl.value);
}
