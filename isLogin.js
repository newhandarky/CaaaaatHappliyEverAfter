import axios from "axios";

//抓到 Dom 元素
const member = document.getElementById("member");
const host = "https://catroomdb.onrender.com";

//偵測是否為登入狀態
function isLogin(accessToken, memberId) {
  //使用 Json Server 驗證路由 /600
  axios
    .get(`${host}/600/users/${memberId}`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      console.log(res);
      window.location.href = "./member.html";
    })
    .catch((err) => {
      console.log(err);
      window.location.href = "./login.html";
    });
}

//進入會員功能前 判斷是不是已登入
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
    let memberId = JSON.parse(localStorage.getItem("userTokenAndData")).user.id;
    console.log(accessToken);
    console.log(memberId);
    isLogin(accessToken, memberId);
  }
});
