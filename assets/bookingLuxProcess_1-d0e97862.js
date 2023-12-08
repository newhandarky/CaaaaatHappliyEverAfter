import{a as v,_ as s,S as u}from"./sweetalert2.all-203b6da2.js";import{i as k}from"./navbar-96c5072d.js";import{f as g}from"./index-a4e39586.js";import"./aside-9519be0b.js";import"./bookingNavLink-c4975e73.js";let e=document.querySelector("#checkinDate"),a=document.querySelector("#checkoutDate"),x=document.querySelector(".toProcess_2");document.querySelector("#dateForm");let m=new Date,b=m.getFullYear(),f=m.getMonth()+1;f<10&&(f="0"+f);let d=m.getDate();d<10&&(d="0"+d);let h=`${b}-${f}-${d}`;v.get(`${s}/roomStates`).then(function(i){let n=i.data,l=[];n.forEach(function(o){let t={};t.start=o.date,t.title="",o.availableCount.luxury>0?t.title=`剩餘${o.availableCount.luxury}間`:t.title="已無空房",l.push(t)});function r(){var o=document.getElementById("calendar"),t=new FullCalendar.Calendar(o,{initialView:"dayGridMonth",locale:"zh-tw",events:l});t.render()}r()});e.addEventListener("change",function(i){v.get(`${s}/roomStates?date=${e.value}`).then(function(n){if(n.data[0].availableCount.luxury<=0){u.fire({icon:"error",text:`${e.value}已無空房，請重新選擇`,confirmButtonColor:"#fa863e"}),e.value="",a.value="";return}})});a.addEventListener("change",function(i){if(e.value==""){a.value="",u.fire({icon:"error",text:"請先選擇入住日期",confirmButtonColor:"#fa863e"});return}if(e.value>=a.value){a.value="",e.value="",u.fire({icon:"error",text:"退房日期需晚於入住日期",confirmButtonColor:"#fa863e"});return}v.get(`${s}/roomStates?date_gte=${e.value}&date_lte=${a.value}&date_ne=${a.value}`).then(function(n){let l=n.data,r="",o=[];if(l.forEach(function(t){t.availableCount.luxury<=0&&o.push(t.date)}),o.sort(),console.log(o),o.forEach(t=>{r+=` ${t} ,`}),r!==""){u.fire({icon:"error",text:`${r}已無空房，請重新選擇`,confirmButtonColor:"#fa863e"}),a.value="",e.value="";return}})});x.addEventListener("click",function(i){i.preventDefault(),v.get(`${s}/roomStates?date_gte=${e.value}&date_lte=${a.value}&date_ne=${a.value}`).then(function(n){if(a.value==""||e.value==""){u.fire({icon:"error",text:"您尚未選擇入住/退房日期",confirmButtonColor:"#fa863e"}),a.value=="",e.value=="";return}if(e.value>=a.value){a.value=="",e.value=="",u.fire({icon:"error",text:"退房日期需晚於入住日期",confirmButtonColor:"#fa863e"});return}let l=n.data,r="",o=[];if(l.forEach(function(c){c.availableCount.luxury<=0&&o.push(c.date)}),o.sort(),console.log(o),o.forEach(c=>{r+=` ${c} ,`}),r!==""){u.fire({icon:"error",text:`${r}已無空房，請重新選擇`,confirmButtonColor:"#fa863e"}),a.value="",e.value="";return}let t={};t.checkIn=e.value,t.checkOut=a.value,t.bookingDate=h,t.roomType="豪華房";let $=JSON.stringify(t);sessionStorage.setItem("bookingData",$),k("./bookingProcess_2.html")})});g("#checkinDate",{enableTime:!1,dateFormat:"Y-m-d",minDate:h,maxDate:"2024-02-29"});g("#checkoutDate",{enableTime:!1,dateFormat:"Y-m-d",minDate:h,maxDate:"2024-02-29"});let D=JSON.parse(sessionStorage.getItem("indexBooking"));e.value=D[0].checkIn;a.value=D[0].checkOut;e.setAttribute("value",e.value);a.setAttribute("value",e.value);
