import{S as r}from"./sweetalert2.all-1988d671.js";import{i as L}from"./navbar-bd5379fb.js";import"./aside-7286c9e4.js";import{a as l,_ as u}from"./config-4096d6dc.js";const q=document.querySelectorAll("#bookingHistory");q.forEach(e=>{e.classList.add("onThisPage")});const x=document.querySelector("#navAside");x.classList.remove("d-none");const $=document.querySelector("#loading");$.classList.toggle("d-none");let a=0;document.addEventListener("DOMContentLoaded",function(){const e=document.querySelectorAll(".star");e.forEach(function(n){n.addEventListener("mouseover",function(){const o=this.getAttribute("data-rating");for(let t=1;t<=5;t++)document.querySelector(`.star[data-rating="${t}"]`).classList.toggle("active",t<=o)}),n.addEventListener("mouseout",function(){e.forEach(function(o){o.classList.remove("active")})}),n.addEventListener("click",function(){const o=this.getAttribute("data-rating");for(let t=1;t<=5;t++)document.querySelector(`.star[data-rating="${t}"]`).classList.toggle("pressed",t<=o);a=parseInt(o,10),console.log("getStars:",a)})})});const D=JSON.parse(localStorage.getItem("userTokenAndData")),{accessToken:m,user:C}=D,d=JSON.parse(localStorage.getItem("evaluateBooking_Id"));l.get(`${u}/600/bookings/${d}?_expand=room`,{headers:{authorization:`Bearer ${m}`}}).then(e=>{const n=e.data;console.log(n);const{checkIn:o,checkOut:t,room:c,quantity:i,cats:s,price:g,id:f}=n,{name:h}=c,B=s.length,y=document.querySelector("#checkIn"),S=document.querySelector("#checkOut"),b=document.querySelector("#roomType"),k=document.querySelector("#catsQuantity"),p=document.querySelector("#price"),v=document.querySelector("#bookingId");y.textContent=`入住時間：${o}`,S.textContent=`退房時間：${t}`,b.textContent=`入住房型：${h}`,k.textContent=`貓咪數量：${B}隻貓`,p.textContent=`總金額：${g} NT`,v.textContent=`訂房編號：${f}`}).catch(e=>{console.log(e),console.log("獲取資料失敗")});const I=document.querySelector("#evaluateBtn");I.addEventListener("click",e=>{e.preventDefault();const n=document.querySelector("#evaluateBooking");n.classList.toggle("d-none");const o=document.querySelector("#loading");o.classList.toggle("d-none");let t=document.querySelector("#comment").value;a===0?(n.classList.toggle("d-none"),o.classList.toggle("d-none"),r.mixin({customClass:{confirmButton:"btn btn-custom-confirm",cancelButton:"btn btn-custom-cancel"},buttonsStyling:!1}).fire({title:"請輸入星星數量在發送評論！",confirmButtonText:"確定"})):l.patch(`${u}/600/bookings/${d}?userId=${C.id}`,{feedback:{stars:a,comment:t}},{headers:{authorization:`Bearer ${m}`}}).then(c=>{console.log(c),r.mixin({customClass:{confirmButton:"btn btn-custom-confirm",cancelButton:"btn btn-custom-cancel"},buttonsStyling:!1}).fire({title:"評論送出成功",icon:"success",confirmButtonText:"確定"}).then(s=>{s.isConfirmed&&L("./bookingHistory.html")})}).catch(c=>{console.log(c),r.mixin({customClass:{confirmButton:"btn btn-custom-confirm",cancelButton:"btn btn-custom-cancel"},buttonsStyling:!1}).fire({title:"評論送出失敗",text:"請重新登入後再嘗試",icon:"error",confirmButtonText:"確定"}).then(s=>{window.location.href="./login.html"})})});
