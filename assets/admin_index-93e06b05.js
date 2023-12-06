import{a as s,_ as r}from"./sweetalert2.all-203b6da2.js";import{h as i}from"./admin_header-cdcf5a9d.js";import{h as d}from"./admin_config-2cf1d757.js";import{r as l}from"./loginIsTimeUp-b8b3d4c8.js";const u=document.querySelector(".userImage"),m=document.querySelector(".welcomeText"),f=document.querySelector(".indexAccountTbody"),p=document.querySelector(".orderNumToday"),y=document.querySelector(".orderRevenueToday"),h=document.querySelector(".indexRoomTbody"),g=document.querySelector(".articleCardWrap");localStorage.length===0&&b();function b(){location.href="admin_login.html"}function a(o,e){s.get(o,d).then(function(t){e(t.data)}).catch(function(t){l(t.response.data)})}function T(){a(`${r}/660/users?role=admin`,x),a(`${r}/660/users?role=admin`,$),a(`${r}/660/bookings`,S),a(`${r}/660/rooms`,q),a(`${r}/660/article`,A)}T();let v=parseInt(localStorage.getItem("userId"));function x(o){o.forEach(function(e){e.id===v&&(u.setAttribute("src",e.userPhoto),m.textContent=`登入人員：${e.name}歡迎您回來`)})}function $(o){let e="",t=0;for(const n of o)if(e+=`<tr>
          <td>
            <div class="d-flex align-items-center">
              <span class="material-symbols-outlined me-2">
                account_circle
              </span>
              <span>${n.name}</span>
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              <span class="material-symbols-outlined me-2"> schedule </span>
              <span>${n.lastLoginTime}</span>
            </div>
          </td>
        </tr>`,t++,t===4)break;f.innerHTML=e}function S(o){let e=i().format("YYYY-MM-DD"),t=0,n=0;o.forEach(function(c){c.bookingDate===e&&(t++,n+=parseInt(c.price))}),p.textContent=t,y.textContent=`$${n}`}function q(o){let e="";o.forEach(function(t){e+=`<tr>
      <td>${t.name}</td>
      <td>${t.price}</td>
    </tr>`}),h.innerHTML=e}function A(o){let e="";o.forEach(function(t,n){n<=2&&(e+=`<div class="card" style="width: 8rem">
      <img class="card-img-top" src="${t.photo}" />
      <div class="card-body">
        <h2 class="card-title text-truncate fs-6">${t.title}</h2>
        <div class="d-flex justify-content-end align-items-center">
          <span class="material-symbols-outlined me-4"> thumb_up </span>
          <span class="material-symbols-outlined"> chat </span>
        </div>
      </div>
    </div>`)}),g.innerHTML=e}
