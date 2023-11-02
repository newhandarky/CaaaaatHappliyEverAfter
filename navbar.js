import { isLogin } from "./isLogin";

//進入會員功能前 判斷是不是已登入
const memberData = document.getElementById("memberData");

memberData.addEventListener("click", (e) => {
  e.preventDefault();

  const memberHerf = memberData.getAttribute("href");

  // isLogin 是自訂一的函數 判斷登入狀態 (只能用在 a 標籤的點擊上)
  // _url 是後端主機位置
  // memberHerf 試驗成功登入後 要前往的連結位置 形式像是 "../member.html"
  isLogin(memberHerf);
});
