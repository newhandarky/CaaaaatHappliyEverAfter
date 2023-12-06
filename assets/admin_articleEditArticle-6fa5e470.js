import{S as e,a,_ as s}from"./sweetalert2.all-203b6da2.js";import{h as w}from"./admin_header-cdcf5a9d.js";import{t as m}from"./tinymce-0684af05.js";import{h as l}from"./admin_config-2cf1d757.js";import{r}from"./loginIsTimeUp-b8b3d4c8.js";const c=location.href.split("=")[1],C=document.querySelector(".articleEditForm"),d=document.querySelector(".articleTitle"),B=document.querySelector(".articleId"),h=document.querySelector(".articleKeyword"),x=document.querySelector("#articleContent"),T=document.querySelector(".saveAsDraftBtn"),g=document.querySelector(".deleteArticleBtn");let i;function v(){a.get(`${s}/660/article/${c}`,l).then(function(t){i=t.data,d.value=i.title,B.value=c,h.value=i.keyword,x.textContent=i.content,m.init({selector:"textarea#articleContent"})}).catch(function(t){r(t.response.data)})}v();C.addEventListener("submit",function(t){t.preventDefault(),p();let n=m.get("articleContent").getContent(),o={title:d.value,content:n,keyword:h.value,lastEditOrPublishTime:localStorage.getItem("articleLastEditOrPublishTime"),status:"已發佈"};e.fire({title:"是否要儲存變更",icon:"warning",showCancelButton:!0,confirmButtonColor:"#20c997",cancelButtonColor:"#dc3545",confirmButtonText:'<span class="text-white fs-4 px-1">是</span>',cancelButtonText:'<span class="text-white fs-4 px-1">否</span>'}).then(u=>{u.isConfirmed&&a.patch(`${s}/660/article/${c}`,o,l).then(function(){e.fire({title:"文章編輯成功",icon:"success",showConfirmButton:!1}),setTimeout(()=>{window.location.href="./admin_article.html"},1e3)}).catch(function(f){r(f.response.data)})})});T.addEventListener("click",function(t){t.preventDefault(),p();let n=m.get("articleContent").getContent(),o={title:d.value,content:n,keyword:h.value,lastEditOrPublishTime:localStorage.getItem("articleLastEditOrPublishTime"),status:"草稿"};e.fire({title:"是否要儲存為草稿",icon:"warning",showCancelButton:!0,confirmButtonColor:"#20c997",cancelButtonColor:"#dc3545",confirmButtonText:'<span class="text-white fs-4 px-1">是</span>',cancelButtonText:'<span class="text-white fs-4 px-1">否</span>'}).then(u=>{u.isConfirmed&&a.patch(`${s}/article/${c}`,o,l).then(function(){e.fire({title:"已成功儲存為草稿",icon:"success",showConfirmButton:!1}),setTimeout(()=>{window.location.href="./admin_article.html"},1e3)}).catch(function(f){r(f.response.data)})})});g.addEventListener("click",function(t){t.preventDefault(),i.status==="已發佈"?e.fire({title:"文章已發佈，禁止刪除！是否要繼續編輯",icon:"error",showCancelButton:!0,allowOutsideClick:!1,confirmButtonColor:"#20c997",cancelButtonColor:"#dc3545",confirmButtonText:'<span class="text-white fs-4 px-1">是</span>',cancelButtonText:'<span class="text-white fs-4 px-1">否</span>'}).then(n=>{n.isConfirmed?e.close():n.isDismissed&&(e.fire({title:"即將返回文章總覽",icon:"success",showConfirmButton:!1}),setTimeout(()=>{window.location.href="./admin_article.html"},1e3))}):e.fire({title:"是否要刪除文章",icon:"warning",showCancelButton:!0,confirmButtonColor:"#20c997",cancelButtonColor:"#dc3545",confirmButtonText:'<span class="text-white fs-4 px-1">是</span>',cancelButtonText:'<span class="text-white fs-4 px-1">否</span>'}).then(n=>{n.isConfirmed&&a.delete(`${s}/660/article/${c}`,l).then(function(){e.fire({title:"已成功刪除文章",icon:"success",showConfirmButton:!1}),setTimeout(()=>{window.location.href="./admin_article.html"},1e3)}).catch(function(o){r(o.response.data)})})});function p(){let t=w().format("YYYY-MM-DD");localStorage.setItem("articleLastEditOrPublishTime",t)}
