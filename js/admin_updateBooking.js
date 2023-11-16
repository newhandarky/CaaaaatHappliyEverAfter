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
// const btns = document.querySelector(".btns");

/*------------------------------------*\
    變數
\*------------------------------------*/
let userObj;

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
    return res.data;
}).catch(function (err) {
    console.log(err);
    reLogin(err.response.data);
})

// 取得每日房況資料
let roomStatesObj = await axios.get(`${_url}/660/roomstates/`, {
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
    let getCatsArr = [];
    axios.get(`${_url}/660/cats`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem("userLoginToken")}`,
        },
    }).then(function (res) {
        res.data.forEach(function (item) {
            item.userId == bookingObj.userId ? getCatsArr.push(item) : "";      // 比對貓咪的用戶ID與訂單的用戶ID, 相同的加入到新陣列
        })
        let str = "";
        getCatsArr.forEach(function (item, index) {
            str += `<div class="col-4">
                        <div class="form-check">
                            <input class="form-check-input" data-catid="${item.id}" type="checkbox" id="memberCat${index + 1}">
                            <label class="form-check-label memberCat${index + 1}" for="memberCat${index + 1}">${item.catName}</label>
                        </div>
                    </div>`
            getCats.innerHTML = str;
        })
        // 訂單取消後資料改為disabled狀態
        toggleData();

        // 多隻貓咪時根據住宿的貓咪加上預售勾選
        bookingObj.cats.forEach(function(cat){
            document.querySelectorAll(".form-check-input").forEach(function(item){
                if(parseInt(item.dataset.catid) === cat){
                    item.setAttribute("checked", true)
                }
            })
        })

        // 取消予已退房訂單不可再修改
        if (bookingObj.state === "已取消" || bookingObj.state === "已退房") {
            btnUpdate.setAttribute("disabled", true);
        }
    }).catch(function (err) {
        console.log(err);
        reLogin(err.response.data);
    })
}

// 切換訂單按鈕狀態
function btnToggle() {
    btnBack.classList.toggle("d-none");
    btnSave.classList.toggle("d-none");
    btnUpdate.classList.toggle("d-none");
    btnUpdateCancel.classList.toggle("d-none");
}

// 切換訂單是否可編輯狀態
function toggleData() {
    bookingState.toggleAttribute("disabled");
    checkIn.toggleAttribute("disabled");
    checkOut.toggleAttribute("disabled");
    bookingRoomType.toggleAttribute("disabled");
    bookingDays.toggleAttribute("disabled");
    remark.toggleAttribute("disabled");
    btnCancel.toggleAttribute("disabled");
    document.querySelectorAll(".form-check-input").forEach(function (item) {
        item.toggleAttribute("disabled");
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

// 資料尚未儲存錯誤提示
function dataNotSaved() {
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

// 計算被點擊的貓咪有幾隻
function countSelectedCheckboxes(formCheckInputs) {
    let count = 0;
    formCheckInputs.forEach(function (checkbox) {
        if (checkbox.checked) {
            count++;
        }
    });
    return count;
}

// 判斷入住貓咪數量幾隻
function checkCatChecked(){
    const formCheckInputs = document.querySelectorAll(".form-check-input");
    // 入住貓咪數量不能小於1
    formCheckInputs.forEach(function (checkbox) {
        let selectedCount = countSelectedCheckboxes(formCheckInputs);
        if(selectedCount <= 0){
            Swal.fire({
                icon: "error",
                title: "入住貓咪數量不能小於 1"
            });
        }
    });
    countSelectedCheckboxes(formCheckInputs);
}

// 當訂單取消或變更時取得畫面當前的訂單履歷
function setNewBookingHistoryObj(newBookingObj, bookingStateStr){
    // 取消與變更的state狀態在個別的function加上
    // 計算總共住幾隻貓咪
    let checkboxCount = 0;
    document.querySelectorAll(".form-check-input").forEach(function (item) {
        item.checked ? checkboxCount++ : "";
    })
    newBookingObj.state = bookingStateStr;
    newBookingObj.catNum = checkboxCount;
    newBookingObj.updateTime = moment().format("YYYY-MM-DD hh-mm-ss a");
    newBookingObj.checkIn = checkIn.value;
    newBookingObj.checkOut = checkOut.value;
    newBookingObj.quantity = bookingDays.value;
    newBookingObj.roomType = bookingRoomType.value;
    newBookingObj.bookingsId = bookingId.value;
    newBookingObj.price = totalPrice.value;
    newBookingObj.remark = remark.value;
    newBookingObj.admin = localStorage.getItem("userName");
}

// 將取消的日期房間數歸還到原本的相對應的房型屬性
function setFreeRoomToRoomStates(newRoomStates, roomStatesObj){
    let bookingStartDate = bookingObj.checkIn;   // 取得訂單當前日期
    const roomStateObj = {                  // 房型對比資料
        "51": "classic",
        "52": "delicate",
        "53": "luxury"
    }

    // 依日期將房間數歸還給相對應房型
    for (let i = 0; i < bookingObj.quantity; i++) {
        roomStatesObj.forEach(function (item) {
            if (item.date === moment(bookingStartDate).add(0 + i, "day").format("YYYY-MM-DD")) {
                item.availableCount[roomStateObj[bookingObj.roomId]]++;     // 抓出要加回的日期與對應客房
                newRoomStates.push(item);                                       // 推到新陣列存起來
            }
        })
    }
}

// 房型不夠的錯誤提示
function roomNotEnough(){
    Swal.fire({
        icon: "error",
        title: "很抱歉",
        text: "您選擇的日期與房型目前已滿房"
    });
}

/*------------------------------------*\
    事件
\*------------------------------------*/
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
        roomObj.forEach(function (item) {
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
        roomObj.forEach(function (item) {
            if (item.name === bookingRoomType.value) {
                totalPrice.value = (item.price * bookingDays.value);
            }
        })
    }
    // 修改房型時價格也跟著變動
    if (e.target.classList.contains("bookingRoomType")) {
        roomObj.forEach(function (item) {
            if (item.name === bookingRoomType.value) {
                totalPrice.value = (item.price * bookingDays.value);
            }
        })
    }
    // 判斷入住貓咪數量是否<0
    checkCatChecked();
    
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
                
                const bookingHistoryObj = {};
                setNewBookingHistoryObj(bookingHistoryObj, "已取消");

                renderData(bookingObj, roomObj, userObj);
                btnToggle();    // 訂單送出取消後切換按鈕狀態

                let newRoomStates = [];                 // 儲存變更後的日期狀態物件

                // 將取消的日期房間數歸還到原本的相對應的房型屬性
                setFreeRoomToRoomStates(newRoomStates, roomStatesObj);

                // 將新的日期狀態陣列的日期與原始的日期狀態陣列的日期比對, 將新的物件更新到舊物件上
                newRoomStates.forEach(function (newItem) {
                    roomStatesObj.forEach(function (oldItem) {
                        if (newItem.date === oldItem.date) {
                            axios.patch(`${_url}/660/roomStates/${newItem.id}`, newItem, {
                                headers: {
                                    authorization: `Bearer ${localStorage.getItem("userLoginToken")}`,
                                },
                            }).then(function (res) {
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
                                console.log(err.response);
                            })
                        }
                    })
                })                
            }).catch(function (err) {
                console.log(err);
                reLogin(err.response.data);
            })
        }
    });
})

// 訂單資料有變更時, 如果點擊其他a連結跳尚未儲存提示
document.querySelectorAll("a").forEach(function (item) {
    item.addEventListener("click", function (e) {
        const roomTypeForId = {
            "經典房": 51,
            "精緻房": 52,
            "豪華房": 53
        }

        console.log(bookingObj.cats.join(""));

        let newCat = "";
        document.querySelectorAll(".form-check-input").forEach(function(item){
            if(item.checked){
                newCat+=item.dataset.catid;
            }
        })

        if(bookingState.value === "已取消"){
            return;
        }else if (bookingObj.checkIn !== checkIn.value
            || bookingObj.checkOut !== checkOut.value
            || bookingObj.state !== bookingState.value
            || bookingObj.remark !== remark.value
            || bookingObj.roomId !== roomTypeForId[bookingRoomType.value]
            || bookingObj.cats.join(",") !== newCat) {
            e.preventDefault();
            return dataNotSaved();
        }

    })
})

// 點擊修改訂單按鈕
btnUpdate.addEventListener("click", function () {
    btnToggle();
    toggleData();// 訂單資料切換是否可編輯狀態
})

// 點擊取消修改按鈕
btnUpdateCancel.addEventListener("click", function () {
    btnToggle();
    renderData(bookingObj, roomObj, userObj);   // 還原訂單狀態
})

// 點擊送出儲存時
btnSave.addEventListener("click", function () {
     // 儲存變更後的日期狀態物件
    let newRoomStatesArr = [];
    roomStatesObj.forEach(function(item){       // 複製一份房況陣列判斷客房是否足夠
        newRoomStatesArr.push(item);
    })

    // 儲存需要比對的日期物件, 之後傳到server更新
    let roomStateUpdate = [];     
    // 將取消的日期房間數歸還到原本的相對應的房型屬性
    setFreeRoomToRoomStates(roomStateUpdate, newRoomStatesArr);

    const roomStateObjZh = {                  // 房型對比資料
        "經典房": "classic",
        "精緻房": "delicate",
        "豪華房": "luxury"
    }

    // 計算是否能夠進行換房的判斷數字
    let checkCanUpdateNum = 1;

    // 以複製的房況陣列來判斷是否能接受換房
    for(let i = 1; i <= bookingDays.value; i++){
        newRoomStatesArr.forEach(function(item){
            if(item.date === moment(checkIn.value).add(i - 1, "day").format("YYYY-MM-DD")){
                // 用房間數字做運算, 如果數字等於0即代表其中有日期已經沒房間不可進行換房
                checkCanUpdateNum *= item.availableCount[roomStateObjZh[bookingRoomType.value]];
            }
        })
    }
    // 判斷數字大於0即代表尚有客房可以更換
    if(checkCanUpdateNum > 0){
        for(let i = 1; i <= bookingDays.value; i++){
            newRoomStatesArr.forEach(function(item){
                if(item.date === moment(checkIn.value).add(i - 1, "day").format("YYYY-MM-DD")){
                    item.availableCount[roomStateObjZh[bookingRoomType.value]]--;
                    roomStateUpdate.push(item);
                }
            })
        }
        
        // 將更新後的房況更新到server
        roomStateUpdate.forEach(function(item){
            axios.patch(`${_url}/660/roomStates/${item.id}`, item, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("userLoginToken")}`,
                },
            }).then(function(res){
                // console.log(res.data);
            }).catch(function(err){
                console.log(err.response);
            })
        })
        // 準備更新履歷物件寫入server
        const bookingHistoryObj = {};
        setNewBookingHistoryObj(bookingHistoryObj, bookingState.value);
        addBookingHistory(bookingHistoryObj);

        const roomStateObj = {                  // 房型對比資料
            "經典房": 51,
            "精緻房": 52,
            "豪華房": 53
        }

        bookingObj.checkIn = checkIn.value;
        bookingObj.checkOut = checkOut.value;
        bookingObj.remark = remark.value;
        bookingObj.quantity = bookingDays.value;
        bookingObj.price = totalPrice.value;
        bookingObj.state = bookingState.value;
        bookingObj.roomId = roomStateObj[bookingRoomType.value];
        bookingObj.admin.userId = localStorage.getItem("userId");
        bookingObj.cats = [];
        document.querySelectorAll(".form-check-input").forEach(function(item){
            if(item.checked){
                bookingObj.cats.push(parseInt(item.dataset.catid));
            }
        })

        console.log(bookingObj);

        updateBooking(bookingObj);
        renderData(bookingObj, roomObj, userObj);
        btnToggle();
    }else{
        roomStateUpdate = [];
        btnToggle();
        roomNotEnough();
        renderData(bookingObj, roomObj, userObj);
    }

})

// 點擊返回列表時
btnBack.addEventListener("click", function () {
    location = "admin_bookingList.html"
})

/*------------------------------------*\
    呼叫function
\*------------------------------------*/
renderData(bookingObj, roomObj, userObj);

