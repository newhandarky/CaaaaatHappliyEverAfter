/*------------------------------------*\
    import
\*------------------------------------*/
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import { _url } from "./config";

/*------------------------------------*\
    doms
\*------------------------------------*/
const form = document.querySelector("form");
const selectUser = document.querySelector(".selectUser");
const bookingDate = document.querySelector(".bookingDate");
const checkIn = document.querySelector(".checkIn");
const checkOut = document.querySelector(".checkOut");
const bookingDays = document.querySelector(".bookingDays");
const totalPrice = document.querySelector(".totalPrice");
const memberName = document.querySelector(".memberName");
const getCats = document.querySelector(".getCats");
const bookingRoomType = document.querySelector(".bookingRoomType");
const addBOoking = document.querySelector(".addBOoking");
const btnBack = document.querySelector(".btnBack");
const remark = document.querySelector(".remark");
const checkInCats = document.querySelector(".checkInCats");
const plusCatPay = document.querySelector(".plusCatPay");
const historyRes = document.querySelector(".historyRes");
const bookingRes = document.querySelector(".bookingRes");

/*------------------------------------*\
    變數
\*------------------------------------*/
let roomId = 0;
let userId = 0;
const roomObj = {
    "51": "classic",
    "52": "delicate",
    "53": "luxury"
}

/*------------------------------------*\
    function
\*------------------------------------*/
// 取得所需資料
const user = axios.get(`${_url}/users`);
const cats = axios.get(`${_url}/cats`);
const rooms = axios.get(`${_url}/rooms`);
const roomStates = axios.get(`${_url}/roomStates`);

