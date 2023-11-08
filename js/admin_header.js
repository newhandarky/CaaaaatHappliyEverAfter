import axios from "axios";
import Swal from "sweetalert2";

// const url = "http://localhost:3000"; // 本機端
const url = "https://catroomdb.onrender.com"; // json=server端
const welcome = document.querySelector(".welcome");
const logout = document.querySelector(".logout");
const adminLogin = document.querySelector(".adminLogin");


adminLogin.addEventListener("click", function () {
    login()
})

logout.addEventListener("click", function () {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'success',
        title: '您已成功登出'
    })
    localStorage.clear();
    render()
})


/*------------------------------------*\
    function
\*------------------------------------*/
function render() {
    localStorage.getItem("userName") === null ? welcome.innerHTML = "" : welcome.innerHTML = `登入人員 : ${localStorage.getItem("userName")} 歡迎您回來`;
}

function login(){
    axios.post(`${url}/login`, {
        // 管理員帳密
        "email": "userTest053@gmail.com",
        "password": "userTest053"

    }).then(function (res) {
        console.log(res);
        localStorage.setItem("userLoginToken", res.data.accessToken);
        if (res.data.user.role === "admin") {
            localStorage.setItem("userRole", res.data.user.role);
            localStorage.setItem("userName", res.data.user.name);
        } else {
            location = "index.html"
        }
        render();
    }).catch(function (err) {
        console.log(err.response);
    })
}

window.onload = function(){
    render();
}