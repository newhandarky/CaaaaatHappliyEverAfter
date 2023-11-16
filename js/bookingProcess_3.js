import axios from "axios";
import { _url } from "./config";
import { isLogin } from "./isLogin";


//DOM
const checkInDate = document.querySelector(".checkInDate");
const checkOutDate = document.querySelector(".checkOutDate");
const roomType = document.querySelector(".roomType");
const catNum = document.querySelector(".catNum");
const catName = document.querySelector(".catName");
const price = document.querySelector(".price");
const remark = document.querySelector(".remark");
const toComfirmation = document.querySelector(".toComfirmation");
console.log(toComfirmation)

//拿取暫存在sesson.storage的資訊
let catInfo = JSON.parse(sessionStorage.getItem('catInfo'));
let bookingData = JSON.parse(sessionStorage.getItem('bookingData'));
console.log(catInfo);
console.log(bookingData);

//渲染checkin checkout date
checkInDate.innerHTML = bookingData.checkIn;
checkOutDate.innerHTML = bookingData.checkOut;
//渲染房型資訊
roomType.innerHTML = bookingData.roomType;
//渲染貓咪數量資訊
catNum.innerHTML =(catInfo.catId).length;
//渲染入住貓咪資訊
let catId = catInfo.catId;
console.log(catId);

let str = "";
catId.forEach(function(item){
    axios.get(`${_url}/cats/${item}`).then(function(response){
        console.log(response.data["catName"]);
        str += ` ${response.data["catName"]} `;
        console.log(str);
        catName.textContent = str;
    });
    
});



//渲染價錢資訊

//用以下方式計算日期差異
//  let day1 = "2023-02-02";
//  let day2 = "2023-02-04";
// let date1 = new Date(day1); 會變成毫秒
// let date2 = new Date(day2);
// console.log((date2.getTime()-date1.getTime())/ (1000 * 3600 * 24))


axios.get(`${_url}/rooms?name=${bookingData.roomType}`).then(function(response){
    console.log(response.data);
    let day1 = bookingData.checkIn;
    let day2 = bookingData.checkOut;
    let date1 = new Date(day1);
    let date2 = new Date(day2);
    let nights = (date2.getTime()-date1.getTime())/ (1000 * 3600 * 24)
    console.log(nights)

    price.innerHTML = response.data[0].price*nights
});

//渲染remark
remark.innerHTML = catInfo.remark;

//打包資料傳到資料庫--拿到local storage裡面的資料
let userTokenAndData = JSON.parse(localStorage.getItem('userTokenAndData'));
console.log(userTokenAndData.user.id);

 let booking = {};
 booking['userId'] = userTokenAndData.user.id;
 booking['bookingDate'] = bookingData.bookingDate;
 booking['checkIn']= bookingData.checkIn;
 booking['checkOut']=bookingData.checkOut;
 booking['roomType'] = bookingData.roomType;
 axios.get(`${_url}/rooms?name=${bookingData.roomType}`).then(function(response){
    console.log(response.data);
    let day1 = bookingData.checkIn;
    let day2 = bookingData.checkOut;
    let date1 = new Date(day1);
    let date2 = new Date(day2);
    let nights = (date2.getTime()-date1.getTime())/ (1000 * 3600 * 24)
    booking['price'] = response.data[0].price*nights
});
//catID remark也要一起打包進去booking{}
booking['cats'] = catInfo.catId;
booking['remark'] = catInfo.remark;

console.log(booking);

//打包資料傳到資料庫--post到booking


toComfirmation.addEventListener("click", function(e){
    e.preventDefault();
    postPatch();
    window.alert("貓的幸福歡迎您的到來！")
    window.location.href = "./index.html"
})

function postPatch(){
    postBooking();
    patchData();

}


function postBooking(){
    axios.post(`${_url}/bookings`, booking).then(response =>{
        console.log(response.data);
    })
    .catch(error =>{
        console.error(error);
    })
};
//以上都ＯＫ



//扣掉房間的function
function patchData(){
    let newData = []
    //確認房間數量
    axios.get(`${_url}/roomStates?date_gte=${bookingData.checkIn}&date_lte=${bookingData.checkOut}&date_ne=${bookingData.checkOut}`).then(function(response){
        let data = response.data;
        //每晚減1個房間
        data.forEach(function(item){
            if(bookingData.roomType === "經典房"){
                item.availableCount.classic -=1;
                console.log(item);
                newData.push(item);
                };

            if(bookingData.roomType === "精緻房"){
            item.availableCount.delicate -=1;
            console.log(item);
            newData.push(item);
            };

            if(bookingData.roomType === "豪華房"){
                item.availableCount.luxury -=1;
                console.log(item);
                newData.push(item);
                };
            
            
        });
        console.log(newData);

        //用新的資料patch過去roomStates
        newData.forEach(function(item){
            let roomStatesId = item.id;
            console.log(roomStatesId);
            axios.patch(`${_url}/roomStates/${roomStatesId}`, item).then(function(response){
                console.log(response.data)
            })
        })
    });

    
};

























