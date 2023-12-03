import axios from "axios";
import { _url } from "./config";
import { headerObj } from "./admin_config";
import { reLogin } from "./loginIsTimeUp";

const editAccountBtn = document.querySelector(".editAccountBtn");
const adminMemberList = document.querySelector(".adminMemberList");
const paginationContainer = document.querySelector(".pagination");
const memberSearch = document.querySelector(".memberSearch");
const mySearch = document.querySelector("#mySearch");

// 要記得轉成數字再進行比較，因為 localStorage 取出是字串
let id = parseInt(localStorage.getItem("userId"));

// 每頁顯示的資料數量
const perPage = 5;

let data;

// 初始畫面渲染
axios
  .get(`${_url}/660/users?role=admin`, headerObj)
  .then(function (res) {
    data = res.data;
    // 這邊等同於 init 函式效果，會根據每個分頁來渲染畫面。預設進入畫面會顯示第一頁，所以 nowPage 先帶入 1
    pagination(data, 1);
  })
  .catch(function (error) {
    reLogin(error.response.data);
  });

// 分頁畫面渲染
function pagination(data, nowPage) {
  // 取得資料總筆數(管理員總數)
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
  newData.forEach(function (item) {
    // 表格編輯人員按鈕，限制每個人只能編輯自己的帳號
    if (item.role === "admin" && id === item.id) {
      // a tag 內的 href 加上 ?id=${item.id} 來導入編輯管理員時對應的頁面
      str += `<tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.phone}</td>
            <td>${item.address}</td>
            <td>${item.joinDate}</td>
            <td class="text-center">
              <a class="editMember" href="./admin_accountEditMember.html?id=${item.id}">
                <span class="material-symbols-outlined link-primary"> edit_square </span>
              </a>
            </td>
          </tr>`;
    } else {
      str += `<tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.phone}</td>
            <td>${item.address}</td>
            <td>${item.joinDate}</td>
            <td class="text-center">
              <a class="editMember" style="cursor: not-allowed">
                <span class="material-symbols-outlined"> edit_square </span>
              </a>
            </td>
          </tr>`;
    }
  });
  adminMemberList.innerHTML = str;
}

// 上方編輯人員按鈕，限制每個人只能編輯自己的帳號
editAccountBtn.addEventListener("click", function (e) {
  e.preventDefault();
  data.forEach(function (item) {
    if (id == item.id) {
      location.href = `./admin_accountEditMember.html?id=${item.id}`;
    }
  });
});

// 分頁導覽列按鈕渲染
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

// 切換分頁功能
function switchPage(e, searchData) {
  e.preventDefault();

  // 如果點擊的不是一個 a 連結，就中斷連結。因為 nodeName 出來是大寫所以用 "A" 表示
  if (e.target.nodeName !== "A") return;

  // 抓取 data-page 屬性來確定目前分頁，以此渲染畫面及分頁導覽列
  const page = e.target.dataset.page;
  // console.log(page);

  // 如果 searchData 有資料，就使用 searchData 渲染畫面
  const searchDataLength = searchData.length;
  if (searchDataLength !== 0) {
    pagination(searchData, page);
  } else {
    pagination(data, page);
  }
}

// 監聽分頁導覽列，需要帶入 searchData 參數去判斷是否為搜尋後的資料
paginationContainer.addEventListener("click", function (event) {
  switchPage(event, searchData);
});

// 搜尋欄位監聽
memberSearch.addEventListener("submit", keywordSearch);

// 儲存與搜尋關鍵字相符的整筆資料。宣告為全域變數使用，因為 switchPage 函式也會用到
let searchData = [];

// 搜尋功能
function keywordSearch(e) {
  e.preventDefault();

  // 儲存所有原 data 的關鍵字的陣列
  let filterData = [];
  // searchData 一定要在每次監聽事件啟用時清空，不然會把每一次的搜尋紀錄都加進去
  searchData = [];

  // 原資料集跑 forEach，為了把關鍵字推進 filterData，並把符合搜尋關鍵字整筆資料推進 searchData
  data.forEach(function (item) {
    // 把所有管理員名稱及地址加入 filterData
    filterData.push(item.name);
    filterData.push(item.address);

    // 把管理員名稱及地址陣列跑 filter，回傳的 filterKeyword 會是符合搜尋關鍵字的陣列
    const filterKeyword = filterData.filter(function (keyword) {
      // console.log(keyword);
      // mySearch.value 要去跟 filterData 的每一個 keyword 比對，如果字詞有包含，就加入新陣列，最後會存成變數 filterKeyword
      return keyword.includes(mySearch.value);
    });
    // console.log(filterKeyword);

    // filterKeyword 裡的關鍵字(每一個 item) 要去跟 原資料關鍵字 item.keyword 比對，如果字詞有包含，就把原資料 item 放到 searchData 裡面，然後要當作參數傳到 pagination
    filterKeyword.forEach(function (i) {
      // console.log(i, item);
      if (i === item.name || i === item.address) {
        // console.log(i);
        // 檢查 searchData 是否已經有同一筆資料，因為 forEach 包 forEach 的結構下，會有重複加進同一筆資料的狀況
        const isItemInSearchData = searchData.some(
          (existingItem) =>
            existingItem.name === item.name &&
            existingItem.address === item.address
        );

        if (!isItemInSearchData) {
          searchData.push(item);
        }
      }
    });
  });

  // console.log(filterData);
  // console.log(searchData);

  // 把搜尋結果顯示的資料裝成一筆 searchData 再丟回 pagintion
  // nowPage 參數傳入 1，把預設設置成分頁第一頁
  pagination(searchData, 1);
}
