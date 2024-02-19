/*------------------------------------*\
    import
\*------------------------------------*/
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import { _url } from "./config";
import { headerObj } from "./admin_config";
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
const checkInCats = document.querySelector(".checkInCats");
const plusCatPay = document.querySelector(".plusCatPay");
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

/*------------------------------------*\
    變數
\*------------------------------------*/
let userObj;

/*------------------------------------*\
    axios取得資料
\*------------------------------------*/
// 取得訂單資料
const bookingPromise = axios.get(`${_url}/660/bookings/${localStorage.getItem('bookingNum')}`, headerObj)
// 取得客房資料
const roomPromise = axios.get(`${_url}/660/rooms/`, headerObj)
// 取得每日房況資料
const roomStatesPromise = axios.get(`${_url}/660/roomstates/`, headerObj);
const catsPromise = axios.get(`${_url}/660/cats`, headerObj)
const userPromise = axios.get(`${_url}/660/users/${localStorage.getItem("bookingUserId")}`, headerObj)

Promise.all([bookingPromise, roomPromise, roomStatesPromise, catsPromise, userPromise])
    .then(function (results) {
        const bookingObj = results[0].data;
        const roomObj = results[1].data;
        const roomStatesObj = results[2].data;
        const catsObj = results[3].data;
        const userObj = results[4].data;

        renderData(bookingObj, roomObj, userObj);

        let getCatsArr = [];
        catsObj.forEach(function (item) {
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
        bookingObj.cats.forEach(function (cat) {
            document.querySelectorAll(".form-check-input").forEach(function (item) {
                if (parseInt(item.dataset.catid) === cat) {
                    item.setAttribute("checked", true)
                }
            })
        })

        // 點擊送出儲存時
        btnSave.addEventListener("click", function () {
            // 儲存變更後的日期狀態物件
            let newRoomStatesArr = [];
            roomStatesObj.forEach(function (item) {       // 複製一份房況陣列判斷客房是否足夠
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
            for (let i = 1; i <= bookingDays.value; i++) {
                newRoomStatesArr.forEach(function (item) {
                    if (item.date === moment(checkIn.value).add(i - 1, "day").format("YYYY-MM-DD")) {
                        // 用房間數字做運算, 如果數字等於0即代表其中有日期已經沒房間不可進行換房
                        checkCanUpdateNum *= item.availableCount[roomStateObjZh[bookingRoomType.value]];
                    }
                })
            }
            // 判斷數字大於0即代表尚有客房可以更換
            if (checkCanUpdateNum > 0) {
                for (let i = 1; i <= bookingDays.value; i++) {
                    newRoomStatesArr.forEach(function (item) {
                        if (item.date === moment(checkIn.value).add(i - 1, "day").format("YYYY-MM-DD")) {
                            item.availableCount[roomStateObjZh[bookingRoomType.value]]--;
                            roomStateUpdate.push(item);
                        }
                    })
                }

                // 將更新後的房況更新到server
                roomStateUpdate.forEach(function (item) {
                    axios.patch(`${_url}/660/roomStates/${item.id}`, item, {
                        headers: {
                            authorization: `Bearer ${localStorage.getItem("userLoginToken")}`,
                        },
                    }).then(function (res) {
                        
                    }).catch(function (err) {
                        reLogin(err.response.data);
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
                document.querySelectorAll(".form-check-input").forEach(function (item) {
                    if (item.checked) {
                        bookingObj.cats.push(parseInt(item.dataset.catid));
                    }
                })

                updateBooking(bookingObj);
                renderData(bookingObj, roomObj, userObj);
                btnToggle();
                toggleData();
            } else {
                roomStateUpdate = [];
                btnToggle();
                roomNotEnough();
                renderData(bookingObj, roomObj, userObj);
                toggleData();
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
                    axios.patch(`${_url}/660/bookings/${localStorage.getItem("bookingNum")}`, { "state": "已取消" }, headerObj)
                        .then(function (res) {

                            const bookingHistoryObj = {};
                            setNewBookingHistoryObj(bookingHistoryObj, "已取消");

                            renderData(bookingObj, roomObj, userObj);
                            btnToggle();    // 訂單送出取消後切換按鈕狀態
                            toggleData();
                            let newRoomStates = [];                 // 儲存變更後的日期狀態物件

                            // 將取消的日期房間數歸還到原本的相對應的房型屬性
                            setFreeRoomToRoomStates(newRoomStates, roomStatesObj);

                            // 將新的日期狀態陣列的日期與原始的日期狀態陣列的日期比對, 將新的物件更新到舊物件上
                            newRoomStates.forEach(function (newItem) {
                                roomStatesObj.forEach(function (oldItem) {
                                    if (newItem.date === oldItem.date) {
                                        axios.patch(`${_url}/660/roomStates/${newItem.id}`, newItem, headerObj)
                                            .then(function (res) {
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
                                                reLogin(err.response.data);
                                            })
                                    }
                                })
                            })
                        }).catch(function (err) {
                            reLogin(err.response.data);
                        })
                }
            });
        })


        // 將取消的日期房間數歸還到原本的相對應的房型屬性
        function setFreeRoomToRoomStates(newRoomStates, roomStatesObj) {
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

        // 更新訂單資料
        function updateBooking(newBookingObj) {
            axios.patch(`${_url}/660/bookings/${newBookingObj.id}`, newBookingObj, headerObj)
                .then(function (res) {
                    renderData(res.data, roomObj, userObj)  // 渲染更新後的資料
                }).catch(function (err) {
                    reLogin(err.response.data);
                })
        }

        // 將修改後的bookingHistoryObj ID寫入對應訂單
        function saveHistoryBackBooking(bookingHistoryObj) {
            axios.get(`${_url}/660/bookings/${bookingHistoryObj.bookingsId}`, headerObj)
                .then(function (res) {
                    const newBookingObj = res.data;
                    newBookingObj.history.push(bookingHistoryObj.id);       // 將更新履歷寫入原本訂單的history陣列內
                    updateBooking(newBookingObj);       // 將更新後的訂單寫回原訂單資料
                }).catch(function (err) {
                    reLogin(err.response.data);
                })
        }

        // 根據修改狀態新增bookingHistory
        function addBookingHistory(bookingHistoryObj) {
            axios.post(`${_url}/660/bookingHistorys`, bookingHistoryObj, headerObj)
                .then(function (res) {
                    saveHistoryBackBooking(res.data);
                }).catch(function (err) {
                    reLogin(err.response.data);
                })
        }

        // 點擊修改訂單按鈕
        btnUpdate.addEventListener("click", function () {
            btnToggle();
            toggleData();// 訂單資料切換是否可編輯狀態
        })

        // 點擊取消修改按鈕
        btnUpdateCancel.addEventListener("click", function () {
            btnToggle();
            toggleData();
            renderData(bookingObj, roomObj, userObj);   // 還原訂單狀態
        })
    })
    .catch(function (err) {
        reLogin(err.response.data);
    });
/*------------------------------------*\
    function
\*------------------------------------*/
// 取得訂單修改履歷, 並渲染資料
function getHistory(bookingHistoryArr) {
    let logArr = [];
    let str = "";

    // Function to perform axios GET request
    function fetchData(item) {
        return axios.get(`${_url}/660/bookingHistorys/${item}`, headerObj)
            .then(res => {
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
            })
            .catch(err => {
                console.error(err);
                reLogin(err.response.data);
            });
    }

    // Create an array of Promises for each item
    const promises = bookingHistoryArr.map(item => fetchData(item));

    // Use Promise.all to wait for all Promises to resolve
    return Promise.all(promises)
        .then(() => {
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
        });
}

// 渲染訂單資料
function renderData(bookingObj, roomObj, userObj) {
    let roomType = "";
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
    remark.value = bookingObj.remark;
    checkInCats.value = bookingObj.cats.length;
    plusCatPay.value = (bookingObj.cats.length - 1) * 300 * bookingObj.quantity;

    roomObj.forEach(function (item) {
        if (item.id === bookingObj.roomId) {
            totalPrice.value = item.price * bookingObj.quantity + (bookingObj.cats.length - 1) * 300 * bookingObj.quantity;
        }
    })
    // 取消予已退房訂單不可再修改
    if (bookingObj.state === "已取消" || bookingObj.state === "已退房") {
        btnUpdate.setAttribute("disabled", true);
    }
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
function checkCatChecked() {
    const formCheckInputs = document.querySelectorAll(".form-check-input");
    // 入住貓咪數量不能小於1
    let selectedCount = countSelectedCheckboxes(formCheckInputs);
    if (selectedCount <= 0) {
        Swal.fire({
            icon: "error",
            title: "入住貓咪數量不能小於 1"
        });
    }
    countSelectedCheckboxes(formCheckInputs);
    return selectedCount;
}

// 當訂單取消或變更時取得畫面當前的訂單履歷
function setNewBookingHistoryObj(newBookingObj, bookingStateStr) {
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

// 房型不夠的錯誤提示
function roomNotEnough() {
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

// 點擊返回列表時
btnBack.addEventListener("click", function () {
    location = "admin_bookingList.html"
})