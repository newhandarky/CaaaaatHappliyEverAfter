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
const checkBookingRate = document.querySelector(".checkBookingRate");

/*------------------------------------*\
    變數
\*------------------------------------*/
// 暫存日期資料
localStorage.setItem("thisYear", new Date().getFullYear());
localStorage.setItem("thisMonth", new Date().getMonth() + 2);
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
const bookingsPromise = axios.get(`${_url}/660/bookings`,{
    headers: {
        "authorization":`Bearer ${localStorage.getItem("userLoginToken")}`
    }
})

function renderBookingsStateData(){
    thisMonth.innerHTML = bookingStatesObject.bookingCount;
    newBooking.innerHTML = bookingStatesObject.newBooking;
    revenue.innerHTML = bookingStatesObject.revenue;
    todayCheckIn.innerHTML = bookingStatesObject.todayCheckIn;
    todayCheckOut.innerHTML = bookingStatesObject.todayCheckOut;
}

Promise.all([roomStatesPromise, bookingsPromise])
    .then(function (results) {
        const roomStatesRes = results[0].data;
        const bookingsRes = results[1].data;
        
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
        
        bookingRate.innerHTML = Math.round(((monthBookingRate.roomCounts) - 
            (monthBookingRate.classicRoomCount + monthBookingRate.delicateRoomCount + monthBookingRate.luxuryRoomCount))
            * 100 / monthBookingRate.roomCounts);


        const bookingArr = [];
        // 抓當月份訂單總數量
        bookingsRes.forEach(function(item){
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
        // 確保資料處理完成後再執行相關的後續步驟
        // 其他相關操作
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
