import{a as l,_ as u}from"./config-82256151.js";import{i as v}from"./navbar-5c89ec87.js";import"./aside-096a2e7a.js";const s=document.querySelector("#chooseFirstCat");document.querySelector(".chooseFirstCatList");const i=document.querySelector("#chooseSecondCat"),m=document.querySelector("#chooseThirdCat"),S=document.querySelector(".remark"),p=document.querySelector(".toProcess_3");let y=JSON.parse(localStorage.getItem("userTokenAndData")),r=y.user.id;console.log(r);l.get(`${u}/cats?userId=${r}`).then(function(d){let f=d.data,t=[];f.forEach(function(c){t.push(c.catName)}),console.log(t);let n='<option value="" disabled selected>請選擇貓咪</option>';t.forEach(function(c){let a=`<option value=${c}>${c}</option> `;n+=a}),s.innerHTML=n;let e=[];s.addEventListener("change",function(c){t.forEach(function(o){s.value!==o&&e.push(o)}),console.log(e);let a='<option value="" >請選擇貓咪</option>';e.forEach(function(o){let g=`<option value=${o}>${o}</option> `;a+=g}),i.innerHTML=a});let h=[];i.addEventListener("change",function(c){let a='<option value="" >請選擇貓咪</option>';e.forEach(function(o){i.value!==o&&h.push(o)}),console.log(h),h.forEach(function(o){let g=`<option value=${o}>${o}</option> `;a+=g}),m.innerHTML=a})});p.addEventListener("click",function(d){d.preventDefault();const f=p.getAttribute("href");v(f);let t={};if(t.remark=S.value,t.catId=[],s.value==="")return alert("請選擇貓咪");{let n=s.value;l.get(`${u}/cats?userId=${r}&catName=${n}`).then(function(e){console.log(e.data[0].id),t.catId.push(e.data[0].id),console.log(JSON.stringify(t)),sessionStorage.setItem("catInfo",JSON.stringify(t)),window.location.href="./bookingProcess_3.html"})}if(i.value!=""){{let n=i.value;l.get(`${u}/cats?userId=${r}&catName=${n}`).then(function(e){console.log(e.data[0].id),t.catId.push(e.data[0].id),console.log(JSON.stringify(t)),sessionStorage.setItem("catInfo",JSON.stringify(t)),window.location.href="./bookingProcess_3.html"})}if(m.value!=""){let n=m.value;l.get(`${u}/cats?userId=${r}&catName=${n}`).then(function(e){console.log(e.data[0].id),t.catId.push(e.data[0].id),console.log(JSON.stringify(t)),sessionStorage.setItem("catInfo",JSON.stringify(t)),window.location.href="./bookingProcess_3.html"})}}});