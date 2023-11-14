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
const revenue = document.querySelector(".revenue");
const todayCheckIn = document.querySelector(".todayCheckIn");
const todayCheckOut = document.querySelector(".todayCheckOut");
const canceled = document.querySelector(".canceled");
const bookingList = document.querySelector(".bookingList");

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
    "canceledCount": 0
}

/*------------------------------------*\
    function
\*------------------------------------*/
// 取得所有訂單資料
axios.get(`${_url}/660/bookings`,{
    headers: {
        "authorization":`Bearer ${localStorage.getItem("userLoginToken")}`
    }
})
.then(function(res){
    const bookingArr = [];
    res.data.forEach(function(item){
            // 抓當月份訂單總數量
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
            bookingStatesObject.revenue += item.price;
        }            
        if(item.state === "已取消"){                                // 抓當月取消訂單數量
            bookingStatesObject.canceledCount++;            
        }        
    })
    bookingStatesObject.bookingCount = bookingArr.length;
    renderBookingsStateData();
}).catch(function(err){
    console.log(err.response);
    reLogin(err.response.data);
})

function renderBookingsStateData(){
    thisMonth.innerHTML = bookingStatesObject.bookingCount;
    newBooking.innerHTML = bookingStatesObject.newBooking;
    revenue.innerHTML = bookingStatesObject.revenue;
    todayCheckIn.innerHTML = bookingStatesObject.todayCheckIn;
    todayCheckOut.innerHTML = bookingStatesObject.todayCheckOut;
    canceled.innerHTML = bookingStatesObject.canceledCount;
}

/*------------------------------------*\
    事件
\*------------------------------------*/
bookingList.addEventListener("click", function(){
    if(bookingStatesObject.bookingCount === 0){
        console.log("當月無訂房");
    }
    location = "../pages/admin_bookingList.html"
})
