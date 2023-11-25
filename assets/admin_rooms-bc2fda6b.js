import{a as r,_ as d}from"./config-1ccbba12.js";import"./admin_header-61c175db.js";import"./sweetalert2.all-daafc72c.js";const e=document.querySelector(".adminRoomList");let a;function n(){r.get(`${d}/rooms`).then(function(t){a=t.data,s()}).catch(function(t){console.log(res.error)})}n();function s(){let t="";a.forEach(function(o){t+=`<tr>
    <td><img src="https://fakeimg.pl/150/" /></td>
    <td>${o.name}</td>
    <td>$${o.price}</td>
    <td>1</td>
    <td>
        <a href="./admin_roomsEditRoom.html?id=${o.id}"
          ><span class="material-symbols-outlined fs-2 text-dark">
            edit_square
          </span></a
        >
        <a href="./admin_roomsAddRoom.html"
          ><span class="material-symbols-outlined fs-2 text-dark">
            delete
          </span></a
        >
    </td>
  </tr>`}),e.innerHTML=t}
