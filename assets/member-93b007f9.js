import"./bootstrap.min-47e23b13.js";import{i as E}from"./navbar-a947fc30.js";import"./aside-c7b7c768.js";import{a as I,_ as b}from"./config-4096d6dc.js";const B=document.querySelectorAll("#memberData");B.forEach(t=>{t.classList.add("onThisPage")});const f=document.querySelector("#navAside");f.classList.remove("d-none");const x=JSON.parse(localStorage.getItem("userTokenAndData")),{accessToken:L,user:A}=x,C=document.getElementById("signout"),c=document.getElementById("editMember");function $(){const t=A.id;I.get(`${b}/600/users/${t}`,{headers:{authorization:`Bearer ${L}`}}).then(e=>{const{name:n,gender:o,birthday:d,address:s,phone:m,email:a,userPhoto:r}=e.data,i=document.getElementById("name"),l=document.getElementById("gender"),g=document.getElementById("birthday"),u=document.getElementById("address"),h=document.getElementById("phone"),y=document.getElementById("email"),D=document.getElementById("photo"),p=()=>o==="male"?"男 ":o==="female"?"女 ":o==="other"?"其他 ":"未定義";console.log(n,o,d,s,m,a,r),i.textContent=n,l.textContent=`性別： ${p()}`,g.textContent=`生日： ${d}`,u.textContent=`地址： ${s}`,h.textContent=`電話： ${m}`,y.textContent=`信箱：${a}`,D.setAttribute("src",r||"https://i.imgur.com/rUTLxZC.jpg"),document.querySelector("#loading").classList.add("d-none")}).catch(e=>{console.log(e),alert(e),window.location.href="./login.html"})}$();C.addEventListener("click",()=>{localStorage.removeItem("userTokenAndData"),window.location.href="./index.html"});c.addEventListener("click",t=>{t.preventDefault();const e=c.getAttribute("href");E(e)});
