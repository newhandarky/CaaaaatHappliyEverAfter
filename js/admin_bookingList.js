/*------------------------------------*\
    import
\*------------------------------------*/
import axios from "axios";
import Swal from "sweetalert2";
import { _url } from "./config";
import { reLogin } from "./loginIsTimeUp";

/*------------------------------------*\
    doms
\*------------------------------------*/
let tbody = document.querySelector(".tbody");
const date = document.querySelector(".date");
const before = document.querySelector(".before");
const after = document.querySelector(".after");
const getPages = document.querySelector(".getPages");

/*------------------------------------*\
    變數
\*------------------------------------*/
// 取得當前年月份的字串
let getBookingMonth = `${localStorage.getItem("thisYear")}-${localStorage.getItem("thisMonth")}`;
let getOneMonthBooking = [];
let defaultPage = 1;
let pagesCount = 0;

/*------------------------------------*\
    function
\*------------------------------------*/
// 渲染年月
function renderDate() {
    date.textContent = getBookingMonth;
    getBookingData(defaultPage);
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
            if (defaultPage <= pagesCount +5) { // 避免亂點
                defaultPage >= pagesCount ? defaultPage = pagesCount : "";
                document.querySelector(".active").classList.remove("active"); // 移除當前頁籤
                pageNums.forEach(function (item) {
                    item.dataset.page == defaultPage ? item.classList.add("active") : "";
                })
                defaultPage == pagesCount ? next.classList.add("disabled") : "";
                previous.classList.remove("disabled");
                getBookingData(defaultPage);
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
                getBookingData(defaultPage);
            }
        }else if(e.target.classList.contains("page-link")){     //點選頁頁切數字切換顯示頁數
            console.log(e.target.parentElement.dataset.page);
            defaultPage = e.target.parentElement.dataset.page;
            document.querySelector(".active").classList.remove("active"); // 移除當前頁籤
            pageNums.forEach(function (item) {
                item.dataset.page == defaultPage ? item.classList.add("active") : "";
            })
            defaultPage == pagesCount ? next.classList.add("disabled") : next.classList.remove("disabled");
            defaultPage == 1 ? previous.classList.add("disabled") : previous.classList.remove("disabled");
            getBookingData(defaultPage);
        }
    })

}
// 抓整個月份訂房數量
function getAllBookingData() {
    axios.get(`${_url}/660/bookings?_expand=user&_expand=room`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem("userLoginToken")}`,
        },
    })
        .then(function (res) {
            let bookingCount = 0;
            res.data.forEach(function (item) {
                if (item.checkIn.startsWith(getBookingMonth)) {
                    bookingCount++;  // 取得當月資料筆數
                }
            })
            pagination(bookingCount);  // 取得數量顯示下方分頁
        }).catch(function (err) {
            console.log(err);            
            reLogin(err.response.data);
        })
}

// 依照頁籤顯示訂單
function getBookingData(num) {
    axios.get(`${_url}/660/bookings?_expand=user&_expand=room&_page=${num}&_limit=8`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem("userLoginToken")}`,
        },
    }).then(function (res) {
        res.data.forEach(function (item) {
            if (item.checkIn.startsWith(getBookingMonth)) {
                const singleBookingData = {};
                singleBookingData.id = item.id;
                singleBookingData.name = item.user.name;
                singleBookingData.checkIn = item.checkIn;
                singleBookingData.quantity = item.quantity;
                singleBookingData.roomName = item.room.name;
                singleBookingData.state = item.state;
                singleBookingData.price = item.price;
                singleBookingData.remark = item.remark;
                getOneMonthBooking.push(singleBookingData);
            }
        })
        // 如果取得的月份無資料就清空表格
        if (getOneMonthBooking.length === 0) {
            cleanTable();
        }

        renderTable(getOneMonthBooking);
        // 渲染資料後陣列清空避免資料重複渲染   
        getOneMonthBooking = [];
    }).catch(function (err) {
        console.log(err);
        reLogin(err.response.data);    
    })
}

// 渲染table資料
function renderTable(arr) {
    const tbody = document.querySelector(".tbody");
    let str = "";
    arr.forEach(function (item) {       // 
        str += `<tr>
                <th class="text-nowrap text-center" scope="row"><a class="bookingNum" data-bookingnum="${item.id}" href="../pages/admin_updateBooking.html">${item.id}</a></th>       
                <td class="text-nowrap text-center">${item.name}</td>
                <td class="text-nowrap text-center">${item.checkIn}</td>
                <td class="text-nowrap text-center">${item.quantity}</td>
                <td class="text-nowrap text-center">${item.roomName}</td>
                <td class="text-nowrap text-center">${item.state}</td>
                <td class="text-nowrap text-center">${item.price}</td>
                <td class="text-nowrap text-start">${item.remark}</td>
            </tr>`;
    })
    tbody.innerHTML = str;
}

// 資料錯誤清空表格
function cleanTable() {
    const tbody = document.querySelector(".tbody");
    tbody.innerHTML = "";
}

// 顯示分頁資訊
function pagination(pages) {
    if (pages === 0) {
        return getPages.innerHTML = "";
    }
    pagesCount = Math.ceil((pages) / 8);    // 取得下方分頁數量
    let previous = ` <li class="page-item previous">
                        <a class="page-link previous p-4">Previous</a>
                    </li> `;
    let next = `<li class="page-item next">
                        <a class="page-link next p-4">Next</a>
                    </li>`
    let pagesStr = "";
    for (let i = 1; i <= pagesCount; i++) {
        pagesStr += `<li class="page-item pageNum" data-page="${i}"><a class="page-link p-4">${i}</a></li>`
    }
    getPages.innerHTML = previous + pagesStr + next;
    showPagination();
}


/*------------------------------------*\
    事件
\*------------------------------------*/

before.addEventListener("click", function () {
    let year = localStorage.getItem("thisYear");
    let month = localStorage.getItem("thisMonth");
    month--;
    if (month < 1) {
        month = 12;
        year--;
    }
    if (year <= 2023 && month <= 9) {
        Swal.fire({
            title: "抱歉並無2023-09以前的資料",
            icon: "error"
        });
    }
    localStorage.setItem("thisMonth", month);
    localStorage.setItem("thisYear", year);
    getBookingMonth = `${year}-${month}`;
    location.reload();  // 切換月份重整網頁
})

after.addEventListener("click", function () {
    let year = localStorage.getItem("thisYear");
    let month = localStorage.getItem("thisMonth");
    month++;
    if (month > 12) {
        month = 1;
        year++;
    }
    localStorage.setItem("thisMonth", month);
    localStorage.setItem("thisYear", year);
    getBookingMonth = `${year}-${month}`;
    location.reload();  // 切換月份重整網頁
})

// 點擊訂單編號時儲存訂單編號到localStorage
tbody.addEventListener("click", function(e){
    console.log(e.target);
    if(e.target.classList.contains("bookingNum")){
        localStorage.setItem("bookingNum", e.target.dataset.bookingnum);
    }
})

getAllBookingData();
renderDate();
getBookingData(defaultPage);