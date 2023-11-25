import{a as e,_ as n}from"./config-7dd8b0d7.js";import"./admin_header-87ecb768.js";import"./sweetalert2.all-7a8d322f.js";const r=document.querySelector(".adminMemberList");let d=[];function s(){e.get(`${n}/users`).then(function(a){d=a.data,i()})}s();function i(){let a="";d.forEach(function(t){t.role==="admin"&&(a+=`<tr>
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
