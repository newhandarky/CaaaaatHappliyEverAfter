import{a,_ as s}from"./config-82256151.js";import"./admin_header-36cd02a6.js";import"./sweetalert2.all-bdf3eb51.js";const c=document.querySelector(".userImage"),r=document.querySelector(".welcomeText"),d=document.querySelector(".indexAccountTbody"),i=document.querySelector(".indexRoomTbody");localStorage.length===0&&l();function l(){location.href="admin_login.html"}let m=parseInt(localStorage.getItem("userId"));a.get(`${s}/users/${m}`).then(function(t){c.setAttribute("src",t.data.userPhoto),r.textContent=`登入人員：${t.data.name}歡迎您回來`});a.get(`${s}/users?role=admin`).then(function(t){let o=t.data,e="";o.forEach(function(n){e+=`<tr>
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
      </tr>`}),d.innerHTML=e});a.get(`${s}/rooms`).then(function(t){let o=t.data,e="";o.forEach(function(n){e+=`<tr>
      <td>${n.name}</td>
      <td>${n.price}</td>
    </tr>`}),i.innerHTML=e});
