import axios from "axios";
import Swal from "sweetalert2";
import { _url } from "./config";
import { headerObj } from "./admin_config";
import { reLogin } from "./loginIsTimeUp";

const adminRoomList = document.querySelector(".adminRoomList");

let data;

function init() {
  axios
    .get(`${_url}/660/rooms`, headerObj)
    .then(function (res) {
      data = res.data;
      renderData();
    })
    .then(function () {
      const deleteRoomBtn = document.querySelector(".deleteRoomBtn");

      if (deleteRoomBtn) {
        deleteRoomBtn.addEventListener("click", function (e) {
          e.preventDefault();
          const id = e.target.getAttribute("data-num");

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
                .catch(function (error) {
                  reLogin(error.response.data);
                });

              Swal.fire({
                title: "已成功刪除房型",
                icon: "success",
                timer: 1000,
                showConfirmButton: false,
              });

              // 1 秒後回到房型總覽頁面
              setTimeout(() => {
                window.location.href = "./admin_rooms.html";
              }, 1000);
            }
          });
        });
      }
    })
    .catch(function (error) {
      reLogin(error.response.data);
    });
}

init();

// 渲染客房管理首頁
function renderData() {
  let str = ``;
  data.forEach(function (item) {
    if (item.state === "已預訂") {
      // 刪除圖示的 span 加入 data-num 屬性，用來當作 axios.delete 刪除的 id
      str += `<tr>
      <td><img src="${item.imageUrl}" alt="${item.name}圖片"/></td>
      <td>${item.name}</td>
      <td>$${item.price}</td>
      <td>1</td>
      <td>
          <a href="./admin_roomsEditRoom.html?id=${item.id}"
            ><span class="material-symbols-outlined fs-2 text-primary">
              edit_square
            </span></a
          >
          <a style="cursor: not-allowed"
            ><span class="material-symbols-outlined fs-2 text-primary" data-num="${item.id}">
              delete
            </span></a
          >
      </td>
    </tr>`;
    } else {
      str += `<tr>
        <td><img src="${item.imageUrl}" alt="${item.name}圖片"/></td>
        <td>${item.name}</td>
        <td>$${item.price}</td>
        <td>1</td>
        <td>
            <a href="./admin_roomsEditRoom.html?id=${item.id}"
              ><span class="material-symbols-outlined fs-2 text-primary">
                edit_square
              </span></a
            >
            <a role="button"><span class="deleteRoomBtn material-symbols-outlined fs-2 text-primary" data-num="${item.id}">
                delete
              </span></a
            >
        </td>
      </tr>`;
    }
  });
  adminRoomList.innerHTML = str;
}
