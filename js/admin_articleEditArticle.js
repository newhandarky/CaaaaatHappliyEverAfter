import axios from "axios";
import { _url } from "./config";
// 載入文字編輯器套件 tinyMCE
import tinymce from "tinymce";

console.log(location.href);

// https://catroomdb.onrender.com/article?id=601，把id文字跟數字拆開，方便後面 get article/id
const id = location.href.split("=")[1];
console.log(id);
const articleEditWrap = document.querySelector(".articleEditWrap");
const articleTitle = document.querySelector(".articleTitle");
const articleId = document.querySelector(".articleId");
const articleKeyword = document.querySelector(".articleKeyword");
const articleContent = document.querySelector("#articleContent");

// 初始畫面渲染
axios
  .get(`${_url}/article/${id}`)
  .then(function (res) {
    articleTitle.value = res.data.title;
    articleId.value = id;
    articleKeyword.value = res.data.keyword;
    articleContent.textContent = res.data.content;

    // 初始渲染 tinymce：文字編輯器 tinyMCE，selector 的值對應 html textarea id
    tinymce.init({
      selector: "textarea#articleContent",
    });
  })
  .catch(function (error) {
    console.log(error);
  });

// 送出表單後，把修改的資料回傳到資料庫
articleEditWrap.addEventListener("submit", function (e) {
  e.preventDefault();

  // tinymce 取得內容要使用 getContent()
  let myContent = tinymce.get("articleContent").getContent();

  // patch 會直接動到資料庫
  axios
    .patch(`${_url}/article/${id}`, {
      title: articleTitle.value,
      keyword: articleKeyword.value,
      content: myContent,
    })
    .catch(function (error) {
      console.log(error);
    });
});
