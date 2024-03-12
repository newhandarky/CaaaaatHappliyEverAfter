import{S as e,a as i,_ as c}from"./sweetalert2.all-203b6da2.js";import"./admin_header-cdcf5a9d.js";import{h as s}from"./admin_config-2cf1d757.js";import{r as m}from"./loginIsTimeUp-b8b3d4c8.js";const a=location.href.split("=")[1],u=document.querySelector(".roomName"),f=document.querySelector(".roomPrice"),l=document.querySelector(".roomUrl"),w=document.querySelector(".previewImage"),d=document.querySelector(".roomImage"),x=document.querySelector(".roomCatLimit"),p=document.querySelector(".roomFacilities"),C=document.querySelector(".roomMustKnow"),B=document.querySelector(".roomEditForm"),v=document.querySelector(".deleteRoomBtn");let r;function g(){i.get(`${c}/660/rooms/${a}`,s).then(function(t){r=t.data,y(r)}).catch(function(t){m(t.response.data)})}g();function y(t){u.value=t.name,f.value=t.price,l.value=t.imageUrl,d.setAttribute("src",t.imageUrl),x.value="1",p.textContent=t.facility,C.textContent="1. 請入住前確認貓咪都已注射疫苗 2. 特殊需求請在訂房時告知，若未告知恕不負責 3. 房費均已含飲食費用 4. 逾時每貓每小時加收$300"}B.addEventListener("submit",function(t){t.preventDefault();let o={name:u.value,imageUrl:l.value,price:Number(f.value),facility:p.textContent.split(",")};e.fire({title:"是否要儲存變更",icon:"warning",showCancelButton:!0,confirmButtonColor:"#20c997",cancelButtonColor:"#dc3545",confirmButtonText:'<span class="text-white fs-4 px-1">是</span>',cancelButtonText:'<span class="text-white fs-4 px-1">否</span>'}).then(n=>{n.isConfirmed&&i.patch(`${c}/660/rooms/${a}`,o,s).then(function(){e.fire({title:"房型編輯成功",icon:"success",showConfirmButton:!1}),setTimeout(()=>{window.location.href="./admin_rooms.html"},1e3)}).catch(function(h){console.log(h)})})});v.addEventListener("click",function(t){t.preventDefault(),r.state==="已預訂"?e.fire({title:"房型已預訂，禁止刪除！是否要繼續編輯",icon:"error",showCancelButton:!0,allowOutsideClick:!1,confirmButtonColor:"#20c997",cancelButtonColor:"#dc3545",confirmButtonText:'<span class="text-white fs-4 px-1">是</span>',cancelButtonText:'<span class="text-white fs-4 px-1">否</span>'}).then(o=>{o.isConfirmed?e.close():o.isDismissed&&(e.fire({title:"即將返回房型總覽",icon:"success",showConfirmButton:!1}),setTimeout(()=>{window.location.href="./admin_rooms.html"},1e3))}):e.fire({title:"是否要刪除房型",icon:"error",showCancelButton:!0,confirmButtonColor:"#20c997",cancelButtonColor:"#dc3545",confirmButtonText:'<span class="text-white fs-4 px-1">是</span>',cancelButtonText:'<span class="text-white fs-4 px-1">否</span>'}).then(o=>{o.isConfirmed&&i.delete(`${c}/660/rooms/${a}`,s).then(function(){e.fire({title:"已成功刪除房型",icon:"success",showConfirmButton:!1}),setTimeout(()=>{window.location.href="./admin_rooms.html"},1e3)}).catch(function(n){m(n.response.data)})})});w.addEventListener("click",S);function S(){d.setAttribute("src",l.value)}