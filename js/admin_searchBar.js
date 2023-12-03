/*------------------------------------*\
    import
\*------------------------------------*/
import { _url } from "./config";
import axios from "axios";
import Swal from "sweetalert2";
import { headerObj } from "./admin_config";
import moment from "moment";

/*------------------------------------*\
    doms
\*------------------------------------*/
const inputBookingNumber = document.querySelector(".inputBookingNumber");
const inputStartDate = document.querySelector(".inputStartDate");
const inputEndDate = document.querySelector(".inputEndDate");
const btnBookingNum = document.querySelector(".btnBookingNum");
const btnDate = document.querySelector(".btnDate");

/*------------------------------------*\
    function
\*------------------------------------*/

//彈跳錯誤提示
function alertErrForDate() {
    Swal.fire({
        title: "日期格式錯誤?",
        text: "起始日期不可與結束日期相等, 或在其之後",
        icon: "error"
    });
}

// 以訂單編號查詢
function getBookingNum() {
    if (isNaN(Number(inputBookingNumber.value)) || Number(inputBookingNumber.value) === 0) {
        Swal.fire({
            title: "輸入格式錯誤",
            text: "請正確填寫訂單編號或輸入日期",
            icon: "error"
        });
        localStorage.removeItem("bookingNum");      // 輸入錯誤資訊時移除localStorage內的錯誤資料
        inputBookingNumber.value = "";              // 清空input
    } else if (inputBookingNumber.value !== "") {
        localStorage.setItem("bookingNum", inputBookingNumber.value);
        location = "admin_updateBooking.html"
    }
}

// 抓所有訂房資料
const bookingsPromise = axios.get(`${_url}/660/bookings?_expand=user&_expand=room`, headerObj)

/*------------------------------------*\
    事件
\*------------------------------------*/
// 點擊搜尋送出查詢條件
btnDate.addEventListener("click", function () {
    // if(inputStartDate !== null && inputEndDate !== null){

    // }
    let startDate = moment(inputStartDate.value);
    let endDate = moment(inputEndDate.value);
    let diffDays = endDate.diff(startDate, 'days');

    // 結束日期不可與起始日期相同或更之前
    diffDays <= 0 ? alertErrForDate() : "";

    Promise.all([bookingsPromise])
        .then(function (results) {
            const allBookings = results[0].data;
            let resultBookings = [];

            for (let i = 0; i <= diffDays; i++) {
                const bookingDay = moment(startDate).add(i, "day").format("YYYY-MM-DD");
                allBookings.forEach(function (item) {
                    
                    if (item.checkIn === bookingDay) {
                        resultBookings.push(item)
                    }
                })
            }

            if(resultBookings.length !== 0){
                // 將起始與結束日期存入localStorage帶到下個頁面
                localStorage.setItem("h2Content", `住房日期 <span class="text-primary">${startDate.format("YYYY-MM-DD")}</span> 到 <span class="text-primary">${endDate.format("YYYY-MM-DD")}</span> 的搜尋結果`);
                localStorage.setItem("searchResult", JSON.stringify(resultBookings))
                location = "admin_bookingSearch.html"
            }else{
                Swal.fire({
                    title: "所查詢的日期無住房資料",
                    text: "請確認輸入的日期是否正確",
                    icon: "question"
                });
            }
        })
        .catch(function (err) {
            reLogin(err.response.data);
        });
})

// 以訂單編號查詢
btnBookingNum.addEventListener("click", function () {
    getBookingNum();
})

// 綁定input按下enter事件
inputBookingNumber.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {       // enter鍵的代碼
        getBookingNum();
    }
})