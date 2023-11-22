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
  })
  .catch(function (error) {
    console.log(error);
  });
