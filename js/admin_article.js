import axios from "axios";
import { _url } from "./config";

const adminArticleList = document.querySelector(".adminArticleList");

const perPage = 3; // 每頁顯示的項目數量
let currentPage = 1; // 當前頁碼

let data;
function init(page) {
  axios
    // 用 _limit 來畫份資料庫中資料每頁的筆數，?_page 讀取特定的頁數
    .get(`${_url}/article?_page=${page}&_limit=${perPage}`)
    .then(function (res) {
      data = res.data;
      renderData();
      //   抓取 response 中 headers 裡面的 x-total-count 屬性，這個屬性記錄我們 get pages 的資料的總筆數，這邊當作參數傳入 updatePagnition 函式
      updatePagination(res.headers["x-total-count"]);
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// 呼叫初始化函式
init(currentPage);

// 表格渲染
function renderData() {
  let str = ``;

  data.forEach(function (item) {
    // 登入者為 admin 才能觀看
    if (localStorage.getItem("userRole") === "admin") {
      str += `<tr>
        <td>${localStorage.getItem("userName")}</td>
        <td>2023-01-01</td>
        <td>${item.title}</td>
        <td>${item.id}</td>
        <td>${item.keyword}</td>
        <td>已發佈</td>
        <td><a class="editArticle" href="./admin_articleEditArticle.html?id=${
          item.id
        }">
        <span class="material-symbols-outlined"> edit_square </span>
      </a></td>
        </tr>`;
    }
  });

  adminArticleList.innerHTML = str;
}

// 分頁效果
function updatePagination(totalItems) {
  // Math.ceil() 會無條件進位，這裡的 totalItems 會使用從 init 函式中使用到的 res.headers['x-total-count']
  const totalPages = Math.ceil(totalItems / perPage);
  const paginationContainer = document.querySelector(".pagination");
  paginationContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    // 用 createElement 在 DOM 加入新 HTML 標籤
    const pageItem = document.createElement("li");
    // 用 classList.add 在 DOM 加入 class 名稱
    pageItem.classList.add("page-item");
    const pageLink = document.createElement("a");
    pageLink.classList.add("page-link");

    pageLink.textContent = i;
    pageLink.href = "#";
    pageLink.addEventListener("click", () => {
      pageItem.classList.add("active");
      currentPage = i;
      init(currentPage);
    });

    // 把pageItem這個DOM加入一個子節點pageLink
    pageItem.appendChild(pageLink);
    // 把paginationContainer這個DOM加入一個子節點pageItem，一層包一層
    paginationContainer.appendChild(pageItem);
  }
}
