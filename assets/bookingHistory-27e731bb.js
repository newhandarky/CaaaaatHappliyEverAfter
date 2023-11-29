import{_ as p,a as T}from"./config-3a988531.js";import{i as H}from"./navbar-64ba0015.js";import"./aside-136a93d9.js";import"./transform-4d2927c0.js";const O=document.querySelectorAll("#bookingHistory");O.forEach(b=>{b.classList.add("onThisPage")});const M=document.querySelector("#navAside");M.classList.remove("d-none");const q=JSON.parse(localStorage.getItem("userTokenAndData")),{accessToken:w,user:S}=q,h=document.getElementById("roomType");h.addEventListener("change",b=>{document.querySelector("#loading").classList.toggle("d-none"),console.log(h.value),L()});function C(b,o){const I=(e,c,g,l,a,n,t,s,d,r,u)=>`<div class="orderBtns">
<div id="btntype" class="primaryFill-btn-primary">
  <button
    id="cancelBooking_${e}"
    data-bookingsId="${c}"
    data-checkInDate="${g}"
    data-checkOutDate="${l}"
    data-roomType="${a}"
    data-remark="${n}"
    data-catQuantity="${t}"
    data-price="${s}"
    data-history="${d}"
    data-bookingDate="${r}"
    data-feedback="${u}"
    class="cancelBookingBtn orderBtn"
  >
    取消訂單
  </button>
</div>
</div>`,f=(e,c,g,l,a,n,t,s,d,r,u)=>`<div class="orderBtns">
<div id="btntype" class="primaryFill-btn-primary02">
  <button
    id="evaluateBooking_${e}"
    data-bookingsId="${c}"
    data-checkInDate="${g}"
    data-checkOutDate="${l}"
    data-roomType="${a}"
    data-remark="${n}"
    data-catQuantity="${t}"
    data-price="${s}"
    data-history="${d}"
    data-bookingDate="${r}"
    data-feedback="${u}"
    class="evaluateBookingBtn orderBtn"
    
  >
    評價訂單
  </button>
</div>
</div>`,A=(e,c,g,l,a,n,t,s,d,r,u)=>`<div class="orderBtns">
<div id="btntype" class="primaryDisabled-btn-primary">
  <button
    id="isCancelBooking_${e}"
    data-bookingsId="${c}"
    data-checkInDate="${g}"
    data-checkOutDate="${l}"
    data-roomType="${a}"
    data-remark="${n}"
    data-catQuantity="${t}"
    data-price="${s}"
    data-history="${d}"
    data-bookingDate="${r}"
    data-feedback="${u}"
    class="isCancelBookingBtn orderBtn"
  >
    已取消
  </button>
</div>
</div>`,y=(e,c,g,l,a,n,t,s,d,r)=>` 
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
  <div class="catBarInfo d-flex flex-column ${r}">
    <div class="justify-content-center align-items-center ">
      <div class="d-flex flex-sm-row flex-column mb-5">
        <h3 id="checkIn_${e}" class="d-inline-block ">
          ${c}
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
          ${g}
        </h3>
      </div>
      <div class="d-flex flex-sm-row flex-column">
        <div class="d-flex flex-column">
          <div class="d-flex">
            <h3 id="roomType_${e}" class="roomType">
              ${a}
            </h3>

            <h4
              id="catsQuantity_${e}"
              class="mt-1 catsQuantity"
            >
              ${l}隻貓
            </h4>
          </div>
          <div class="d-flex">
            <h5 class="text-center">訂單編號</h5>
            <h5
              id="bookingId_${e}"
              class="text-center bookingId"
            >
              ${n}
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
          <h1 id="price_${e}" class="price">${s}NT</h1>
        </div>
      </div>
    </div>
  </div>
  ${d}
</div>
</div>
<br>
`;T.get(b,{headers:{authorization:`Bearer ${w}`}}).then(e=>{const c=e.data;console.log(e),c.forEach((l,a)=>{const{bookingDate:n,checkIn:t,checkOut:s,quantity:d,cats:r,state:u,price:k,remark:i,room:m,history:v,feedback:_,id:$}=l,{name:B}=m,D=r.length,x=document.getElementById("bookingInfo");let E="";o==="已預訂"?E=y(a,t,s,D,B,$,n,k,I(a,$,t,s,B,i,D,k,JSON.stringify(v),n,_)):o==="已完成"?E=y(a,t,s,D,B,$,n,k,f(a,$,t,s,B,i,D,k,JSON.stringify(v),n,_)):o==="已取消"&&(E=y(a,t,s,D,B,$,n,k,A(a,$,t,s,B,i,D,k,JSON.stringify(v),n,_),"isCancel")),x.innerHTML+=E}),o==="已完成"&&document.querySelectorAll(".evaluateBookingBtn").forEach(a=>{const n=a.getAttribute("data-feedback");console.log(n),n!==""&&(a.textContent="已評價",a.parentElement.className="primaryDisabled-btn-primary",console.log(a.textContent),console.log(a.parentElement.className))}),bookingInfo.innerHTML===""&&(bookingInfo.innerHTML=`<h1>沒有${h.value}資料</h1>`),N(),J(),document.querySelector("#loading").classList.toggle("d-none")}).catch(e=>{console.log(e);const c=e.response.data;if(console.log(c),c==="Private resource access: entity must have a reference to the owner id"){const l=document.getElementById("bookingInfo");let a=JSON.stringify(`
    <div id="catContainer_add" class="catContainer">
    <h1 id="catAddTitle" class="catAddTitle">尚未有訂單資料！</h1>        
  </div>
  `),n=JSON.parse(a);l.innerHTML=n}else alert(e),window.location.href="./login.html";document.querySelector("#loading").classList.toggle("d-none")})}function L(){const b=S.id,o=document.getElementById("bookingInfo");h.value=="已預訂"?(o.innerHTML="",C(`${p}/600/bookings?userId=${b}&state=已預訂&_expand=user&_expand=room&_sort=bookingDate&_order=desc`,h.value)):h.value=="已完成"?(o.innerHTML="",C(`${p}/600/bookings?userId=${b}&state=已退房&_expand=user&_expand=room&_sort=bookingDate&_order=desc`,h.value)):h.value=="已取消"?(o.innerHTML="",C(`${p}/600/bookings?userId=${b}&state=已取消&_expand=user&_expand=room&_sort=bookingDate&_order=desc`,h.value)):o.innerHTML=`<div id="catContainer_add" class="catContainer">
    <h1 id="catAddTitle" class="catAddTitle">異常的篩選條件！</h1>        
  </div>`}function N(){document.querySelectorAll(".cancelBookingBtn").forEach(o=>{o.addEventListener("click",I=>{I.preventDefault(),H();let f=o.getAttribute("data-bookingsId");console.log(f);function A(){let t=new Date,s=t.getFullYear(),d=("0"+(t.getMonth()+1)).slice(-2),r=("0"+t.getDate()).slice(-2),u=("0"+(t.getHours()%12||12)).slice(-2),k=("0"+t.getMinutes()).slice(-2),i=("0"+t.getSeconds()).slice(-2),m=t.getHours()>=12?"pm":"am";return`${s}-${d}-${r} ${u}:${k}:${i} ${m}`}console.log("當前時間: "+A());let y=o.getAttribute("data-checkInDate"),e=o.getAttribute("data-checkOutDate"),c=o.getAttribute("data-roomType"),g=o.getAttribute("data-remark"),l=o.getAttribute("data-quantity"),a=o.getAttribute("data-price"),n=JSON.parse(o.getAttribute("data-history"));console.log(y,e,c,g,l,a,n),T.post(`${p}/bookingHistorys`,{updateTime:A(),state:"已取消",quantity:l,roomType:c,price:a,admin:"user",remark:g,catNum:l,checkIn:y,checkOut:e,bookingsId:f}).then(t=>(console.log(t),console.log("新增歷史紀錄成功"),t.data.id)).then(t=>{console.log(t),n.push(t);let s=n;console.log(s),T.patch(`${p}/600/bookings/${f}`,{state:"已取消",history:s},{headers:{authorization:`Bearer ${w}`}}).then(d=>{console.log("您已取消該筆訂單"),console.log(d),T.get(`${p}/roomStates?date_gte=${y}&date_lte=${e}`).then(r=>{const u=r.data;console.log("初始房況"),console.log(u);const k=u.map(i=>{let m=0,v;return c==="經典房"?(m=i.availableCount.classic+1,v={...i,availableCount:{...i.availableCount,classic:m}}):c==="精緻房"?(m=i.availableCount.delicate+1,v={...i,availableCount:{...i.availableCount,delicate:m}}):c==="豪華房"&&(m=i.availableCount.luxury+1,v={...i,availableCount:{...i.availableCount,luxury:m}}),T.patch(`${p}/roomStates/${i.id}`,v)});Promise.all(k).then(i=>{console.log("成功修改房況"),console.log(i),window.location.reload()}).catch(i=>{console.error("Error modifying room states:",i)})}).catch(r=>{console.log(r),console.log("修改房況錯誤")})}).catch(d=>{console(d),console.log("取消訂單失敗")})}).catch(t=>{console.log(t),console.log("新增歷史紀錄失敗")})})})}function J(){document.querySelectorAll(".evaluateBookingBtn").forEach(o=>{o.addEventListener("click",I=>{I.preventDefault();const f=o.getAttribute("data-bookingsid");localStorage.setItem("evaluateBooking_Id",JSON.stringify(f)),window.location.href="./evaluateBooking.html"})})}L();
