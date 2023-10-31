import axios from "axios";

//抓到 Dom 元素
const host = "https://catroomdb.onrender.com";

const loginForm = document.querySelector("form");
const loginBtn = document.querySelector(".email");

// 登入 function
function login(email, password) {
  axios
    .post(`${host}/login`, {
      email,
      password,
    })
    .then((res) => {
      let { user, accessToken } = res.data;
      //獲得的用戶資料存入 localStorage
      localStorage.setItem("myUser", JSON.stringify(user));
      localStorage.setItem("myToken", JSON.stringify(accessToken));

      console.log(JSON.parse(localStorage.getItem("myUser")));
      console.log(JSON.parse(localStorage.getItem("myToken")));
    })
    .catch((err) => {
      //錯誤提示
      console.log(err.response.data);
      alert(err.response.data);
    });
}

//按下會員登入
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let email = e.target[0].value;
  let password = e.target[1].value;
  console.log(email);
  console.log(password);

  // 使用登入函數來登入會員

  login(email, password);
});
