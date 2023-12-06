import{a,_ as o,S as n}from"./sweetalert2.all-203b6da2.js";import"./admin_header-cdcf5a9d.js";import{h as s}from"./admin_config-2cf1d757.js";import{r}from"./loginIsTimeUp-b8b3d4c8.js";const m=document.querySelector(".adminRoomList");let i;function u(){a.get(`${o}/660/rooms`,s).then(function(e){i=e.data,f()}).then(function(){const e=document.querySelector(".deleteRoomBtn");e&&e.addEventListener("click",function(t){t.preventDefault();const d=t.target.getAttribute("data-num");n.fire({title:"是否要刪除房型",icon:"error",showCancelButton:!0,confirmButtonColor:"#20c997",cancelButtonColor:"#dc3545",confirmButtonText:'<span class="text-white fs-4 px-1">是</span>',cancelButtonText:'<span class="text-white fs-4 px-1">否</span>'}).then(l=>{l.isConfirmed&&(a.delete(`${o}/660/rooms/${d}`,s).catch(function(c){r(c.response.data)}),n.fire({title:"已成功刪除房型",icon:"success",timer:1e3,showConfirmButton:!1}),setTimeout(()=>{window.location.href="./admin_rooms.html"},1e3))})})}).catch(function(e){r(e.response.data)})}u();function f(){let e="";i.forEach(function(t){t.state==="已預訂"?e+=`<tr>
      <td><img src="${t.imageUrl}" alt="${t.name}圖片"/></td>
      <td>${t.name}</td>
      <td>$${t.price}</td>
      <td>1</td>
      <td>
          <a href="./admin_roomsEditRoom.html?id=${t.id}"
            ><span class="material-symbols-outlined fs-2 text-primary">
              edit_square
            </span></a
          >
          <a style="cursor: not-allowed"
            ><span class="material-symbols-outlined fs-2 text-primary" data-num="${t.id}">
              delete
            </span></a
          >
      </td>
    </tr>`:e+=`<tr>
        <td><img src="${t.imageUrl}" alt="${t.name}圖片"/></td>
        <td>${t.name}</td>
        <td>$${t.price}</td>
        <td>1</td>
        <td>
            <a href="./admin_roomsEditRoom.html?id=${t.id}"
              ><span class="material-symbols-outlined fs-2 text-primary">
                edit_square
              </span></a
            >
            <a role="button"><span class="deleteRoomBtn material-symbols-outlined fs-2 text-primary" data-num="${t.id}">
                delete
              </span></a
            >
        </td>
      </tr>`}),m.innerHTML=e}
