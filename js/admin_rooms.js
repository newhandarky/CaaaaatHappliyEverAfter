import axios from "axios";
import { _url } from "./config";

const adminRoomList = document.querySelector(".adminRoomList");

let data;

function init() {
  axios
    .get(`${_url}/rooms`)
    .then(function (res) {
      data = res.data;
      renderData();
    })
    .catch(function (error) {
      console.log(res.error);
    });
}

init();

// 渲染客房管理首頁
function renderData() {
  let str = ``;
  data.forEach(function (item) {
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
          ><span class="material-symbols-outlined fs-2 text-primary">
            delete
          </span></a
        >
    </td>
  </tr>`;
  });
  adminRoomList.innerHTML = str;
}
