import{a as u,_ as h}from"./config-3a988531.js";import{i as g}from"./navbar-64ba0015.js";import"./aside-136a93d9.js";import{f as k}from"./index-a4e39586.js";const L=document.querySelectorAll("#memberData");L.forEach(t=>{t.classList.add("onThisPage")});const A=document.querySelector("#navAside");A.classList.remove("d-none");k("#birthday",{enableTime:!1,dateFormat:"Y-m-d"});const F=JSON.parse(localStorage.getItem("userTokenAndData")),{accessToken:y,user:D}=F,$=document.getElementById("editMemberFrom"),i=document.getElementById("cancelEdit"),w=document.getElementById("myFile"),m={};function S(){const t=D.id;u.get(`${h}/600/users/${t}`,{headers:{authorization:`Bearer ${y}`}}).then(e=>{const{name:o,gender:n,birthday:a,address:d,phone:s,email:r,userPhoto:l}=e.data,c=document.getElementById("name"),f=document.getElementById("male"),E=document.getElementById("female"),I=document.getElementById("other"),b=document.getElementById("birthday"),p=document.getElementById("phone"),B=document.getElementById("address"),v=document.getElementById("photo");c.value=o,function(){n==="male"?f.checked=!0:n==="female"?E.checked=!0:n==="other"&&(I.checked=!0)}(),b.value=a,p.value=s,B.value=d,v.setAttribute("src",l),document.querySelector("#loading").classList.add("d-none")}).catch(e=>{console.log(e)})}S();function T(t){const e=D.id;u.patch(`${h}/600/users/${e}`,t,{headers:{authorization:`Bearer ${y}`}}).then(o=>{console.log(o),alert("修改會員資料成功"),window.location.href="./member.html"}).catch(o=>{console.log(o),alert(`修改會員資料失敗 請重新登入後嘗試 /n錯誤提示：${o.response.data}`),window.location.href="./login.html"})}$.addEventListener("submit",t=>{t.preventDefault(),g();const e=document.getElementById("name"),o=document.getElementById("male"),n=document.getElementById("female"),a=document.getElementById("other"),d=document.getElementById("birthday"),s=document.getElementById("phone"),r=document.getElementById("address");let l=()=>o.checked?male.value:n.checked?female.value:a.checked?other.value:"Not Specified",c={name:e.value,gender:l(),birthday:d.value,phone:s.value,address:r.value,userPhoto:m.base64Image};console.log(c),T(c)});i.addEventListener("click",t=>{t.preventDefault();const e=i.getAttribute("href");g(e)});w.addEventListener("change",t=>{const e=t.target.files[0],o=new FileReader;o.onload=n=>{const a=n.target.result;m.base64Image=a,m.fileName=e.name;const d=document.getElementById("photo");d.src=m.base64Image},o.readAsDataURL(e),console.log(m)});
