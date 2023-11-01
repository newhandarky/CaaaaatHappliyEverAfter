import axios from "axios";

//抓到 Dom 元素
const host = "https://catroomdb.onrender.com";

const loginForm = document.getElementById("loginForm");
const signupBtn = document.getElementById("signupBtn");

// 登入 function
function login(userAccount) {
  axios
    .post(`${host}/login`, userAccount)
    .then((res) => {
      let { user, accessToken } = res.data;
      //獲得的用戶資料存入 localStorage
      let userTokenAndData = {
        user,
        accessToken,
      };
      localStorage.setItem(
        "userTokenAndData",
        JSON.stringify(userTokenAndData)
      );

      console.log(JSON.parse(localStorage.getItem("userTokenAndData")));

      window.location.href = "./index.html";
    })
    .catch((err) => {
      //錯誤提示
      console.log(err.response.data);
      alert(`登入失敗：${err.response.data}`);
    });
}

//按下會員登入
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  let userAccount = { email, password };
  // 使用登入函數來登入會員
  console.log(userAccount);

  login(userAccount);
});

//按下立即註冊
signupBtn.addEventListener("click", (e) => {
  e.preventDefault();

  window.location.href = "./signup.html";
});
