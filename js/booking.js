
import axios from "axios";
import { _url } from "./config";
import { isLogin } from "./isLogin";


let bookingNow = document.querySelector(".bookingNow");
// console.log(bookingNow);
bookingNow.addEventListener("click", function(e){
    e.preventDefault();
     const bookingNowHerf = bookingNow.getAttribute("href");
    isLogin(bookingNowHerf)
});


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
    let classicRoomDimensionClaim = response.data.size
    let str = `寬 ${classicRoomDimensionClaim[0]}*深${classicRoomDimensionClaim[1]}*高${classicRoomDimensionClaim[2]}`;
    classicRoomDimension.innerHTML=str
});

//設備
axios.get(`${_url}/rooms/51`).then(function(response){
    let classicRoomFacilityList = response.data.facility;
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