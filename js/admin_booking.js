/*------------------------------------*\
    import
\*------------------------------------*/
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import { _url } from "./config";
import { isLogin } from "./isLogin";

/*------------------------------------*\
    doms
\*------------------------------------*/
const thisMonth = document.querySelector(".thisMonth");
const confirmed = document.querySelector(".confirmed");
const turnover = document.querySelector(".turnover");
const waitPay = document.querySelector(".waitPay");
const payedBooking = document.querySelector(".payedBooking");
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
    "confirmedCount": 0,
    "totalTurnover": 0,
    "waitPayCount": 0,
    "payedCount": 0,
    "canceledCount": 0
}

/*------------------------------------*\
    function
\*------------------------------------*/
// 取得所有訂單資料
// axios.get(`${_url}/660/bookings?_expand=room`,{  // 建立bookingHistory資料用
axios.get(`${_url}/660/bookings`,{
    headers: {
        "authorization":`Bearer ${localStorage.getItem("userLoginToken")}`
    }
})
.then(function(res){
    // 建立bookingHistory資料用
    
    // console.log(res.data);
    // const arr = [];
    // let bid = 901
    // res.data.forEach(function(item){
    //     const obj = {
    //         "id": bid,
    //         "updateTime": moment().format('YYYY-MM-DD hh:mm:ss a'),
    //         "state": "",
    //         "quantity": 0,
    //         "roomType": "",
    //         "price": 0,
    //         "admin": "",
    //         "remark": "",
    //         "catNum": 0,
    //         "checkIn": "",
    //         "checkOut": "",
    //         "bookingId":0
    //     };

    //     console.log(item);

    //     obj.id = bid++,
    //     obj.price = item.price,
    //     obj.updateTime = moment().format('YYYY-MM-DD hh:mm:ss a'),
    //     obj.state = item.state,
    //     obj.quantity = item.quantity,
    //     obj.roomType = item.room.name,
    //     obj.admin = item.admin.userId,
    //     obj.remark = item.remark,
    //     obj.catNum = item.cats.length,
    //     obj.checkIn = item.checkIn,
    //     obj.checkOut = item.checkOut
    //     obj.bookingId = item.id

    //     arr.push(obj)
    // })

    // console.log(arr);



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

/*------------------------------------*\
    事件
\*------------------------------------*/
bookingList.addEventListener("click", function(){
    if(bookingStatesObject.bookingCount === 0){
        console.log("當月無訂房");
    }
    location = "../pages/admin_bookingList.html"
})
