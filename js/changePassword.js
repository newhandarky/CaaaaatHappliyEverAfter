import axios from "axios";
import { _url } from "./config";
import { isLogin } from "./isLogin";
import Swal from "sweetalert2";

// aside bar 顯示當前頁面
// 因為有兩個 aside bar 所以要用 querySelectorAll
const asideLocation = document.querySelectorAll("#changePassword");
asideLocation.forEach((element) => {
  element.classList.add("onThisPage");
});

//navAside 顯示 因為是會員功能頁面
const navAside = document.querySelector("#navAside");
navAside.classList.remove("d-none");

//當資料載入完成時，隱藏 loading 元素
const loadingDom = document.querySelector("#loading");
loadingDom.classList.toggle("d-none");

//抓到所需要的DOM
const oldPasswordDom = document.querySelector("#oldPassword");
const newPasswordDom = document.querySelector("#newPassword");
const checkNewPasswordDom = document.querySelector("#checkNewPassword");
const userTokenAndData = JSON.parse(localStorage.getItem("userTokenAndData"));
const { accessToken, user } = userTokenAndData;

const changePasswordBtn = document.querySelector("#changePasswordBtn");
const changePasswordForm = document.querySelector("#changePasswordForm");
console.log(changePasswordForm);

changePasswordForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //當資料載入時，顯示 loading 元素 並隱藏 changePasswordContainer 元素
  const changePasswordContainerDom = document.querySelector(
    "#changePasswordContainer"
  );
  changePasswordContainerDom.classList.toggle("d-none");
  const loadingDom = document.querySelector("#loading");
  loadingDom.classList.toggle("d-none");

  const memberId = user.id;
  const memberEmail = user.email;
  const oldPassword = oldPasswordDom.value;
  const userAccount = { email: memberEmail, password: oldPassword };
  console.log(userAccount);

  //首先用登入功能驗證密碼是否正確
  axios
    .post(`${_url}/login`, userAccount)
    .then((res) => {
      console.log("驗證登入成功");
      console.log(res);
      //接下來判斷新密碼與確認新密碼是否一致
      const newPassword = newPasswordDom.value;
      const checkNewPassword = checkNewPasswordDom.value;
      if (newPassword === checkNewPassword) {
        console.log("新密碼與確認新密碼核對正確");
        //如果新密碼與確認新密碼一致 準備 patch 密碼
        axios
          .patch(
            `${_url}/600/users/${memberId}`,
            { password: newPassword },
            {
              headers: {
                authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((res) => {
            console.log("修改密碼成功");
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
                title: "修改密碼成功",
                icon: "success",
                confirmButtonText: "確定",
              })
              .then((result) => {
                //按下確認後 清空已輸入的資料
                document.querySelector("#oldPassword").value = "";
                document.querySelector("#newPassword").value = "";
                document.querySelector("#checkNewPassword").value = "";

                //按下確認後 結束 loading 顯示
                const changePasswordContainerDom = document.querySelector(
                  "#changePasswordContainer"
                );
                changePasswordContainerDom.classList.toggle("d-none");
                const loadingDom = document.querySelector("#loading");
                loadingDom.classList.toggle("d-none");
              });
          })
          .catch((err) => {
            console.log("修改密碼失敗");
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
                title: "修改密碼失敗",
                text: "請重新登入後再嘗試",
                confirmButtonText: "確定",
              })
              .then((result) => {
                window.location.href = "./login.html";
              });
          });
      } else {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-custom-confirm",
            cancelButton: "btn btn-custom-cancel",
          },
          buttonsStyling: false,
        });
        swalWithBootstrapButtons
          .fire({
            title: "確認新密碼不正確",
            icon: "error",
            confirmButtonText: "確定",
          })
          .then((result) => {
            //按下確認後 清空已輸入的資料
            document.querySelector("#oldPassword").value = "";
            document.querySelector("#newPassword").value = "";
            document.querySelector("#checkNewPassword").value = "";

            //按下確認後 結束 loading 顯示
            const changePasswordContainerDom = document.querySelector(
              "#changePasswordContainer"
            );
            changePasswordContainerDom.classList.toggle("d-none");
            const loadingDom = document.querySelector("#loading");
            loadingDom.classList.toggle("d-none");
          });
      }
    })
    .catch((err) => {
      console.log("驗證登入失敗");
      console.log(err.response.data);
      if (
        err.response.data == "Incorrect password" ||
        "Password is too short"
      ) {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-custom-confirm",
            cancelButton: "btn btn-custom-cancel",
          },
          buttonsStyling: false,
        });
        swalWithBootstrapButtons
          .fire({
            title: "舊密碼輸入錯誤",
            icon: "error",
            confirmButtonText: "確定",
          })
          .then((result) => {
            //按下確認後 清空已輸入的資料
            document.querySelector("#oldPassword").value = "";
            document.querySelector("#newPassword").value = "";
            document.querySelector("#checkNewPassword").value = "";

            //按下確認後 結束 loading 顯示
            const changePasswordContainerDom = document.querySelector(
              "#changePasswordContainer"
            );
            changePasswordContainerDom.classList.toggle("d-none");
            const loadingDom = document.querySelector("#loading");
            loadingDom.classList.toggle("d-none");
          });
      } else {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-custom-confirm",
            cancelButton: "btn btn-custom-cancel",
          },
          buttonsStyling: false,
        });
        swalWithBootstrapButtons
          .fire({
            title: "修改密碼失敗",
            text: "請重新登入後再嘗試",
            confirmButtonText: "確定",
          })
          .then((result) => {
            window.location.href = "./login.html";
          });
      }
    });
});
