import{a as e,_ as n}from"./config-82256151.js";import"./admin_header-36cd02a6.js";import"./sweetalert2.all-bdf3eb51.js";const r=document.querySelector(".adminMemberList");let d=[];function s(){e.get(`${n}/users`).then(function(a){d=a.data,i()})}s();function i(){let a="";d.forEach(function(t){t.role==="admin"&&(a+=`<tr>
            <td>${t.id}</td>
            <td>${t.name}</td>
            <td>${t.phone}</td>
            <td>${t.address}</td>
            <td>${t.joinDate}</td>
            <td class="text-center">
              <a class="editMember" href="./admin_accountEditMember.html?id=${t.id}">
                <span class="material-symbols-outlined"> edit_square </span>
              </a>
            </td>
          </tr>`)}),r.innerHTML=a}
