import{a as n,_ as a}from"./config-7dd8b0d7.js";import{i as m}from"./navbar-bcede514.js";import"./sweetalert2.all-7a8d322f.js";console.log("suc");const y=document.querySelector(".searchBarBtn"),c=document.querySelector("#checkIn"),i=document.querySelector("#checkOut"),r=document.querySelector("#roomType");console.log(r.value);y.addEventListener("click",function(t){if(i.value==""||c.value==""||r.value=="請選擇")alert("您尚未選擇入住或退房時間或選擇房型"),console.log("請填寫入住日期、退房日期與選擇房型");else if(i.value<c.value){alert("退房日期需晚於入住日期"),console.log("退房日期需晚於入住日期"),i.value="",c.value="";return}else r.value=="經典房"?(console.log("經典房"),n.get(`${a}/roomStates?date_gte=${c.value}&date_lte=${i.value}&date_ne=${i.value}`).then(function(e){let o=e.data;console.log(o),o.forEach(function(l){if(l.availableCount.classic<=0){alert(`${l.date}已無空房，請重新選擇`),i.value="",c.value="";return}else d()})})):r.value=="精緻房"?(console.log("精緻房"),n.get(`${a}/roomStates?date_gte=${c.value}&date_lte=${i.value}&date_ne=${i.value}`).then(function(e){let o=e.data;console.log(o),o.forEach(function(l){if(l.availableCount.delicate<=0){alert(`${l.date}已無空房，請重新選擇`),i.value="",c.value="";return}else d()})})):r.value=="豪華房"&&(console.log("豪華房"),n.get(`${a}/roomStates?date_gte=${c.value}&date_lte=${i.value}&date_ne=${i.value}`).then(function(e){let o=e.data;console.log(o),o.forEach(function(l){if(l.availableCount.luxury<=0){alert(`${l.date}已無空房，請重新選擇`),i.value="",c.value="";return}else d()})}))});function d(){let t=[],e={};e.checkIn=c.value,e.checkOut=i.value,e.roomType=r.value,console.log(e),t.push(e);let o=JSON.stringify(t);console.log(o),sessionStorage.setItem("indexBooking",o),r.value=="經典房"&&m("./bookingClassicProcess_1.html"),r.value=="精緻房"&&m("./bookingDelicateProcess_1.html"),r.value=="豪華房"&&m("./bookingLuxProcess_1.html")}let u=new Date,h=u.getFullYear();console.log(h);console.log(u.getDate());console.log(u.getMonth()+1);let f=`${h}-${u.getMonth()+1}-${u.getDate()}`;console.log(f);flatpickr("#checkIn",{enableTime:!1,dateFormat:"Y-m-d",minDate:f,maxDate:"2024-02-29"});flatpickr("#checkOut",{enableTime:!1,dateFormat:"Y-m-d",minDate:f,maxDate:"2024-02-29"});let g=document.querySelector(".bookingNow");g.addEventListener("click",function(t){t.preventDefault();const e=g.getAttribute("href");m(e)});let v=document.querySelector(".delicateRoomFacility"),R=document.querySelector(".delicateRoomDimension"),k=document.querySelector(".delicateRoomCatNum"),p=document.querySelector(".delicateRoomPrice");n.get(`${a}/rooms/52`).then(function(t){let e=t.data.size;e.forEach(function(o){let l=`寬 ${e[0]}*深${e[1]}*高${e[2]}`;R.innerHTML=l})});n.get(`${a}/rooms/52`).then(function(t){let e=t.data.facility,o="";e.forEach(function(l){let s=`<li><p><span class="material-symbols-outlined fs-6">
        check
        </span>${l}</p> </li>`;o+=s}),v.innerHTML=o});n.get(`${a}/rooms/52`).then(function(t){let e=t.data.quantity;k.innerHTML=e});n.get(`${a}/rooms/52`).then(function(t){let e=t.data.price;p.innerHTML=`${e}元 / 晚`});let S=document.querySelector(".classicRoomDimension"),x=document.querySelector(".classicRoomFacility"),q=document.querySelector(".classicRoomCatNum"),L=document.querySelector(".classicRoomPrice");n.get(`${a}/rooms/51`).then(t=>{let e=t.data.size,o=`寬 ${e[0]}*深${e[1]}*高${e[2]}`;S.innerHTML=o});n.get(`${a}/rooms/51`).then(function(t){let e=t.data.facility;console.log(e);let o="";e.forEach(function(l){let s=`<li><p><span class="material-symbols-outlined fs-6">
        check
        </span>${l}</p> </li>`;o+=s}),x.innerHTML=o});n.get(`${a}/rooms/51`).then(function(t){let e=t.data.quantity;q.innerHTML=e});n.get(`${a}/rooms/51`).then(function(t){let e=t.data.price;L.innerHTML=`${e}元 / 晚`});let $=document.querySelector(".luxRoomDimension"),C=document.querySelector(".luxRoomFacility"),D=document.querySelector(".luxRoomCatNum"),T=document.querySelector(".luxRoomPrice");n.get(`${a}/rooms/53`).then(t=>{let e=t.data.size;e.forEach(function(o){let l=`寬 ${e[0]}*深${e[1]}*高${e[2]}`;$.innerHTML=l}),$.innerHTML=str});n.get(`${a}/rooms/53`).then(function(t){let e=t.data.facility,o="";e.forEach(function(l){let s=`<li><p><span class="material-symbols-outlined fs-6">
        check
        </span>${l}</p> </li>`;o+=s}),C.innerHTML=o});n.get(`${a}/rooms/53`).then(function(t){let e=t.data.quantity;D.innerHTML=e});n.get(`${a}/rooms/53`).then(function(t){let e=t.data.price;T.innerHTML=`${e}元 / 晚`});
