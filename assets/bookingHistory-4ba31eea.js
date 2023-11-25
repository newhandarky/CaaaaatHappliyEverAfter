import{_ as m,a as y}from"./config-7dd8b0d7.js";import"./navbar-bcede514.js";import"./aside-17f277c2.js";const E=document.querySelectorAll("#bookingHistory");E.forEach(n=>{n.classList.add("onThisPage")});const H=JSON.parse(localStorage.getItem("userTokenAndData")),{accessToken:$,user:_}=H,s=document.getElementById("roomType");s.addEventListener("change",n=>{console.log(s.value),I()});function p(n,t){const h=(a,e)=>`<div class="orderBtns">
<div id="btntype" class="primaryFill-btn-primary">
  <button
    id="cancelBooking_${a}"
    data-bookingsId="${e}"
    class="cancelBookingBtn orderBtn"
  >
    取消訂單
  </button>
</div>
</div>`,b=(a,e)=>`<div class="orderBtns">
<div id="btntype" class="primaryFill-btn-primary02">
  <button
    id="evaluateBooking_${a}"
    data-bookingsId="${e}"
    class="evaluateBookingBtn orderBtn"
    
  >
    評價訂單
  </button>
</div>
</div>`,r=(a,e)=>`<div class="orderBtns">
<div id="btntype" class="primaryDisabled-btn-primary">
  <button
    id="isCancelBooking_${a}"
    data-bookingsId="${e}"
    class="isCancelBookingBtn orderBtn"
  >
    已取消
  </button>
</div>
</div>`,f=(a,e,l,o,i,d,g,u,B,v)=>` 
<br>
<div class="catBarContainer ">
<div class="catEars">
  <div class="catEar">
    <img src="https://raw.githubusercontent.com/newhandarky/CaaaaatHappliyEverAfter/7222ac29b8d1b1ab3264841bac1f6071103016c3/assets/images/catEar02.svg" alt="catEar02" />
  </div>
  <div class="catEar">
    <img src="https://raw.githubusercontent.com/newhandarky/CaaaaatHappliyEverAfter/7222ac29b8d1b1ab3264841bac1f6071103016c3/assets/images/catEar02.svg" alt="catEar02" />
  </div>
</div>
<div class="catBarBorder mx-3">
  <div class="catBarInfo d-flex flex-column ${v}">
    <div class="justify-content-center align-items-center ">
      <div class="d-flex flex-sm-row flex-column mb-5">
        <h3 id="checkIn_${a}" class="d-inline-block ">
          ${e}
        </h3>
        <div class="d-flex justify-content-center mx-3">
          <img
            class="img-fluid d-sm-block d-none"
            src="https://raw.githubusercontent.com/newhandarky/CaaaaatHappliyEverAfter/7222ac29b8d1b1ab3264841bac1f6071103016c3/assets/icons/arrow.svg"
            alt="arrow"
          />
          <img
            class="img-fluid d-sm-none d-block"
            src="https://raw.githubusercontent.com/newhandarky/CaaaaatHappliyEverAfter/7222ac29b8d1b1ab3264841bac1f6071103016c3/assets/icons/arrowDown.svg"
            alt="arrow"
          />
        </div>

        <h3 id="checkOut_${a}" class="d-inline-block">
          ${l}
        </h3>
      </div>
      <div class="d-flex flex-sm-row flex-column">
        <div class="d-flex flex-column">
          <div class="d-flex">
            <h3 id="roomType_${a}" class="roomType">
              ${i}
            </h3>

            <h4
              id="catsQuantity_${a}"
              class="mt-1 catsQuantity"
            >
              ${o}隻貓
            </h4>
          </div>
          <div class="d-flex">
            <h5 class="text-center">訂單編號</h5>
            <h5
              id="bookingId_${a}"
              class="text-center bookingId"
            >
              ${d}
            </h5>
          </div>
          <div class="d-flex">
            <h6 class="orderDate">下單日期</h6>
            <h6
              id="bookingId_${a}"
              class="orderDate bookingId"
            >
              ${g}
            </h6>
          </div>
        </div>
        <div class="d-flex flex-grow-5 ms-sm-5 ms-0">
          <h1 id="price_${a}" class="price">${u}NT</h1>
        </div>
      </div>
    </div>
  </div>
  ${B}
</div>
</div>
<br>
`;y.get(n,{headers:{authorization:`Bearer ${$}`}}).then(a=>{const e=a.data;console.log(a),e.forEach((l,o)=>{const{bookingDate:i,checkIn:d,checkOut:g,quantity:u,state:B,price:v,room:T,id:c}=l,{name:k}=T,w=document.getElementById("bookingInfo");w.innerHTML+=t==="已預定"?f(o,d,g,u,k,c,i,v,h(o,c)):t==="已完成"?f(o,d,g,u,k,c,i,v,b(o,c)):t==="已取消"?f(o,d,g,u,k,c,i,v,r(o,c),"isCancel"):""}),console.log(bookingInfo.innerHTML),bookingInfo.innerHTML===""&&(bookingInfo.innerHTML=`<h1>沒有${s.value}資料</h1>`),x()}).catch(a=>{console.log(a);const e=a.response.data;if(console.log(e),e==="Private resource access: entity must have a reference to the owner id"){const l=document.getElementById("bookingInfo");let o=JSON.stringify(`
    <div id="catContainer_add" class="catContainer">
    <h1 id="catAddTitle" class="catAddTitle">尚未有訂單資料！</h1>        
  </div>
  `),i=JSON.parse(o);l.innerHTML=i}else alert(a),window.location.href="./login.html"})}function I(){const n=_.id,t=document.getElementById("bookingInfo");s.value=="已預定"?(t.innerHTML="",p(`${m}/600/bookings?userId=${n}&state=已預定&_expand=user&_expand=room`,s.value)):s.value=="已完成"?(t.innerHTML="",p(`${m}/600/bookings?userId=${n}&state=已退房&_expand=user&_expand=room`,s.value)):s.value=="已取消"?(t.innerHTML="",p(`${m}/600/bookings?userId=${n}&state=已取消&_expand=user&_expand=room`,s.value)):t.innerHTML=`<div id="catContainer_add" class="catContainer">
    <h1 id="catAddTitle" class="catAddTitle">異常的篩選條件！</h1>        
  </div>`}function x(){document.querySelectorAll(".cancelBookingBtn").forEach(t=>{t.addEventListener("click",h=>{h.preventDefault();let b=t.getAttribute("data-bookingsId");console.log(b),y.patch(`${m}/600/bookings/${b}`,{state:"已取消"},{headers:{authorization:`Bearer ${$}`}}).then(r=>{alert("您已取消訂單 "),console.log(r),window.location.reload()}).catch(r=>{console(r),alert("取消訂單失敗")})})})}I();
