import"./sweetalert2.all-1988d671.js";import"./navbar-bd5379fb.js";import{a as i,_ as s}from"./config-4096d6dc.js";import"./aside-7286c9e4.js";import"./bookingNavLink-c4975e73.js";const y=document.querySelector(".checkInDate"),I=document.querySelector(".checkOutDate"),g=document.querySelector(".roomType"),f=document.querySelector(".catNum"),T=document.querySelector(".catName"),b=document.querySelector(".price"),$=document.querySelector(".remark"),S=document.querySelector(".toComfirmation");let u=JSON.parse(sessionStorage.getItem("catInfo")),e=JSON.parse(sessionStorage.getItem("bookingData"));y.innerHTML=e.checkIn;I.innerHTML=e.checkOut;g.innerHTML=e.roomType;f.innerHTML=u.catId.length;let D=u.catId,p="";D.forEach(function(n){i.get(`${s}/cats/${n}`).then(function(r){p+=` ${r.data.catName} `,T.textContent=p})});i.get(`${s}/rooms?name=${e.roomType}`).then(function(n){let r=e.checkIn,l=e.checkOut,a=new Date(r),c=(new Date(l).getTime()-a.getTime())/(1e3*3600*24),m=u.catId.length-1,k=n.data[0].price*c+300*m*c;b.innerHTML=`${k}元`,t.price=k,t.quantity=c,o.quantity=c,o.price=k});$.innerHTML=u.remark;let h=JSON.parse(localStorage.getItem("userTokenAndData")),t={};t.userId=h.user.id;t.bookingDate=e.bookingDate;t.checkIn=e.checkIn;t.checkOut=e.checkOut;t.roomType=e.roomType;t.cats=u.catId;t.remark=u.remark;t.state="已預訂";t.history=[];t.admin={};e.roomType==="經典房"&&(t.roomId=51);e.roomType==="精緻房"&&(t.roomId=52);e.roomType==="豪華房"&&(t.roomId=53);t.feedback="";let o={};o.updateTime=e.bookingDate;o.state="已預訂";o.catNum=u.catId.length;o.remark=u.remark;o.checkIn=e.checkIn;o.checkOut=e.checkOut;o.userId=h.user.id;o.roomType=e.roomType;o.roomId=[];o.admin={};e.roomType==="經典房"&&(o.roomId=51);e.roomType==="精緻房"&&(o.roomId=52);e.roomType==="豪華房"&&(o.roomId=53);S.addEventListener("click",function(n){n.preventDefault(),O()});function O(){q(),H()}function q(){i.post(`${s}/bookings`,t).then(n=>{let r=n.data.id;o.bookingId=r,i.post(`${s}/bookingHistorys?bookingsId=${r}`,o).then(l=>{i.get(`${s}/bookingHistorys?userId=${h.user.id}&bookingId=${r}`).then(a=>{let d=a.data,c=[];d.forEach(function(m){c.push(m.id)}),t.history=c,i.patch(`${s}/bookings/${r}`,t).then(m=>{})})})}).catch(n=>{console.error(n)})}function H(){let n=[];i.get(`${s}/roomStates?date_gte=${e.checkIn}&date_lte=${e.checkOut}&date_ne=${e.checkOut}`).then(function(r){r.data.forEach(function(a){e.roomType==="經典房"&&(a.availableCount.classic-=1,n.push(a)),e.roomType==="精緻房"&&(a.availableCount.delicate-=1,n.push(a)),e.roomType==="豪華房"&&(a.availableCount.luxury-=1,n.push(a))}),n.forEach(function(a){let d=a.id;i.patch(`${s}/roomStates/${d}`,a).then(function(c){})})})}
