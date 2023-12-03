import axios from "axios";
import { _url } from "./config";
import flatpickr from "flatpickr";
import Swal from "sweetalert2";

//flatpickr 套件使用
flatpickr("#birthday", {
  enableTime: false,
  dateFormat: "Y-m-d",
});

//當資料載入完成時，隱藏 loading 元素
const signupAllDom = document.querySelector("#signupAll");
signupAllDom.classList.toggle("d-none");
const signupTitleDom = document.querySelector("#signupTitle");
signupTitleDom.classList.toggle("d-none");
const loadingDom = document.querySelector("#loading");
loadingDom.classList.toggle("d-none");

//抓到 Dom 元素

const signupForm = document.getElementById("signupForm");
const loginBtn = document.getElementById("loginBtn");

// 註冊 function
function signup(userData) {
  axios
    .post(`${_url}/signup`, userData)
    .then((res) => {
      console.log(res);
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-custom-confirm",
          cancelButton: "btn btn-custom-cancel",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
        .fire({
          title: "註冊成功",
          icon: "success",
          confirmButtonText: "確定",
        })
        .then((result) => {
          window.location.href = "./login.html";
        });
    })
    .catch((err) => {
      //錯誤提示
      console.log(err);
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-custom-confirm",
          cancelButton: "btn btn-custom-cancel",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
        .fire({
          title: "註冊失敗",
          text: err.response.data,
          icon: "error",
          confirmButtonText: "確定",
        })
        .then((response) => {
          signupAllDom.classList.toggle("d-none");
          signupTitleDom.classList.toggle("d-none");
          loadingDom.classList.toggle("d-none");
        });
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
    lastLoginTime: "",
    role: "non-admin",
  };
  console.log(userData);
  // 使用註冊函數來註冊會員
  signup(userData);
});
