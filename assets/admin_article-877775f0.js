import{a as y,_ as k}from"./sweetalert2.all-203b6da2.js";import"./admin_header-cdcf5a9d.js";import{h as $}from"./admin_config-2cf1d757.js";import{r as P}from"./loginIsTimeUp-b8b3d4c8.js";const S=document.querySelector(".adminArticleList"),g=document.querySelector(".pagination"),b=document.querySelector(".articleSearch"),w=document.querySelector("#mySearch"),l=3;let c;y.get(`${k}/660/article`,$).then(function(t){c=t.data,o(c,1)}).catch(function(t){P(t.response.data)});function o(t,a){const e=t.length,n=Math.ceil(e/l);let r=a;r>n&&(r=n);const d=r*l-l+1,s=r*l,u=[];t.forEach((h,m)=>{const f=m+1;f>=d&&f<=s&&u.push(h)}),D(u);const p={totalPages:n,currentPage:r,hasPage:r>1,hasNext:r<n};N(p)}function D(t){let a="";t.forEach(function(e){localStorage.getItem("userRole")==="admin"&&(a+=`<tr>
        <td>${localStorage.getItem("userName")}</td>
        <td>${e.lastEditOrPublishTime}</td>
        <td>${e.title}</td>
        <td>${e.id}</td>
        <td>${e.keyword}</td>
        <td>${e.status}</td>
        <td><a class="editArticle" href="./admin_articleEditArticle.html?id=${e.id}">
        <span class="material-symbols-outlined link-primary"> edit_square </span>
      </a></td>
        </tr>`)}),S.innerHTML=a}function N(t){let a="";const e=t.totalPages;t.hasPage?a+=`<li class="page-item"><a class="page-link" href="#" data-page="${Number(t.currentPage)-1}">Previous</a></li>`:a+='<li class="page-item disabled"><span class="page-link">Previous</span></li>';for(let n=1;n<=e;n++)Number(t.currentPage)===n?a+=`<li class="page-item active"><a class="page-link" href="#" data-page="${n}">${n}</a></li>`:a+=`<li class="page-item"><a class="page-link" href="#" data-page="${n}">${n}</a></li>`;t.hasNext?a+=`<li class="page-item"><a class="page-link" href="#" data-page="${Number(t.currentPage)+1}">Next</a></li>`:a+='<li class="page-item disabled"><span class="page-link">Next</span></li>',g.innerHTML=a}function v(t,a){if(t.preventDefault(),t.target.nodeName!=="A")return;const e=t.target.dataset.page,n=a.length;o(n!==0?a:c,e)}g.addEventListener("click",function(t){v(t,i)});b.addEventListener("submit",E);let i=[];function E(t){t.preventDefault();let a=[];i=[],c.forEach(function(e){a.push(e.title),a.push(e.keyword),a.filter(function(r){return r.includes(w.value)}).forEach(function(r){(r===e.title||r===e.keyword)&&(i.some(s=>s.title===e.title&&s.keyword===e.keyword)||i.push(e))})}),o(i,1)}
