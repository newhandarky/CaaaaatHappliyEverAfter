import{a,_ as c}from"./config-d9eb516d.js";import"./sweetalert2.all-2959760f.js";const r=document.querySelector(".articleList"),s=document.querySelector(".articleTitle");document.querySelector(".card-body");console.log(s);a.get(`${c}/faqs`).then(function(e){console.log(e.data);let o=e.data;console.log(o);let t="";o.forEach(function(l){console.log(l.title),console.log(l.content),t+=`<li class="mb-3  id="">
        <p class="">
           <a class="border border-primary w-75 btn articleTitle text-start" data-bs-toggle="collapse" href="#${l.title}" role="button" aria-expanded="false" aria-controls="collapseExample">
            ${l.title}
           </a>

        </p>
         <div class="collapse  w-75  " id="${l.title}">
          <div class="card card-body border-0  mt-1" style="background-color:#E2c6c4;">
             ${l.content}
         </div>
         </div>
       </li>`}),console.log(t),r.innerHTML=t});const i=document.querySelector(".catArticleList");a.get(`${c}/article`).then(function(e){let o=e.data;console.log(o);let t="";o.forEach(function(l){t+=`<li class="mb-3" id="">
        <p class="">
           <a class="border border-primary w-75 btn articleTitle text-start" data-bs-toggle="collapse" href="#${l.title}" role="button" aria-expanded="false" aria-controls="collapseExample">
            ${l.title}
            <span style="color: #e2c6c4;" >#${l.keyword}</span>
           </a>

        </p>
         <div class="collapse w-75" id="${l.title}">
          <div class="card card-body border-0 mt-1 " style="background-color:#E2c6c4;">
             ${l.content}
         </div>
         </div>
       </li>`}),console.log(t),i.innerHTML=t});
