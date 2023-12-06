import{a as b,_ as y}from"./sweetalert2.all-203b6da2.js";import"./admin_header-cdcf5a9d.js";import{h as S}from"./admin_config-2cf1d757.js";import{r as D}from"./loginIsTimeUp-b8b3d4c8.js";const P=document.querySelector(".editAccountBtn"),k=document.querySelector(".adminMemberList"),p=document.querySelector(".pagination"),v=document.querySelector(".memberSearch"),E=document.querySelector("#mySearch");let m=parseInt(localStorage.getItem("userId"));const o=5;let c;b.get(`${y}/660/users?role=admin`,S).then(function(a){c=a.data,d(c,1)}).catch(function(a){D(a.response.data)});function d(a,t){const e=a.length,n=Math.ceil(e/o);let s=t;s>n&&(s=n);const l=s*o-o+1,i=s*o,u=[];a.forEach((g,$)=>{const f=$+1;f>=l&&f<=i&&u.push(g)}),L(u);const h={totalPages:n,currentPage:s,hasPage:s>1,hasNext:s<n};M(h)}function L(a){let t="";a.forEach(function(e){e.role==="admin"&&m===e.id?t+=`<tr>
            <td>${e.id}</td>
            <td>${e.name}</td>
            <td>${e.phone}</td>
            <td>${e.address}</td>
            <td>${e.joinDate}</td>
            <td class="text-center">
              <a class="editMember" href="./admin_accountEditMember.html?id=${e.id}">
                <span class="material-symbols-outlined link-primary"> edit_square </span>
              </a>
            </td>
          </tr>`:t+=`<tr>
            <td>${e.id}</td>
            <td>${e.name}</td>
            <td>${e.phone}</td>
            <td>${e.address}</td>
            <td>${e.joinDate}</td>
            <td class="text-center">
              <a class="editMember" style="cursor: not-allowed">
                <span class="material-symbols-outlined"> edit_square </span>
              </a>
            </td>
          </tr>`}),k.innerHTML=t}P.addEventListener("click",function(a){a.preventDefault(),c.forEach(function(t){m==t.id&&(location.href=`./admin_accountEditMember.html?id=${t.id}`)})});function M(a){let t="";const e=a.totalPages;a.hasPage?t+=`<li class="page-item"><a class="page-link" href="#" data-page="${Number(a.currentPage)-1}">Previous</a></li>`:t+='<li class="page-item disabled"><span class="page-link">Previous</span></li>';for(let n=1;n<=e;n++)Number(a.currentPage)===n?t+=`<li class="page-item active"><a class="page-link" href="#" data-page="${n}">${n}</a></li>`:t+=`<li class="page-item"><a class="page-link" href="#" data-page="${n}">${n}</a></li>`;a.hasNext?t+=`<li class="page-item"><a class="page-link" href="#" data-page="${Number(a.currentPage)+1}">Next</a></li>`:t+='<li class="page-item disabled"><span class="page-link">Next</span></li>',p.innerHTML=t}function N(a,t){if(a.preventDefault(),a.target.nodeName!=="A")return;const e=a.target.dataset.page,n=t.length;d(n!==0?t:c,e)}p.addEventListener("click",function(a){N(a,r)});v.addEventListener("submit",q);let r=[];function q(a){a.preventDefault();let t=[];r=[],c.forEach(function(e){t.push(e.name),t.push(e.address),t.filter(function(s){return s.includes(E.value)}).forEach(function(s){(s===e.name||s===e.address)&&(r.some(i=>i.name===e.name&&i.address===e.address)||r.push(e))})}),d(r,1)}
