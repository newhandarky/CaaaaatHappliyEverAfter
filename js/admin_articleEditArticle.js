import axios from "axios";
import { _url } from "./config";

console.log(location.href);
// http://localhost:5173/CaaaaatHappliyEverAfter/pages/admin_accountEditMember.html?id=1052，把id文字跟數字拆開，方便後面 get article/id
const id = location.href.split("=")[1];
const articleTitle = document.querySelector(".articleTitle");
const articleId = document.querySelector(".articleId");
const articleKeyword = document.querySelector(".articleKeyword");

axios
  .get(`${_url}/article/${id}`)
  .then(function (res) {
    articleTitle.value = res.data.title;
    articleId.value = id;
    articleKeyword.value = res.data.keyword;
  })
  .catch(function (error) {
    console.log(error);
  });
