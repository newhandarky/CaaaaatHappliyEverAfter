
import axios from "axios";
import { _url } from "./config";
import { isLogin } from "./isLogin";


//bookingClassicRoom.html
let bookingNow = document.querySelector(".bookingNow");
// console.log(bookingNow);
bookingNow.addEventListener("click", function(e){
    e.preventDefault();
     const bookingNowHerf = bookingNow.getAttribute("href");
    isLogin(bookingNowHerf)
});


//bookingPetiteRoom.html
//DOM
let petiteRoomFacility = document.querySelector(".petiteRoomFacility");
let petiteRoomDimension = document.querySelector(".petiteRoomDimension");
let petiteRoomCatNum = document.querySelector(".petiteRoomCatNum");
let petiteRoomPrice = document.querySelector(".petiteRoomPrice");
//size
axios.get('https://catroomdb.onrender.com/rooms/52').then(function(response){
    let petiteRoomDimensionClaim = response.data.size;
    let str = ``;
    petiteRoomDimensionClaim.forEach(function(item){
        let content = `${item}cm `;b
        str += content;
        petiteRoomDimension.innerHTML=str
    })
})
//設備
axios.get('https://catroomdb.onrender.com/rooms/52').then(function(response){
    let petiteRoomFacilityList = response.data.facility;
    let str = ``
    petiteRoomFacilityList.forEach(function(item){
        let content = `<li>${item}</li>`
        str += content;
    });
    petiteRoomFacility.innerHTML= str;

});
//cat number
axios.get('https://catroomdb.onrender.com/rooms/52').then(function(response){
    let petiteRoomCat = response.data.quantity;
    petiteRoomCatNum.innerHTML = petiteRoomCat
})
//price
axios.get('https://catroomdb.onrender.com/rooms/52').then(function(response){
    let petiteRoomMoney = response.data.price;
    petiteRoomPrice.innerHTML = petiteRoomMoney
})

