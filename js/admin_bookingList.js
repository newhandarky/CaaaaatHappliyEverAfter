/*------------------------------------*\
    import
\*------------------------------------*/
import axios from "axios";
import Swal from "sweetalert2";
import { _url } from "./config";
import { headerObj } from "./admin_config";
import { reLogin } from "./loginIsTimeUp";
import moment from "moment";

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
let getBookingMonth = `${localStorage.getItem("thisMonth")}`;
let getOneMonthBooking = [];
let defaultPage = 1;
let pagesCount = 0;
const bookingsRes = axios.get(`${_url}/660/bookings?_expand=user&_expand=room`, headerObj);
// 渲染年月
date.textContent = getBookingMonth;

/*------------------------------------*\
    function
\*------------------------------------*/
// 抓所有訂單資料
Promise.all([bookingsRes])
    .then(([bookingsRes]) => {
        const bookingDate = bookingsRes.data;
        let bookingCount = 0;        

        bookingDate.forEach(function (item) {
            if (item.checkIn.startsWith(getBookingMonth)) {
                bookingCount++;
                const singleBookingData = {};
                singleBookingData.id = item.id;
                singleBookingData.name = item.user.name;
                singleBookingData.checkIn = item.checkIn;
                singleBookingData.quantity = item.quantity;
                singleBookingData.roomName = item.room.name;
                singleBookingData.state = item.state;
                singleBookingData.price = item.price;
                singleBookingData.remark = item.remark;
                singleBookingData.userId = item.userId;
                getOneMonthBooking.push(singleBookingData);
            }
        })

        pagination(bookingCount);  // 取得數量顯示下方分頁
        renderTable(getOneMonthBooking.slice(0, 8));

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
                pagesStr += `<li class="page-item pageNum" data-page="${i}"><a class="page-link py-3 px-6"><span class="text-dark">${i}</span></a></li>`
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
                renderTable(getOneMonthBooking.slice(getPageNum * 8, (getPageNum + 1) * 8));
            })
        }
    }).catch(function (err) {
        reLogin(err.response.data);
    })

// 渲染table資料
export function renderTable(arr) {
    const tbody = document.querySelector(".tbody");
    let str = "";
    arr.forEach(function (item) {       // 
        str += `<tr>
                <th class="text-nowrap border-0 text-center d-flex align-items-center justify-content-center" scope="row"><a class="bookingNum adminLink" data-bookingnum="${item.id}" data-userid="${item.userId}" href="admin_updateBooking.html">${item.id}</a></th>       
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

/*------------------------------------*\
    事件
\*------------------------------------*/
before.addEventListener("click", function () {
    let month = moment(localStorage.getItem("thisMonth")).add(-1, "month").format("YYYY-MM");

    if (month === "2023-08") {
        Swal.fire({
            title: "抱歉並無2023-09以前的資料",
            icon: "error"
        });
        before.setAttribute("disabled", true);
        return;
    }
    localStorage.setItem("thisMonth", month);
    location.reload();  // 切換月份重整網頁
})

after.addEventListener("click", function () {
    let month = moment(localStorage.getItem("thisMonth")).add(1, "month").format("YYYY-MM");
    localStorage.setItem("thisMonth", month);
    location.reload();  // 切換月份重整網頁
})

// 點擊訂單編號時儲存訂單編號到localStorage
tbody.addEventListener("click", function (e) {
    if (e.target.classList.contains("bookingNum")) {
        localStorage.setItem("bookingNum", e.target.dataset.bookingnum);
        localStorage.setItem("bookingUserId", e.target.dataset.userid);
    }
})