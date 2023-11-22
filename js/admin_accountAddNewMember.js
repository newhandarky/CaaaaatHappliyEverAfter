import axios from "axios";
import { _url } from "./config";

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

const sendNewMember = document.querySelector(".sendNewMember");

// 點擊新增按鈕監聽
sendNewMember.addEventListener("click", function (e) {
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

  axios.post(`${_url}/users`, obj).catch(function (error) {
    console.log(error);
  });
});
