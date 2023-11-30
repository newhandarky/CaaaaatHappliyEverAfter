import axios from "axios";
import { _url } from "./config";
import { isLogin } from "./isLogin";
import flatpickr from "flatpickr";
import Swal from "sweetalert2";

// aside bar 顯示當前頁面
// 因為有兩個 aside bar 所以要用 querySelectorAll
const asideLocation = document.querySelectorAll("#memberData");
asideLocation.forEach((element) => {
  element.classList.add("onThisPage");
});

//navAside 顯示 因為是會員功能頁面
const navAside = document.querySelector("#navAside");
navAside.classList.remove("d-none");

//flatpickr 套件使用
flatpickr("#birthday", {
  enableTime: false,
  dateFormat: "Y-m-d",
});

//取得所需要的資療及DOM元素
const userTokenAndData = JSON.parse(localStorage.getItem("userTokenAndData"));
const { accessToken, user } = userTokenAndData;
const editMemberFrom = document.getElementById("editMemberFrom");
const cancelEdit = document.getElementById("cancelEdit");
const myFile = document.getElementById("myFile");

// 上傳圖片需要轉存為 Base64 數據宣告
const imageData = {};

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

      //當資料載入完成時，隱藏 loading 元素
      const loadingDom = document.querySelector("#loading");
      loadingDom.classList.toggle("d-none");
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
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-custom-confirm",
          cancelButton: "btn btn-custom-cancel",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
        .fire({
          title: "修改會員成功",
          icon: "success",
          confirmButtonText: "確定",
        })
        .then((result) => {
          //按下確定後頁面跳轉
          window.location.href = "./member.html";
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
          title: "修改會員失敗",
          text: "請重新登入後再嘗試",
          confirmButtonText: "確定",
        })
        .then((result) => {
          window.location.href = "./login.html";
        });
    });
}

// //按下完成編輯
editMemberFrom.addEventListener("submit", (e) => {
  e.preventDefault();

  //先判斷是否為登入狀態
  // isLoginStay 是自訂一的函數 判斷登入狀態
  isLogin();

  //當資料載入時，顯示 loading 元素 並隱藏 editMember 元素
  const editMemberDom = document.querySelector("#editMember");
  editMemberDom.classList.toggle("d-none");
  const loadingDom = document.querySelector("#loading");
  loadingDom.classList.toggle("d-none");

  //抓取表單資料 除了圖片

  const nameDom = document.getElementById("name");
  const maleDom = document.getElementById("male");
  const femaleDom = document.getElementById("female");
  const otherDom = document.getElementById("other");
  const birthdayDom = document.getElementById("birthday");
  const phoneDom = document.getElementById("phone");
  const addressDom = document.getElementById("address");

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
    userPhoto: imageData.base64Image,
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
  isLogin(cancelEditHerf);
});

//上傳圖片

myFile.addEventListener("change", (event) => {
  // 抓到選擇的圖片檔案描述
  const selectedFile = event.target.files[0];

  // 轉換圖片格式為 Base64
  const reader = new FileReader();

  reader.onload = (e) => {
    const base64Data = e.target.result;

    // 将图像数据编码为 Base64 字符串

    imageData.base64Image = base64Data;
    imageData.fileName = selectedFile.name;

    // 将图像数据显示在<img>元素中
    const photoDom = document.getElementById("photo");
    photoDom.src = imageData.base64Image;

    // 在这里可以将 imageData 发送到后端，更新用户的头像等操作
  };

  reader.readAsDataURL(selectedFile);
  console.log(imageData);
});
