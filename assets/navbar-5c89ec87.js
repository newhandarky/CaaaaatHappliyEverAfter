import{a as r,_ as c}from"./config-82256151.js";function s(e){if(!localStorage.getItem("userTokenAndData"))window.location.href="./login.html";else{const t=JSON.parse(localStorage.getItem("userTokenAndData")).accessToken,a=JSON.parse(localStorage.getItem("userTokenAndData")).user;r.get(`${c}/600/users/${a.id}`,{headers:{authorization:`Bearer ${t}`}}).then(o=>{if(console.log(o),e){window.location.href=e;return}}).catch(o=>{console.log(o),alert("登入時間已到期 請重新登入後再執行一次"),localStorage.removeItem("userTokenAndData"),window.location.href="./login.html"})}}const n=document.getElementById("memberFunction");document.getElementById("memberData");document.getElementById("catData");document.getElementById("navBookingHistory");n.addEventListener("click",e=>{e.preventDefault();const t=n.getAttribute("href");s(t)});export{s as i};
