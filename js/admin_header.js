/*------------------------------------*\
    import
\*------------------------------------*/
import axios from "axios";
import Swal from "sweetalert2";
import { _url } from "./config";
import { reLogin } from "./loginIsTimeUp";

/*------------------------------------*\
    dom
\*------------------------------------*/
const welcome = document.querySelector(".welcome");
const logout = document.querySelector(".logout");

/*------------------------------------*\
    function
\*------------------------------------*/
function render() {
  localStorage.getItem("userName") === null
    ? (welcome.innerHTML = "")
    : (welcome.innerHTML = `後台人員 : ${localStorage.getItem(
        "userName"
      )} 歡迎您回來`);
}

/*------------------------------------*\
    事件
\*------------------------------------*/
logout.addEventListener("click", function () {
  const Toast = Swal.mixin({
    toast: true,
    position: "center-center",
    showConfirmButton: false,
    timer: 1200,
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
  location = "index.html";
});

window.onload = function () {
  render();
};
