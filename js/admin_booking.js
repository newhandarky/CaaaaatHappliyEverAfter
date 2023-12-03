/*------------------------------------*\
    import
\*------------------------------------*/
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import { _url } from "./config";
import { headerObj } from "./admin_config";
import { reLogin } from "./loginIsTimeUp";

/*------------------------------------*\
    doms
\*------------------------------------*/
const thisMonth = document.querySelector(".thisMonth");
const newBooking = document.querySelector(".newBooking");
const bookingRate = document.querySelector(".bookingRate");
const revenue = document.querySelector(".revenue");
const todayCheckIn = document.querySelector(".todayCheckIn");
const todayCheckOut = document.querySelector(".todayCheckOut");
const bookingList = document.querySelector(".bookingList");
const btnNewBooking = document.querySelector(".btnNewBooking");
const btnTodayCheckIn = document.querySelector(".btnTodayCheckIn");
const btnTodayCheckOut = document.querySelector(".btnTodayCheckOut");
const checkBookingTable = document.querySelector(".checkBookingTable");
const bookingTables = document.querySelector(".bookingTables");
const date = document.querySelector(".date");
const before = document.querySelector(".before");
const after = document.querySelector(".after");

/*------------------------------------*\
    變數
\*------------------------------------*/
// 暫存日期資料
localStorage.setItem("thisMonth", moment().format("YYYY-MM"));
let bookingStatesObject = {
    "thisMonthCount": 0,
    "newBooking": 0,
    "todayCheckIn": 0,
    "todayCheckOut": 0
}

date.textContent = moment().format("YYYY-MM");
/*------------------------------------*\
    function
\*------------------------------------*/
// 取得當月所有房況資料
const roomStatesPromise = axios.get(`${_url}/660/roomStates`, headerObj)
// 取得所有訂單資料
const bookingsPromise = axios.get(`${_url}/660/bookings?_expand=user&_expand=room`, headerObj)

// 渲染當天相關資料
function renderTodayBookings() {
    newBooking.innerHTML = bookingStatesObject.newBooking;
    todayCheckIn.innerHTML = bookingStatesObject.todayCheckIn;
    todayCheckOut.innerHTML = bookingStatesObject.todayCheckOut;
}

// 根據功能按鍵將資料帶入下個頁面
function setSearchData(searchObj) {
    if (searchObj.searchDate === 0) {
        Swal.fire({
            title: "系統訊息",
            text: `並無${searchObj.searchStr}`,
            icon: "warning"
        });
    } else {
        const todayCheckInBookings = [];
        searchObj.bookingData.forEach(function (item) {
            if (item[searchObj.itemStr] === moment().format("YYYY-MM-DD")) {
                todayCheckInBookings.push(item);
            }
        })
        localStorage.setItem("searchResult", JSON.stringify(todayCheckInBookings));
        localStorage.setItem("h2Content", `<span class="text-primary"> ${moment().format("YYYY-MM-DD")} </span> ${searchObj.searchStr}`)
        location = "admin_bookingSearch.html"
    }
}

Promise.all([roomStatesPromise, bookingsPromise])
    .then(function (results) {
        const roomStatesRes = results[0].data;
        const bookingData = results[1].data;

        // 抓取所選取的整個月份的資料
        function getOneMonthBooking(monthStr) {
            const bookingArr = [];
            const roomStatesArr = [];
            bookingData.forEach(function (item) {
                if (item.checkIn.startsWith(`${monthStr}`)) {
                    bookingArr.push(item);
                }
            })
            roomStatesRes.forEach(function (item) {
                if (item.date.startsWith(`${monthStr}`)) {
                    roomStatesArr.push(item);
                }
            })
            renderBookingsStateData(bookingArr, roomStatesArr)
        }

        // 計算當月訂單數量, 住房率, 已結帳總額
        function renderBookingsStateData(bookingArr, roomStatesArr) {
            let getRevenue = 0;
            bookingArr.forEach(function (item) {
                if (item.state === "已退房") {
                    getRevenue += parseInt(item.price);
                }
            })

            // 計算剩餘多少空房
            let roomCounts = 0
            roomStatesArr.forEach(function (item) {
                roomCounts += item.availableCount.classic;
                roomCounts += item.availableCount.delicate;
                roomCounts += item.availableCount.luxury;
            })

            thisMonth.textContent = bookingArr.length;
            revenue.textContent = getRevenue;
            bookingRate.textContent = Math.round((roomStatesArr.length * 15 - roomCounts) / (roomStatesArr.length * 15) * 100)
        }

        // 抓與當日相關資料
        bookingData.forEach(function (item) {
            if (item.bookingDate === moment().format("YYYY-MM-DD")) {     // 抓當天新增訂單總數量
                bookingStatesObject.newBooking++;
            }
            if (item.checkIn === moment().format("YYYY-MM-DD")) {         // 抓當天入住訂單總數量
                bookingStatesObject.todayCheckIn++;
            }
            if (item.checkOut === moment().format("YYYY-MM-DD")) {        // 抓當天退房訂單總數量
                bookingStatesObject.todayCheckOut++;
            }
        })

        renderTodayBookings()

        // 點擊新進訂單時
        btnNewBooking.addEventListener("click", function () {
            const searchObj = {
                searchDate: bookingStatesObject.newBooking,
                bookingData: bookingData,
                searchStr: "當日新進訂單",
                itemStr: "bookingDate"
            }
            setSearchData(searchObj)
        })
        // 點擊今日入住訂單時
        btnTodayCheckIn.addEventListener("click", function () {
            const searchObj = {
                searchDate: bookingStatesObject.todayCheckIn,
                bookingData: bookingData,
                searchStr: "當日入住訂單",
                itemStr: "checkIn"
            }
            setSearchData(searchObj)
        })
        // 點擊今日退房訂單時
        btnTodayCheckOut.addEventListener("click", function () {
            const searchObj = {
                searchDate: bookingStatesObject.todayCheckOut,
                bookingData: bookingData,
                searchStr: "當日退房訂單",
                itemStr: "checkOut"
            }
            setSearchData(searchObj)
        })

        getOneMonthBooking(localStorage.getItem("thisMonth"))

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
            getOneMonthBooking(localStorage.getItem("thisMonth"))
            date.textContent = localStorage.getItem("thisMonth")
        })

        after.addEventListener("click", function () {
            let month = moment(localStorage.getItem("thisMonth")).add(1, "month").format("YYYY-MM");
            localStorage.setItem("thisMonth", month);
            before.removeAttribute("disabled");
            getOneMonthBooking(localStorage.getItem("thisMonth"))
            date.textContent = localStorage.getItem("thisMonth")
        })
    })
    .catch(function (err) {
        reLogin(err.response.data);
    });

/*------------------------------------*\
    事件
\*------------------------------------*/
bookingList.addEventListener("click", function () {
    if (bookingStatesObject.bookingCount === 0) {
        Swal.fire("無當月訂單, 請重新查詢");
    }
    location = "admin_bookingList.html"
})

checkBookingTable.addEventListener("click", function () {
    location = "admin_bookingRoomTable.html"
})
bookingTables.addEventListener("click", function () {
    location = "admin_bookingTables.html"
})
