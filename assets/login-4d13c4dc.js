import"./bootstrap.min-47e23b13.js";import"./navbar-a947fc30.js";import{a as s,_ as l}from"./config-4096d6dc.js";const r=document.getElementById("loginForm");function m(o){s.post(`${l}/login`,o).then(e=>{let{user:a,accessToken:t}=e.data,n={user:a,accessToken:t,showCatinCatPage:[]};localStorage.setItem("userTokenAndData",JSON.stringify(n)),console.log(JSON.parse(localStorage.getItem("userTokenAndData"))),JSON.parse(localStorage.getItem("userTokenAndData")).user.role==="admin"?(localStorage.setItem("userRole",JSON.parse(localStorage.getItem("userTokenAndData")).user.role),localStorage.setItem("userName",JSON.parse(localStorage.getItem("userTokenAndData")).user.name),localStorage.setItem("userId",JSON.parse(localStorage.getItem("userTokenAndData")).user.id),localStorage.setItem("userLoginToken",JSON.parse(localStorage.getItem("userTokenAndData")).accessToken),localStorage.removeItem("userTokenAndData"),window.location.href="./admin_index.html"):window.location.href="./index.html"}).catch(e=>{console.log(e.response.data),alert(`登入失敗：${e.response.data}`)})}r.addEventListener("submit",o=>{o.preventDefault();const e=document.getElementById("email").value,a=document.getElementById("password").value;let t={email:e,password:a};console.log(t),m(t)});
