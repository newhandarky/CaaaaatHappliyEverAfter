import{a as u,_ as i,S as n}from"./sweetalert2.all-203b6da2.js";import"./navbar-96c5072d.js";import"./aside-9519be0b.js";const P=document.querySelectorAll("#changePassword");P.forEach(s=>{s.classList.add("onThisPage")});const S=document.querySelector("#navAside");S.classList.remove("d-none");const f=document.querySelector("#loading");f.classList.toggle("d-none");const y=document.querySelector("#oldPassword"),b=document.querySelector("#newPassword"),q=document.querySelector("#checkNewPassword"),D=JSON.parse(localStorage.getItem("userTokenAndData")),{accessToken:p,user:d}=D;document.querySelector("#changePasswordBtn");const m=document.querySelector("#changePasswordForm");console.log(m);m.addEventListener("submit",s=>{s.preventDefault(),document.querySelector("#changePasswordContainer").classList.toggle("d-none"),document.querySelector("#loading").classList.toggle("d-none");const g=d.id,w=d.email,h=y.value,r={email:w,password:h};console.log(r),u.post(`${i}/login`,r).then(t=>{console.log("驗證登入成功"),console.log(t);const e=b.value,c=q.value;e===c?(console.log("新密碼與確認新密碼核對正確"),u.patch(`${i}/600/users/${g}`,{password:e},{headers:{authorization:`Bearer ${p}`}}).then(o=>{console.log("修改密碼成功"),console.log(o),n.mixin({customClass:{confirmButton:"btn btn-custom-confirm",cancelButton:"btn btn-custom-cancel"},buttonsStyling:!1}).fire({title:"修改密碼成功",icon:"success",confirmButtonText:"確定"}).then(l=>{document.querySelector("#oldPassword").value="",document.querySelector("#newPassword").value="",document.querySelector("#checkNewPassword").value="",document.querySelector("#changePasswordContainer").classList.toggle("d-none"),document.querySelector("#loading").classList.toggle("d-none")})}).catch(o=>{console.log("修改密碼失敗"),console.log(o),n.mixin({customClass:{confirmButton:"btn btn-custom-confirm",cancelButton:"btn btn-custom-cancel"},buttonsStyling:!1}).fire({title:"修改密碼失敗",text:"請重新登入後再嘗試",confirmButtonText:"確定"}).then(l=>{window.location.href="./login.html"})})):n.mixin({customClass:{confirmButton:"btn btn-custom-confirm",cancelButton:"btn btn-custom-cancel"},buttonsStyling:!1}).fire({title:"確認新密碼不正確",icon:"error",confirmButtonText:"確定"}).then(a=>{document.querySelector("#oldPassword").value="",document.querySelector("#newPassword").value="",document.querySelector("#checkNewPassword").value="",document.querySelector("#changePasswordContainer").classList.toggle("d-none"),document.querySelector("#loading").classList.toggle("d-none")})}).catch(t=>{console.log("驗證登入失敗"),console.log(t.response.data),t.response.data=="Incorrect password",n.mixin({customClass:{confirmButton:"btn btn-custom-confirm",cancelButton:"btn btn-custom-cancel"},buttonsStyling:!1}).fire({title:"舊密碼輸入錯誤",icon:"error",confirmButtonText:"確定"}).then(c=>{document.querySelector("#oldPassword").value="",document.querySelector("#newPassword").value="",document.querySelector("#checkNewPassword").value="",document.querySelector("#changePasswordContainer").classList.toggle("d-none"),document.querySelector("#loading").classList.toggle("d-none")})})});