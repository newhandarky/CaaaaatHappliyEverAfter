import axios from "axios";
import { _url } from "./config";
// 載入文字編輯器套件 tinyMCE
import tinymce from "tinymce";

console.log(location.href);

// DOM
// https://catroomdb.onrender.com/article?id=601，把id文字跟數字拆開，方便後面 get article/id
const id = location.href.split("=")[1];
console.log(id);

// 文章表單監聽用
const articleEditWrap = document.querySelector(".articleEditWrap");
const articleTitle = document.querySelector(".articleTitle");
const articleId = document.querySelector(".articleId");
const articleKeyword = document.querySelector(".articleKeyword");
const articleContent = document.querySelector("#articleContent");
// 儲存草稿按鈕
const saveAsDraftBtn = document.querySelector(".saveAsDraftBtn");
// 刪除文章按鈕
const deleteArticleBtn = document.querySelector(".deleteArticleBtn");

// 初始畫面渲染
function init() {
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
}

init();

// 發布文章功能
articleEditWrap.addEventListener("submit", function (e) {
  e.preventDefault();

  // 取得發佈時間
  getTime();

  // tinymce 取得內容要使用 getContent()，要放在文字編輯器 init 後面
  let myContent = tinymce.get("articleContent").getContent();

  let obj = {
    title: articleTitle.value,
    content: myContent,
    keyword: articleKeyword.value,
    lastEditOrPublishTime: localStorage.getItem("articleLastEditOrPublishTime"),
    status: "已發佈",
  };
  // patch 會直接動到資料庫
  axios.patch(`${_url}/article/${id}`, obj).catch(function (error) {
    console.log(error);
  });
});

// 儲存草稿功能
saveAsDraftBtn.addEventListener("click", function (e) {
  // 取得最後編輯時間
  getTime();

  // tinymce 取得內容要使用 getContent()，要放在文字編輯器 init 後面
  let myContent = tinymce.get("articleContent").getContent();

  let obj = {
    title: articleTitle.value,
    content: myContent,
    keyword: articleKeyword.value,
    lastEditOrPublishTime: localStorage.getItem("articleLastEditOrPublishTime"),
    status: "草稿",
  };

  // 儲存草稿的資料存進資料庫
  axios.patch(`${_url}/article/${id}`, obj).catch(function (error) {
    console.log(error);
  });
});

// 刪除文章功能
deleteArticleBtn.addEventListener("click", function () {
  axios.delete(`${_url}/article/${id}`).catch(function (error) {
    console.log(error);
  });
});

// 取得文章發布或最後編輯時間
function getTime() {
  // 文章編輯或發佈後，取得當前時間
  var articleLastEditOrPublishTime = new Date();

  // 將文章編輯或發佈時間轉換為字串，方便存儲，把 toISOString改成 toLocaleString 使用 UTC+8 時區
  var articleLastEditOrPublishTimeString =
    articleLastEditOrPublishTime.toLocaleString("en-US", {
      timeZone: "Asia/Taipei",
    });

  // 使用 localStorage 存儲文章編輯或發佈時間
  localStorage.setItem(
    "articleLastEditOrPublishTime",
    articleLastEditOrPublishTimeString
  );
}
