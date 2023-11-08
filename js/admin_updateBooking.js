/*------------------------------------*\
    import
\*------------------------------------*/
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";

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

/*------------------------------------*\
    變數
\*------------------------------------*/
// const url = "http://localhost:3000"; // 本機端
const url = "https://catroomdb.onrender.com"; // json=server端

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
    // 自訂資料物件
    const bookingData = {};
    bookingData.id = res.data.id;
    bookingData.userId = res.data.userId;
    bookingData.name = res.data.user.name;
    bookingData.tel = res.data.user.phone;
    bookingData.checkIn = res.data.checkIn;
    bookingData.checkOut = res.data.checkOut;
    bookingData.quantity = res.data.quantity;
    bookingData.roomName = res.data.room.name;
    bookingData.state = res.data.state;
    bookingData.price = res.data.price;
    bookingData.remark = res.data.remark;
    renderData(bookingData);

    getHistory(res.data.history);

}).catch(function (err) {
    console.log(err);
})

// 取得訂單修改履歷
// function getHistory(arr){
//     let logArr = [];
//     let str = "";
//     arr.forEach(function(item){
//         axios.get(`${url}/660/bookingHistorys/${item}`, {
//             headers: {
//                 authorization: `Bearer ${localStorage.getItem("userLoginToken")}`,
//             },
//         }).then(function (res) {
//             const logObj = {};
//             logObj.updateTime = res.data.updateTime;
//             logObj.catNum = res.data.catNum;
//             logObj.admin = res.data.admin;
//             logObj.checkIn = res.data.checkIn;
//             logObj.checkOut = res.data.checkOut;
//             logObj.quantity = res.data.quantity;
//             logObj.roomType = res.data.roomType;
//             logObj.state = res.data.state;
//             logObj.price = res.data.price;
//             logObj.remark = res.data.remark;
//             logArr.push(logObj);        
//         }).catch(function (err) {
//             console.log(err);
//         })
//     })
//     renderHistory(logArr);
// }

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
            logObj.admin = res.data.admin;
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

    Promise.all(requests).then(function() {
        logArr.forEach(function(item){
            console.log(item.state);
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
                            <input class="form-check-input" type="checkbox" id="memberCat${index+1}">
                            <label class="form-check-label memberCat${index+1}" for="memberCat${index+1}">${item.catName}</label>
                        </div>
                    </div>`
        getCats.innerHTML = str;
        })
    }).catch(function (err) {
        console.log(err);
    })

}
/*------------------------------------*\
    事件
\*------------------------------------*/
