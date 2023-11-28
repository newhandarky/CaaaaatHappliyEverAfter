import{a as s,_ as m}from"./config-b31ac0c6.js";import"./admin_header-26e6a820.js";import"./sweetalert2.all-b0ac47b5.js";const u=document.querySelector(".adminArticleList"),o=3;let d=1,c;function l(e){s.get(`${m}/article?_page=${e}&_limit=${o}`).then(function(t){c=t.data,p(),g(t.headers["x-total-count"])}).catch(t=>console.error("Error fetching data:",t))}l(d);function p(){let e="";c.forEach(function(t){localStorage.getItem("userRole")==="admin"&&(e+=`<tr>
        <td>${localStorage.getItem("userName")}</td>
        <td>2023-01-01</td>
        <td>${t.title}</td>
        <td>${t.id}</td>
        <td>${t.keyword}</td>
        <td>已發佈</td>
        <td><a class="editArticle" href="./admin_articleEditArticle.html?id=${t.id}">
        <span class="material-symbols-outlined"> edit_square </span>
      </a></td>
        </tr>`)}),u.innerHTML=e}function g(e){const t=Math.ceil(e/o),r=document.querySelector(".pagination");r.innerHTML="";for(let i=1;i<=t;i++){const n=document.createElement("li");n.classList.add("page-item");const a=document.createElement("a");a.classList.add("page-link"),a.textContent=i,a.href="#",a.addEventListener("click",()=>{n.classList.add("active"),d=i,l(d)}),n.appendChild(a),r.appendChild(n)}}
