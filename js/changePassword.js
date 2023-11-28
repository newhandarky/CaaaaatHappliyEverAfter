import axios from "axios";
import { _url } from "./config";
import { isLogin } from "./isLogin";

// aside bar 顯示當前頁面
// 因為有兩個 aside bar 所以要用 querySelectorAll
const asideLocation = document.querySelectorAll("#changePassword");
asideLocation.forEach((element) => {
  element.classList.add("onThisPage");
});

//navAside 顯示 因為是會員功能頁面
const navAside = document.querySelector("#navAside");
navAside.classList.remove("d-none");
