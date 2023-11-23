import{a as h,_ as f}from"./config-82256151.js";import"./navbar-5c89ec87.js";import"./aside-096a2e7a.js";const u=document.querySelectorAll("#bookingHistory");u.forEach(e=>{e.classList.add("onThisPage")});const k=JSON.parse(localStorage.getItem("userTokenAndData")),{accessToken:b,user:$}=k;function p(){const e=$.id;h.get(`${f}/600/bookings?userId=${e}&_expand=user&_expand=room`,{headers:{authorization:`Bearer ${b}`}}).then(a=>{const o=a.data;console.log(a),o.forEach((t,s)=>{const{bookingDate:c,checkIn:n,checkOut:d,quantity:l,state:I,price:r,room:m,id:i}=t,{name:v}=m,g=document.getElementById("bookingInfo");g.innerHTML+=` 
        <br>
        <div class="catBarContainer">
        <div class="catEars">
          <div class="catEar">
            <img src="../assets/images/catEar02.svg" alt="catEar02" />
          </div>
          <div class="catEar">
            <img src="../assets/images/catEar02.svg" alt="catEar02" />
          </div>
        </div>
        <div class="catBarBorder mx-3">
          <div class="catBarInfo d-flex flex-column">
            <div class="justify-content-center align-items-center">
              <div class="d-flex flex-sm-row flex-column mb-5">
                <h3 id="checkIn_${s}" class="d-inline-block">
                  ${n}
                </h3>
                <div class="d-flex justify-content-center mx-3">
                  <img
                    class="img-fluid d-sm-block d-none"
                    src="../assets/icons/arrow.svg"
                    alt="arrow"
                  />
                  <img
                    class="img-fluid d-sm-none d-block"
                    src="../assets/icons/arrowDown.svg"
                    alt="arrow"
                  />
                </div>

                <h3 id="checkOut_${s}" class="d-inline-block">
                  ${d}
                </h3>
              </div>
              <div class="d-flex flex-sm-row flex-column">
                <div class="d-flex flex-column">
                  <div class="d-flex">
                    <h3 id="roomType_${s}" class="roomType">
                      ${v}
                    </h3>

                    <h4
                      id="catsQuantity_${s}"
                      class="mt-1 catsQuantity"
                    >
                      ${l}隻貓
                    </h4>
                  </div>
                  <div class="d-flex">
                    <h5 class="text-center">訂單編號</h5>
                    <h5
                      id="bookingId_${s}"
                      class="text-center bookingId"
                    >
                      ${i}
                    </h5>
                  </div>
                  <div class="d-flex">
                    <h6 class="orderDate">下單日期</h6>
                    <h6
                      id="bookingId_${s}"
                      class="orderDate bookingId"
                    >
                      ${c}
                    </h6>
                  </div>
                </div>
                <div class="d-flex flex-grow-5 ms-sm-5 ms-0">
                  <h1 id="price_${s}" class="price">${r}NT</h1>
                </div>
              </div>
            </div>
          </div>
          <div class="orderBtns">
            <div id="btntype" class="primaryFill-btn-primary">
              <button
                id="cancelBooking_${s}"
                data-catId="${i}"
                class="orderBtn"
              >
                取消訂單
              </button>
            </div>
          </div>
        </div>
      </div>
      <br>
      `})}).catch(a=>{console.log(a);const o=a.response.data;if(console.log(o),o==="Private resource access: entity must have a reference to the owner id"){const t=document.getElementById("bookingInfo");let s=JSON.stringify(`
        <div id="catContainer_add" class="catContainer">
        <h1 id="catAddTitle" class="catAddTitle">尚未有訂單資料！</h1>        
      </div>
      `),c=JSON.parse(s);t.innerHTML=c}else alert(a),window.location.href="./login.html"})}p();
