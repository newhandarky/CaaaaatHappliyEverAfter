import axios from "axios";
import { _url } from "./config";
import { isLogin } from "./isLogin";
import Swal from 'sweetalert2';
import 'animate.css';
//console.log("suc")

//bookingLuxRoom.html
//DOM
let luxRoomDimension= document.querySelector('.luxRoomDimension');
let luxRoomFacility = document.querySelector('.luxRoomFacility');
let luxRoomCatNum = document.querySelector('.luxRoomCatNum');
let luxRoomPrice = document.querySelector('.luxRoomPrice');
let bookNowBtnLuxLg = document.querySelector('.bookNowBtnLuxLg');
let bookNowBtnLux = document.querySelector('.bookNowBtnLux');


//size
axios.get(`${_url}/rooms/53`).then(response =>{
    let luxRoomDimensionClaim = response.data.size
        let str = `寬 ${luxRoomDimensionClaim[0]}*深${luxRoomDimensionClaim[1]}*高${luxRoomDimensionClaim[2]}`;
        luxRoomDimension.innerHTML=str;
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

bookNowBtnLuxLg.addEventListener('click', function(e){
    e.preventDefault();
    isLogin("bookingLuxProcess_1.html")
    //window.location.href = "bookingLuxProcess_1.html";

})

bookNowBtnLux.addEventListener('click', function(e){
    e.preventDefault();
    isLogin("bookingLuxProcess_1.html")
    //window.location.href = "bookingLuxProcess_1.html";

})