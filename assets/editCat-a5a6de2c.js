import{a as u,_ as g}from"./config-82256151.js";import{i as h}from"./navbar-5c89ec87.js";import"./aside-096a2e7a.js";import{f as b}from"./index-a4e39586.js";const w=document.querySelectorAll("#catData");w.forEach(e=>{e.classList.add("onThisPage")});b("#catBirthday",{enableTime:!1,dateFormat:"Y-m-d"});const N=JSON.parse(localStorage.getItem("userTokenAndData")),{accessToken:B,user:y}=N,D=JSON.parse(localStorage.getItem("catEditId")),C=document.getElementById("editCatFrom"),L=document.getElementById("myCatFile");document.getElementById("catlDelete");const l={};console.log(l);function O(){u.get(`${g}/600/cats/${D}`,{headers:{authorization:`Bearer ${B}`}}).then(e=>{const{catName:t,catBreeds:o,colors:c,gender:a,birthday:n,weight:m,userId:i,catPhoto:s}=e.data;console.log(n);const r=document.getElementById("catName"),d=document.getElementById("catMale"),E=document.getElementById("catFemale"),I=document.getElementById("catOther"),f=document.getElementById("catBirthday"),v=document.getElementById("catBreeds"),p=document.getElementById("catColors"),k=document.getElementById("catWeight"),F=document.getElementById("catPhoto");r.value=t,function(){a==="male"?d.checked=!0:a==="female"?E.checked=!0:a==="other"&&(I.checked=!0)}(),f.value=n,v.value=o,p.value=c,k.value=m,F.setAttribute("src",s)}).catch(e=>{console.log(e),alert(e),window.location.href="./login.html"})}O();function P(e){y.id,u.patch(`${g}/600/cats/${D}`,e,{headers:{authorization:`Bearer ${B}`}}).then(t=>{console.log(t),alert("修改貓咪資料成功"),window.location.href="./catData.html"}).catch(t=>{console.log(t),alert(`修改貓咪資料失敗 請重新登入後嘗試 /n錯誤提示：${t.response.data}`),window.location.href="./login.html"})}C.addEventListener("submit",e=>{e.preventDefault(),h();const t=document.getElementById("catName"),o=document.getElementById("catMale"),c=document.getElementById("catFemale"),a=document.getElementById("catOther"),n=document.getElementById("catBirthday"),m=document.getElementById("catBreeds"),i=document.getElementById("catColors"),s=document.getElementById("catWeight");let r=()=>o.checked?o.value:c.checked?c.value:a.checked?a.value:"Not Specified",d={catName:t.value,catBreeds:m.value,colors:i.value,gender:r(),birthday:n.value,weight:s.value,catPhoto:l.base64Image,userId:y.id};console.log(d),P(d)});cancelEdit.addEventListener("click",e=>{e.preventDefault();const t=cancelEdit.getAttribute("href");h(t)});L.addEventListener("change",e=>{const t=e.target.files[0],o=new FileReader;o.onload=c=>{const a=c.target.result;l.base64Image=a,l.fileName=t.name;const n=document.getElementById("catPhoto");n.src=l.base64Image},o.readAsDataURL(t),console.dir(l)});