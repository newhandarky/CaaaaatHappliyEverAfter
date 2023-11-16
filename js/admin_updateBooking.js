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
const bookingId = document.querySelector(".bookingId");
const memberName = document.querySelector(".memberName");
const bookingState = document.querySelector(".bookingState");
const checkIn = document.querySelector(".checkIn");
const checkOut = document.querySelector(".checkOut");
const memberPhone = document.querySelector(".memberPhone");
const bookingRoomType = document.querySelector(".bookingRoomType");
const bookingDays = document.querySelector(".bookingDays");
const totalPrice = document.querySelector(".totalPrice");
const getCats = document.querySelector(".getCats");
const remark = document.querySelector(".remark");
const tbody = document.querySelector(".tbody");
const btnUpdate = document.querySelector(".btnUpdate");
const btnUpdateCancel = document.querySelector(".btnUpdateCancel");
const btnSave = document.querySelector(".btnSave");
const btnCancel = document.querySelector(".btnCancel");
const btnBack = document.querySelector(".btnBack");
const form = document.querySelector("form");
const btns = document.querySelector(".btns");
// const formCheckInputs = document.querySelectorAll(".form-check-input");

/*------------------------------------*\
    變數
\*------------------------------------*/
let userObj;
let beforeBookingData = {};
let afterBookingData = {};

/*------------------------------------*\
    axios取得資料
\*------------------------------------*/
// 取得訂單資料
let bookingObj = await axios.get(`${_url}/660/bookings/${localStorage.getItem('bookingNum')}`, {
    headers: {
        authorization: `Bearer ${localStorage.getItem("userLoginToken")}`,
    },
}).then(async function (res) {
    userObj = await getUser(res.data.userId); // 透過訂單取得user資料
    return res.data;
}).catch(function (err) {
    console.log(err);
    reLogin(err.response.data);
});

// 取得客房資料
let roomObj = await axios.get(`${_url}/660/rooms/`, {
    headers: {
        authorization: `Bearer ${localStorage.getItem("userLoginToken")}`,
    },
}).then(function (res) {

    // console.log(res.data);
    return res.data;
}).catch(function (err) {
    console.log(err);
    reLogin(err.response.data);
})


