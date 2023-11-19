/*------------------------------------*\
    import
\*------------------------------------*/
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import { _url } from "./config";
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

/*------------------------------------*\
    變數
\*------------------------------------*/
// 暫存日期資料
localStorage.setItem("thisYear", new Date().getFullYear());
localStorage.setItem("thisMonth", new Date().getMonth() + 1);
let bookingStatesObject = {
    "thisMonthCount": 0,
    "newBooking": 0,
    "todayCheckIn": 0,
    "todayCheckOut": 0,
    "revenue": 0,
    "bookingRate": 0
}

/*------------------------------------*\
    function
\*------------------------------------*/
// 取得當月所有房況資料
const roomStatesPromise = axios.get(`${_url}/660/roomStates`,{
    headers: {
        "authorization":`Bearer ${localStorage.getItem("userLoginToken")}`
    }
})

// 取得所有訂單資料
const bookingsPromise = axios.get(`${_url}/660/bookings?_expand=user&_expand=room`,{
    headers: {
        "authorization":`Bearer ${localStorage.getItem("userLoginToken")}`
    }
})

// 渲染訂單功能頁面資料
function renderBookingsStateData(){
    thisMonth.innerHTML = bookingStatesObject.bookingCount;
    newBooking.innerHTML = bookingStatesObject.newBooking;
    revenue.innerHTML = bookingStatesObject.revenue;
    todayCheckIn.innerHTML = bookingStatesObject.todayCheckIn;
    todayCheckOut.innerHTML = bookingStatesObject.todayCheckOut;
}

// 根據功能按鍵將資料帶入下個頁面
function setSearchData(searchObj){
    if(searchObj.searchDate === 0){
        Swal.fire({
            title: "系統訊息",
            text: `並無${searchObj.searchStr}`,
            icon: "warning"
        });
    }else{
        const todayCheckInBookings = [];
        searchObj.bookingData.forEach(function(item){
            if(item[searchObj.itemStr] === moment().format("YYYY-MM-DD")){
                todayCheckInBookings.push(item);
            }
        })
        localStorage.setItem("searchResult", JSON.stringify(todayCheckInBookings));
        localStorage.setItem("h2Content", `<span class="text-primary"> ${moment().format("YYYY-MM-DD")} </span> ${searchObj.searchStr}`)
        location = "../pages/admin_bookingSearch.html"
    }
}

Promise.all([roomStatesPromise, bookingsPromise])
    .then(function (results) {
        const roomStatesRes = results[0].data;
        const bookingData = results[1].data;
        
        console.log(bookingData);
        // 在這裡處理 roomStatesRes 和 bookingsRes 的資料
        const roomStatesArr = [];
        let monthBookingRate = {
            "classicRoomCount":0,
            "delicateRoomCount":0,
            "luxuryRoomCount":0,
            "roomCounts": 0
        }

        // 計算當月住房率並顯示在booking頁面
        roomStatesRes.forEach(function(item){
            if(item.date.startsWith(`${localStorage.getItem("thisYear")}-${localStorage.getItem("thisMonth")}`)){
                roomStatesArr.push(item);
                monthBookingRate.classicRoomCount += item.availableCount.classic;
                monthBookingRate.delicateRoomCount += item.availableCount.delicate;
                monthBookingRate.luxuryRoomCount += item.availableCount.luxury;
            }          
        })
        monthBookingRate.roomCounts = roomStatesArr.length * 9;

        let thisMonthBookingRate = Math.round(((monthBookingRate.roomCounts) - 
            (monthBookingRate.classicRoomCount + monthBookingRate.delicateRoomCount + monthBookingRate.luxuryRoomCount))
            * 100 / monthBookingRate.roomCounts);
        
        bookingRate.innerHTML = isNaN(thisMonthBookingRate)? 0 : thisMonthBookingRate;


        const bookingArr = [];
        // 抓當月份訂單總數量
        bookingData.forEach(function(item){
            if(item.checkIn.startsWith(`${localStorage.getItem("thisYear")}-${localStorage.getItem("thisMonth")}`)){
                bookingArr.push(item);
            }            
            if(item.bookingDate === moment().format("YYYY-MM-DD")){     // 抓當天新增訂單總數量
                bookingStatesObject.newBooking++;
            }            
            if(item.checkIn === moment().format("YYYY-MM-DD")){         // 抓當天入住訂單總數量
                bookingStatesObject.todayCheckIn++;
            }            
            if(item.checkOut === moment().format("YYYY-MM-DD")){        // 抓當天退房訂單總數量
                bookingStatesObject.todayCheckOut++;
            }            
            if(item.state === "已退房"){                                // 抓當月已完成之訂單總額
                bookingStatesObject.revenue += parseInt(item.price);
            }            
        })

        // 點擊新進訂單時
        btnNewBooking.addEventListener("click", function(){
            const searchObj = {
                searchDate :bookingStatesObject.newBooking,
                bookingData : bookingData,
                searchStr : "當日新進訂單",
                itemStr : "bookingDate"
            }
            setSearchData(searchObj)
        })
        // 點擊今日入住訂單時
        btnTodayCheckIn.addEventListener("click", function(){
            const searchObj = {
                searchDate :bookingStatesObject.todayCheckIn,
                bookingData : bookingData,
                searchStr : "當日入住訂單",
                itemStr : "checkIn"
            }
            setSearchData(searchObj)
        })
        // 點擊今日退房訂單時
        btnTodayCheckOut.addEventListener("click", function(){
            const searchObj = {
                searchDate :bookingStatesObject.todayCheckOut,
                bookingData : bookingData,
                searchStr : "當日退房訂單",
                itemStr : "checkOut"
            }
            setSearchData(searchObj)
        })

        bookingStatesObject.bookingCount = bookingArr.length;
        renderBookingsStateData();
    })
    .catch(function (err) {
        console.log(err);
        // reLogin(err.response);
    });

/*------------------------------------*\
    事件
\*------------------------------------*/
bookingList.addEventListener("click", function(){
    if(bookingStatesObject.bookingCount === 0){
        console.log("當月無訂房");
    }
    location = "../pages/admin_bookingList.html"
})