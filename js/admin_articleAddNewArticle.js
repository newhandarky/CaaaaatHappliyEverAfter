import axios from "axios";
import { _url } from "./config";
// 載入文字編輯器套件 tinyMCE
import tinymce from "tinymce";

// DOM
const articleTitle = document.querySelector(".articleTitle");
const articleId = document.querySelector(".articleId");
const articleKeyword = document.querySelector(".articleKeyword");
// const articleContent = document.querySelector("#articleContent");
const articleAddNewWrap = document.querySelector(".articleAddNewWrap");

// 文字編輯器呼叫
tinymce.init({
  selector: "textarea#articleContent",
});

// post 新文章到資料庫
articleAddNewWrap.addEventListener("submit", function (e) {
  e.preventDefault();

  let myContent = tinymce.get("articleContent").getContent();

  let obj = {};
  obj.title = articleTitle.value;
  obj.content = myContent;
  obj.keyword = articleKeyword.value;
  obj.id = parseInt(articleId.value);

  axios
    .post(`${_url}/article`, obj)
    .then(function (res) {
      console.log(res.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});
