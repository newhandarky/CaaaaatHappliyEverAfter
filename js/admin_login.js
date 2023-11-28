// import
import axios from "axios";
import Swal from "sweetalert2";
import { _url } from "./config";
import { reLogin } from "./loginIsTimeUp";

const errorText = document.querySelector(".errorText");
const adminLoginAccount = document.querySelector("#adminLoginAccount");
const adminLoginPassword = document.querySelector("#adminLoginPassword");
const adminLoginBtn = document.querySelector(".adminLoginBtn");

// console.log(adminLoginAccount);
// console.log(adminLoginPassword);

let obj = {};
adminLoginBtn.addEventListener("click", function (e) {
  if (
    adminLoginAccount.value.length > 21 ||
    adminLoginAccount.value.length < 21 ||
    adminLoginPassword.value.length > 11 ||
    adminLoginPassword.value.length < 11 ||
    adminLoginAccount.value === "" ||
    adminLoginPassword.value === "" ||
    adminLoginAccount.value.slice(0, 11) !== adminLoginPassword.value
  ) {
    // 使用 classList.add() 調整排版
    errorText.classList.add(
      "d-flex",
      "align-items-center",
      "text-danger",
      "fs-5",
      "mb-6"
    );

    // 用 innerHTML 加入內容
    errorText.innerHTML = `<span class="material-symbols-outlined me-1"> error </span>信箱或密碼不正確`;

    // 清空輸入欄位
    adminLoginAccount.value = "";
    adminLoginPassword.value = "";

    // 中斷 function
    return;
  }

  // 先把輸入的帳號、密碼存起來，後面判斷是否為 admin 時要用
  obj.email = adminLoginAccount.value;
  obj.password = adminLoginPassword.value;

  let id = parseInt(adminLoginAccount.value.slice(9, 11), 10);
  // 第一層 axios 先判斷是否為 admin，不是就導回首頁
  axios
    .get(`${_url}/users/10${id}`)
    .then(function (res) {
      if (res.data.role !== "admin") {
        location.href = "index.html";
      }
    })
    // 第二層 axios 放在第一層的 then 後面，等取得第一層資料且判斷完沒問題後才執行第二層
    .then(function () {
      // 發送登入請求
      axios
        .post(`${_url}/login`, obj)
        .then(function (res) {
          console.log(res);
          console.log(res.data);
          // 登入成功，回應中應該包含令牌

          const token = res.data.accessToken;

          // 將令牌存儲在你的應用程式中，以便未來的請求使用
          // 這裡假設你使用 localStorage 來存儲令牌
          localStorage.setItem("userLoginToken", token);
          localStorage.setItem("userName", res.data.user.name);
          localStorage.setItem("userId", res.data.user.id);
          localStorage.setItem("userRole", res.data.user.role);

          //   console.log("Login successful. Token:", token);

          //   登入成功跳轉到後台首頁
          location.href = "admin_index.html";
          // 在這裡可以進一步處理登入成功的邏輯

          // 最近登入時間
          // 登入成功後，取得當前時間
          var loginTime = new Date();

          // 將登入時間轉換為字串，方便存儲，把 toISOString改成 toLocaleString 使用 UTC+8 時區
          var loginTimeString = loginTime.toLocaleString("en-US", {
            timeZone: "Asia/Taipei",
          });

          // 使用 localStorage 存儲登入時間
          localStorage.setItem("userLoginTime", loginTimeString);

          // 暫存 lastLoginTime 存到 json-server 中 -> 時效 1 小時
          // 注意 patch url，users 一定要指定 10XX 才能選擇到對應該管理員頁面
          axios.patch(`${_url}/users/10${id}`, {
            lastLoginTime: `${loginTimeString}`,
          });
        })
        .catch(function (error) {
          // 登入失敗，處理錯誤
          console.error(
            "Login failed:",
            error.response ? error.response.data : error.message
          );

          // 在這裡可以進一步處理登入失敗的邏輯
        });
    });
});
