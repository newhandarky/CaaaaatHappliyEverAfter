import axios from "axios";
import Swal from "sweetalert2";
import { _url } from "./config";
import { headerObj } from "./admin_config";
import { reLogin } from "./loginIsTimeUp";

// DOM
const memberId = document.querySelector(".memberId");
const memberName = document.querySelector(".memberName");
const memberNickname = document.querySelector(".memberNickname");
const memberTel = document.querySelector(".memberTel");
const memberArrivedDate = document.querySelector(".memberArrivedDate");
const memberEmergencyContact = document.querySelector(
  ".memberEmergencyContact"
);
const memberEmergencyContactTel = document.querySelector(
  ".memberEmergencyContactTel"
);
const memberEmergencyContactRel = document.querySelector(
  ".memberEmergencyContactRel"
);
const memberAccount = document.querySelector(".memberAccount");
const memberPassword = document.querySelector(".memberPassword");
const memberAddress = document.querySelector(".memberAddress");
const memberStatus = document.querySelector(".memberStatus");

const cancelNewMemberBtn = document.querySelector(".cancelNewMemberBtn");
const memeberAddForm = document.querySelector(".memeberAddForm");

// 故意加上一個請求，驗證目前是否有 user token
axios.get(`${_url}/660/users`, headerObj).catch(function (error) {
  reLogin(error.response.data);
});

// 取消新增按鈕
cancelNewMemberBtn.addEventListener("click", function (e) {
  e.preventDefault();
  Swal.fire({
    title: "是否要取消新增",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#20c997",
    cancelButtonColor: "#dc3545",
    confirmButtonText: '<span class="text-white fs-4 px-1">是</span>',
    cancelButtonText: '<span class="text-white fs-4 px-1">否</span>',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "已取消新增",
        icon: "success",
        showConfirmButton: false,
      });

      // 1 秒後回到人員管理頁面
      setTimeout(() => {
        window.location.href = "./admin_account.html";
      }, 1000);
    }
  });
});

// 新增人員按鈕
memeberAddForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let obj = {
    email: memberAccount.value,
    password: memberPassword.value,
    name: memberName.value,
    gender: "",
    birthday: "",
    phone: memberTel.value,
    address: memberAddress.value,
    userPhoto: "https://i.imgur.com/rUTLxZC.jpg",
    nickname: memberNickname.value,
    joinDate: memberArrivedDate.value,
    emergencyContactPerson: memberEmergencyContact.value,
    emergencyContactPhone: memberEmergencyContactTel.value,
    emergencyContactRelation: memberEmergencyContactRel.value,
    memberStatus: memberStatus.value,
    lastLoginTime: "",
    role: "admin",
    id: parseInt(memberId.value),
  };

  Swal.fire({
    title: "是否確定新增",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#20c997",
    cancelButtonColor: "#dc3545",
    confirmButtonText: '<span class="text-white fs-4 px-1">是</span>',
    cancelButtonText: '<span class="text-white fs-4 px-1">否</span>',
  }).then((result) => {
    if (result.isConfirmed) {
      // 新增人員當下馬上就會產生一組新的 jwt token 所以基本上加上 header authorization 沒意義
      axios.post(`${_url}/users`, obj).catch(function (error) {
        console.log(error.response.data);
      });

      Swal.fire({
        title: "後台人員新增成功",
        icon: "success",
        showConfirmButton: false,
      });

      // 1 秒後回到人員管理頁面
      setTimeout(() => {
        window.location.href = "./admin_account.html";
      }, 1000);
    }
  });
});