/*------------------------------------*\
    function
\*------------------------------------*/
// 取得user資料
function getUser(userId) {
    return axios.get(`${_url}/660/users/${userId}`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem("userLoginToken")}`,
        },
    }).then(function (res) {

        // console.log(res.data);
        return res.data;
    }).catch(function (err) {
        console.log(err);
        reLogin(err.response.data);
    })
}

// 取得訂單修改履歷, 並渲染資料
async function getHistory(bookingHistoryArr) {
    let logArr = [];
    let str = "";
    
    for (const item of bookingHistoryArr) {
        try {
            const res = await axios.get(`${_url}/660/bookingHistorys/${item}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("userLoginToken")}`,
                },
            });
            const logObj = {};
            logObj.updateTime = res.data.updateTime;
            logObj.catNum = res.data.catNum;
            logObj.admin = res.data.admin;
            logObj.checkIn = res.data.checkIn;
            logObj.checkOut = res.data.checkOut;
            logObj.quantity = res.data.quantity;
            logObj.roomType = res.data.roomType;
            logObj.state = res.data.state;
            logObj.price = res.data.price;
            logObj.remark = res.data.remark;
            logArr.push(logObj);
        } catch (err) {
            console.error(err);
            reLogin(err.response.data);
        }
    }
    logArr.forEach(function (item) {
        str += `<tr>
                    <th class="text-nowrap p-1" scope="row">${item.updateTime}</th>
                    <td class="text-nowrap p-1">${item.state}</td>
                    <td class="text-nowrap p-1">${item.checkIn}</td>
                    <td class="text-nowrap p-1">${item.checkOut}</td>
                    <td class="text-nowrap p-1">${item.quantity}</td>
                    <td class="text-nowrap p-1">${item.roomType}</td>
                    <td class="text-nowrap p-1">${item.price}</td>
                    <td class="text-nowrap p-1">${item.catNum}</td>
                    <td class="text-nowrap p-1">${item.remark}</td>
                    <td class="text-nowrap p-1">${item.admin}</td>
                </tr>`;
    });
    tbody.innerHTML = str;
}

// 渲染訂單資料
function renderData(bookingObj, roomObj, userObj) {
    let roomType = "";
    // console.log(bookingObj);
    // console.log(roomObj);
    // console.log(userObj);

    roomObj.forEach(function (item) {
        item.id === bookingObj.roomId ? roomType = item.name : "";
    })

    getHistory(bookingObj.history);     // 取得訂單履歷並寫入網頁

    bookingId.value = localStorage.getItem("bookingNum");
    memberName.value = userObj.name;
    bookingState.value = bookingObj.state;
    checkIn.value = bookingObj.checkIn;
    checkOut.value = bookingObj.checkOut;
    memberPhone.value = userObj.phone;
    bookingRoomType.value = roomType;
    bookingDays.value = bookingObj.quantity;
    totalPrice.value = bookingObj.price;
    remark.value = bookingObj.remark;

    // 取得貓咪資料
    bookingObj.cats = [];
    axios.get(`${_url}/660/cats`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem("userLoginToken")}`,
        },
    }).then(function (res) {
        res.data.forEach(function (item) {
            item.userId == bookingObj.userId ? bookingObj.cats.push(item) : "";
        })
        let str = "";
        bookingObj.cats.forEach(function (item, index) {
            str += `<div class="col-4">
                        <div class="form-check">
                            <input class="form-check-input" data-catid="${item.id}" type="checkbox" id="memberCat${index + 1}" checked>
                            <label class="form-check-label memberCat${index + 1}" for="memberCat${index + 1}">${item.catName}</label>
                        </div>
                    </div>`
            getCats.innerHTML = str;
        })
        // 訂單取消後資料改為disabled狀態
        disabledData();
        
        if(bookingObj.state === "已取消"){
            btnUpdate.setAttribute("disabled", true);
        }
    }).catch(function (err) {
        console.log(err);
        reLogin(err.response.data);
    })
}

// 切換訂單按鈕狀態
function btnToggle(){
    btnBack.classList.toggle("d-none");
    btnSave.classList.toggle("d-none");
    btnUpdate.classList.toggle("d-none");
    btnUpdateCancel.classList.toggle("d-none");
}

// 將訂單資料改為不能編輯狀態
function disabledData(){
    bookingState.setAttribute("disabled", true);
    checkIn.setAttribute("disabled", true);
    checkOut.setAttribute("disabled", true);
    bookingRoomType.setAttribute("disabled", true);
    bookingDays.setAttribute("disabled", true);
    remark.setAttribute("disabled", true);
    btnCancel.setAttribute("disabled", true);
    document.querySelectorAll(".form-check-input").forEach(function(item){
        item.setAttribute("disabled", true);
    })
}

// 將訂單資料改為可編輯狀態
function openData(){
    bookingState.removeAttribute("disabled");
    checkIn.removeAttribute("disabled");
    checkOut.removeAttribute("disabled");
    bookingRoomType.removeAttribute("disabled");
    bookingDays.removeAttribute("disabled");
    remark.removeAttribute("disabled");
    btnCancel.removeAttribute("disabled");
    document.querySelectorAll(".form-check-input").forEach(function(item){
        item.removeAttribute("disabled");
    })
}
//彈跳錯誤提示
function alertErrForDate() {
    Swal.fire({
        title: "日期格式錯誤?",
        text: "入住日期不可與退房日期相等, 或在其之後",
        icon: "error"
    });
}

