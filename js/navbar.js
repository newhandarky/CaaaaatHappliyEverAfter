import { isLogin } from "./isLogin";

//進入會員功能前 判斷是不是已登入
const memberFunction = document.getElementById("memberFunction");
const memberData = document.getElementById("memberData");
const catData = document.getElementById("catData");
const navBookingHistory = document.getElementById("navBookingHistory");

memberFunction.addEventListener("click", (e) => {
  e.preventDefault();

  const memberHerf = memberFunction.getAttribute("href");

  // isLogin 是自訂一的函數 判斷登入狀態 可以在確認後前往的網址頁面路徑
  isLogin(memberHerf);
});
