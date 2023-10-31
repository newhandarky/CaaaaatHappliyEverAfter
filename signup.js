import axios from "axios";

//抓到 Dom 元素
const host = "https://catroomdb.onrender.com";

const signuForm = document.getElementById("signuForm");
const loginBtn = document.getElementById("loginBtn");

// 註冊 function
function signup(userData) {
  axios
    .post(`${host}/signup`, userData)
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
signuForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = e.explicitOriginalTarget;
  console.log(formData);
  //判斷哪個性別被選取
  let gender = () => {
    for (let i = 3; i <= 5; i++) {
      if (formData[i].checked) {
        return formData[i].value;
      }
    }
  };
  let userData = {
    email: formData[0].value,
    password: formData[1].value,
    name: formData[2].value,
    gender: gender(),
    birthday: formData[6].value,
    phone: formData[7].value,
    address: formData[8].value,
  };
  console.log(userData);

  // 使用註冊函數來註冊會員

  signup(userData);
});
