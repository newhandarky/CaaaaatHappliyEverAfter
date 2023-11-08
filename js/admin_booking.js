// import
import axios from "axios";
import Swal from "sweetalert2";

// doms
const thisMonth = document.querySelector(".thisMonth");
const confirmed = document.querySelector(".confirmed");
const turnover = document.querySelector(".turnover");
const waitPay = document.querySelector(".waitPay");
const payedBooking = document.querySelector(".payedBooking");
const canceled = document.querySelector(".canceled");
const bookingList = document.querySelector(".bookingList");

// 暫存日期資料
localStorage.setItem("thisYear", new Date().getFullYear());
localStorage.setItem("thisMonth", new Date().getMonth() + 1);

// 變數
// const url = "http://localhost:3000"; // 本機端
const url = "https://catroomdb.onrender.com"; // json=server端
let bookingStatesObject = {
    "thisMonthCount": 0,
    "confirmedCount": 0,
    "totalTurnover": 0,
    "waitPayCount": 0,
    "payedCount": 0,
    "canceledCount": 0
}

axios.get(`${url}/660/bookings`,{
    headers: {
        "authorization":`Bearer ${localStorage.getItem("userLoginToken")}`
    }
})
.then(function(res){
    // console.log(res.data);
    const bookingArr = [];
    res.data.forEach(function(item){
        if(item.checkIn.startsWith(`${localStorage.getItem("thisYear")}-${localStorage.getItem("thisMonth")}`)){
            bookingArr.push(item);
        }
        if(item.state === "已確認"){
            bookingStatesObject.confirmedCount++;
        }else if(item.state === "待付款"){
            bookingStatesObject.waitPayCount++;
        }else if(item.state === "已付款"){
            bookingStatesObject.payedCount++;
            bookingStatesObject.totalTurnover += item.price;
        }else if(item.state === "已取消"){
            bookingStatesObject.canceledCount++;
        }
    })
    bookingStatesObject.bookingCount = bookingArr.length;
    renderBookingsStateData();
}).catch(function(err){
    console.log(err.response);
})

function renderBookingsStateData(){
    thisMonth.innerHTML = bookingStatesObject.bookingCount;
    confirmed.innerHTML = bookingStatesObject.confirmedCount;
    turnover.innerHTML = bookingStatesObject.totalTurnover;
    waitPay.innerHTML = bookingStatesObject.waitPayCount;
    payedBooking.innerHTML = bookingStatesObject.payedCount;
    canceled.innerHTML = bookingStatesObject.canceledCount;
}

bookingList.addEventListener("click", function(){
    if(bookingStatesObject.bookingCount === 0){
        console.log("當月無訂房");
    }
    location = "../pages/admin_bookingList.html"
})
