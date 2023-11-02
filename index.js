import { _url } from "./config";
import { isLogin } from "./isLogin";

//進入會員功能前 判斷是不是已登入
const member = document.getElementById("member");

member.addEventListener("click", (e) => {
  e.preventDefault();
  //判斷 如果 localStorage.getItem("userTokenAndData") 沒資料 代表沒有登入過 直接導向登入頁面
  if (!localStorage.getItem("userTokenAndData")) {
    window.location.href = "./login.html";
  } else {
    // 如果 localStorage.getItem("userTokenAndData") 有資料 那就使用 isLogin(accessToken, memberId) 比對登入狀態
    let accessToken = JSON.parse(
      localStorage.getItem("userTokenAndData")
    ).accessToken;
    let user = JSON.parse(localStorage.getItem("userTokenAndData")).user;

    const memberHerf = member.getAttribute("href");

    // isLogin 是自訂一的函數 判斷登入狀態 (只能用在 a 標籤的點擊上)
    // _url 是後端主機位置
    // accessToken 是當妳登入後的 localStorage 的用戶Token
    // user 是當妳登入後的 localStorage 的用戶user 資料
    // memberHerf 試驗鄭成功登入後 要前往的連結位置 形式像是 "../member.html"
    isLogin(_url, accessToken, user, memberHerf);
  }
});
