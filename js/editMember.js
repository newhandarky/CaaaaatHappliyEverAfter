import axios from "axios";
import { _url } from "./config";

//取得所需要的資療及DOM元素
const userTokenAndData = JSON.parse(localStorage.getItem("userTokenAndData"));
const { accessToken, user } = userTokenAndData;
const editMemberFrom = document.getElementById("editMemberFrom");

// 呈現input 舊資料的值
function showOriginalData() {
  const memberId = user.id;
  axios
    .get(`${_url}/600/users/${memberId}`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      const { name, gender, birthday, address, phone, email, userPhoto } =
        res.data;

      //抓取表單資料

      const nameDom = document.getElementById("name");
      const maleDom = document.getElementById("male");
      const femaleDom = document.getElementById("female");
      const otherDom = document.getElementById("other");
      const birthdayDom = document.getElementById("birthday");
      const phoneDom = document.getElementById("phone");
      const addressDom = document.getElementById("address");
      const photoDom = document.getElementById("photo");

      // 把原有的資料呈現 input 裡面
      nameDom.value = name;
      // 資料是什麼性別 DOM就呈現在 input 裡面
      (function isGender() {
        if (gender === "male") {
          maleDom.checked = true;
        } else if (gender === "female") {
          femaleDom.checked = true;
        } else if (gender === "other") {
          otherDom.checked = true;
        }
      })();
      birthdayDom.value = birthday;
      phoneDom.value = phone;
      addressDom.value = address;
      photoDom.setAttribute("src", userPhoto);
    })
    .catch((err) => {
      console.log(err);
      // alert(err);
      // window.location.href = "./login.html";
    });
}

showOriginalData();

// // 註冊 function
// function editData(userData) {
//   axios
//     .post(`${_url}/signup`, userData)
//     .then((res) => {
//       console.log(res);
//       alert("註冊成功");
//       window.location.href = "./login.html";
//     })
//     .catch((err) => {
//       //錯誤提示
//       alert(`註冊失敗：${err.response.data}`);
//       console.log(err);
//     });
// }

// //按下會員註冊
// editMemberFrom.addEventListener("submit", (e) => {
//   e.preventDefault();

//   //判斷哪個性別被選取
//   let gender = () =>
//     // 使用三元条件运算符来判断哪个性别被选取，并返回相应的值
//     male.checked
//       ? male.value
//       : female.checked
//       ? female.value
//       : other.checked
//       ? other.value
//       : "Not Specified";

//   let userData = {
//     email,
//     password,
//     name,
//     gender: gender(),
//     birthday,
//     phone,
//     address,
//     userPhoto: "https://i.imgur.com/rUTLxZC.jpg",
//     catId: null,
//     lastLoginTime: null,
//   };
//   console.log(userData);
//   // 使用編輯函數來編輯會員資料
//   //   editData(userData);
// });
