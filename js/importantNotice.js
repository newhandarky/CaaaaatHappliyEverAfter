import axios from "axios";
import { _url } from "./config";
import { isLogin } from "./isLogin";

// aside bar 顯示當前頁面
// 因為有兩個 aside bar 所以要用 querySelectorAll
const asideLocation = document.querySelectorAll("#importantNotice");
asideLocation.forEach((element) => {
  element.classList.add("onThisPage");
});
