
import axios from "axios";
import { _url } from "./config";
import { isLogin } from "./isLogin";
import Swal from 'sweetalert2';

console.log("suc")


//bookingdelicateRoom.html
//DOM
let delicateRoomFacility = document.querySelector(".delicateRoomFacility");
let delicateRoomDimension = document.querySelector(".delicateRoomDimension");
let delicateRoomCatNum = document.querySelector(".delicateRoomCatNum");
let delicateRoomPrice = document.querySelector(".delicateRoomPrice");
//size
axios.get(`${_url}/rooms/52`).then(function(response){
    let delicateRoomDimensionClaim = response.data.size;
    delicateRoomDimensionClaim.forEach(function(item){
        let content = `${item}cm `;
        let str = `寬 ${delicateRoomDimensionClaim[0]}*深${delicateRoomDimensionClaim[1]}*高${delicateRoomDimensionClaim[2]}`;
        delicateRoomDimension.innerHTML=str
    })
})
//設備
axios.get(`${_url}/rooms/52`).then(function(response){
    let delicateRoomFacilityList = response.data.facility;
    let str = ``
    delicateRoomFacilityList.forEach(function(item){
        let content = `<li><p><span class="material-symbols-outlined fs-6">
        check
        </span>${item}</p> </li>`
        str += content;
    });
    delicateRoomFacility.innerHTML= str;

});
//cat number
axios.get(`${_url}/rooms/52`).then(function(response){
    let delicateRoomCat = response.data.quantity;
    delicateRoomCatNum.innerHTML = delicateRoomCat
})
//price
axios.get(`${_url}/rooms/52`).then(function(response){
    let delicateRoomMoney = response.data.price;
    delicateRoomPrice.innerHTML = `${delicateRoomMoney}元 / 晚`
});

//bookingClassicRoom.html
//DOM
let classicRoomDimension = document.querySelector('.classicRoomDimension');
let classicRoomFacility = document.querySelector('.classicRoomFacility');
let classicRoomCatNum = document.querySelector('.classicRoomCatNum');
let classicRoomPrice = document.querySelector('.classicRoomPrice');

//size
axios.get(`${_url}/rooms/51`).then(response =>{
    console.log(response.data)
    let classicRoomDimensionClaim = response.data.size
    let str = `寬 ${classicRoomDimensionClaim[0]}*深${classicRoomDimensionClaim[1]}*高${classicRoomDimensionClaim[2]}`;
    classicRoomDimension.innerHTML=str
});

//設備
axios.get(`${_url}/rooms/51`).then(function(response){
    let classicRoomFacilityList = response.data.facility;
    console.log(classicRoomFacilityList);
    let str = ``
    classicRoomFacilityList.forEach(function(item){
        let content = `<li><p><span class="material-symbols-outlined fs-6">
        check
        </span>${item}</p> </li>`
        str += content;
    });
    classicRoomFacility.innerHTML= str;

});

//cat number
axios.get(`${_url}/rooms/51`).then(function(response){
    let classicRoomCat = response.data.quantity;
    classicRoomCatNum.innerHTML = classicRoomCat
})
//price
axios.get(`${_url}/rooms/51`).then(function(response){
    let classicRoomMoney = response.data.price;
    classicRoomPrice.innerHTML = `${classicRoomMoney}元 / 晚`
});


//bookingLuxRoom.html
//DOM
let luxRoomDimension= document.querySelector('.luxRoomDimension');
let luxRoomFacility = document.querySelector('.luxRoomFacility');
let luxRoomCatNum = document.querySelector('.luxRoomCatNum');
let luxRoomPrice = document.querySelector('.luxRoomPrice');

//size
axios.get(`${_url}/rooms/53`).then(response =>{
    let luxRoomDimensionClaim = response.data.size
    luxRoomDimensionClaim.forEach(function(item){
        let str = `寬 ${luxRoomDimensionClaim[0]}*深${luxRoomDimensionClaim[1]}*高${luxRoomDimensionClaim[2]}`;
        luxRoomDimension.innerHTML=str
    })
    luxRoomDimension.innerHTML=str
});

//設備
axios.get(`${_url}/rooms/53`).then(function(response){
    let luxRoomFacilityListClaim = response.data.facility;
    let str = ``
    luxRoomFacilityListClaim.forEach(function(item){
        let content = `<li><p><span class="material-symbols-outlined fs-6">
        check
        </span>${item}</p> </li>`
        str += content;
    });
    luxRoomFacility.innerHTML= str;

});

//cat number
axios.get(`${_url}/rooms/53`).then(function(response){
    let luxRoomCatNumClaim = response.data.quantity;
    luxRoomCatNum.innerHTML = luxRoomCatNumClaim
})
//price
axios.get(`${_url}/rooms/53`).then(function(response){
    let luxRoomPriceClaim = response.data.price;
    luxRoomPrice.innerHTML = `${luxRoomPriceClaim}元 / 晚`
});


