import axios from "axios";

//抓到 Dom 元素
const member = document.querySelector(".member");
console.log(member);
const host = "https://catroomdb.onrender.com";

//偵測是否為登入狀態
function isLogin(accessToken, memberId) {
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
  let accessToken = JSON.parse(localStorage.getItem("myToken"));
  let memberId = JSON.parse(localStorage.getItem("myUser")).id;
  console.log(accessToken);
  console.log(memberId);
  isLogin(accessToken, memberId);
});
