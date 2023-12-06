import{a as C,_ as D,S as I}from"./sweetalert2.all-203b6da2.js";import{i as M}from"./navbar-96c5072d.js";import"./aside-9519be0b.js";const F=document.querySelectorAll("#bookingHistory");F.forEach(g=>{g.classList.add("onThisPage")});const N=document.querySelector("#navAside");N.classList.remove("d-none");const W=JSON.parse(localStorage.getItem("userTokenAndData")),{accessToken:S,user:J}=W;let B=roomType.getAttribute("data-value");const P=document.querySelector("body"),Q=document.querySelector("#catRoomInput_bookingHistoryFilter"),q=document.querySelector("#selectType");P.addEventListener("click",g=>{g.stopPropagation(),q.classList.remove("show")});Q.addEventListener("click",g=>{g.stopPropagation(),q.classList.toggle("show")});const R=document.querySelectorAll(".optionType");R.forEach(g=>{g.addEventListener("click",t=>{const p=t.target.value;roomType.innerHTML=`<p>${p}</p>`,roomType.setAttribute("data-value",p),B=p,console.log(roomType),document.querySelector("#loading").classList.toggle("d-none"),document.querySelector("#bookingHistoryFilter").classList.add("d-none"),document.querySelector("#title").classList.add("d-none"),console.log(B),E()})});function H(g,t){const p=(a,r,f,k,b,i,o,s,d,u,c,e)=>`<div class="orderBtns">
<div id="btntype" class="primaryFill-btn-primary">
  <button
    id="cancelBooking_${a}"
    data-bookingsId="${r}"
    data-checkInDate="${f}"
    data-checkOutDate="${k}"
    data-roomType="${b}"
    data-remark="${i}"
    data-quantity="${o}"
    data-catQuantity="${s}"
    data-price="${d}"
    data-history="${u}"
    data-bookingDate="${c}"
    data-feedback="${e}"
    class="cancelBookingBtn orderBtn"
  >
    取消訂單
  </button>
</div>
</div>`,_=(a,r,f,k,b,i,o,s,d,u,c,e)=>`<div class="orderBtns">
<div id="btntype" class="primaryFill-btn-primary02">
  <button
    id="evaluateBooking_${a}"
    data-bookingsId="${r}"
    data-checkInDate="${f}"
    data-checkOutDate="${k}"
    data-roomType="${b}"
    data-remark="${i}"
    data-quantity="${o}"
    data-catQuantity="${s}"
    data-price="${d}"
    data-history="${u}"
    data-bookingDate="${c}"
    data-feedback="${e}"
    class="evaluateBookingBtn orderBtn"
    
  >
    評價訂單
  </button>
</div>
</div>`,L=(a,r,f,k,b,i,o,s,d,u,c,e)=>`<div class="orderBtns">
<div id="btntype" class="primaryDisabled-btn-primary">
  <button
    id="isCancelBooking_${a}"
    data-bookingsId="${r}"
    data-checkInDate="${f}"
    data-checkOutDate="${k}"
    data-roomType="${b}"
    data-remark="${i}"
    data-quantity="${o}"
    data-catQuantity="${s}"
    data-price="${d}"
    data-history="${u}"
    data-bookingDate="${c}"
    data-feedback="${e}"
    class="isCancelBookingBtn orderBtn"
  >
    已取消
  </button>
</div>
</div>`,x=(a,r,f,k,b,i,o,s,d,u,c)=>` 
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
          ${f}
        </h3>
      </div>
      <div class="d-flex flex-sm-row flex-column">
        <div class="d-flex flex-column">
          <div class="d-flex">
            <h3 id="roomType_${a}" class="roomType">
              ${i}
            </h3>

            <h4
              id="catsquantity_${a}"
              class="ms-1 mt-1 catsquantity"
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
              ${o}
            </h5>
          </div>
          <div class="d-flex">
            <h6 class="orderDate">下單日期</h6>
            <h6
              id="bookingId_${a}"
              class="orderDate bookingId"
            >
              ${s}
            </h6>
          </div>
        </div>
        <div class="d-flex flex-grow-5 ms-sm-5 ms-0">
          <h1 id="price_${a}" class="price">${d}NT</h1>
        </div>
      </div>
    </div>
  </div>
  ${u}
</div>
</div>
<br>
`;C.get(g,{headers:{authorization:`Bearer ${S}`}}).then(a=>{const r=a.data;console.log(a),r.forEach((i,o)=>{const{bookingDate:s,checkIn:d,checkOut:u,quantity:c,cats:e,state:T,price:y,remark:h,room:v,history:$,feedback:n,id:l}=i,{name:m}=v,w=e.length,O=document.getElementById("bookingInfo");let A="";t==="已預訂"?A=x(o,d,u,c,w,m,l,s,y,p(o,l,d,u,m,h,c,w,y,JSON.stringify($),s,n)):t==="已完成"?A=x(o,d,u,c,w,m,l,s,y,_(o,l,d,u,m,h,c,w,y,JSON.stringify($),s,n)):t==="已取消"&&(A=x(o,d,u,c,w,m,l,s,y,L(o,l,d,u,m,h,c,w,y,JSON.stringify($),s,n),"isCancel")),O.innerHTML+=A}),t==="已完成"&&document.querySelectorAll(".evaluateBookingBtn").forEach(o=>{const s=o.getAttribute("data-feedback");console.log(s),s!==""&&(o.textContent="已評價",o.parentElement.className="primaryDisabled-btn-primary",console.log(o.textContent),console.log(o.parentElement.className))}),bookingInfo.innerHTML===""&&(bookingInfo.innerHTML=`<h1>沒有${B}資料</h1>`),j(),z(),document.querySelector("#loading").classList.toggle("d-none"),document.querySelector("#bookingHistoryFilter").classList.remove("d-none"),document.querySelector("#title").classList.remove("d-none")}).catch(a=>{console.log(a);const r=a.response.data;if(console.log(r),r==="Private resource access: entity must have a reference to the owner id"){const b=document.getElementById("bookingInfo");let i=JSON.stringify(`
    <div id="catContainer_add" class="catContainer p-5">
    <h2 id="catAddTitle" class="catAddTitle text-center" >尚未有訂單資料！</h2>
    <h6 >點擊 線上訂房 即可開始預訂房間囉！</h6>        
  </div>
  `),o=JSON.parse(i);b.innerHTML=o}else alert(a),window.location.href="./login.html";document.querySelector("#loading").classList.toggle("d-none"),document.querySelector("#bookingHistoryFilter").classList.toggle("d-none")})}function E(){const g=J.id,t=document.getElementById("bookingInfo");B=="已預訂"?(t.innerHTML="",H(`${D}/600/bookings?userId=${g}&state=已預訂&_expand=user&_expand=room&_sort=bookingDate&_order=desc`,B)):B=="已完成"?(t.innerHTML="",H(`${D}/600/bookings?userId=${g}&state=已退房&_expand=user&_expand=room&_sort=bookingDate&_order=desc`,B)):B=="已取消"?(t.innerHTML="",H(`${D}/600/bookings?userId=${g}&state=已取消&_expand=user&_expand=room&_sort=bookingDate&_order=desc`,B)):t.innerHTML=`<div id="catContainer_add" class="catContainer">
    <h1 id="catAddTitle" class="catAddTitle">異常的篩選條件！</h1>        
  </div>`}function j(){document.querySelectorAll(".cancelBookingBtn").forEach(t=>{t.addEventListener("click",p=>{p.preventDefault(),M(),I.mixin({customClass:{confirmButton:"btn btn-custom-confirm",cancelButton:"btn btn-custom-cancel"},buttonsStyling:!1}).fire({title:"確定要刪除訂單嗎?",text:"刪除後將無法還原此訂單紀錄",icon:"warning",showCancelButton:!0,confirmButtonText:"是的 我要刪除!",cancelButtonText:"不 取消刪除!",reverseButtons:!0}).then(L=>{if(L.isConfirmed){let f=function(){let e=new Date,T=e.getFullYear(),y=("0"+(e.getMonth()+1)).slice(-2),h=("0"+e.getDate()).slice(-2),v=("0"+(e.getHours()%12||12)).slice(-2),$=("0"+e.getMinutes()).slice(-2),n=("0"+e.getSeconds()).slice(-2),l=e.getHours()>=12?"pm":"am";return`${T}-${y}-${h} ${v}:${$}:${n} ${l}`};document.querySelector("#bookingInfo").classList.add("d-none"),document.querySelector("#loading").classList.toggle("d-none");let r=t.getAttribute("data-bookingsId");console.log(r),console.log("當前時間: "+f());let k=t.getAttribute("data-checkInDate"),b=t.getAttribute("data-checkOutDate"),i=t.getAttribute("data-roomType"),o=t.getAttribute("data-remark"),s=t.getAttribute("data-quantity"),d=t.getAttribute("data-catquantity"),u=t.getAttribute("data-price"),c=JSON.parse(t.getAttribute("data-history"));C.post(`${D}/bookingHistorys`,{updateTime:f(),state:"已取消",quantity:s,roomType:i,price:u,admin:"user",remark:o,catNum:d,checkIn:k,checkOut:b,bookingsId:r}).then(e=>(console.log(e),console.log("新增歷史紀錄成功"),e.data.id)).then(e=>{console.log(e),c.push(e);let T=c;console.log(T),C.patch(`${D}/600/bookings/${r}`,{state:"已取消",history:T},{headers:{authorization:`Bearer ${S}`}}).then(y=>{console.log("您已取消該筆訂單"),console.log(y),C.get(`${D}/roomStates?date_gte=${k}&date_lte=${b}`).then(h=>{const v=h.data;console.log("初始房況"),console.log(v);const $=v.map(n=>{let l=0,m;return i==="經典房"?(l=n.availableCount.classic+1,m={...n,availableCount:{...n.availableCount,classic:l}}):i==="精緻房"?(l=n.availableCount.delicate+1,m={...n,availableCount:{...n.availableCount,delicate:l}}):i==="豪華房"&&(l=n.availableCount.luxury+1,m={...n,availableCount:{...n.availableCount,luxury:l}}),C.patch(`${D}/roomStates/${n.id}`,m)});Promise.all($).then(n=>{console.log("成功修改房況"),console.log(n),I.mixin({customClass:{confirmButton:"btn btn-custom-confirm",cancelButton:"btn btn-custom-cancel"},buttonsStyling:!1}).fire({title:"訂單已刪除",icon:"success",confirmButtonText:"確定"}).then(m=>{m.isConfirmed&&window.location.reload()})}).catch(n=>{console.error("Error modifying room states:",n),I.mixin({customClass:{confirmButton:"btn btn-custom-confirm",cancelButton:"btn btn-custom-cancel"},buttonsStyling:!1}).fire({icon:"error",title:"訂單刪除失敗",confirmButtonText:"確定"})})}).catch(h=>{console.log(h),console.log("修改房況錯誤"),I.mixin({customClass:{confirmButton:"btn btn-custom-confirm",cancelButton:"btn btn-custom-cancel"},buttonsStyling:!1}).fire({icon:"error",title:"訂單刪除失敗",confirmButtonText:"確定"})})}).catch(y=>{console(y),console.log("取消訂單失敗"),I.mixin({customClass:{confirmButton:"btn btn-custom-confirm",cancelButton:"btn btn-custom-cancel"},buttonsStyling:!1}).fire({icon:"error",title:"訂單刪除失敗",confirmButtonText:"確定"})})}).catch(e=>{console.log(e),console.log("新增歷史紀錄失敗"),I.mixin({customClass:{confirmButton:"btn btn-custom-confirm",cancelButton:"btn btn-custom-cancel"},buttonsStyling:!1}).fire({icon:"error",title:"訂單刪除失敗",confirmButtonText:"確定"})})}})})})}function z(){document.querySelectorAll(".evaluateBookingBtn").forEach(t=>{t.addEventListener("click",p=>{p.preventDefault();const _=t.getAttribute("data-bookingsid");localStorage.setItem("evaluateBooking_Id",JSON.stringify(_)),window.location.href="./evaluateBooking.html"})})}E();
