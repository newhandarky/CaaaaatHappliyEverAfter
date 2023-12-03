
import axios from "axios";
import { _url } from "./config";
import { isLogin } from "./isLogin";
import Swal from 'sweetalert2';
import 'animate.css';

//console.log("suc")

//bookingdelicateRoom.html
//DOM
let delicateRoomFacility = document.querySelector(".delicateRoomFacility");
let delicateRoomDimension = document.querySelector(".delicateRoomDimension");
let delicateRoomCatNum = document.querySelector(".delicateRoomCatNum");
let delicateRoomPrice = document.querySelector(".delicateRoomPrice");
let bookNowDelicateLg = document.querySelector('.bookNowDelicateLg');
let bookNowDelicate = document.querySelector('.bookNowDelicate');

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

bookNowDelicateLg.addEventListener('click', function(e){
    e.preventDefault();
    isLogin("bookingDelicateProcess_1.html")

});

bookNowDelicate.addEventListener('click', function(e){
    e.preventDefault();
    isLogin("bookingDelicateProcess_1.html")

});


