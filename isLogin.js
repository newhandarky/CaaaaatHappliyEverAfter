import axios from "axios";

//偵測是否為登入狀態
export function isLogin(_url, href) {
  // 防呆機制
  // 檢查必要的參數是否已經提供
  if (!_url || !href) {
    console.error("isLogin 缺少必要的參數");
    return;
  }

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
    axios
      .get(`${_url}/600/users/${user.id}`, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        window.location.href = href;
      })
      .catch((err) => {
        console.log(err);
        window.location.href = "./login.html";
      });
  }
}
