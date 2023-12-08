/*------------------------------------*\
    import
\*------------------------------------*/
import axios from "axios";
import Swal from "sweetalert2";
import { _url } from "./config";

/*------------------------------------*\
    doms
\*------------------------------------*/
const tbody = document.querySelector(".tbody");
const searchContent = document.querySelector(".searchContent");
const getPages = document.querySelector(".getPages");

searchContent.innerHTML = localStorage.getItem("h2Content");
/*------------------------------------*\
    變數
\*------------------------------------*/
const searchResult = JSON.parse(localStorage.getItem("searchResult"));
let defaultPage = 1;
let pagesCount = 0;

/*------------------------------------*\
    function
\*------------------------------------*/
// 渲染table資料
function renderTable(bookingArr) {
    const tbody = document.querySelector(".tbody");
    let str = "";
    bookingArr.forEach(function (item) {       // 
        str += `<tr>
        <th class="text-nowrap border-0 text-center d-flex align-items-center justify-content-center" scope="row"><a class="bookingNum adminLink" data-bookinguserid="${item.userId}" data-bookingnum="${item.id}" href="admin_updateBooking.html">${item.id}</a></th>       
        <td class="text-nowrap text-center">${item.user.name}</td>
        <td class="text-nowrap text-center">${item.checkIn}</td>
        <td class="text-nowrap text-center">${item.quantity}</td>
        <td class="text-nowrap text-center">${item.room.name}</td>
        <td class="text-nowrap text-center">${item.state}</td>
        <td class="text-nowrap text-center">${item.price}</td>
        <td class="text-nowrap text-start">${item.remark}</td>
        <td class="d-none" data-bookinguserid="${item.userId}"></td>
        </tr>`;
    })
    tbody.innerHTML = str;
}

function setBookingData(searchResult){
    let bookingCount = 0;
    searchResult.forEach(function(item){
        bookingCount++;
    })
    pagination(bookingCount)
}

// 顯示分頁資訊
function pagination(pages) {
    if (pages === 0) {
        return getPages.innerHTML = "";
    }
    pagesCount = Math.ceil((pages) / 8);    // 取得下方分頁數量
    let previous = ` <li class="page-item previous">
                <a class="page-link py-3 px-6 previous">Previous</a>
            </li> `;
    let next = `<li class="page-item next">
                <a class="page-link py-3 px-6 next">Next</a>
            </li>`
    let pagesStr = "";
    for (let i = 1; i <= pagesCount; i++) {
        pagesStr += `<li class="page-item pageNum" data-page="${i}"><a class="page-link py-3 px-6">${i}</a></li>`
    }
    getPages.innerHTML = previous + pagesStr + next;
    showPagination();
}

// 顯示分頁與當前頁面
function showPagination() {
    const previous = document.querySelector(".previous");
    const next = document.querySelector(".next");
    const pageNum = document.querySelector(".pageNum");
    const pageNums = document.querySelectorAll(".pageNum");

    // 只有一頁時前後disabled
    if (defaultPage == pagesCount) {
        previous.classList.add("disabled");
        next.classList.add("disabled");
        pageNum.classList.add("active");
    }

    // 多頁時預設第一頁啟用, 前一頁關閉
    previous.classList.add("disabled");
    pageNum.classList.add("active");

    getPages.addEventListener("click", function (e) {
        if (e.target.classList.contains("next")) {
            defaultPage++
            if (defaultPage <= pagesCount + 5) { // 避免亂點
                defaultPage >= pagesCount ? defaultPage = pagesCount : "";
                document.querySelector(".active").classList.remove("active"); // 移除當前頁籤
                pageNums.forEach(function (item) {
                    item.dataset.page == defaultPage ? item.classList.add("active") : "";
                })
                defaultPage == pagesCount ? next.classList.add("disabled") : "";
                previous.classList.remove("disabled");
            }
        } else if (e.target.classList.contains("previous")) {
            defaultPage--
            if (defaultPage >= -5) { // 避免亂點
                defaultPage <= 1 ? defaultPage = 1 : "";
                document.querySelector(".active").classList.remove("active"); // 移除當前頁籤
                pageNums.forEach(function (item) {
                    item.dataset.page == defaultPage ? item.classList.add("active") : "";
                })
                defaultPage == 1 ? previous.classList.add("disabled") : "";
                next.classList.remove("disabled");
            }
        } else if (e.target.classList.contains("page-link")) {     //點選頁頁切數字切換顯示頁數
            defaultPage = e.target.parentElement.dataset.page;
            document.querySelector(".active").classList.remove("active"); // 移除當前頁籤
            pageNums.forEach(function (item) {
                item.dataset.page == defaultPage ? item.classList.add("active") : "";
            })
            defaultPage == pagesCount ? next.classList.add("disabled") : next.classList.remove("disabled");
            defaultPage == 1 ? previous.classList.add("disabled") : previous.classList.remove("disabled");
        }
        const getPageNum = defaultPage - 1;
        renderTable(searchResult.slice(getPageNum * 8, (getPageNum + 1) * 8));
    })
}

/*------------------------------------*\
    事件
\*------------------------------------*/
// 點擊訂單編號時儲存訂單編號到localStorage
tbody.addEventListener("click", function(e){
    if(e.target.classList.contains("bookingNum")){
        localStorage.setItem("bookingNum", e.target.dataset.bookingnum);
        localStorage.setItem("bookingUserId", e.target.dataset.bookinguserid);
    }
})

setBookingData(searchResult)
renderTable(searchResult.slice(0, 8));