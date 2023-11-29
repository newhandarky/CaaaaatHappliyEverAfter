import"./bootstrap.min-47e23b13.js";import{i as h}from"./navbar-a947fc30.js";import{a as i,_ as s}from"./config-4096d6dc.js";import{f as g}from"./index-a4e39586.js";import"./sweetalert2.all-9c5228de.js";import"./aside-c7b7c768.js";let e=document.querySelector("#checkinDate"),t=document.querySelector("#checkoutDate"),m=document.querySelector(".toProcess_2");document.querySelector("#dateForm");console.log(m);let c=new Date,f=c.getFullYear();console.log(f);console.log(c.getDate());console.log(c.getMonth()+1);let d=`${f}-${c.getMonth()+1}-${c.getDate()}`;console.log(d);i.get(`${s}/roomStates`).then(function(u){let r=u.data,l=[];r.forEach(function(a){let o={};o.start=a.date,o.title="",a.availableCount.delicate>0?o.title=`剩餘${a.availableCount.delicate}間`:o.title="已無空房",l.push(o)}),console.log(l);function n(){var a=document.getElementById("calendar"),o=new FullCalendar.Calendar(a,{initialView:"dayGridMonth",locale:"zh-tw",events:l});o.render(),console.log("success")}n()});e.addEventListener("change",function(u){i.get(`${s}/roomStates?date=${e.value}`).then(function(r){if(r.data[0].availableCount.delicate<=0)return alert(`${e.value}已無空房，請重新選擇`),e.value=""})});t.addEventListener("change",function(u){if(e.value=="")return t.value="",alert("請先選擇入住日期");if(e.value>=t.value)return t.value="",e.value="",alert("退房日期需晚於入住日期");i.get(`${s}/roomStates?date_gte=${e.value}&date_lte=${t.value}&date_ne=${t.value}`).then(function(r){let l=r.data;console.log(l);let n="";l.forEach(function(a){a.availableCount.delicate<=0&&(n+=`${a.date} `)}),console.log(n),alert(`${n}已無空房，請重新選擇`),t.value="",e.value=""})});m.addEventListener("click",function(u){u.preventDefault(),i.get(`${s}/roomStates?date_gte=${e.value}&date_lte=${t.value}&date_ne=${t.value}`).then(function(r){if(t.value==""||e.value==""){alert("您尚未選擇入住或退房時間"),t.value=="",e.value=="";return}if(e.value>=t.value)return console.log(t.value),t.value=="",e.value=="",alert("退房日期需晚於入住日期");let l=r.data;console.log(l),l.forEach(function(n){if(n.availableCount.delicate<=0){alert(`${n.date}已無空房，請重新選擇`),e.value="",t.value="";return}else{let a={};a.checkIn=e.value,a.checkOut=t.value,a.bookingDate=new Date,a.roomType="精緻房",console.log(a);let o=JSON.stringify(a);sessionStorage.setItem("bookingData",o),h("./bookingProcess_2.html")}})})});g("#checkinDate",{enableTime:!1,dateFormat:"Y-m-d",minDate:d,maxDate:"2024-02-29"});g("#checkoutDate",{enableTime:!1,dateFormat:"Y-m-d",minDate:d,maxDate:"2024-02-29"});console.log(sessionStorage.getItem("indexBooking"));let v=JSON.parse(sessionStorage.getItem("indexBooking"));console.log(v);e.value=v[0].checkIn;t.value=v[0].checkOut;console.log(e.value);console.log(t.value);e.setAttribute("value",e.value);t.setAttribute("value",e.value);
