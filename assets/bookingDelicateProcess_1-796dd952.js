import{a as d,_ as g}from"./config-b31ac0c6.js";import{i as D}from"./navbar-da03776d.js";import{f as h}from"./index-a4e39586.js";import{S as s}from"./sweetalert2.all-b0ac47b5.js";import"./aside-2c6a0e4f.js";let a=document.querySelector("#checkinDate"),o=document.querySelector("#checkoutDate"),u=document.querySelector(".toProcess_2"),f=document.querySelector("#dateForm");console.log(u);let i=new Date,k=i.getFullYear();console.log(k);console.log(i.getDate());console.log(i.getMonth()+1);let m=`${k}-${i.getMonth()+1}-${i.getDate()}`;console.log(m);d.get(`${g}/roomStates`).then(function(r){let e=r.data,t=[];e.forEach(function(c){let l={};l.start=c.date,l.title="",c.availableCount.delicate>0?l.title=`剩餘${c.availableCount.delicate}間`:l.title="已無空房",t.push(l)}),console.log(t);function n(){var c=document.getElementById("calendar"),l=new FullCalendar.Calendar(c,{initialView:"dayGridMonth",locale:"zh-tw",events:t});l.render(),console.log("success")}n()});a.addEventListener("change",function(r){d.get(`${g}/roomStates?date=${a.value}`).then(function(e){let t=e.data;if(console.log(t[0].availableCount.delicate),t[0].availableCount.delicate==0)return console.log(t[0].availableCount.delicate),s.fire(`${a.value}已無空房，請重新選擇`),f.reset()})});o.addEventListener("change",function(r){if(a.value>=o.value)return o.value="",s.fire("退房日期需晚於入住日期");d.get(`${g}/roomStates?date_gte=${a.value}&date_lte=${o.value}&date_ne=${o.value}`).then(function(e){let t=e.data;console.log(t),t.forEach(function(n){if(n.availableCount.delicate==0)return s.fire(`${n.date}已無空房，請重新選擇`),f.reset()})})});u.addEventListener("click",function(r){if(r.preventDefault(),o.value==""||a.value=="")return s.fire("您尚未選擇入住或退房時間"),f.reset();{let e={};e.checkIn=a.value,e.checkOut=o.value,e.bookingDate=new Date,e.roomType="精緻房",console.log(e);let t=JSON.stringify(e);sessionStorage.setItem("bookingData",t);const n=u.getAttribute("href");D(n),window.location.href="./bookingProcess_2.html"}});h("#checkinDate",{enableTime:!1,dateFormat:"Y-m-d",minDate:m,maxDate:"2024-02-29"});h("#checkoutDate",{enableTime:!1,dateFormat:"Y-m-d",minDate:m,maxDate:"2024-02-29"});console.log(sessionStorage.getItem("indexBooking"));let v=JSON.parse(sessionStorage.getItem("indexBooking"));console.log(v);a.value=v[0].checkIn;o.value=v[0].checkOut;console.log(a.value);console.log(o.value);a.setAttribute("value",a.value);o.setAttribute("value",a.value);