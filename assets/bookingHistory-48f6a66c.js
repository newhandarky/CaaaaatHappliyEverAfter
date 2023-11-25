import{_ as p,a as D}from"./config-1ccbba12.js";import{i as w}from"./navbar-0e9c41dc.js";import"./aside-ba2dede9.js";import"./transform-4d2927c0.js";const x=document.querySelectorAll("#bookingHistory");x.forEach(v=>{v.classList.add("onThisPage")});const H=JSON.parse(localStorage.getItem("userTokenAndData")),{accessToken:A,user:L}=H,h=document.getElementById("roomType");h.addEventListener("change",v=>{console.log(h.value),_()});function E(v,o){const y=(e,l,d,a,n,r,t,c,u,i,g)=>`<div class="orderBtns">
<div id="btntype" class="primaryFill-btn-primary">
  <button
    id="cancelBooking_${e}"
    data-bookingsId="${l}"
    data-checkInDate="${d}"
    data-checkOutDate="${a}"
    data-roomType="${n}"
    data-remark="${r}"
    data-quantity="${t}"
    data-price="${c}"
    data-history="${u}"
    data-bookingDate="${i}"
    data-feedback="${g}"
    class="cancelBookingBtn orderBtn"
  >
    取消訂單
  </button>
</div>
</div>`,m=(e,l,d,a,n,r,t,c,u,i,g)=>`<div class="orderBtns">
<div id="btntype" class="primaryFill-btn-primary02">
  <button
    id="evaluateBooking_${e}"
    data-bookingsId="${l}"
    data-checkInDate="${d}"
    data-checkOutDate="${a}"
    data-roomType="${n}"
    data-remark="${r}"
    data-quantity="${t}"
    data-price="${c}"
    data-history="${u}"
    data-bookingDate="${i}"
    data-feedback="${g}"
    class="evaluateBookingBtn orderBtn"
    
  >
    評價訂單
  </button>
</div>
</div>`,I=(e,l,d,a,n,r,t,c,u,i,g)=>`<div class="orderBtns">
<div id="btntype" class="primaryDisabled-btn-primary">
  <button
    id="isCancelBooking_${e}"
    data-bookingsId="${l}"
    data-checkInDate="${d}"
    data-checkOutDate="${a}"
    data-roomType="${n}"
    data-remark="${r}"
    data-quantity="${t}"
    data-price="${c}"
    data-history="${u}"
    data-bookingDate="${i}"
    data-feedback="${g}"
    class="isCancelBookingBtn orderBtn"
  >
    已取消
  </button>
</div>
</div>`,f=(e,l,d,a,n,r,t,c,u,i)=>` 
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
  <div class="catBarInfo d-flex flex-column ${i}">
    <div class="justify-content-center align-items-center ">
      <div class="d-flex flex-sm-row flex-column mb-5">
        <h3 id="checkIn_${e}" class="d-inline-block ">
          ${l}
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
          ${d}
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
              ${r}
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
          <h1 id="price_${e}" class="price">${c}NT</h1>
        </div>
      </div>
    </div>
  </div>
  ${u}
</div>
</div>
<br>
`;D.get(v,{headers:{authorization:`Bearer ${A}`}}).then(e=>{const l=e.data;console.log(e),l.forEach((d,a)=>{const{bookingDate:n,checkIn:r,checkOut:t,quantity:c,state:u,price:i,remark:g,room:B,history:s,feedback:b,id:k}=d,{name:$}=B,C=document.getElementById("bookingInfo");let T="";o==="已預定"?T=f(a,r,t,c,$,k,n,i,y(a,k,r,t,$,g,c,i,JSON.stringify(s),n,b)):o==="已完成"?T=f(a,r,t,c,$,k,n,i,m(a,k,r,t,$,g,c,i,JSON.stringify(s),n,b)):o==="已取消"&&(T=f(a,r,t,c,$,k,n,i,I(a,k,r,t,$,g,c,i,JSON.stringify(s),n,b),"isCancel")),C.innerHTML+=T}),o==="已完成"&&document.querySelectorAll(".evaluateBookingBtn").forEach(a=>{const n=a.getAttribute("data-feedback");console.log(n),n!==""&&(a.textContent="已評價",a.parentElement.className="primaryDisabled-btn-primary",console.log(a.textContent),console.log(a.parentElement.className))}),bookingInfo.innerHTML===""&&(bookingInfo.innerHTML=`<h1>沒有${h.value}資料</h1>`),O(),M()}).catch(e=>{console.log(e);const l=e.response.data;if(console.log(l),l==="Private resource access: entity must have a reference to the owner id"){const d=document.getElementById("bookingInfo");let a=JSON.stringify(`
    <div id="catContainer_add" class="catContainer">
    <h1 id="catAddTitle" class="catAddTitle">尚未有訂單資料！</h1>        
  </div>
  `),n=JSON.parse(a);d.innerHTML=n}else alert(e),window.location.href="./login.html"})}function _(){const v=L.id,o=document.getElementById("bookingInfo");h.value=="已預定"?(o.innerHTML="",E(`${p}/600/bookings?userId=${v}&state=已預定&_expand=user&_expand=room&_sort=bookingDate&_order=desc`,h.value)):h.value=="已完成"?(o.innerHTML="",E(`${p}/600/bookings?userId=${v}&state=已退房&_expand=user&_expand=room&_sort=bookingDate&_order=desc`,h.value)):h.value=="已取消"?(o.innerHTML="",E(`${p}/600/bookings?userId=${v}&state=已取消&_expand=user&_expand=room&_sort=bookingDate&_order=desc`,h.value)):o.innerHTML=`<div id="catContainer_add" class="catContainer">
    <h1 id="catAddTitle" class="catAddTitle">異常的篩選條件！</h1>        
  </div>`}function O(){document.querySelectorAll(".cancelBookingBtn").forEach(o=>{o.addEventListener("click",y=>{y.preventDefault(),w();let m=o.getAttribute("data-bookingsId");console.log(m);function I(){let t=new Date,c=t.getFullYear(),u=("0"+(t.getMonth()+1)).slice(-2),i=("0"+t.getDate()).slice(-2),g=("0"+(t.getHours()%12||12)).slice(-2),B=("0"+t.getMinutes()).slice(-2),s=("0"+t.getSeconds()).slice(-2),b=t.getHours()>=12?"pm":"am";return`${c}-${u}-${i} ${g}:${B}:${s} ${b}`}console.log("當前時間: "+I());let f=o.getAttribute("data-checkInDate"),e=o.getAttribute("data-checkOutDate"),l=o.getAttribute("data-roomType"),d=o.getAttribute("data-remark"),a=o.getAttribute("data-quantity"),n=o.getAttribute("data-price"),r=JSON.parse(o.getAttribute("data-history"));console.log(f,e,l,d,a,n,r),D.post(`${p}/bookingHistorys`,{updateTime:I(),state:"已取消",quantity:a,roomType:l,price:n,admin:"user",remark:d,catNum:a,checkIn:f,checkOut:e,bookingsId:m}).then(t=>(console.log(t),console.log("新增歷史紀錄成功"),t.data.id)).then(t=>{console.log(t),r.push(t);let c=r;console.log(c),D.patch(`${p}/600/bookings/${m}`,{state:"已取消",history:c},{headers:{authorization:`Bearer ${A}`}}).then(u=>{console.log("您已取消該筆訂單"),console.log(u),D.get(`${p}/roomStates?date_gte=${f}&date_lte=${e}`).then(i=>{const g=i.data;console.log("初始房況"),console.log(g);const B=g.map(s=>{let b=0,k;return l==="經典房"?(b=s.availableCount.classic+1,k={...s,availableCount:{...s.availableCount,classic:b}}):l==="精緻房"?(b=s.availableCount.delicate+1,k={...s,availableCount:{...s.availableCount,delicate:b}}):l==="豪華房"&&(b=s.availableCount.luxury+1,k={...s,availableCount:{...s.availableCount,luxury:b}}),D.patch(`${p}/roomStates/${s.id}`,k)});Promise.all(B).then(s=>{console.log("成功修改房況"),console.log(s),window.location.reload()}).catch(s=>{console.error("Error modifying room states:",s)})}).catch(i=>{console.log(i),console.log("修改房況錯誤")})}).catch(u=>{console(u),console.log("取消訂單失敗")})}).catch(t=>{console.log(t),console.log("新增歷史紀錄失敗")})})})}function M(){document.querySelectorAll(".evaluateBookingBtn").forEach(o=>{o.addEventListener("click",y=>{y.preventDefault();const m=o.getAttribute("data-bookingsid");localStorage.setItem("evaluateBooking_Id",JSON.stringify(m)),window.location.href="./evaluateBooking.html"})})}_();
