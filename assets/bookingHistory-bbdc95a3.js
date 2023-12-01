import{S as w}from"./sweetalert2.all-1988d671.js";import{i as M}from"./navbar-bd5379fb.js";import"./aside-7286c9e4.js";import{a as C,_ as v}from"./config-4096d6dc.js";const F=document.querySelectorAll("#bookingHistory");F.forEach(d=>{d.classList.add("onThisPage")});const N=document.querySelector("#navAside");N.classList.remove("d-none");const W=JSON.parse(localStorage.getItem("userTokenAndData")),{accessToken:S,user:J}=W;let p=roomType.getAttribute("data-value");const Q=document.querySelector("body"),P=document.querySelector("#catRoomInput_bookingHistoryFilter"),E=document.querySelector("#selectType");Q.addEventListener("click",d=>{d.stopPropagation(),E.classList.remove("show")});P.addEventListener("click",d=>{d.stopPropagation(),E.classList.toggle("show")});const R=document.querySelectorAll(".optionType");R.forEach(d=>{d.addEventListener("click",o=>{const y=o.target.value;roomType.innerHTML=`<p>${y}</p>`,roomType.setAttribute("data-value",y),p=y,console.log(roomType),document.querySelector("#loading").classList.toggle("d-none"),document.querySelector("#bookingHistoryFilter").classList.add("d-none"),document.querySelector("#title").classList.add("d-none"),console.log(p),q()})});function A(d,o){const y=(a,r,k,b,u,i,t,n,l,c,e)=>`<div class="orderBtns">
<div id="btntype" class="primaryFill-btn-primary">
  <button
    id="cancelBooking_${a}"
    data-bookingsId="${r}"
    data-checkInDate="${k}"
    data-checkOutDate="${b}"
    data-roomType="${u}"
    data-remark="${i}"
    data-catQuantity="${t}"
    data-price="${n}"
    data-history="${l}"
    data-bookingDate="${c}"
    data-feedback="${e}"
    class="cancelBookingBtn orderBtn"
  >
    取消訂單
  </button>
</div>
</div>`,I=(a,r,k,b,u,i,t,n,l,c,e)=>`<div class="orderBtns">
<div id="btntype" class="primaryFill-btn-primary02">
  <button
    id="evaluateBooking_${a}"
    data-bookingsId="${r}"
    data-checkInDate="${k}"
    data-checkOutDate="${b}"
    data-roomType="${u}"
    data-remark="${i}"
    data-catQuantity="${t}"
    data-price="${n}"
    data-history="${l}"
    data-bookingDate="${c}"
    data-feedback="${e}"
    class="evaluateBookingBtn orderBtn"
    
  >
    評價訂單
  </button>
</div>
</div>`,L=(a,r,k,b,u,i,t,n,l,c,e)=>`<div class="orderBtns">
<div id="btntype" class="primaryDisabled-btn-primary">
  <button
    id="isCancelBooking_${a}"
    data-bookingsId="${r}"
    data-checkInDate="${k}"
    data-checkOutDate="${b}"
    data-roomType="${u}"
    data-remark="${i}"
    data-catQuantity="${t}"
    data-price="${n}"
    data-history="${l}"
    data-bookingDate="${c}"
    data-feedback="${e}"
    class="isCancelBookingBtn orderBtn"
  >
    已取消
  </button>
</div>
</div>`,_=(a,r,k,b,u,i,t,n,l,c)=>` 
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
  <div class="catBarInfo d-flex flex-column ${c}">
    <div class="justify-content-center align-items-center ">
      <div class="d-flex flex-sm-row flex-column mb-5">
        <h3 id="checkIn_${a}" class="d-inline-block ">
          ${r}
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
          ${k}
        </h3>
      </div>
      <div class="d-flex flex-sm-row flex-column">
        <div class="d-flex flex-column">
          <div class="d-flex">
            <h3 id="roomType_${a}" class="roomType">
              ${u}
            </h3>

            <h4
              id="catsQuantity_${a}"
              class="mt-1 catsQuantity"
            >
              ${b}隻貓
            </h4>
          </div>
          <div class="d-flex">
            <h5 class="text-center">訂單編號</h5>
            <h5
              id="bookingId_${a}"
              class="text-center bookingId"
            >
              ${i}
            </h5>
          </div>
          <div class="d-flex">
            <h6 class="orderDate">下單日期</h6>
            <h6
              id="bookingId_${a}"
              class="orderDate bookingId"
            >
              ${t}
            </h6>
          </div>
        </div>
        <div class="d-flex flex-grow-5 ms-sm-5 ms-0">
          <h1 id="price_${a}" class="price">${n}NT</h1>
        </div>
      </div>
    </div>
  </div>
  ${l}
</div>
</div>
<br>
`;C.get(d,{headers:{authorization:`Bearer ${S}`}}).then(a=>{const r=a.data;console.log(a),r.forEach((i,t)=>{const{bookingDate:n,checkIn:l,checkOut:c,quantity:e,cats:B,state:$,price:f,remark:h,room:x,history:s,feedback:g,id:m}=i,{name:D}=x,T=B.length,O=document.getElementById("bookingInfo");let H="";o==="已預訂"?H=_(t,l,c,T,D,m,n,f,y(t,m,l,c,D,h,T,f,JSON.stringify(s),n,g)):o==="已完成"?H=_(t,l,c,T,D,m,n,f,I(t,m,l,c,D,h,T,f,JSON.stringify(s),n,g)):o==="已取消"&&(H=_(t,l,c,T,D,m,n,f,L(t,m,l,c,D,h,T,f,JSON.stringify(s),n,g),"isCancel")),O.innerHTML+=H}),o==="已完成"&&document.querySelectorAll(".evaluateBookingBtn").forEach(t=>{const n=t.getAttribute("data-feedback");console.log(n),n!==""&&(t.textContent="已評價",t.parentElement.className="primaryDisabled-btn-primary",console.log(t.textContent),console.log(t.parentElement.className))}),bookingInfo.innerHTML===""&&(bookingInfo.innerHTML=`<h1>沒有${p}資料</h1>`),j(),z(),document.querySelector("#loading").classList.toggle("d-none"),document.querySelector("#bookingHistoryFilter").classList.remove("d-none"),document.querySelector("#title").classList.remove("d-none")}).catch(a=>{console.log(a);const r=a.response.data;if(console.log(r),r==="Private resource access: entity must have a reference to the owner id"){const u=document.getElementById("bookingInfo");let i=JSON.stringify(`
    <div id="catContainer_add" class="catContainer p-5">
    <h2 id="catAddTitle" class="catAddTitle text-center" >尚未有訂單資料！</h2>
    <h6 >點擊 線上訂房 即可開始預訂房間囉！</h6>        
  </div>
  `),t=JSON.parse(i);u.innerHTML=t}else alert(a),window.location.href="./login.html";document.querySelector("#loading").classList.toggle("d-none"),document.querySelector("#bookingHistoryFilter").classList.toggle("d-none")})}function q(){const d=J.id,o=document.getElementById("bookingInfo");p=="已預訂"?(o.innerHTML="",A(`${v}/600/bookings?userId=${d}&state=已預訂&_expand=user&_expand=room&_sort=bookingDate&_order=desc`,p)):p=="已完成"?(o.innerHTML="",A(`${v}/600/bookings?userId=${d}&state=已退房&_expand=user&_expand=room&_sort=bookingDate&_order=desc`,p)):p=="已取消"?(o.innerHTML="",A(`${v}/600/bookings?userId=${d}&state=已取消&_expand=user&_expand=room&_sort=bookingDate&_order=desc`,p)):o.innerHTML=`<div id="catContainer_add" class="catContainer">
    <h1 id="catAddTitle" class="catAddTitle">異常的篩選條件！</h1>        
  </div>`}function j(){document.querySelectorAll(".cancelBookingBtn").forEach(o=>{o.addEventListener("click",y=>{y.preventDefault(),M(),w.mixin({customClass:{confirmButton:"btn btn-custom-confirm",cancelButton:"btn btn-custom-cancel"},buttonsStyling:!1}).fire({title:"確定要刪除訂單嗎?",text:"刪除後將無法還原此訂單紀錄",icon:"warning",showCancelButton:!0,confirmButtonText:"是的 我要刪除!",cancelButtonText:"不 取消刪除!",reverseButtons:!0}).then(L=>{if(L.isConfirmed){let k=function(){let e=new Date,B=e.getFullYear(),$=("0"+(e.getMonth()+1)).slice(-2),f=("0"+e.getDate()).slice(-2),h=("0"+(e.getHours()%12||12)).slice(-2),x=("0"+e.getMinutes()).slice(-2),s=("0"+e.getSeconds()).slice(-2),g=e.getHours()>=12?"pm":"am";return`${B}-${$}-${f} ${h}:${x}:${s} ${g}`};document.querySelector("#bookingInfo").classList.add("d-none"),document.querySelector("#loading").classList.toggle("d-none");let r=o.getAttribute("data-bookingsId");console.log(r),console.log("當前時間: "+k());let b=o.getAttribute("data-checkInDate"),u=o.getAttribute("data-checkOutDate"),i=o.getAttribute("data-roomType"),t=o.getAttribute("data-remark"),n=o.getAttribute("data-quantity"),l=o.getAttribute("data-price"),c=JSON.parse(o.getAttribute("data-history"));console.log(b,u,i,t,n,l,c),C.post(`${v}/bookingHistorys`,{updateTime:k(),state:"已取消",quantity:n,roomType:i,price:l,admin:"user",remark:t,catNum:n,checkIn:b,checkOut:u,bookingsId:r}).then(e=>(console.log(e),console.log("新增歷史紀錄成功"),e.data.id)).then(e=>{console.log(e),c.push(e);let B=c;console.log(B),C.patch(`${v}/600/bookings/${r}`,{state:"已取消",history:B},{headers:{authorization:`Bearer ${S}`}}).then($=>{console.log("您已取消該筆訂單"),console.log($),C.get(`${v}/roomStates?date_gte=${b}&date_lte=${u}`).then(f=>{const h=f.data;console.log("初始房況"),console.log(h);const x=h.map(s=>{let g=0,m;return i==="經典房"?(g=s.availableCount.classic+1,m={...s,availableCount:{...s.availableCount,classic:g}}):i==="精緻房"?(g=s.availableCount.delicate+1,m={...s,availableCount:{...s.availableCount,delicate:g}}):i==="豪華房"&&(g=s.availableCount.luxury+1,m={...s,availableCount:{...s.availableCount,luxury:g}}),C.patch(`${v}/roomStates/${s.id}`,m)});Promise.all(x).then(s=>{console.log("成功修改房況"),console.log(s),w.mixin({customClass:{confirmButton:"btn btn-custom-confirm",cancelButton:"btn btn-custom-cancel"},buttonsStyling:!1}).fire({title:"訂單已刪除",icon:"success",confirmButtonText:"確定"}).then(m=>{m.isConfirmed&&window.location.reload()})}).catch(s=>{console.error("Error modifying room states:",s),w.mixin({customClass:{confirmButton:"btn btn-custom-confirm",cancelButton:"btn btn-custom-cancel"},buttonsStyling:!1}).fire({icon:"error",title:"訂單刪除失敗",confirmButtonText:"確定"})})}).catch(f=>{console.log(f),console.log("修改房況錯誤"),w.mixin({customClass:{confirmButton:"btn btn-custom-confirm",cancelButton:"btn btn-custom-cancel"},buttonsStyling:!1}).fire({icon:"error",title:"訂單刪除失敗",confirmButtonText:"確定"})})}).catch($=>{console($),console.log("取消訂單失敗"),w.mixin({customClass:{confirmButton:"btn btn-custom-confirm",cancelButton:"btn btn-custom-cancel"},buttonsStyling:!1}).fire({icon:"error",title:"訂單刪除失敗",confirmButtonText:"確定"})})}).catch(e=>{console.log(e),console.log("新增歷史紀錄失敗"),w.mixin({customClass:{confirmButton:"btn btn-custom-confirm",cancelButton:"btn btn-custom-cancel"},buttonsStyling:!1}).fire({icon:"error",title:"訂單刪除失敗",confirmButtonText:"確定"})})}})})})}function z(){document.querySelectorAll(".evaluateBookingBtn").forEach(o=>{o.addEventListener("click",y=>{y.preventDefault();const I=o.getAttribute("data-bookingsid");localStorage.setItem("evaluateBooking_Id",JSON.stringify(I)),window.location.href="./evaluateBooking.html"})})}q();
