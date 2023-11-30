import axios from "axios";
import { _url } from "./config";
import { headerObj } from "./admin_config";

const editAccountBtn = document.querySelector(".editAccountBtn");
const adminMemberList = document.querySelector(".adminMemberList");

// 要記得轉成數字再進行比較，因為 localStorage 取出是字串
let id = parseInt(localStorage.getItem("userId"));

let data = [];

// 初始畫面渲染
function init() {
  axios
    .get(`${_url}/660/users?role=admin`, headerObj)
    .then(function (res) {
      data = res.data;
      renderData();
    })
    .catch(function (error) {
      console.log(error);
    });
}

init();

// 表格渲染
function renderData() {
  let str = ``;
  data.forEach(function (item) {
    // 表格編輯人員按鈕，限制每個人只能編輯自己的帳號
    if (item.role === "admin" && id === item.id) {
      // a tag 內的 href 加上 ?id=${item.id} 來導入遍及管理員時對應的頁面
      str += `<tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.phone}</td>
            <td>${item.address}</td>
            <td>${item.joinDate}</td>
            <td class="text-center">
              <a class="editMember" href="./admin_accountEditMember.html?id=${item.id}">
                <span class="material-symbols-outlined"> edit_square </span>
              </a>
            </td>
          </tr>`;
    } else {
      str += `<tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.phone}</td>
            <td>${item.address}</td>
            <td>${item.joinDate}</td>
            <td class="text-center">
              <a class="editMember" href="#">
                <span class="material-symbols-outlined"> edit_square </span>
              </a>
            </td>
          </tr>`;
    }
  });
  adminMemberList.innerHTML = str;
}

// 上方編輯人員按鈕，限制每個人只能編輯自己的帳號
editAccountBtn.addEventListener("click", function (e) {
  e.preventDefault();
  data.forEach(function (item) {
    if (id == item.id) {
      location.href = `./admin_accountEditMember.html?id=${item.id}`;
    }
  });
});
