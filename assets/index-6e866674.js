import"./sweetalert2.all-203b6da2.js";import"./navbar-96c5072d.js";import{f as c}from"./index-a4e39586.js";import"./booking-82a51d2d.js";/* empty css                */console.log("歡迎來到首頁");const o=document.getElementById("catRoomInput_checkIn"),n=document.getElementById("catRoomInput_checkOut"),l=document.getElementById("checkIn"),m=document.getElementById("checkOut");c("#checkIn",{enableTime:!1,dateFormat:"Y-m-d"});o.addEventListener("click",t=>{t.preventDefault(),l.focus()});c("#checkOut",{enableTime:!1,dateFormat:"Y-m-d"});n.addEventListener("click",t=>{t.preventDefault(),m.focus()});const e=document.getElementById("roomType");function a(){e.value==="請選擇"&&(console.log(e.value),e.style.color="#ced4da")}a();e.addEventListener("change",t=>{e.value!=="請選擇"&&(e.style.color=null)});