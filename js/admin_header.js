/*------------------------------------*\
    import
\*------------------------------------*/
import axios from "axios";
import Swal from "sweetalert2";
import { _url } from "./config";

/*------------------------------------*\
    dom
\*------------------------------------*/
const welcome = document.querySelector(".welcome");
const logout = document.querySelector(".logout");
const adminLogin = document.querySelector(".adminLogin");
const adminAccount = document.querySelector(".adminAccount");
let adminEmailPassword = {};

/*------------------------------------*\
    測試登入
\*------------------------------------*/
adminLogin.addEventListener("click", function () {
  login(adminEmailPassword);
});

adminAccount.addEventListener("change", function () {
  if (adminAccount.value == 1052) {
    adminEmailPassword.email = "userTest052@gmail.com";
    adminEmailPassword.password = "userTest052";
  } else if (adminAccount.value == 1053) {
    adminEmailPassword.email = "userTest053@gmail.com";
    adminEmailPassword.password = "userTest053";
  } else if (adminAccount.value == 1054) {
    adminEmailPassword.email = "userTest054@gmail.com";
    adminEmailPassword.password = "userTest054";
  } else if (adminAccount.value == 1055) {
    adminEmailPassword.email = "userTest055@gmail.com";
    adminEmailPassword.password = "userTest055";
  }
});

logout.addEventListener("click", function () {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: "success",
    title: "您已成功登出",
  });
  localStorage.clear();
  render();
});

/*------------------------------------*\
    function
\*------------------------------------*/
function render() {
  localStorage.getItem("userName") === null
    ? (welcome.innerHTML = "")
    : (welcome.innerHTML = `登入人員 : ${localStorage.getItem(
        "userName"
      )} 歡迎您回來`);
}

function login(obj) {
  axios
    .post(`${_url}/login`, {
      // 管理員帳密
      email: obj.email,
      password: obj.password,
    })
    .then(function (res) {
      console.log(res);
      localStorage.setItem("userLoginToken", res.data.accessToken);
      if (res.data.user.role === "admin") {
        localStorage.setItem("userRole", res.data.user.role);
        localStorage.setItem("userName", res.data.user.name);
      } else {
        location = "index.html";
      }
      render();
    })
    .catch(function (err) {
      console.log(err.response);
    })
    .then(function (res) {
      console.log(res);
      localStorage.setItem("userLoginToken", res.data.accessToken);
      if (res.data.user.role === "admin") {
        localStorage.setItem("userRole", res.data.user.role);
        localStorage.setItem("userName", res.data.user.name);
      } else {
        location = "index.html";
      }
      render();
    })
    .catch(function (err) {
      console.log(err.response);
    });
}

window.onload = function () {
  render();
};
