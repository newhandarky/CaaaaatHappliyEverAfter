import{a as I,_ as b}from"./config-3a988531.js";import{i as p}from"./navbar-64ba0015.js";import"./aside-136a93d9.js";const B=document.querySelectorAll("#memberData");B.forEach(t=>{t.classList.add("onThisPage")});const f=document.querySelector("#navAside");f.classList.remove("d-none");const x=JSON.parse(localStorage.getItem("userTokenAndData")),{accessToken:L,user:A}=x,C=document.getElementById("signout"),c=document.getElementById("editMember");function $(){const t=A.id;I.get(`${b}/600/users/${t}`,{headers:{authorization:`Bearer ${L}`}}).then(e=>{const{name:o,gender:n,birthday:d,address:s,phone:a,email:m,userPhoto:r}=e.data,i=document.getElementById("name"),l=document.getElementById("gender"),g=document.getElementById("birthday"),u=document.getElementById("address"),h=document.getElementById("phone"),y=document.getElementById("email"),D=document.getElementById("photo"),E=()=>n==="male"?"男 ":n==="female"?"女 ":n==="other"?"其他 ":"未定義";console.log(o,n,d,s,a,m,r),i.textContent=o,l.textContent=`性別： ${E()}`,g.textContent=`生日： ${d}`,u.textContent=`地址： ${s}`,h.textContent=`電話： ${a}`,y.textContent=`信箱：${m}`,D.setAttribute("src",r||"https://i.imgur.com/rUTLxZC.jpg"),document.querySelector("#loading").classList.add("d-none")}).catch(e=>{console.log(e),alert(e),window.location.href="./login.html"})}$();C.addEventListener("click",()=>{localStorage.removeItem("userTokenAndData"),window.location.href="./index.html"});c.addEventListener("click",t=>{t.preventDefault();const e=c.getAttribute("href");p(e)});
