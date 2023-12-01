import axios from "axios";
import { _url } from "./config";
import { isLogin } from "./isLogin";
import Swal from 'sweetalert2';
import 'animate.css';
//console.log("suc");

//bookingClassicRoom.html
//DOM
let classicRoomDimension = document.querySelector('.classicRoomDimension');
let classicRoomFacility = document.querySelector('.classicRoomFacility');
let classicRoomCatNum = document.querySelector('.classicRoomCatNum');
let classicRoomPrice = document.querySelector('.classicRoomPrice');
let bookNowBtnClassicLg = document.querySelector('.bookNowBtnClassicLg');
let bookNowBtnClassic = document.querySelector('.bookNowBtnClassic');
//size
axios.get(`${_url}/rooms/51`).then(response =>{
   // console.log(response.data)
    let classicRoomDimensionClaim = response.data.size
    let str = `寬 ${classicRoomDimensionClaim[0]}*深${classicRoomDimensionClaim[1]}*高${classicRoomDimensionClaim[2]}`;
    classicRoomDimension.innerHTML=str
});

//設備
axios.get(`${_url}/rooms/51`).then(function(response){
    let classicRoomFacilityList = response.data.facility;
 //   console.log(classicRoomFacilityList);
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

bookNowBtnClassic.addEventListener('click', function(e){
    e.preventDefault();
    isLogin("bookingClassicProcess_1.html")

});

bookNowBtnClassicLg.addEventListener('click', function(e){
    e.preventDefault();
    isLogin("bookingClassicProcess_1.html")

});
