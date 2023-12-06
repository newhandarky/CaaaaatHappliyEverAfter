import{a as y,_ as $,S as w}from"./sweetalert2.all-203b6da2.js";import{i as D}from"./navbar-96c5072d.js";import"./aside-9519be0b.js";const E=document.querySelectorAll("#catData");E.forEach(s=>{s.classList.add("onThisPage")});const C=document.querySelector("#navAside");C.classList.remove("d-none");const x=JSON.parse(localStorage.getItem("userTokenAndData")),{accessToken:b,user:T}=x,I=document.getElementById("catAdd");function _(){const s=T.id;y.get(`${$}/600/cats?_expand=user&userId=${s}`,{headers:{authorization:`Bearer ${b}`}}).then(a=>{document.querySelector("#loading").classList.toggle("d-none");const f=a.data,d=JSON.parse(localStorage.getItem("userTokenAndData"));d.showCatinCatPage=f,localStorage.setItem("userTokenAndData",JSON.stringify(d));let l=[];f.forEach((e,t)=>{console.log(e);const{catName:o,catPhoto:c,gender:i,birthday:h,catBreeds:r,colors:n,weight:m,id:v}=e;console.log(o,i,h,r,n,m,v);const S=()=>i==="male"?"男 ":i==="female"?"女 ":i==="other"?"其他 ":"未定義",B=document.getElementById("catInfo");let A=JSON.stringify(`
        <div class="d-flex flex-column">
            <div
              class="catData d-flex flex-lg-row flex-column justify-content-center align-items-center"
            >
              <div
                id="userDataPresent"
                class="userDataPresent flex-grow-1 position-relative d-flex justify-content-center"
              >
                <div
                  id="catContainer_${t}"
                  class="w-10 d-inline-flex flex-column"
                >
                  <h1 id="catName_${t}" class="catName">${o}</h1>
                  <ul>
                    <li id="catGender_${t}" class="catGender">
                      性別：${S()}
                    </li>
                    <li id="catBirthday_${t}" class="catBirthday">
                      生日：${h}
                    </li>
                    <li id="catBreeds_${t}" class="catBreeds">
                      品種：${r}
                    </li>
                    <li id="catColors_${t}" class="catColors">
                      花色：${n}
                    </li>
                    <li id="catWeight_${t}" class="catWeight">
                      體重：${m} Kg
                    </li>
                  </ul>
                </div>
              </div>
              <div
                id="userPhotoPresent"
                class="userPhotoPresent position-relative flex-grow-1 d-flex justify-content-center align-items-center"
              >
                <img
                  class="photoFrame position-absolute"
                  src="https://raw.githubusercontent.com/newhandarky/CaaaaatHappliyEverAfter/7222ac29b8d1b1ab3264841bac1f6071103016c3/assets/images/photoFrame.svg"
                  alt="photoFrame"
                />
                <div class="photoGroup position-absolute">
                  <img
                    id="catPhoto_${t}"
                    class="photo img-fluid rounded mx-auto d-block"
                    src="${c}"
                    alt="貓咪照片"
                  />
                </div>
              </div>
            </div>
            <div
              class="catBtns d-flex flex-column justify-content-around align-items-center"
            >
              <div class="catBtn primaryStroke-btn-primary">
                <a
                  id="catEdit_${t}"
                  data-Index="${t}"
                  data-catId="${v}"
                  class="catEdit"
                  href="./editCat.html"
                  >編輯貓咪</a
                >
              </div>
              <div class="catBtn primaryFill-btn-primary">
                <button
                  id="catDelete_${t}"
                  data-Index="${t}"
                  data-catId="${v}"
                  class="catDelete"
                >
                  刪除貓咪
                </button>
              </div>
            </div>
          </div>
          <hr class="m-5" style="border: 1.5px solid black;">
        `);l+=JSON.parse(A),console.log(l),B.innerHTML=l});const u=document.querySelectorAll(".catEdit");console.log(u),u.forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();const o=e.getAttribute("href"),c=e.getAttribute("data-catId");console.log(c),localStorage.setItem("catEditId",JSON.stringify(c)),D(o)})});const p=document.querySelectorAll(".catDelete");console.log(p),p.forEach(e=>{e.addEventListener("click",t=>{t.preventDefault(),D();const o=w.mixin({customClass:{confirmButton:"btn btn-custom-confirm",cancelButton:"btn btn-custom-cancel"},buttonsStyling:!1});o.fire({title:"確定要刪除貓咪嗎?",text:"刪除後將無法還原此貓咪資料",icon:"warning",showCancelButton:!0,confirmButtonText:"是的 我要刪除!",cancelButtonText:"不 取消刪除!",reverseButtons:!0}).then(c=>{if(c.isConfirmed){document.querySelector("#catInfo").classList.toggle("d-none"),document.querySelector("#loading").classList.toggle("d-none");const r=e.getAttribute("data-catId");console.log(r),y.delete(`${$}/600/cats/${r}`,{headers:{authorization:`Bearer ${b}`}}).then(n=>{console.log(n),o.fire({title:"貓咪已刪除",icon:"success",confirmButtonText:"確定"}).then(m=>{window.location.href="./catData.html"})}).catch(n=>{console.log(n),o.fire({title:"刪除貓咪失敗",text:"請重新登入後再嘗試",confirmButtonText:"確定"}).then(m=>{window.location.href="./login.html"})})}})})})}).catch(a=>{console.log(a);const g=a.response.data;if(console.log(g),g==="Private resource access: entity must have a reference to the owner id"){const d=document.getElementById("catInfo");let l=JSON.stringify(`
        <div id="catContainer_add" class="catContainer d-flex justify-content-center align-items-center m-5">
          <h1 id="catAddTitle" class="catAddTitle">快來新增您的愛貓！</h1>        
        </div>
      `),u=JSON.parse(l);d.innerHTML=u}else alert(a),window.location.href="./login.html";document.querySelector("#loading").classList.add("d-none")})}_();I.addEventListener("click",s=>{s.preventDefault();const a=I.getAttribute("href");console.log(a),D(a)});
