import axios from "axios";
import { _url } from "./config";

const adminMemberList = document.querySelector(".adminMemberList");

let data = [];

function init() {
  axios.get(`${_url}/users`).then(function (res) {
    data = res.data;
    renderData();
  });
}

init();

function renderData() {
  let str = ``;
  data.forEach(function (item) {
    if (item.role === "admin") {
      // 到職日期暫時用生日代替
      // a tag 內的 href 加上 ?id=${item.id} 來導入遍及管理員時對應的頁面
      str += `<tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.phone}</td>
            <td>${item.address}</td>
            <td>${item.birthday}</td>
            <td class="text-center">
              <a class="editMember" href="./admin_accountEditMember.html?id=${item.id}">
                <span class="material-symbols-outlined"> edit_square </span>
              </a>
            </td>
          </tr>`;
    }
  });
  adminMemberList.innerHTML = str;
}
