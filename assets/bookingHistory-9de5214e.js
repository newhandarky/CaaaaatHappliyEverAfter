import{_ as $,a as T}from"./config-d9eb516d.js";import{i as H}from"./navbar-ecc42be7.js";import"./aside-21df629b.js";import"./transform-4d2927c0.js";const L=document.querySelectorAll("#bookingHistory");L.forEach(k=>{k.classList.add("onThisPage")});const O=JSON.parse(localStorage.getItem("userTokenAndData")),{accessToken:C,user:M}=O,v=document.getElementById("roomType");v.addEventListener("change",k=>{console.log(v.value),w()});function _(k,o){const I=(e,i,r,a,n,c,t,g,d,u,l)=>`<div class="orderBtns">
<div id="btntype" class="primaryFill-btn-primary">
  <button
    id="cancelBooking_${e}"
    data-bookingsId="${i}"
    data-checkInDate="${r}"
    data-checkOutDate="${a}"
    data-roomType="${n}"
    data-remark="${c}"
    data-catQuantity="${t}"
    data-price="${g}"
    data-history="${d}"
    data-bookingDate="${u}"
    data-feedback="${l}"
    class="cancelBookingBtn orderBtn"
  >
    取消訂單
  </button>
</div>
</div>`,m=(e,i,r,a,n,c,t,g,d,u,l)=>`<div class="orderBtns">
<div id="btntype" class="primaryFill-btn-primary02">
  <button
    id="evaluateBooking_${e}"
    data-bookingsId="${i}"
    data-checkInDate="${r}"
    data-checkOutDate="${a}"
    data-roomType="${n}"
    data-remark="${c}"
    data-catQuantity="${t}"
    data-price="${g}"
    data-history="${d}"
    data-bookingDate="${u}"
    data-feedback="${l}"
    class="evaluateBookingBtn orderBtn"
    
  >
    評價訂單
  </button>
</div>
</div>`,E=(e,i,r,a,n,c,t,g,d,u,l)=>`<div class="orderBtns">
<div id="btntype" class="primaryDisabled-btn-primary">
  <button
    id="isCancelBooking_${e}"
    data-bookingsId="${i}"
    data-checkInDate="${r}"
    data-checkOutDate="${a}"
    data-roomType="${n}"
    data-remark="${c}"
    data-catQuantity="${t}"
    data-price="${g}"
    data-history="${d}"
    data-bookingDate="${u}"
    data-feedback="${l}"
    class="isCancelBookingBtn orderBtn"
  >
    已取消
  </button>
</div>
</div>`,f=(e,i,r,a,n,c,t,g,d,u)=>` 
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
  <div class="catBarInfo d-flex flex-column ${u}">
    <div class="justify-content-center align-items-center ">
      <div class="d-flex flex-sm-row flex-column mb-5">
        <h3 id="checkIn_${e}" class="d-inline-block ">
          ${i}
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

        <h3 id="checkOut_${e}" class="d-inline-block">
          ${r}
        </h3>
      </div>
      <div class="d-flex flex-sm-row flex-column">
        <div class="d-flex flex-column">
          <div class="d-flex">
            <h3 id="roomType_${e}" class="roomType">
              ${n}
            </h3>

            <h4
              id="catsQuantity_${e}"
              class="mt-1 catsQuantity"
            >
              ${a}隻貓
            </h4>
          </div>
          <div class="d-flex">
            <h5 class="text-center">訂單編號</h5>
            <h5
              id="bookingId_${e}"
              class="text-center bookingId"
            >
              ${c}
            </h5>
          </div>
          <div class="d-flex">
            <h6 class="orderDate">下單日期</h6>
            <h6
              id="bookingId_${e}"
              class="orderDate bookingId"
            >
              ${t}
            </h6>
          </div>
        </div>
        <div class="d-flex flex-grow-5 ms-sm-5 ms-0">
          <h1 id="price_${e}" class="price">${g}NT</h1>
        </div>
      </div>
    </div>
  </div>
  ${d}
</div>
</div>
<br>
`;T.get(k,{headers:{authorization:`Bearer ${C}`}}).then(e=>{const i=e.data;console.log(e),i.forEach((r,a)=>{const{bookingDate:n,checkIn:c,checkOut:t,quantity:g,cats:d,state:u,price:l,remark:p,room:s,history:b,feedback:h,id:y}=r,{name:B}=s,D=d.length,x=document.getElementById("bookingInfo");let A="";o==="已預訂"?A=f(a,c,t,D,B,y,n,l,I(a,y,c,t,B,p,D,l,JSON.stringify(b),n,h)):o==="已完成"?A=f(a,c,t,D,B,y,n,l,m(a,y,c,t,B,p,D,l,JSON.stringify(b),n,h)):o==="已取消"&&(A=f(a,c,t,D,B,y,n,l,E(a,y,c,t,B,p,D,l,JSON.stringify(b),n,h),"isCancel")),x.innerHTML+=A}),o==="已完成"&&document.querySelectorAll(".evaluateBookingBtn").forEach(a=>{const n=a.getAttribute("data-feedback");console.log(n),n!==""&&(a.textContent="已評價",a.parentElement.className="primaryDisabled-btn-primary",console.log(a.textContent),console.log(a.parentElement.className))}),bookingInfo.innerHTML===""&&(bookingInfo.innerHTML=`<h1>沒有${v.value}資料</h1>`),N(),q()}).catch(e=>{console.log(e);const i=e.response.data;if(console.log(i),i==="Private resource access: entity must have a reference to the owner id"){const r=document.getElementById("bookingInfo");let a=JSON.stringify(`
    <div id="catContainer_add" class="catContainer">
    <h1 id="catAddTitle" class="catAddTitle">尚未有訂單資料！</h1>        
  </div>
  `),n=JSON.parse(a);r.innerHTML=n}else alert(e),window.location.href="./login.html"})}function w(){const k=M.id,o=document.getElementById("bookingInfo");v.value=="已預訂"?(o.innerHTML="",_(`${$}/600/bookings?userId=${k}&state=已預訂&_expand=user&_expand=room&_sort=bookingDate&_order=desc`,v.value)):v.value=="已完成"?(o.innerHTML="",_(`${$}/600/bookings?userId=${k}&state=已退房&_expand=user&_expand=room&_sort=bookingDate&_order=desc`,v.value)):v.value=="已取消"?(o.innerHTML="",_(`${$}/600/bookings?userId=${k}&state=已取消&_expand=user&_expand=room&_sort=bookingDate&_order=desc`,v.value)):o.innerHTML=`<div id="catContainer_add" class="catContainer">
    <h1 id="catAddTitle" class="catAddTitle">異常的篩選條件！</h1>        
  </div>`}function N(){document.querySelectorAll(".cancelBookingBtn").forEach(o=>{o.addEventListener("click",I=>{I.preventDefault(),H();let m=o.getAttribute("data-bookingsId");console.log(m);function E(){let t=new Date,g=t.getFullYear(),d=("0"+(t.getMonth()+1)).slice(-2),u=("0"+t.getDate()).slice(-2),l=("0"+(t.getHours()%12||12)).slice(-2),p=("0"+t.getMinutes()).slice(-2),s=("0"+t.getSeconds()).slice(-2),b=t.getHours()>=12?"pm":"am";return`${g}-${d}-${u} ${l}:${p}:${s} ${b}`}console.log("當前時間: "+E());let f=o.getAttribute("data-checkInDate"),e=o.getAttribute("data-checkOutDate"),i=o.getAttribute("data-roomType"),r=o.getAttribute("data-remark"),a=o.getAttribute("data-quantity"),n=o.getAttribute("data-price"),c=JSON.parse(o.getAttribute("data-history"));console.log(f,e,i,r,a,n,c),T.post(`${$}/bookingHistorys`,{updateTime:E(),state:"已取消",quantity:a,roomType:i,price:n,admin:"user",remark:r,catNum:a,checkIn:f,checkOut:e,bookingsId:m}).then(t=>(console.log(t),console.log("新增歷史紀錄成功"),t.data.id)).then(t=>{console.log(t),c.push(t);let g=c;console.log(g),T.patch(`${$}/600/bookings/${m}`,{state:"已取消",history:g},{headers:{authorization:`Bearer ${C}`}}).then(d=>{console.log("您已取消該筆訂單"),console.log(d),T.get(`${$}/roomStates?date_gte=${f}&date_lte=${e}`).then(u=>{const l=u.data;console.log("初始房況"),console.log(l);const p=l.map(s=>{let b=0,h;return i==="經典房"?(b=s.availableCount.classic+1,h={...s,availableCount:{...s.availableCount,classic:b}}):i==="精緻房"?(b=s.availableCount.delicate+1,h={...s,availableCount:{...s.availableCount,delicate:b}}):i==="豪華房"&&(b=s.availableCount.luxury+1,h={...s,availableCount:{...s.availableCount,luxury:b}}),T.patch(`${$}/roomStates/${s.id}`,h)});Promise.all(p).then(s=>{console.log("成功修改房況"),console.log(s),window.location.reload()}).catch(s=>{console.error("Error modifying room states:",s)})}).catch(u=>{console.log(u),console.log("修改房況錯誤")})}).catch(d=>{console(d),console.log("取消訂單失敗")})}).catch(t=>{console.log(t),console.log("新增歷史紀錄失敗")})})})}function q(){document.querySelectorAll(".evaluateBookingBtn").forEach(o=>{o.addEventListener("click",I=>{I.preventDefault();const m=o.getAttribute("data-bookingsid");localStorage.setItem("evaluateBooking_Id",JSON.stringify(m)),window.location.href="./evaluateBooking.html"})})}w();
