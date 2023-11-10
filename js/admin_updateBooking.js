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
const btnCancel = document.querySelector(".btnCancel");
const btnBack = document.querySelector(".btnBack");
const form = document.querySelector("form");
const btns = document.querySelector(".btns");



/*------------------------------------*\
    變數
\*------------------------------------*/
let beforeBookingData = {};
let afterBookingData = {};
const roomsData = {
    "經典房": 800,
    "精緻房": 1000,
    "豪華房": 1500
}
/*------------------------------------*\
    function
\*------------------------------------*/

// https://catroomdb.onrender.com/bookings/401?_expand=user&_expand=room
axios.get(`${url}/660/bookings/${localStorage.getItem('bookingNum')}?_expand=user&_expand=room`, {
    headers: {
        authorization: `Bearer ${localStorage.getItem("userLoginToken")}`,
    },
}).then(function (res) {
    // console.log(res.data);
    const bookingData = {};

    setBookingObj(bookingData, res);
    setBookingObj(beforeBookingData, res);


    renderData(bookingData);
    getHistory(res.data.history);
}).catch(function (err) {
    console.log(err);
})

// 將資料寫入物件
function setBookingObj(obj, res){
    obj.id = res.data.id;
    obj.userId = res.data.userId;
    obj.name = res.data.user.name;
    obj.tel = res.data.user.phone;
    obj.checkIn = res.data.checkIn;
    obj.checkOut = res.data.checkOut;
    obj.quantity = res.data.quantity;
    obj.roomName = res.data.room.name;
    obj.state = res.data.state;
    obj.price = res.data.price;
    obj.remark = res.data.remark;
    obj.cats = [];

    res.data.cats.forEach(function(item){
        obj.cats.push("" + item);
    })
}


