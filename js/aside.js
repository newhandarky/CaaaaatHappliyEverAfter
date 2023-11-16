import { isLogin } from "./isLogin";

// 抓到 dom 元素
const memberData = document.getElementById("memberData");
const catData = document.getElementById("catData");
const bookingHistory = document.getElementById("bookingHistory");

//進入會員功能前 判斷是不是已登入
memberData.addEventListener("click", (e) => {
  e.preventDefault();

  const memberHerf = memberData.getAttribute("href");

  // isLogin 是自訂一的函數 判斷登入狀態 可以在確認後前往的網址頁面路徑
  isLogin(memberHerf);
});

//進入我的貓咪前 判斷是不是已登入
catData.addEventListener("click", (e) => {
  e.preventDefault();

  const catHerf = catData.getAttribute("href");

  // isLogin 是自訂一的函數 判斷登入狀態 可以在確認後前往的網址頁面路徑
  isLogin(catHerf);
});

//進入訂房紀錄前 判斷是不是已登入
bookingHistory.addEventListener("click", (e) => {
  e.preventDefault();

  const bookingHistoryHerf = bookingHistory.getAttribute("href");

  // isLogin 是自訂一的函數 判斷登入狀態 可以在確認後前往的網址頁面路徑
  isLogin(bookingHistoryHerf);
});
