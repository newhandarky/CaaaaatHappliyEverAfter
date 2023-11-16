import axios from "axios";
import { _url } from "./config";

// DOM
const memberId = document.querySelector(".memberId");
const memberName = document.querySelector(".memberName");
const memberNickName = document.querySelector(".memberNickName");
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
    birthday: memberArrivedDate.value,
    phone: memberTel.value,
    address: memberAddress.value,
    userPhoto: "https://i.imgur.com/rUTLxZC.jpg",
    lastLoginTime: "",
    role: "admin",
    emergencyContact: memberEmergencyContact.value,
    emergencyContactTel: memberEmergencyContactTel.value,
    emergencyContactRel: memberEmergencyContactRel.value,
    memberStatus: memberStatus.value,
    id: parseInt(memberId.value),
  };

  axios.post(`${_url}/users`, obj).catch(function (error) {
    console.log(error);
  });
});
