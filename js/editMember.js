import axios from "axios";
import { _url } from "./config";
import { isLoginToHref } from "./isLoginToHref";

import { isLoginStay } from "./isLoginStay";

//取得所需要的資療及DOM元素
const userTokenAndData = JSON.parse(localStorage.getItem("userTokenAndData"));
const { accessToken, user } = userTokenAndData;
const editMemberFrom = document.getElementById("editMemberFrom");
const cancelEdit = document.getElementById("cancelEdit");

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

// // 變更資料 function
function editData(userData) {
  const memberId = user.id;
  axios
    .patch(`${_url}/600/users/${memberId}`, userData, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      console.log(res);
      alert("修改會員資料成功");
      window.location.href = "./member.html";
    })
    .catch((err) => {
      //錯誤提示
      console.log(err);
      alert(
        `修改會員資料失敗 請重新登入後嘗試 /n錯誤提示：${err.response.data}`
      );
      window.location.href = "./login.html";
    });
}

// //按下完成編輯
editMemberFrom.addEventListener("submit", (e) => {
  e.preventDefault();

  //先判斷是否為登入狀態
  isLoginStay();

  //抓取表單資料

  const nameDom = document.getElementById("name");
  const maleDom = document.getElementById("male");
  const femaleDom = document.getElementById("female");
  const otherDom = document.getElementById("other");
  const birthdayDom = document.getElementById("birthday");
  const phoneDom = document.getElementById("phone");
  const addressDom = document.getElementById("address");
  const photoDom = document.getElementById("photo");
  //判斷哪個性別被選取
  let gender = () =>
    // 使用三元条件运算符来判断哪个性别被选取，并返回相应的值
    maleDom.checked
      ? male.value
      : femaleDom.checked
      ? female.value
      : otherDom.checked
      ? other.value
      : "Not Specified";

  let userData = {
    name: nameDom.value,
    gender: gender(),
    birthday: birthdayDom.value,
    phone: phoneDom.value,
    address: addressDom.value,
    userPhoto:
      phoneDom.getAttribute("src") || "https://i.imgur.com/rUTLxZC.jpg",
  };
  console.log(userData);

  // 使用編輯函數來編輯會員資料
  editData(userData);
});

// 按下取消編輯時 偵測是否為登入狀態
cancelEdit.addEventListener("click", (e) => {
  e.preventDefault();

  const cancelEditHerf = cancelEdit.getAttribute("href");

  // isLoginToHref 是自訂一的函數 判斷登入狀態 需要帶入前往的網址頁面路徑
  // _url 是後端主機位置
  // memberHerf 試驗成功登入後 要前往的連結位置 形式像是 "../member.html"
  isLoginToHref(cancelEditHerf);
});
