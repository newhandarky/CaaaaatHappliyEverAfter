import axios from "axios";
import { _url } from "./config";
// isLogin 是自訂一的函數 判斷登入狀態 可以在確認後前往的網址頁面路徑
//偵測是否為登入狀態
export function isLogin(href) {
  //判斷 如果 localStorage.getItem("userTokenAndData") 沒資料 代表沒有登入過 直接導向登入頁面
  if (!localStorage.getItem("userTokenAndData")) {
    window.location.href = "./login.html";
  } else {
    // 如果 localStorage.getItem("userTokenAndData") 有資料 那就使用 isLogin(accessToken, memberId) 比對登入狀態
    const accessToken = JSON.parse(
      localStorage.getItem("userTokenAndData")
    ).accessToken;
    const user = JSON.parse(localStorage.getItem("userTokenAndData")).user;

    //使用 Json Server 驗證路由 /600
    //Token 若沒過期 跳轉至指定頁面 也就是函式的 herf 參數
    //Token 若過期 跳出過期警告 導航至登入頁面
    axios
      .get(`${_url}/600/users/${user.id}`, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res);

        if (href) {
          window.location.href = href;
          return;
        }
      })
      .catch((err) => {
        console.log(err);
        alert("登入時間已到期 請重新登入後再執行一次");
        localStorage.removeItem("userTokenAndData");
        window.location.href = "./login.html";
      });
  }
}
