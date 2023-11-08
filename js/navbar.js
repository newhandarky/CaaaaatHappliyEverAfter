import { isLogin } from "./isLogin";

//進入會員功能前 判斷是不是已登入
const memberFunction = document.getElementById("memberFunction");
const navMemberData = document.getElementById("navMemberData");
const navCatData = document.getElementById("navCatData");
const navBookingHistory = document.getElementById("navBookingHistory");

memberFunction.addEventListener("click", (e) => {
  e.preventDefault();

  const memberHerf = memberFunction.getAttribute("href");

  // isLogin 是自訂一的函數 判斷登入狀態 可以在確認後前往的網址頁面路徑
  isLogin(memberHerf);
});

//進入會員功能前 判斷是不是已登入
navMemberData.addEventListener("click", (e) => {
  e.preventDefault();

  const navMemberHerf = navMemberData.getAttribute("href");

  // isLogin 是自訂一的函數 判斷登入狀態 可以在確認後前往的網址頁面路徑
  isLogin(navMemberHerf);
});

//進入我的貓咪前 判斷是不是已登入
navCatData.addEventListener("click", (e) => {
  e.preventDefault();

  const navCatHerf = navCatData.getAttribute("href");

  // isLogin 是自訂一的函數 判斷登入狀態 可以在確認後前往的網址頁面路徑
  isLogin(navCatHerf);
});

//進入訂房紀錄前 判斷是不是已登入
navBookingHistory.addEventListener("click", (e) => {
  e.preventDefault();

  const navBookingHistoryHerf = navBookingHistory.getAttribute("href");

  // isLogin 是自訂一的函數 判斷登入狀態 可以在確認後前往的網址頁面路徑
  isLogin(navBookingHistoryHerf);
});
