import"./bootstrap.min-47e23b13.js";import{i as D}from"./navbar-a947fc30.js";import{a as i,_ as s}from"./config-4096d6dc.js";import{f as m}from"./index-a4e39586.js";import"./sweetalert2.all-9c5228de.js";import"./aside-c7b7c768.js";let t=document.querySelector("#checkinDate"),e=document.querySelector("#checkoutDate"),f=document.querySelector(".toProcess_2");document.querySelector("#dateForm");console.log(f);let c=new Date,h=c.getFullYear();console.log(h);console.log(c.getDate());console.log(c.getMonth()+1);let v=`${h}-${c.getMonth()+1}-${c.getDate()}`;console.log(v);i.get(`${s}/roomStates`).then(function(r){let u=r.data,l=[];u.forEach(function(a){let n={};n.start=a.date,n.title="",a.availableCount.luxury>0?n.title=`剩餘${a.availableCount.luxury}間`:n.title="已無空房",l.push(n)}),console.log(l);function o(){var a=document.getElementById("calendar"),n=new FullCalendar.Calendar(a,{initialView:"dayGridMonth",locale:"zh-tw",events:l});n.render(),console.log("success")}o()});t.addEventListener("change",function(r){i.get(`${s}/roomStates?date=${t.value}`).then(function(u){if(u.data[0].availableCount.luxury<=0){alert(`${t.value}已無空房，請重新選擇`),t.value="",e.value="";return}})});e.addEventListener("change",function(r){if(t.value=="")return e.value="",alert("請先選擇入住日期");if(t.value>=e.value)return console.log(e.value),e.value="",t.value="",alert("退房日期需晚於入住日期");i.get(`${s}/roomStates?date_gte=${t.value}&date_lte=${e.value}&date_ne=${e.value}`).then(function(u){let l=u.data;console.log(l);let o="";if(l.forEach(function(a){a.availableCount.luxury<=0&&(o+=`${a.date} `)}),console.log(o),o!==""){alert(`${o}已無空房，請重新選擇`),e.value="",t.value="";return}})});f.addEventListener("click",function(r){r.preventDefault(),i.get(`${s}/roomStates?date_gte=${t.value}&date_lte=${e.value}&date_ne=${e.value}`).then(function(u){if(e.value==""||t.value==""){alert("您尚未選擇入住或退房時間"),e.value=="",t.value=="";return}if(t.value>=e.value)return console.log(e.value),e.value=="",t.value=="",alert("退房日期需晚於入住日期");let l=u.data;console.log(l);let o="";if(l.forEach(function(g){g.availableCount.luxury<=0&&(o+=`${g.date} `)}),o!==""){alert(`${o}已無空房，請重新選擇`),e.value="",t.value="";return}let a={};a.checkIn=t.value,a.checkOut=e.value,a.bookingDate=v,a.roomType="豪華房",console.log(a);let n=JSON.stringify(a);sessionStorage.setItem("bookingData",n),D("./bookingProcess_2.html")})});m("#checkinDate",{enableTime:!1,dateFormat:"Y-m-d",minDate:v,maxDate:"2024-02-29"});m("#checkoutDate",{enableTime:!1,dateFormat:"Y-m-d",minDate:v,maxDate:"2024-02-29"});console.log(sessionStorage.getItem("indexBooking"));let d=JSON.parse(sessionStorage.getItem("indexBooking"));console.log(d);t.value=d[0].checkIn;e.value=d[0].checkOut;console.log(t.value);console.log(e.value);t.setAttribute("value",t.value);e.setAttribute("value",t.value);
