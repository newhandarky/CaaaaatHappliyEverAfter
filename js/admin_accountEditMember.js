import axios from "axios";
import Swal from "sweetalert2";
import { _url } from "./config";
import { headerObj } from "./admin_config";
import { reLogin } from "./loginIsTimeUp";

// http://localhost:5173/CaaaaatHappliyEverAfter/pages/admin_accountEditMember.html?id=1052，把id文字跟數字拆開，方便後面 get users/id
const id = location.href.split("=")[1];
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
const accountEditCancelBtn = document.querySelector(".accountEditCancelBtn");
const memeberEditForm = document.querySelector(".memeberEditForm");

// 初始畫面渲染
axios
  // 路由代碼用 600 -> 使用者只有持有自己的 token 時，可以讀取跟寫入
  .get(`${_url}/600/users/${id}`, headerObj)
  .then(function (res) {
    memberId.value = res.data.id;
    memberName.value = res.data.name;
    memberNickname.value = res.data.nickname;
    memberTel.value = res.data.phone;
    memberArrivedDate.value = res.data.joinDate;
    memberEmergencyContact.value = res.data.emergencyContactPerson;
    memberEmergencyContactTel.value = res.data.emergencyContactPhone;
    memberEmergencyContactRel.value = res.data.emergencyContactRelation;
    memberAccount.value = res.data.email;
    memberPassword.value = res.data.email.slice(0, 11);
    memberAddress.value = res.data.address;
    memberStatus.value = res.data.memberStatus;
  })
  .catch(function (error) {
    reLogin(error.response.data);
  });

// 取消變更按鈕
accountEditCancelBtn.addEventListener("click", function (e) {
  e.preventDefault();
  Swal.fire({
    title: "是否要取消變更",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#20c997",
    cancelButtonColor: "#dc3545",
    confirmButtonText: '<span class="text-white fs-4 px-1">是</span>',
    cancelButtonText: '<span class="text-white fs-4 px-1">否</span>',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "已取消變更",
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

// 儲存變更按鈕
memeberEditForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let obj = {
    password: memberPassword.value,
    name: memberName.value,
    phone: memberTel.value,
    address: memberAddress.value,
    nickname: memberNickname.value,
    emergencyContactPerson: memberEmergencyContact.value,
    emergencyContactPhone: memberEmergencyContactTel.value,
    emergencyContactRelation: memberEmergencyContactRel.value,
    memberStatus: memberStatus.value,
  };

  Swal.fire({
    title: "是否要儲存變更",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#20c997",
    cancelButtonColor: "#dc3545",
    confirmButtonText: '<span class="text-white fs-4 px-1">是</span>',
    cancelButtonText: '<span class="text-white fs-4 px-1">否</span>',
  }).then((result) => {
    if (result.isConfirmed) {
      // 使用 patch 更新部分內容
      axios
        .patch(`${_url}/600/users/${id}`, obj, headerObj)
        .catch(function (error) {
          reLogin(error.response.data);
        });

      Swal.fire({
        title: "後台人員編輯成功",
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
