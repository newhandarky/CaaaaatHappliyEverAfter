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
    <td><img src="https://fakeimg.pl/150/" /></td>
    <td>${item.name}</td>
    <td>$${item.price}</td>
    <td>1</td>
    <td>
        <a href="./admin_roomsEditRoom.html/?id=${item.id}"
          ><span class="material-symbols-outlined fs-2 text-dark">
            edit_square
          </span></a
        >
        <a href="./admin_roomsAddRoom.html"
          ><span class="material-symbols-outlined fs-2 text-dark">
            delete
          </span></a
        >
    </td>
  </tr>`;
  });
  adminRoomList.innerHTML = str;
}
