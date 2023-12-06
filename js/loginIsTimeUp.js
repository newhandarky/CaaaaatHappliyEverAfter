/*------------------------------------*\
    import
\*------------------------------------*/
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import { _url } from "./config";

export function reLogin(str) {
  const user = {};

  if (str === "jwt expired") {
    Swal.fire({
      title: "您的帳號登入已逾時, 請重新登入",
      input: "email",
      inputLabel: "您的帳號",
      inputPlaceholder: "Enter your email address",
    })
      .then(({ value: email }) => {
        user.email = email;

        return Swal.fire({
          title: "請輸入您的密碼",
          input: "password",
          inputLabel: "Password",
          inputPlaceholder: "Enter your password",
          inputAttributes: {
            maxlength: "20",
            autocapitalize: "off",
            autocorrect: "off",
          },
        });
      })
      .then(({ value: password }) => {
        user.password = password;
        login(user);
      });
  }
  // 畫面載入或請求時，如果未提供 token，會顯示 jwt malformed
  else if (str === "jwt malformed") {
    Swal.fire({
      title: "訪問權限不足, 請嘗試重新登入",
      input: "email",
      inputLabel: "您的帳號",
      inputPlaceholder: "Enter your email address",
    })
      .then(({ value: email }) => {
        user.email = email;

        return Swal.fire({
          title: "請輸入您的密碼",
          input: "password",
          inputLabel: "Password",
          inputPlaceholder: "Enter your password",
          inputAttributes: {
            maxlength: "20",
            autocapitalize: "off",
            autocorrect: "off",
          },
        });
      })
      .then(({ value: password }) => {
        user.password = password;
        login(user);
      });
  }
}

function login(user) {
  axios
    .post(`${_url}/login`, user)
    .then(function (res) {
      console.log(res);
      if (res.data.user.role === "admin") {
        console.log(res.data);
        let lastLoginTime = moment().format("YYYY年MM月DD日 HH:mm:ss");
        localStorage.setItem("userLoginTime", lastLoginTime);

        localStorage.setItem("userRole", res.data.user.role);
        localStorage.setItem("userName", res.data.user.name);
        localStorage.setItem("userId", res.data.user.id);
        localStorage.setItem("userLoginToken", res.data.accessToken);

        axios
          .patch(`${_url}/users/${res.data.user.id}`, {
            lastLoginTime: `${lastLoginTime}`,
          })
          .then(function () {
            location.reload();
          })
          .catch(function (error) {
            // 登入失敗，處理錯誤
            console.log(error);
          });
      } else {
        console.log("非管理員");
        Swal.fire({
          title: "你是誰?",
          text: "你怎麼會來這裡?",
          icon: "info",
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            location = "index.html";
          }
        });
      }
    })
    .catch(function (err) {
      console.log(err.response.data);
    });
}
