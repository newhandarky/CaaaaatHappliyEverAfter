import"./sweetalert2.all-1988d671.js";import"./admin_header-58c6939d.js";import{a as s,_ as d}from"./config-4096d6dc.js";import{h as u}from"./moment-fbc5633a.js";const E=document.querySelector("form"),y=document.querySelector(".selectUser"),S=document.querySelector(".bookingDate"),i=document.querySelector(".checkIn"),m=document.querySelector(".checkOut"),c=document.querySelector(".bookingDays"),f=document.querySelector(".totalPrice"),L=document.querySelector(".memberName"),C=document.querySelector(".getCats"),l=document.querySelector(".bookingRoomType"),O=document.querySelector(".addBOoking"),Y=document.querySelector(".btnBack"),$=document.querySelector(".remark"),T=document.querySelector(".checkInCats"),v=document.querySelector(".plusCatPay"),w=document.querySelector(".historyRes"),M=document.querySelector(".bookingRes");let g=0,b=0;const R={51:"classic",52:"delicate",53:"luxury"},H=s.get(`${d}/users`),N=s.get(`${d}/cats`),P=s.get(`${d}/rooms`),B=s.get(`${d}/roomStates`);Promise.all([H,N,P,B]).then(([p,q,k,D])=>{let I="<option selected>請選擇</option>";p.data.forEach(function(o){I+=`<option>${o.id}</option>`}),y.innerHTML=I,l.addEventListener("change",function(){k.data.forEach(function(o){o.name===l.value&&(g=o.id)})}),y.addEventListener("change",function(){b=y.value;let o=[];q.data.forEach(function(t){t.userId==b&&o.push(t)});let n="";o.forEach(function(t,e){n+=`<div class="col-4">
                            <div class="form-check">
                                <input class="form-check-input" data-catid="${t.id}" type="checkbox" id="memberCat${e+1}">
                                <label class="form-check-label memberCat${e+1}" for="memberCat${e+1}">${t.catName}</label>
                            </div>
                        </div>`}),C.innerHTML=n,p.data.forEach(function(t){t.id==b&&(L.value=t.name)})}),E.addEventListener("change",function(o){const n=u(i.value),t=u(m.value),e=t.diff(n,"years"),r=t.diff(n,"month")-e*12;n.add(e,"years").add(r,"months");const h=t.diff(n,"days");if(o.target.classList.contains("bookingDays")&&(c.value<=0?alertErrForDate():m.value=u(i.value).add(c.value,"days").format("YYYY-MM-DD"),k.data.forEach(function(a){a.name===l.value&&(f.value=a.price*c.value)})),o.target.classList.contains("checkIn")&&(m.value=u(i.value).add(c.value,"days").format("YYYY-MM-DD")),o.target.classList.contains("checkOut")&&(h<=0?alertErrForDate():c.value=h,k.data.forEach(function(a){a.name==l.value&&(f.value=a.price*c.value)})),o.target.classList.contains("bookingRoomType")&&k.data.forEach(function(a){a.name===l.value&&(f.value=a.price*c.value)}),o.target.classList.contains("form-check-input")){let a=document.querySelectorAll(".form-check-input:checked").length;T.value=a,v.value=300*(a-1)*c.value}}),O.addEventListener("click",function(){const o={userId:parseInt(y.value),bookingDate:S.value,checkIn:i.value,checkOut:m.value,roomId:g,state:"已預訂",quantity:parseInt(c.value),price:parseInt(f.value)+parseInt(v.value),cats:[],history:[],remark:$.value,feedback:"",admin:{userId:0}};document.querySelectorAll(".form-check-input:checked").forEach(function(t){o.cats.push(parseInt(t.dataset.catid))});const n={updateTime:`${S.value} ${u().format("hh:mm:ss a")}`,state:"已預訂",quantity:parseInt(c.value),roomType:l.value,price:parseInt(f.value)+parseInt(v.value),admin:"user",remark:$.value,catNum:o.cats.length,checkIn:i.value,checkOut:m.value};s.post(`${d}/bookings`,o).then(function(t){M.innerHTML=`<thead>
                                                <tr>
                                                    <th scope="col"></th>
                                                    <th scope="col">訂單</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">訂單ID</th>
                                                    <td>${t.data.id}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">入住貓咪</th>
                                                    <td>${JSON.stringify(t.data.cats)}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">對應履歷ID</th>
                                                    <td class="historyId"></td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">退房日期</th>
                                                    <td>${t.data.checkOut}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">總價</th>
                                                    <td>${t.data.price}</td>
                                                </tr>
                                            </tbody>`;for(let e=0;e<parseInt(c.value);e++)D.data.forEach(function(r){r.date===u(i.value).add(e,"days").format("YYYY-MM-DD")&&(r.availableCount[R[g]]--,s.patch(`${d}/roomStates/${r.id}`,r).then(function(h){}).catch(function(h){console.log(h.response)}))});n.bookingsId=t.data.id,s.post(`${d}/bookingHistorys`,n).then(function(e){w.innerHTML=`<thead>
                                                    <tr>
                                                        <th scope="col"></th>
                                                        <th scope="col">訂房履歷</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">訂房履歷ID</th>
                                                        <td>${e.data.id}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">下單時間</th>
                                                        <td>${e.data.updateTime}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">對應訂單ID</th>
                                                        <td>${e.data.bookingsId}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">入住日期</th>
                                                        <td>${e.data.checkIn}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">房型</th>
                                                        <td>${e.data.roomType}</td>
                                                    </tr>
                                                </tbody>`,o.history.push(e.data.id),s.patch(`${d}/bookings/${e.data.bookingsId}`,o).then(function(r){document.querySelector(".historyId").textContent=JSON.stringify(r.data.history)})}).catch(function(e){console.log(e)})}).catch(function(t){console.log(t)})})}).catch(p=>{console.error("Error fetching data:",p)});Y.addEventListener("click",function(){location="admin_booking.html"});