// 取得訂單修改履歷, 並渲染資料
function getHistory(arr){
    let logArr = [];
    let str = "";
    let requests = arr.map(function(item) {
        return axios.get(`${url}/660/bookingHistorys/${item}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("userLoginToken")}`,
            },
        }).then(function (res) {
            const logObj = {};
            logObj.updateTime = res.data.updateTime;
            logObj.catNum = res.data.catNum;
            logObj.admin = localStorage.getItem("userName");
            logObj.checkIn = res.data.checkIn;
            logObj.checkOut = res.data.checkOut;
            logObj.quantity = res.data.quantity;
            logObj.roomType = res.data.roomType;
            logObj.state = res.data.state;
            logObj.price = res.data.price;
            logObj.remark = res.data.remark;
            logArr.push(logObj);
        });
    });

    // 等全部請求執行完後才跑渲染訂單履歷
    Promise.all(requests).then(function() {
        logArr.forEach(function(item){
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
    }).catch(function(err) {
        console.log(err);
    });
}


// 渲染訂單資料
function renderData(obj){
    bookingId.value = obj.id;
    memberName.value = obj.name;
    bookingState.value = obj.state;
    checkIn.value = obj.checkIn;
    checkOut.value = obj.checkOut;
    memberPhone.value = obj.tel;
    bookingRoomType.value = obj.roomName;
    bookingDays.value = obj.quantity;
    totalPrice.value = obj.price;
    remark.value = obj.remark;
    
    // 取得貓咪資料
    obj.cats = [];
    axios.get(`${url}/660/cats`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem("userLoginToken")}`,
        },
    }).then(function (res) {
        res.data.forEach(function(item){
            item.userId == obj.userId? obj.cats.push(item) : "";
        })
        let str = "";
        obj.cats.forEach(function(item, index){
            str += `<div class="col-4">
                        <div class="form-check">
                            <input class="form-check-input" data-catid="${item.id}" type="checkbox" id="memberCat${index+1}" checked>
                            <label class="form-check-label memberCat${index+1}" for="memberCat${index+1}">${item.catName}</label>
                        </div>
                    </div>`
        getCats.innerHTML = str;
        })
    }).catch(function (err) {
        console.log(err);
    })
}

//彈跳錯誤提示
function alertErrForDate(){
    Swal.fire({
        title: "日期格式錯誤?",
        text: "入住日期不可與退房日期相等, 或在其之後",
        icon: "error"
    });
}

/*------------------------------------*\
    事件
\*------------------------------------*/
// 表單內容變動時
form.addEventListener("change", function(e){
    const startDate = moment(checkIn.value);
    const endDate = moment(checkOut.value);
    
    // 計算兩者差異年數
    const years = endDate.diff(startDate, "years");
    // 計算兩者差異月數，這邊要扣掉上面計算的差異年，否則會得到12個月
    const months = endDate.diff(startDate, "month") - (years * 12);
    // 把差異的年、月數加回來，否則會變成計算起訖日相差的天數(365天)
    startDate.add(years, 'years').add(months, 'months');
    const diffDays = endDate.diff(startDate, 'days');
    // console.log('years = ', years); // 1
    // console.log('months = ', months); // 0
    // console.log('days = ', diffDays); // 0

    if(e.target.classList.contains("bookingDays")){
        bookingDays.value <= 0 ? alertErrForDate() : checkOut.value = moment(checkIn.value).add(bookingDays.value, "days").format("YYYY-MM-DD");
        totalPrice.value = roomsData[bookingRoomType.value] * bookingDays.value;
    }
    if(e.target.classList.contains("checkIn") || e.target.classList.contains("checkOut")){
        diffDays <= 0 ? alertErrForDate() : bookingDays.value = diffDays;
        totalPrice.value = roomsData[bookingRoomType.value] * bookingDays.value;
    }
    if(e.target.classList.contains("bookingRoomType")){
        totalPrice.value = roomsData[bookingRoomType.value] * bookingDays.value;
    }
    
})

btns.addEventListener("click", function(e){
    if(e.target.classList.contains("btnUpdate")){
        
        // const afterBookingObj = {};
        // afterBookingObj.updateTime = moment().format('YYYY-MM-DD hh:mm:ss a'),
        // afterBookingObj.catNum = res.data.catNum;
        // afterBookingObj.admin = localStorage.getItem("userName");
        // afterBookingObj.checkIn = checkIn.value;
        // afterBookingObj.checkOut = checkOut.value;
        // afterBookingObj.quantity = bookingDays.value;
        // afterBookingObj.roomType = bookingRoomType.value;
        // afterBookingObj.state = bookingState.value;
        // afterBookingObj.price = totalPrice.value;
        // afterBookingObj.remark = remark.value;


        afterBookingData.admin = localStorage.getItem("userName");
        afterBookingData.checkIn = checkIn.value;
        afterBookingData.checkOut = checkOut.value;
        afterBookingData.quantity = bookingDays.value;
        afterBookingData.roomType = bookingRoomType.value;
        afterBookingData.state = bookingState.value;
        afterBookingData.price = totalPrice.value;
        afterBookingData.remark = remark.value;
        afterBookingData.cats = [];

        document.querySelectorAll(".form-check-input").forEach(function(item){
            item.checked ? afterBookingData.cats.push(item.dataset.catid) : "";
            
        })

    }
    // console.log(afterBookingObj);
    // console.log(beforeBookingData);
    // console.log(afterBookingData);
    // console.log(document.querySelector(".form-check-input").dataset.catid);

    

    if(beforeBookingData.checkIn === afterBookingData.checkIn 
        && beforeBookingData.checkOut === afterBookingData.checkOut
        && beforeBookingData.quantity == afterBookingData.quantity
        && beforeBookingData.price == afterBookingData.price
        && beforeBookingData.remark === afterBookingData.remark
        && beforeBookingData.state === afterBookingData.state
        && JSON.stringify(beforeBookingData.cats) === JSON.stringify(afterBookingData.cats)){
        console.log("資料並無變更");
    }else{
        console.log("資料有變更");

    }

})