//首頁的快速預約房型
//DOM
const searchBarBtn = document.querySelector('.searchBarBtn');
const checkIn = document.querySelector('#checkIn');
const checkOut = document.querySelector('#checkOut');
const roomType = document.querySelector('#roomType');
console.log(roomType.value );

searchBarBtn.addEventListener("click", function(e){
        //console.log("請填寫入住日期、退房日期與選擇房型");
        if(checkOut.value == "" ||checkIn.value == "" || roomType.value == "請選擇" ){
            // alert("請填寫入住日期、退房日期與選擇房型")
            // Swal.fire(`您尚未選擇入住或退房時間或選擇房型`)
            alert("您尚未選擇入住或退房時間或選擇房型")
            console.log("請填寫入住日期、退房日期與選擇房型");
        }

        else if(checkOut.value < checkIn.value){
            alert("退房日期需晚於入住日期")
             console.log("退房日期需晚於入住日期");
             checkOut.value = "";
             checkIn.value = "";
             return
        }

        else if (roomType.value == "經典房"){
            console.log("經典房");
            axios.get(`${_url}/roomStates?date_gte=${checkIn.value}&date_lte=${checkOut.value}&date_ne=${checkOut.value}`).then(function(response){
                let data = response.data;
                console.log(data)
                data.forEach(function(item){
                 if(item.availableCount.classic <= 0){
                    alert(`${item.date}已無空房，請重新選擇`);
                    checkOut.value = "";
                    checkIn.value = "";
                    return
                    
                 }else{
                    indexBooking()
                 }
        })})
        }

        else if (roomType.value == "精緻房"){
            console.log("精緻房");
            axios.get(`${_url}/roomStates?date_gte=${checkIn.value}&date_lte=${checkOut.value}&date_ne=${checkOut.value}`).then(function(response){
                let data = response.data;
                console.log(data)
                data.forEach(function(item){
                 if(item.availableCount.delicate <= 0){
                    alert(`${item.date}已無空房，請重新選擇`);
                    checkOut.value = "";
                    checkIn.value = "";
                    return
                    
                 }else{
                    indexBooking()
                 }
        })});
        }

        else if (roomType.value == "豪華房"){
            console.log("豪華房");
            axios.get(`${_url}/roomStates?date_gte=${checkIn.value}&date_lte=${checkOut.value}&date_ne=${checkOut.value}`).then(function(response){
                let data = response.data;
                console.log(data)
                data.forEach(function(item){
                 if(item.availableCount.luxury <= 0){
                    alert(`${item.date}已無空房，請重新選擇`);
                    checkOut.value = "";
                    checkIn.value = "";
                    return
                    
                 }else{
                    indexBooking()
                 }
        })});
        }
        
    
});

function indexBooking(){
    let indexBookingArr = [];
    let indexBooking = {};
    indexBooking['checkIn'] = checkIn.value;
    indexBooking['checkOut'] = checkOut.value;
    indexBooking['roomType'] = roomType.value;
    console.log(indexBooking);
    indexBookingArr.push(indexBooking);
    let indexBookingString = JSON.stringify(indexBookingArr);
    console.log(indexBookingString);
    sessionStorage.setItem('indexBooking', indexBookingString);
    
    if(roomType.value == "經典房"){
        isLogin("./bookingClassicProcess_1.html")
         //window.location.href = "./bookingClassicProcess_1.html"
    };
    if(roomType.value == "精緻房"){
        isLogin("./bookingDelicateProcess_1.html")
        //window.location.href = "./bookingDelicateProcess_1.html"
    };
    if(roomType.value == "豪華房"){
        isLogin("./bookingLuxProcess_1.html")
    }
    
};


//找到今天的日期
let date = new Date();
let currentYear = date.getFullYear();
console.log(currentYear);
console.log(date.getDate());
console.log(date.getMonth()+1);
let currentDate = `${currentYear}-${date.getMonth()+1}-${date.getDate()}`;
console.log(currentDate);

    //flatpickr
    flatpickr("#checkIn", {
        enableTime: false,
        dateFormat: "Y-m-d",
        minDate: currentDate,
        maxDate: "2024-02-29"
      });
    
      flatpickr("#checkOut", {
        enableTime: false,
        dateFormat: "Y-m-d",
        minDate: currentDate,
        maxDate: "2024-02-29"
      });


let bookingNow = document.querySelector(".bookingNow");
// console.log(bookingNow);
bookingNow.addEventListener("click", function(e){
    e.preventDefault();
     const bookingNowHerf = bookingNow.getAttribute("href");
    isLogin(bookingNowHerf)
});