// 使用Promise.all()確保請求都完成
Promise.all([user, cats, rooms, roomStates])
    .then(([user, cats, rooms, roomStates]) => {
        // 將會員資料寫入select
        let userStr = `<option selected>請選擇</option>`;
        user.data.forEach(function (item) {
            userStr += `<option>${item.id}</option>`
        })
        selectUser.innerHTML = userStr;

        // 抓選取的客房資料
        bookingRoomType.addEventListener("change", function () {
            rooms.data.forEach(function (item) {
                if (item.name === bookingRoomType.value) {
                    roomId = item.id;
                }
            })
        })

        // 選取會員時同時抓取貓咪
        selectUser.addEventListener("change", function () {
            userId = selectUser.value;
            let getCatsArr = [];
            cats.data.forEach(function (item) {
                item.userId == userId ? getCatsArr.push(item) : "";      // 比對貓咪的用戶ID與訂單的用戶ID, 相同的加入到新陣列
            })

            let catStr = "";
            getCatsArr.forEach(function (item, index) {
                catStr += `<div class="col-4">
                            <div class="form-check">
                                <input class="form-check-input" data-catid="${item.id}" type="checkbox" id="memberCat${index + 1}">
                                <label class="form-check-label memberCat${index + 1}" for="memberCat${index + 1}">${item.catName}</label>
                            </div>
                        </div>`
            })
            getCats.innerHTML = catStr;

            user.data.forEach(function (item) {
                if (item.id == userId) {
                    memberName.value = item.name;
                }
            })
        })

        // 偵測表單內容變更
        form.addEventListener("change", function (e) {
            const startDate = moment(checkIn.value);
            const endDate = moment(checkOut.value);

            // 計算兩者差異年數
            const years = endDate.diff(startDate, "years");
            // 計算兩者差異月數，這邊要扣掉上面計算的差異年，否則會得到12個月
            const months = endDate.diff(startDate, "month") - (years * 12);
            // 把差異的年、月數加回來，否則會變成計算起訖日相差的天數(365天)
            startDate.add(years, 'years').add(months, 'months');
            const diffDays = endDate.diff(startDate, 'days');

            // 根據變更的日期, 天數, 房型改變顯示的金額
            if (e.target.classList.contains("bookingDays")) {
                bookingDays.value <= 0 ? alertErrForDate() : checkOut.value = moment(checkIn.value).add(bookingDays.value, "days").format("YYYY-MM-DD");
                rooms.data.forEach(function (item) {
                    if (item.name === bookingRoomType.value) {
                        totalPrice.value = (item.price * bookingDays.value);
                    }
                })
            }
            // 修改入住日期時同時移動退房日期
            if (e.target.classList.contains("checkIn")) {
                checkOut.value = moment(checkIn.value).add(bookingDays.value, "days").format("YYYY-MM-DD");
            }
            // 退房日期不可與入住日期相同或更之前
            if (e.target.classList.contains("checkOut")) {
                diffDays <= 0 ? alertErrForDate() : bookingDays.value = diffDays;
                rooms.data.forEach(function (item) {
                    if (item.name == bookingRoomType.value) {
                        totalPrice.value = (item.price * bookingDays.value);
                    }
                })
            }
            // 修改房型時價格也跟著變動
            if (e.target.classList.contains("bookingRoomType")) {
                rooms.data.forEach(function (item) {
                    if (item.name === bookingRoomType.value) {
                        totalPrice.value = (item.price * bookingDays.value);
                    }
                })
            }
            if (e.target.classList.contains("form-check-input")) {
                let checkedCheckboxes = document.querySelectorAll('.form-check-input:checked').length;
                checkInCats.value = checkedCheckboxes;
                plusCatPay.value = 300 * (checkedCheckboxes - 1) * bookingDays.value
            }

        })

        addBOoking.addEventListener("click", function () {
            const bookingObj = {
                "userId": parseInt(selectUser.value),
                "bookingDate": bookingDate.value,
                "checkIn": checkIn.value,
                "checkOut": checkOut.value,
                "roomId": roomId,
                "state": "已預訂",
                "quantity": parseInt(bookingDays.value),
                "price": parseInt(totalPrice.value) + parseInt(plusCatPay.value),
                "cats": [],
                "history": [],
                "remark": remark.value,
                "feedback": "",
                "admin": {
                    "userId": 0
                }
            }

            document.querySelectorAll('.form-check-input:checked').forEach(function (item) {
                bookingObj.cats.push(parseInt(item.dataset.catid))
            })

            const bookingHistoryObj = {
                "updateTime": `${bookingDate.value} ${moment().format("hh:mm:ss a")}`,
                "state": "已預訂",
                "quantity": parseInt(bookingDays.value),
                "roomType": bookingRoomType.value,
                "price": parseInt(totalPrice.value) + parseInt(plusCatPay.value),
                "admin": "user",
                "remark": remark.value,
                "catNum": bookingObj.cats.length,
                "checkIn": checkIn.value,
                "checkOut": checkOut.value
            }

            axios.post(`${_url}/bookings`, bookingObj)
                .then(function (res) {
                    bookingRes.innerHTML = `<thead>
                                                <tr>
                                                    <th scope="col"></th>
                                                    <th scope="col">訂單</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">訂單ID</th>
                                                    <td>${res.data.id}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">入住貓咪</th>
                                                    <td>${JSON.stringify(res.data.cats)}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">對應履歷ID</th>
                                                    <td class="historyId"></td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">退房日期</th>
                                                    <td>${res.data.checkOut}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">總價</th>
                                                    <td>${res.data.price}</td>
                                                </tr>
                                            </tbody>`
                    for (let i = 0; i < parseInt(bookingDays.value); i++) {
                        roomStates.data.forEach(function (item) {
                            if (item.date === moment(checkIn.value).add(i, "days").format("YYYY-MM-DD")) {
                                item.availableCount[roomObj[roomId]]--;
                                axios.patch(`${_url}/roomStates/${item.id}`, item)
                                    .then(function (res) {
                                        
                                    }).catch(function (err) {
                                        reLogin(err.response.data);
                                    })
                            }
                        })
                    }

                    bookingHistoryObj.bookingsId = res.data.id

                    axios.post(`${_url}/bookingHistorys`, bookingHistoryObj)
                        .then(function (res) { 
                            historyRes.innerHTML = `<thead>
                                                    <tr>
                                                        <th scope="col"></th>
                                                        <th scope="col">訂房履歷</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">訂房履歷ID</th>
                                                        <td>${res.data.id}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">下單時間</th>
                                                        <td>${res.data.updateTime}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">對應訂單ID</th>
                                                        <td>${res.data.bookingsId}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">入住日期</th>
                                                        <td>${res.data.checkIn}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">房型</th>
                                                        <td>${res.data.roomType}</td>
                                                    </tr>
                                                </tbody>`
                            bookingObj.history.push(res.data.id)
                            axios.patch(`${_url}/bookings/${res.data.bookingsId}`, bookingObj)
                                .then(function (res) {
                                    document.querySelector(".historyId").textContent = JSON.stringify(res.data.history)
                                })

                        }).catch(function (err) {
                            reLogin(err.response.data);
                        })

                }).catch(function (err) {
                    reLogin(err.response.data);
                })
        })
    })
    .catch(error => {
        reLogin(err.response.data);
    });

/*------------------------------------*\
    事件
\*------------------------------------*/
btnBack.addEventListener("click", function () {
    location = "admin_booking.html"
})