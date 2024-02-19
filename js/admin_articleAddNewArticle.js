import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import { _url } from "./config";
// 載入文字編輯器套件 tinyMCE
import tinymce from "tinymce";
import { headerObj } from "./admin_config";
import { reLogin } from "./loginIsTimeUp";

// DOM
const articleTitle = document.querySelector(".articleTitle");
const articleId = document.querySelector(".articleId");
const articleKeyword = document.querySelector(".articleKeyword");
const articleAddNewForm = document.querySelector(".articleAddNewForm");
// 取消新增 -> 儲存草稿按鈕
const cancelSaveArticleBtn = document.querySelector(".cancelSaveArticleBtn");

// 文字編輯器呼叫
tinymce.init({
  selector: "textarea#articleContent",
});

// 新增文章按鈕
articleAddNewForm.addEventListener("submit", function (e) {
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

  Swal.fire({
    title: "是否要新增文章",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#20c997",
    cancelButtonColor: "#dc3545",
    confirmButtonText: '<span class="text-white fs-4 px-1">是</span>',
    cancelButtonText: '<span class="text-white fs-4 px-1">否</span>',
  }).then((result) => {
    if (result.isConfirmed) {
      // post 新文章到資料庫
      axios
        .post(`${_url}/660/article`, obj, headerObj)
        .then(function () {
          // 新增成功要用一個 then 包起來，不然 token 過期通知跳出時，錯誤通知跟新增成功會一起跑，還沒重新登入前就會跳回 admin_article
          Swal.fire({
            title: "文章新增成功",
            icon: "success",
            showConfirmButton: false,
          });

          // 1 秒後回到文章總覽
          setTimeout(() => {
            window.location.href = "./admin_article.html";
          }, 1000);
        })
        .catch(function (error) {
          reLogin(error.response.data);
        });
    }
  });
});

// 取消變更/儲存草稿按鈕
cancelSaveArticleBtn.addEventListener("click", function (e) {
  e.preventDefault();
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

  Swal.fire({
    title: "是否要儲存為草稿",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#20c997",
    cancelButtonColor: "#dc3545",
    confirmButtonText: '<span class="text-white fs-4 px-1">是</span>',
    cancelButtonText: '<span class="text-white fs-4 px-1">否</span>',
  }).then((result) => {
    if (result.isConfirmed) {
      // 儲存草稿的資料存進資料庫
      axios
        .post(`${_url}/660/article`, obj, headerObj)
        .then(function () {
          Swal.fire({
            title: "已成功儲存為草稿",
            icon: "success",
            showConfirmButton: false,
          });

          setTimeout(() => {
            window.location.href = "./admin_article.html";
          }, 1000);
        })
        .catch(function (error) {
          reLogin(error.response.data);
        });
    } else if (result.isDismissed) {
      Swal.fire({
        title: "即將返回文章總覽",
        icon: "success",
        showConfirmButton: false,
      });

      setTimeout(() => {
        window.location.href = "./admin_article.html";
      }, 1000);
    }
  });
});

// 取得文章發佈或最後編輯時間
function getTime() {
  // 文章編輯或發佈後，取得當前時間
  let articleLastEditOrPublishTime = moment().format("YYYY-MM-DD");

  // 使用 localStorage 存儲文章編輯或發佈時間
  localStorage.setItem(
    "articleLastEditOrPublishTime",
    articleLastEditOrPublishTime
  );
}
