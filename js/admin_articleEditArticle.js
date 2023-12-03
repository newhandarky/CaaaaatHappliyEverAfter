import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import { _url } from "./config";
// 載入文字編輯器套件 tinyMCE
import tinymce from "tinymce";
import { headerObj } from "./admin_config";
import { reLogin } from "./loginIsTimeUp";

// DOM
// https://catroomdb.onrender.com/article?id=601，把id文字跟數字拆開，方便後面 get article/id
const id = location.href.split("=")[1];

// 文章表單監聽用
const articleEditForm = document.querySelector(".articleEditForm");
const articleTitle = document.querySelector(".articleTitle");
const articleId = document.querySelector(".articleId");
const articleKeyword = document.querySelector(".articleKeyword");
const articleContent = document.querySelector("#articleContent");

// 取消變更 -> 儲存草稿按鈕
const saveAsDraftBtn = document.querySelector(".saveAsDraftBtn");
// 刪除文章按鈕
const deleteArticleBtn = document.querySelector(".deleteArticleBtn");

let data;
// 初始畫面渲染
function init() {
  axios
    .get(`${_url}/660/article/${id}`, headerObj)
    .then(function (res) {
      data = res.data;
      articleTitle.value = data.title;
      articleId.value = id;
      articleKeyword.value = data.keyword;
      articleContent.textContent = data.content;

      // 初始渲染 tinymce：文字編輯器 tinyMCE，selector 的值對應 html textarea id

      tinymce.init({
        selector: "textarea#articleContent",
      });
    })
    .catch(function (error) {
      reLogin(error.response.data);
    });
}

init();

// 儲存變更按鈕
articleEditForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // 取得發佈時間
  getTime();

  // tinymce 取得內容要使用 getContent(文字編輯器區塊id)，要放在文字編輯器 tinymce.init() 後面
  let myContent = tinymce.get("articleContent").getContent();

  let obj = {
    title: articleTitle.value,
    content: myContent,
    keyword: articleKeyword.value,
    lastEditOrPublishTime: localStorage.getItem("articleLastEditOrPublishTime"),
    status: "已發佈",
  };

  Swal.fire({
    title: "是否要儲存變更",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#20c997",
    cancelButtonColor: "#dc3545",
    confirmButtonText: '<span class="text-white fs-4 px-1">是</span>',
    cancelButtonText: '<span class="text-white fs-4 px-1">否</span>',
  }).then((result) => {
    if (result.isConfirmed) {
      // 使用 patch 更新部分內容
      axios
        .patch(`${_url}/660/article/${id}`, obj, headerObj)
        .then(function () {
          Swal.fire({
            title: "文章編輯成功",
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
saveAsDraftBtn.addEventListener("click", function (e) {
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
        .patch(`${_url}/article/${id}`, obj, headerObj)
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
    }
  });
});

// 刪除文章功能
deleteArticleBtn.addEventListener("click", function (e) {
  e.preventDefault();
  // 加入判斷，如果狀態為「已發佈」就不能刪除
  if (data.status === "已發佈") {
    Swal.fire({
      title: "文章已發佈，禁止刪除！是否要繼續編輯",
      icon: "error",
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: "#20c997",
      cancelButtonColor: "#dc3545",
      confirmButtonText: '<span class="text-white fs-4 px-1">是</span>',
      cancelButtonText: '<span class="text-white fs-4 px-1">否</span>',
    }).then((result) => {
      if (result.isConfirmed) {
        // 按「是」代表要繼續編輯，使用 Swal.close() 關閉彈跳視窗
        Swal.close();
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
  } else {
    Swal.fire({
      title: "是否要刪除文章",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#20c997",
      cancelButtonColor: "#dc3545",
      confirmButtonText: '<span class="text-white fs-4 px-1">是</span>',
      cancelButtonText: '<span class="text-white fs-4 px-1">否</span>',
    }).then((result) => {
      if (result.isConfirmed) {
        // 從資料庫刪除文章
        axios
          .delete(`${_url}/660/article/${id}`, headerObj)
          .then(function () {
            Swal.fire({
              title: "已成功刪除文章",
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
      }
    });
  }
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
