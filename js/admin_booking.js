// import
import axios from "axios";
import Swal from "sweetalert2";

// doms
const waitConfirm = document.querySelector(".waitConfirm");
const confirmed = document.querySelector(".confirmed");
const turnover = document.querySelector(".turnover");
const waitPay = document.querySelector(".waitPay");
const payedBooking = document.querySelector(".payedBooking");
const canceled = document.querySelector(".canceled");

// 變數
let bookingStatesObject = {
    "confirmCount": 0,
    "confirmedCount": 0,
    "totalTurnover": 0,
    "waitPayCount": 0,
    "payedCount": 0,
    "canceledCount": 0
}

axios.get("https://catroomdb.onrender.com/660/bookings",{
    headers: {
        "authorization":`Bearer ${localStorage.getItem("userLoginToken")}`
    }
})
.then(function(res){
    // console.log(res.data);
    res.data.forEach(function(item){
        if(item.state === "已預定"){
            bookingStatesObject.confirmCount++;
        }else if(item.state === "已確認"){
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
    renderBookingsStateData();
}).catch(function(err){
    console.log(err.response);
})

function renderBookingsStateData(){
    waitConfirm.innerHTML = bookingStatesObject.confirmCount;
    confirmed.innerHTML = bookingStatesObject.confirmedCount;
    turnover.innerHTML = bookingStatesObject.totalTurnover;
    waitPay.innerHTML = bookingStatesObject.waitPayCount;
    payedBooking.innerHTML = bookingStatesObject.payedCount;
    canceled.innerHTML = bookingStatesObject.canceledCount;
}


    

    
    