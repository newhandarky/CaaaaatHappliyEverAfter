import axios from "axios";
import { _url } from "./config";

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
const accountEditSaveBtn = document.querySelector(".accountEditSaveBtn");

// 初始畫面渲染
axios
  .get(`${_url}/users/${id}`)
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
    console.log(error);
  });

// 儲存變更按鈕
accountEditSaveBtn.addEventListener("click", function (e) {
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

  // 使用 patch 更新部分內容
  axios.patch(`${_url}/users/${id}`, obj).catch(function (error) {
    console.log(error);
  });
});
