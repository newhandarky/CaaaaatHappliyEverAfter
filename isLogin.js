import axios from "axios";

//偵測是否為登入狀態
export function isLogin(_url, accessToken, user, href) {
  // 防呆機制
  // 檢查必要的參數是否已經提供
  if (!_url || !accessToken || !user || !href) {
    console.error("isLogin 缺少必要的參數");
    return;
  }

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
