import axios from "axios";
import { _url } from "./config";
// 載入文字編輯器套件 tinyMCE
import tinymce from "tinymce";

// DOM
const articleTitle = document.querySelector(".articleTitle");
const articleId = document.querySelector(".articleId");
const articleKeyword = document.querySelector(".articleKeyword");
const articleAddNewWrap = document.querySelector(".articleAddNewWrap");
// 儲存草稿按鈕
const saveAsDraftBtn = document.querySelector(".saveAsDraftBtn");

// 文字編輯器呼叫
tinymce.init({
  selector: "textarea#articleContent",
});

// 發佈新文章功能
articleAddNewWrap.addEventListener("submit", function (e) {
  e.preventDefault();

  // 取得發佈新文章時間
  getTime();

  // tinymce 取得內容要使用 getContent()，要放在文字編輯器 init 後面
  let myContent = tinymce.get("articleContent").getContent();

  let obj = {
    title: articleTitle.value,
    content: myContent,
    keyword: articleKeyword.value,
    lastEditOrPublishTime: localStorage.getItem("articleLastEditOrPublishTime"),
    status: "已發佈",
    id: parseInt(articleId.value),
  };

  // post 到資料庫
  axios.post(`${_url}/article`, obj).catch(function (error) {
    console.log(error);
  });
});

// 儲存草稿功能
saveAsDraftBtn.addEventListener("click", function () {
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
    id: parseInt(articleId.value),
  };

  // 儲存草稿的資料存進資料庫
  axios.post(`${_url}/article`, obj).catch(function (error) {
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
