import { isLoginToHref } from "./isLoginToHref";

//進入會員功能前 判斷是不是已登入
const memberData = document.getElementById("memberData");
const catData = document.getElementById("catData");

memberData.addEventListener("click", (e) => {
  e.preventDefault();

  const memberHerf = memberData.getAttribute("href");

  // isLoginToHref 是自訂一的函數 判斷登入狀態 需要帶入前往的網址頁面路徑
  // _url 是後端主機位置
  // memberHerf 試驗成功登入後 要前往的連結位置 形式像是 "../member.html"
  isLoginToHref(memberHerf);
});

catData.addEventListener("click", (e) => {
  e.preventDefault();

  const catHerf = catData.getAttribute("href");

  // isLoginToHref 是自訂一的函數 判斷登入狀態 需要帶入前往的網址頁面路徑
  // _url 是後端主機位置
  // memberHerf 試驗成功登入後 要前往的連結位置 形式像是 "../member.html"
  isLoginToHref(catHerf);
});
