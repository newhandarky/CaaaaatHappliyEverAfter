/*------------------------------------*\
    import
\*------------------------------------*/
import axios from "axios";
import Swal from "sweetalert2";
import { _url } from "./config";

export function reLogin(str) {
    const user = {};

    if (str === 'jwt expired') {
        Swal.fire({
            title: "您的帳號登入已逾時, 請重新登入",
            input: "email",
            inputLabel: "您的帳號",
            inputPlaceholder: "Enter your email address"
        }).then(({ value: email }) => {
            user.email = email;

            return Swal.fire({
                title: "請輸入您的密碼",
                input: "password",
                inputLabel: "Password",
                inputPlaceholder: "Enter your password",
                inputAttributes: {
                    maxlength: "20",
                    autocapitalize: "off",
                    autocorrect: "off"
                }
            });
        }).then(({ value: password }) => {
            user.password = password;
            login(user);
        });
    }
}


function login(user) {
    axios.post(`${_url}/login`, user)
        .then(function (res) {
            console.log(res);
            if (res.data.user.role === "admin") {
                console.log(res.data);
                localStorage.setItem("userRole", res.data.user.role);
                localStorage.setItem("userName", res.data.user.name);
                localStorage.setItem("userLoginToken", res.data.accessToken);
                location.reload();
            } else {
                console.log("非管理員");
                Swal.fire({
                    title: "你是誰?",
                    text: "你怎麼會來這裡?",
                    icon: "info",
                    confirmButtonColor: "#3085d6"
                }).then((result) => {
                    if (result.isConfirmed) {
                        location = "index.html"
                    }
                });
            }
        }).catch(function (err) {
            console.log(err.response);
        })
}