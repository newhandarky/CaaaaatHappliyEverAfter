import"./bootstrap.min-47e23b13.js";import"./admin_header-568a311b.js";import{a as e,_ as n}from"./config-4096d6dc.js";import"./sweetalert2.all-9c5228de.js";const r=document.querySelector(".adminMemberList");let d=[];function i(){e.get(`${n}/users`).then(function(a){d=a.data,s()})}i();function s(){let a="";d.forEach(function(t){t.role==="admin"&&(a+=`<tr>
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
