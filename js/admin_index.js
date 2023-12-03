import axios from "axios";
import moment from "moment";
import { _url } from "./config";
import { headerObj } from "./admin_config";
import { reLogin } from "./loginIsTimeUp";

const userImage = document.querySelector(".userImage");
const welcomeText = document.querySelector(".welcomeText");
const indexAccountTbody = document.querySelector(".indexAccountTbody");
const orderNumToday = document.querySelector(".orderNumToday");
const orderRevenueToday = document.querySelector(".orderRevenueToday");
const indexRoomTbody = document.querySelector(".indexRoomTbody");
const articleCardWrap = document.querySelector(".articleCardWrap");

// 若沒有登入直接跳到登入頁面
if (localStorage.length === 0) {
  backToLogin();
}

function backToLogin() {
  location.href = "admin_login.html";
}

// 把 axios.get 獨立出來
// callback 參數為實際執行的函式
function fetchData(url, callback) {
  axios
    .get(url, headerObj)
    .then(function (res) {
      callback(res.data);
    })
    // 測試relogin是否有效
    .catch(function (error) {
      // console.log(error);
      reLogin(error.response.data);
    });
}

// 初始化畫面
function init() {
  // 頭像資料取得
  fetchData(`${_url}/660/users?role=admin`, renderAvatar);

  // 帳號資料取得
  fetchData(`${_url}/660/users?role=admin`, renderAccount);

  // 訂單資料取得
  fetchData(`${_url}/660/bookings`, renderOrder);

  // 房型資料取得
  fetchData(`${_url}/660/rooms`, renderRoom);

  // 文章資料取得
  fetchData(`${_url}/660/article`, renderArticle);
}

init();

// 頭像渲染
let id = parseInt(localStorage.getItem("userId"));
function renderAvatar(data) {
  data.forEach(function (item) {
    if (item.id === id) {
      userImage.setAttribute("src", item.userPhoto);
      welcomeText.textContent = `登入人員：${item.name}歡迎您回來`;
    }
  });
}

// 帳號狀態渲染
function renderAccount(data) {
  let str = ``;

  // 解決後台首頁破版問題，所以只顯示四筆資料
  let count = 0;
  for (const item of data) {
    // console.log(item);
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

// 訂單渲染
function renderOrder(data) {
  // 取得當日日期
  let todayDate = moment().format("YYYY-MM-DD");

  // 統計當日訂單數量
  let orderCount = 0;
  let orderRevenue = 0;
  data.forEach(function (item) {
    if (item.bookingDate === todayDate) {
      orderCount++;
      orderRevenue += parseInt(item.price);
    }
  });

  orderNumToday.textContent = orderCount;
  orderRevenueToday.textContent = `$${orderRevenue}`;
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
}

// 文章渲染
function renderArticle(data) {
  let str = ``;
  data.forEach(function (item, index) {
    // 用 index 控制，只顯示 3 筆
    if (index <= 2) {
      str += `<div class="card" style="width: 8rem">
      <img class="card-img-top" src="${item.photo}" />
      <div class="card-body">
        <h2 class="card-title text-truncate fs-6">${item.title}</h2>
        <div class="d-flex justify-content-end align-items-center">
          <span class="material-symbols-outlined me-4"> thumb_up </span>
          <span class="material-symbols-outlined"> chat </span>
        </div>
      </div>
    </div>`;
    }
  });

  articleCardWrap.innerHTML = str;
}
