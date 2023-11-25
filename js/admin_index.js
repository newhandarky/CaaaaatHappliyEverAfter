import axios from "axios";
import { _url } from "./config";

const userImage = document.querySelector(".userImage");
const welcomeText = document.querySelector(".welcomeText");
const indexAccountTbody = document.querySelector(".indexAccountTbody");
const indexRoomTbody = document.querySelector(".indexRoomTbody");

// 若沒有登入直接跳到登入頁面
if (localStorage.length === 0) {
  backToLogin();
}

function backToLogin() {
  location.href = "admin_login.html";
}

// 初始化畫面
function init() {
  // 頭像資料取得
  let id = parseInt(localStorage.getItem("userId"));
  axios.get(`${_url}/users/${id}`).then(function (res) {
    renderAvatar(res);
  });

  // 帳號資料取得
  axios.get(`${_url}/users?role=admin`).then(function (res) {
    let data = res.data;
    renderAccount(data);
  });

  // 房型資料取得
  axios.get(`${_url}/rooms`).then(function (res) {
    let data = res.data;
    renderRoom(data);
  });
}

init();

// 頭像渲染
function renderAvatar(res) {
  userImage.setAttribute("src", res.data.userPhoto);
  welcomeText.textContent = `登入人員：${res.data.name}歡迎您回來`;
}

// 帳號狀態渲染
function renderAccount(data) {
  let str = ``;

  // 解決後台首頁破版問題，所以只顯示四筆資料
  let count = 0;
  for (const item of data) {
    str += `<tr>
          <td>
            <div class="d-flex align-items-center">
              <span class="material-symbols-outlined me-2">
                account_circle
              </span>
              <span>${item.name}</span>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <span class="material-symbols-outlined me-2"> schedule </span>
              <span>${item.lastLoginTime}</span>
            </div>
          </td>
        </tr>`;

    count++;

    if (count === 4) {
      break; // 当达到指定次数时中断循环
    }
  }

  indexAccountTbody.innerHTML = str;
}

// 房型渲染
function renderRoom(data) {
  let str = ``;
  data.forEach(function (item) {
    str += `<tr>
      <td>${item.name}</td>
      <td>${item.price}</td>
    </tr>`;
  });
  indexRoomTbody.innerHTML = str;
<<<<<<< HEAD
}