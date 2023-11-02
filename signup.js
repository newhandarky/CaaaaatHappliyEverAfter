import axios from "axios";
import { _url } from "./config";
//抓到 Dom 元素

const signupForm = document.getElementById("signupForm");
const loginBtn = document.getElementById("loginBtn");

// 註冊 function
function signup(userData) {
  axios
    .post(`${_url}/signup`, userData)
    .then((res) => {
      console.log(res);
      alert("註冊成功");
      window.location.href = "./login.html";
    })
    .catch((err) => {
      //錯誤提示
      alert(`註冊失敗：${err.response.data}`);
      console.log(err);
    });
}

//按下會員註冊
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //抓取表單資料
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const name = document.getElementById("name").value;
  const male = document.getElementById("male");
  const female = document.getElementById("female");
  const other = document.getElementById("other");
  const birthday = document.getElementById("birthday").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  //判斷哪個性別被選取
  let gender = () =>
    // 使用三元条件运算符来判断哪个性别被选取，并返回相应的值
    male.checked
      ? male.value
      : female.checked
      ? female.value
      : other.checked
      ? other.value
      : "Not Specified";

  let userData = {
    email,
    password,
    name,
    gender: gender(),
    birthday,
    phone,
    address,
    userPhoto: "https://i.imgur.com/rUTLxZC.jpg",
    catId: null,
    lastLoginTime: null,
  };
  console.log(userData);
  // 使用註冊函數來註冊會員
  signup(userData);
});

//按下立即登入
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();

  window.location.href = "./login.html";
});
