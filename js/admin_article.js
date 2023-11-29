import axios from "axios";
import { _url } from "./config";

// DOM
// 表格
const adminArticleList = document.querySelector(".adminArticleList");
// 分頁導覽
const paginationContainer = document.querySelector(".pagination");

// 每頁顯示的資料數量
const perPage = 3;

let data;

// 抓回資料庫文章數
axios
  .get(`${_url}/article`)
  .then(function (res) {
    // console.log(res);
    data = res.data;

    // 這邊等同於 init 函式效果，會根據每個分頁來渲染畫面。預設進入畫面會顯示第一頁，所以 nowPage 先帶入 1
    pagination(data, 1);
  })
  .catch(function (error) {
    console.log(error);
  });

// 分頁畫面渲染
function pagination(data, nowPage) {
  // 取得資料總筆數(文章總數)
  const dataTotal = data.length;

  // 計算總頁數 = 資料總筆數 / 每頁顯示資料筆數
  // Math.ceil() 會無條件進位
  const totalPages = Math.ceil(dataTotal / perPage);

  // 當前頁數，對應現在當前頁數
  let currentPage = nowPage;
  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  // 整理每個分頁的資料，用來渲染表格
  // 邏輯：切換頁數的時候，資料也必須相對應重新吐給我們而不是一直停留在同一頁，所以假設顯示在畫面上的資料是 3 筆，那麼它就會吐 第 1 筆 ~ 3 筆資料，如果我們在第二頁時，那麼資料就會吐第 4 筆 ~ 第 6 筆的資料

  // minData 等於該頁面的第一筆資料
  const minData = currentPage * perPage - perPage + 1;
  // maxData 等於該頁面的最後一筆資料
  const maxData = currentPage * perPage;

  // 先建立新陣列
  const newData = [];

  // 用 forEach 取得完整資料的索引值(index)當作頁面的第 n 筆資料
  data.forEach((item, index) => {
    // 獲取陣列索引，但因為索引是從 0 開始所以要 +1。
    const num = index + 1;

    // 當 num 比 minData 大且小於 maxData 就 push 進去新陣列，會根據當前頁面而改變 minData 跟 maxData 的值
    if (num >= minData && num <= maxData) {
      newData.push(item);
    }
  });

  // 丟進 renderTable 函式，渲染表格
  renderTable(newData);

  // 把分頁導覽列參數存進 page 物件傳到 pageBtn 函式處理
  const page = {
    totalPages,
    currentPage,
    hasPage: currentPage > 1,
    hasNext: currentPage < totalPages,
  };

  // console.log(page);
  pageBtn(page);
}

// 表格渲染
function renderTable(newData) {
  let str = ``;
  console.log(newData);
  newData.forEach(function (item) {
    // 登入者為 admin 才能觀看
    // a href= ...?id=${item.id} 把使用者導到對應頁面
    if (localStorage.getItem("userRole") === "admin") {
      str += `<tr>
        <td>${localStorage.getItem("userName")}</td>
        <td>${item.lastEditOrPublishTime}</td>
        <td>${item.title}</td>
        <td>${item.id}</td>
        <td>${item.keyword}</td>
        <td>${item.status}</td>
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

function pageBtn(page) {
  let str = "";

  // page 是物件所以都要使用物件取值方式處理
  const total = page.totalPages;

  // 如果當前頁面不是第一頁，就創建一個可點擊的 previousBtn，要是當前頁面是第一頁，previousBtn 會變 disabled
  // previous 可點擊的情況下 data-page 的值會跟 currentPage -1 的 page-link 有相同 data-page 的值
  if (page.hasPage) {
    str += `<li class="page-item"><a class="page-link" href="#" data-page="${
      Number(page.currentPage) - 1
    }">Previous</a></li>`;
  } else {
    str += `<li class="page-item disabled"><span class="page-link">Previous</span></li>`;
  }

  // 幫當前頁面加入 active 樣式
  for (let i = 1; i <= total; i++) {
    if (Number(page.currentPage) === i) {
      str += `<li class="page-item active"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
    } else {
      str += `<li class="page-item"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
    }
  }

  // 如果當前頁面不是最後一頁，就創建一個可點擊的 nextBtn，要是當前頁面是最後一頁，nextBtn 會變 disabled
  // next 可點擊的情況下 data-page 的值會跟 currentPage +1 的 page-link 有相同 data-page 的值
  if (page.hasNext) {
    str += `<li class="page-item"><a class="page-link" href="#" data-page="${
      Number(page.currentPage) + 1
    }">Next</a></li>`;
  } else {
    str += `<li class="page-item disabled"><span class="page-link">Next</span></li>`;
  }

  paginationContainer.innerHTML = str;
}

function switchPage(e) {
  e.preventDefault();

  // 如果點擊的不是一個 a 連結，就中斷連結。因為 nodeName 出來是大寫所以用 "A" 表示
  if (e.target.nodeName !== "A") return;

  // 抓取 data-page 屬性來確定目前分頁，以此渲染畫面及分頁導覽列
  const page = e.target.dataset.page;
  // console.log(page);
  pagination(data, page);
}

// 監聽分頁導覽列
paginationContainer.addEventListener("click", switchPage);
