import"./bootstrap.min-5750ef26.js";import{i as H}from"./navbar-a947fc30.js";import"./aside-c7b7c768.js";import{_ as $,a as I}from"./config-4096d6dc.js";import{S as D}from"./sweetalert2.all-9b43cc60.js";const O=document.querySelectorAll("#bookingHistory");O.forEach(h=>{h.classList.add("onThisPage")});const q=document.querySelector("#navAside");q.classList.remove("d-none");const M=JSON.parse(localStorage.getItem("userTokenAndData")),{accessToken:_,user:N}=M,v=document.getElementById("roomType");v.addEventListener("change",h=>{document.querySelector("#loading").classList.toggle("d-none"),console.log(v.value),L()});function E(h,a){const T=(s,r,m,d,t,o,i,c,f,g,n)=>`<div class="orderBtns">
<div id="btntype" class="primaryFill-btn-primary">
  <button
    id="cancelBooking_${s}"
    data-bookingsId="${r}"
    data-checkInDate="${m}"
    data-checkOutDate="${d}"
    data-roomType="${t}"
    data-remark="${o}"
    data-catQuantity="${i}"
    data-price="${c}"
    data-history="${f}"
    data-bookingDate="${g}"
    data-feedback="${n}"
    class="cancelBookingBtn orderBtn"
  >
    取消訂單
  </button>
</div>
</div>`,w=(s,r,m,d,t,o,i,c,f,g,n)=>`<div class="orderBtns">
<div id="btntype" class="primaryFill-btn-primary02">
  <button
    id="evaluateBooking_${s}"
    data-bookingsId="${r}"
    data-checkInDate="${m}"
    data-checkOutDate="${d}"
    data-roomType="${t}"
    data-remark="${o}"
    data-catQuantity="${i}"
    data-price="${c}"
    data-history="${f}"
    data-bookingDate="${g}"
    data-feedback="${n}"
    class="evaluateBookingBtn orderBtn"
    
  >
    評價訂單
  </button>
</div>
</div>`,A=(s,r,m,d,t,o,i,c,f,g,n)=>`<div class="orderBtns">
<div id="btntype" class="primaryDisabled-btn-primary">
  <button
    id="isCancelBooking_${s}"
    data-bookingsId="${r}"
    data-checkInDate="${m}"
    data-checkOutDate="${d}"
    data-roomType="${t}"
    data-remark="${o}"
    data-catQuantity="${i}"
    data-price="${c}"
    data-history="${f}"
    data-bookingDate="${g}"
    data-feedback="${n}"
    class="isCancelBookingBtn orderBtn"
  >
    已取消
  </button>
</div>
</div>`,x=(s,r,m,d,t,o,i,c,f,g)=>` 
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
  <div class="catBarInfo d-flex flex-column ${g}">
    <div class="justify-content-center align-items-center ">
      <div class="d-flex flex-sm-row flex-column mb-5">
        <h3 id="checkIn_${s}" class="d-inline-block ">
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

        <h3 id="checkOut_${s}" class="d-inline-block">
          ${m}
        </h3>
      </div>
      <div class="d-flex flex-sm-row flex-column">
        <div class="d-flex flex-column">
          <div class="d-flex">
            <h3 id="roomType_${s}" class="roomType">
              ${t}
            </h3>

            <h4
              id="catsQuantity_${s}"
              class="mt-1 catsQuantity"
            >
              ${d}隻貓
            </h4>
          </div>
          <div class="d-flex">
            <h5 class="text-center">訂單編號</h5>
            <h5
              id="bookingId_${s}"
              class="text-center bookingId"
            >
              ${o}
            </h5>
          </div>
          <div class="d-flex">
            <h6 class="orderDate">下單日期</h6>
            <h6
              id="bookingId_${s}"
              class="orderDate bookingId"
            >
              ${i}
            </h6>
          </div>
        </div>
        <div class="d-flex flex-grow-5 ms-sm-5 ms-0">
          <h1 id="price_${s}" class="price">${c}NT</h1>
        </div>
      </div>
    </div>
  </div>
  ${f}
</div>
</div>
<br>
`;I.get(h,{headers:{authorization:`Bearer ${_}`}}).then(s=>{const r=s.data;console.log(s),r.forEach((d,t)=>{const{bookingDate:o,checkIn:i,checkOut:c,quantity:f,cats:g,state:n,price:b,remark:k,room:p,history:B,feedback:y,id:e}=d,{name:l}=p,u=g.length,S=document.getElementById("bookingInfo");let C="";a==="已預訂"?C=x(t,i,c,u,l,e,o,b,T(t,e,i,c,l,k,u,b,JSON.stringify(B),o,y)):a==="已完成"?C=x(t,i,c,u,l,e,o,b,w(t,e,i,c,l,k,u,b,JSON.stringify(B),o,y)):a==="已取消"&&(C=x(t,i,c,u,l,e,o,b,A(t,e,i,c,l,k,u,b,JSON.stringify(B),o,y),"isCancel")),S.innerHTML+=C}),a==="已完成"&&document.querySelectorAll(".evaluateBookingBtn").forEach(t=>{const o=t.getAttribute("data-feedback");console.log(o),o!==""&&(t.textContent="已評價",t.parentElement.className="primaryDisabled-btn-primary",console.log(t.textContent),console.log(t.parentElement.className))}),bookingInfo.innerHTML===""&&(bookingInfo.innerHTML=`<h1>沒有${v.value}資料</h1>`),W(),J(),document.querySelector("#loading").classList.toggle("d-none")}).catch(s=>{console.log(s);const r=s.response.data;if(console.log(r),r==="Private resource access: entity must have a reference to the owner id"){const d=document.getElementById("bookingInfo");let t=JSON.stringify(`
    <div id="catContainer_add" class="catContainer">
    <h1 id="catAddTitle" class="catAddTitle">尚未有訂單資料！</h1>        
  </div>
  `),o=JSON.parse(t);d.innerHTML=o}else alert(s),window.location.href="./login.html";document.querySelector("#loading").classList.toggle("d-none")})}function L(){const h=N.id,a=document.getElementById("bookingInfo");v.value=="已預訂"?(a.innerHTML="",E(`${$}/600/bookings?userId=${h}&state=已預訂&_expand=user&_expand=room&_sort=bookingDate&_order=desc`,v.value)):v.value=="已完成"?(a.innerHTML="",E(`${$}/600/bookings?userId=${h}&state=已退房&_expand=user&_expand=room&_sort=bookingDate&_order=desc`,v.value)):v.value=="已取消"?(a.innerHTML="",E(`${$}/600/bookings?userId=${h}&state=已取消&_expand=user&_expand=room&_sort=bookingDate&_order=desc`,v.value)):a.innerHTML=`<div id="catContainer_add" class="catContainer">
    <h1 id="catAddTitle" class="catAddTitle">異常的篩選條件！</h1>        
  </div>`}function W(){document.querySelectorAll(".cancelBookingBtn").forEach(a=>{a.addEventListener("click",T=>{T.preventDefault(),H(),D.mixin({customClass:{confirmButton:"btn btn-custom-confirm",cancelButton:"btn btn-custom-cancel"},buttonsStyling:!1}).fire({title:"確定要刪除訂單嗎?",text:"刪除後將無法還原此訂單紀錄",icon:"warning",showCancelButton:!0,confirmButtonText:"是的 我要刪除!",cancelButtonText:"不 取消刪除!",reverseButtons:!0}).then(A=>{if(A.isConfirmed){let m=function(){let n=new Date,b=n.getFullYear(),k=("0"+(n.getMonth()+1)).slice(-2),p=("0"+n.getDate()).slice(-2),B=("0"+(n.getHours()%12||12)).slice(-2),y=("0"+n.getMinutes()).slice(-2),e=("0"+n.getSeconds()).slice(-2),l=n.getHours()>=12?"pm":"am";return`${b}-${k}-${p} ${B}:${y}:${e} ${l}`};document.querySelector("#bookingInfo").classList.add("d-none"),document.querySelector("#loading").classList.toggle("d-none");let r=a.getAttribute("data-bookingsId");console.log(r),console.log("當前時間: "+m());let d=a.getAttribute("data-checkInDate"),t=a.getAttribute("data-checkOutDate"),o=a.getAttribute("data-roomType"),i=a.getAttribute("data-remark"),c=a.getAttribute("data-quantity"),f=a.getAttribute("data-price"),g=JSON.parse(a.getAttribute("data-history"));console.log(d,t,o,i,c,f,g),I.post(`${$}/bookingHistorys`,{updateTime:m(),state:"已取消",quantity:c,roomType:o,price:f,admin:"user",remark:i,catNum:c,checkIn:d,checkOut:t,bookingsId:r}).then(n=>(console.log(n),console.log("新增歷史紀錄成功"),n.data.id)).then(n=>{console.log(n),g.push(n);let b=g;console.log(b),I.patch(`${$}/600/bookings/${r}`,{state:"已取消",history:b},{headers:{authorization:`Bearer ${_}`}}).then(k=>{console.log("您已取消該筆訂單"),console.log(k),I.get(`${$}/roomStates?date_gte=${d}&date_lte=${t}`).then(p=>{const B=p.data;console.log("初始房況"),console.log(B);const y=B.map(e=>{let l=0,u;return o==="經典房"?(l=e.availableCount.classic+1,u={...e,availableCount:{...e.availableCount,classic:l}}):o==="精緻房"?(l=e.availableCount.delicate+1,u={...e,availableCount:{...e.availableCount,delicate:l}}):o==="豪華房"&&(l=e.availableCount.luxury+1,u={...e,availableCount:{...e.availableCount,luxury:l}}),I.patch(`${$}/roomStates/${e.id}`,u)});Promise.all(y).then(e=>{console.log("成功修改房況"),console.log(e),D.mixin({customClass:{confirmButton:"btn btn-custom-confirm",cancelButton:"btn btn-custom-cancel"},buttonsStyling:!1}).fire({title:"訂單已刪除",icon:"success",confirmButtonText:"確定"}).then(u=>{u.isConfirmed&&window.location.reload()})}).catch(e=>{console.error("Error modifying room states:",e),D.mixin({customClass:{confirmButton:"btn btn-custom-confirm",cancelButton:"btn btn-custom-cancel"},buttonsStyling:!1}).fire({icon:"error",title:"訂單刪除失敗",confirmButtonText:"確定"})})}).catch(p=>{console.log(p),console.log("修改房況錯誤"),D.mixin({customClass:{confirmButton:"btn btn-custom-confirm",cancelButton:"btn btn-custom-cancel"},buttonsStyling:!1}).fire({icon:"error",title:"訂單刪除失敗",confirmButtonText:"確定"})})}).catch(k=>{console(k),console.log("取消訂單失敗"),D.mixin({customClass:{confirmButton:"btn btn-custom-confirm",cancelButton:"btn btn-custom-cancel"},buttonsStyling:!1}).fire({icon:"error",title:"訂單刪除失敗",confirmButtonText:"確定"})})}).catch(n=>{console.log(n),console.log("新增歷史紀錄失敗"),D.mixin({customClass:{confirmButton:"btn btn-custom-confirm",cancelButton:"btn btn-custom-cancel"},buttonsStyling:!1}).fire({icon:"error",title:"訂單刪除失敗",confirmButtonText:"確定"})})}})})})}function J(){document.querySelectorAll(".evaluateBookingBtn").forEach(a=>{a.addEventListener("click",T=>{T.preventDefault();const w=a.getAttribute("data-bookingsid");localStorage.setItem("evaluateBooking_Id",JSON.stringify(w)),window.location.href="./evaluateBooking.html"})})}L();
