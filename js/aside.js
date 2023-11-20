import { isLogin } from "./isLogin";

// 抓到 dom 元素
// 因為 aside 會有2組 所以要用 querySelectorAll 抓到兩個 再都變歷
const memberData = document.querySelectorAll("#memberData");
const catData = document.querySelectorAll("#catData");
const bookingHistory = document.querySelectorAll("#bookingHistory");
const importantNotice = document.querySelectorAll("#importantNotice");

//進入會員功能前 判斷是不是已登入
memberData.forEach((element) => {
  element.addEventListener("click", (e) => {
    e.preventDefault();

    const memberHerf = element.getAttribute("href");

    // isLogin 是自訂一的函數 判斷登入狀態 可以在確認後前往的網址頁面路徑
    isLogin(memberHerf);
  });
});

//進入我的貓咪前 判斷是不是已登入
catData.forEach((element) => {
  element.addEventListener("click", (e) => {
    e.preventDefault();

    const catHerf = element.getAttribute("href");

    // isLogin 是自訂一的函數 判斷登入狀態 可以在確認後前往的網址頁面路徑
    isLogin(catHerf);
  });
});

//進入訂房紀錄前 判斷是不是已登入
bookingHistory.forEach((element) => {
  element.addEventListener("click", (e) => {
    e.preventDefault();

    const bookingHistoryHerf = element.getAttribute("href");

    // isLogin 是自訂一的函數 判斷登入狀態 可以在確認後前往的網址頁面路徑
    isLogin(bookingHistoryHerf);
  });
});

//進入重要通知前 判斷是不是已登入
importantNotice.forEach((element) => {
  element.addEventListener("click", (e) => {
    e.preventDefault();

    const importantNoticeHerf = element.getAttribute("href");

    // isLogin 是自訂一的函數 判斷登入狀態 可以在確認後前往的網址頁面路徑
    isLogin(importantNoticeHerf);
  });
});