// 根據修改狀態新增bookingHistory
function addBookingHistory(bookingHistoryObj) {
    axios.post(`${_url}/660/bookingHistorys`, bookingHistoryObj, {
        headers: {
            authorization: `Bearer ${localStorage.getItem("userLoginToken")}`,
        },
    }).then(function (res) {
        saveHistoryBackBooking(res.data);
    }).catch(function (err) {
        console.log(err);
        reLogin(err.response.data);
    })
}

// 將修改後的bookingHistoryObj ID寫入對應訂單
function saveHistoryBackBooking(bookingHistoryObj) {
    axios.get(`${_url}/660/bookings/${bookingHistoryObj.bookingsId}`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem("userLoginToken")}`,
        },
    }).then(function (res) {
        const newBookingObj = res.data;
        newBookingObj.history.push(bookingHistoryObj.id);       // 將更新履歷寫入原本訂單的history陣列內

        updateBooking(newBookingObj);       // 將更新後的訂單寫回原訂單資料
    }).catch(function (err) {
        console.log(err);
        reLogin(err.response.data);
    })
}

//
function dataNotSaved(){
    Swal.fire({
        icon: "warning",
        title: "系統提示",
        text: "資料有修改且尚未儲存, 確定取消修改資料嗎?"
    });
}

// 更新訂單資料
function updateBooking(newBookingObj) {
    axios.patch(`${_url}/660/bookings/${newBookingObj.id}`, newBookingObj, {
        headers: {
            authorization: `Bearer ${localStorage.getItem("userLoginToken")}`,
        },
    }).then(function (res) {
        renderData(res.data, roomObj, userObj)  // 渲染更新後的資料
    }).catch(function (err) {
        console.log(err);
        reLogin(err.response.data);
    })
}
/*------------------------------------*\
    事件
\*------------------------------------*/
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

    console.log("有變動");

    // 根據變更的日期, 天數, 房型改變顯示的金額
    if (e.target.classList.contains("bookingDays")) {
        bookingDays.value <= 0 ? alertErrForDate() : checkOut.value = moment(checkIn.value).add(bookingDays.value, "days").format("YYYY-MM-DD");
        roomObj.forEach(function (item) {
            if (item.name === bookingRoomType.value) {
                totalPrice.value = (item.price * bookingDays.value);
            }
        })
    }
    if (e.target.classList.contains("checkIn") || e.target.classList.contains("checkOut")) {
        diffDays <= 0 ? alertErrForDate() : bookingDays.value = diffDays;
        roomObj.forEach(function (item) {
            if (item.name === bookingRoomType.value) {
                totalPrice.value = (item.price * bookingDays.value);
            }
        })
    }
    if (e.target.classList.contains("bookingRoomType")) {
        roomObj.forEach(function (item) {
            if (item.name === bookingRoomType.value) {
                totalPrice.value = (item.price * bookingDays.value);
            }
        })
    }
})

// 點擊取消訂單時
btnCancel.addEventListener("click", function () {
    Swal.fire({
        title: "確定要取消此訂單嗎?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "確定取消",
        cancelButtonText: "返回訂單"
    }).then((result) => {
        if (result.isConfirmed) {
            // 修改訂單狀態為取消
            axios.patch(`${_url}/660/bookings/${localStorage.getItem("bookingNum")}`, {
                "state": "已取消"
            }, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("userLoginToken")}`,
                },
            }).then(function (res) {
                let checkboxCount = 0;
                document.querySelectorAll(".form-check-input").forEach(function (item) {
                    item.checked ? checkboxCount++ : "";
                })
                const bookingHistoryObj = {};
                bookingHistoryObj.updateTime = moment().format("YYYY-MM-DD hh-mm-ss a");
                bookingHistoryObj.state = "已取消";
                bookingHistoryObj.checkIn = checkIn.value;
                bookingHistoryObj.checkOut = checkOut.value;
                bookingHistoryObj.quantity = bookingDays.value;
                bookingHistoryObj.roomType = bookingRoomType.value;
                bookingHistoryObj.bookingsId = bookingId.value;
                bookingHistoryObj.price = totalPrice.value;
                bookingHistoryObj.remark = remark.value;
                bookingHistoryObj.catNum = checkboxCount;
                bookingHistoryObj.admin = localStorage.getItem("userName");
                
                renderData(bookingObj, roomObj, userObj);
                btnToggle();    // 訂單送出取消後切換按鈕狀態

                axios.get(`${_url}/660/roomStates`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("userLoginToken")}`,
                    },
                }).then(function(res){
                    const oldRoomStates = res.data;
                    let bookingStartDate = checkIn.value;   // 取得訂單當前日期
                    let newRoomStates = [];                 // 儲存變更後的日期狀態物件
                    const roomStateObj = {                  // 房型對比資料
                        "經典房": "classic",
                        "精緻房": "delicate",
                        "豪華房": "luxury"
                    }
                    
                    // 將取消的日期房間數歸還到原本的相對應的房型屬性
                    for(let i = 0; i < bookingDays.value; i++){
                        res.data.forEach(function(item){
                            if(item.date === moment(bookingStartDate).add(0 + i, "day").format("YYYY-MM-DD")){
                                item.availableCount[roomStateObj[bookingRoomType.value]]++;
                                newRoomStates.push(item);
                            }
                        })
                    }      
                    
                    // 將新的日期狀態陣列的日期與原始的日期狀態陣列的日期比對, 將新的物件更新到舊物件上
                    newRoomStates.forEach(function(newItem){
                        oldRoomStates.forEach(function(oldItem){
                            if(newItem.date === oldItem.date){
                                axios.patch(`${_url}/660/roomStates/${newItem.id}`, newItem, {
                                    headers: {
                                        authorization: `Bearer ${localStorage.getItem("userLoginToken")}`,
                                    },
                                }).then(function(res){
                                    console.log(res.data);
                                }).catch(function(err){
                                    console.log(err.response);
                                })
                            }
                        })
                    })
                }).catch(function(err){
                    console.log(err);
                    reLogin(err.response.data);
                })

                addBookingHistory(bookingHistoryObj);
                const Toast = Swal.mixin({
                    toast: true,
                    position: "center",
                    showConfirmButton: false,
                    timer: 1200,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "訂單已取消成功"
                });
            }).catch(function (err) {
                console.log(err);
                reLogin(err.response.data);
            })
        }
    });
})

// 訂單資料有變更時, 如果點擊其他a連結跳尚未儲存提示
document.querySelectorAll("a").forEach(function(item){
    item.addEventListener("click", function(e){
        console.log(bookingObj);
        const roomTypeForId = {
            "經典房": 51,
            "精緻房": 52,
            "豪華房": 53
        }

        if(bookingObj.checkIn !== checkIn.value){
            e.preventDefault();
            return dataNotSaved();
        }else if(bookingObj.checkOut !== checkOut.value){
            e.preventDefault();
            return dataNotSaved();
        }else if(bookingObj.state !== bookingState.value){
            e.preventDefault();
            return dataNotSaved();
        }else if(bookingObj.remark !== remark.value){
            e.preventDefault();
            return dataNotSaved();
        }else if(bookingObj.roomId !== roomTypeForId[bookingRoomType.value]){
            e.preventDefault();
            return dataNotSaved();
        }
    })
})

// 點擊修改訂單時
btnUpdate.addEventListener("click", function(){
    btnToggle();
    openData(); // 訂單資料切換是否可編輯狀態
})

// 點擊取消修改時
btnUpdateCancel.addEventListener("click", function(){    
    btnToggle();
    disabledData();// 訂單資料切換是否可編輯狀態
    renderData(bookingObj, roomObj, userObj);   // 還原訂單狀態
})

// 點擊送出儲存時
btnSave.addEventListener("click", function(){

})

// 點擊返回列表時
btnBack.addEventListener("click", function(){
    location = "admin_bookingList.html"
})

/*------------------------------------*\
    呼叫function
\*------------------------------------*/
renderData(bookingObj, roomObj, userObj);