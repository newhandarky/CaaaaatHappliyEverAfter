import{a as i,_ as m,S as d}from"./sweetalert2.all-203b6da2.js";import"./navbar-96c5072d.js";const a=document.querySelector("#loginAll");a.classList.toggle("d-none");const r=document.querySelector("#loginTitle");r.classList.toggle("d-none");const c=document.querySelector("#loading");c.classList.toggle("d-none");const u=document.getElementById("loginForm");function S(o){i.post(`${m}/login`,o).then(e=>{console.log(e.data);let{user:t,accessToken:n}=e.data,l={user:t,accessToken:n,showCatinCatPage:[]};localStorage.setItem("userTokenAndData",JSON.stringify(l)),console.log(JSON.parse(localStorage.getItem("userTokenAndData"))),JSON.parse(localStorage.getItem("userTokenAndData")).user.role==="admin"?(localStorage.setItem("userRole",JSON.parse(localStorage.getItem("userTokenAndData")).user.role),localStorage.setItem("userName",JSON.parse(localStorage.getItem("userTokenAndData")).user.name),localStorage.setItem("userId",JSON.parse(localStorage.getItem("userTokenAndData")).user.id),localStorage.setItem("userLoginToken",JSON.parse(localStorage.getItem("userTokenAndData")).accessToken),localStorage.removeItem("userTokenAndData"),window.location.href="./admin_index.html"):window.location.href="./index.html"}).catch(e=>{console.log(e.response.data),d.mixin({customClass:{confirmButton:"btn btn-custom-confirm",cancelButton:"btn btn-custom-cancel"},buttonsStyling:!1}).fire({title:"登入失敗",text:e.response.data,icon:"error",confirmButtonText:"確定"}).then(n=>{a.classList.toggle("d-none"),r.classList.toggle("d-none"),c.classList.toggle("d-none")})})}u.addEventListener("submit",o=>{o.preventDefault(),document.querySelector("#loginAll").classList.toggle("d-none"),document.querySelector("#loginTitle").classList.toggle("d-none"),document.querySelector("#loading").classList.toggle("d-none");const l=document.getElementById("email").value,g=document.getElementById("password").value;let s={email:l,password:g};console.log(s),S(s)});
