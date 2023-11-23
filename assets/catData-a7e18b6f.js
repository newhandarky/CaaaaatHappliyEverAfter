import{a as $,_ as D}from"./config-82256151.js";import{i as g}from"./navbar-5c89ec87.js";import"./aside-096a2e7a.js";const b=document.querySelectorAll("#catData");b.forEach(s=>{s.classList.add("onThisPage")});const _=JSON.parse(localStorage.getItem("userTokenAndData")),{accessToken:y,user:w}=_,I=document.getElementById("catAdd");function B(){const s=w.id;$.get(`${D}/600/cats?_expand=user&userId=${s}`,{headers:{authorization:`Bearer ${y}`}}).then(a=>{const l=a.data,n=JSON.parse(localStorage.getItem("userTokenAndData"));n.showCatinCatPage=l,localStorage.setItem("userTokenAndData",JSON.stringify(n));let i=[];l.forEach((e,t)=>{console.log(e);const{catName:c,catPhoto:o,gender:d,birthday:f,catBreeds:h,colors:v,weight:p,id:u}=e;console.log(c,d,f,h,v,p,u);const A=()=>d==="male"?"男 ":d==="female"?"女 ":d==="other"?"其他 ":"未定義",E=document.getElementById("catInfo");let S=JSON.stringify(`
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
                  <h1 id="catName_${t}" class="catName">${c}</h1>
                  <ul>
                    <li id="catGender_${t}" class="catGender">
                      性別：${A()}
                    </li>
                    <li id="catBirthday_${t}" class="catBirthday">
                      生日：${f}
                    </li>
                    <li id="catBreeds_${t}" class="catBreeds">
                      品種：${h}
                    </li>
                    <li id="catColors_${t}" class="catColors">
                      花色：${v}
                    </li>
                    <li id="catWeight_${t}" class="catWeight">
                      體重：${p} Kg
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
                  src="../assets/images/photoFrame.svg"
                  alt="photoFrame"
                />
                <div class="photoGroup position-absolute">
                  <img
                    id="catPhoto_${t}"
                    class="photo img-fluid rounded mx-auto d-block"
                    src="${o}"
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
                  data-catId="${u}"
                  class="catEdit"
                  href="./editCat.html"
                  >編輯貓咪</a
                >
              </div>
              <div class="catBtn primaryFill-btn-primary">
                <button
                  id="catDelete_${t}"
                  data-Index="${t}"
                  data-catId="${u}"
                  class="catDelete"
                >
                  刪除貓咪
                </button>
              </div>
            </div>
          </div>
          <hr class="m-5" style="border: 1.5px solid black;">
        `);i+=JSON.parse(S),console.log(i),E.innerHTML=i});const r=document.querySelectorAll(".catEdit");console.log(r),r.forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();const c=e.getAttribute("href"),o=e.getAttribute("data-catId");console.log(o),localStorage.setItem("catEditId",JSON.stringify(o)),g(c)})});const m=document.querySelectorAll(".catDelete");console.log(m),m.forEach(e=>{e.addEventListener("click",t=>{t.preventDefault(),g();const c=e.getAttribute("data-catId");console.log(c),$.delete(`${D}/600/cats/${c}`,{headers:{authorization:`Bearer ${y}`}}).then(o=>{console.log(o),alert("刪除貓咪成功"),window.location.href="./catData.html"}).catch(o=>{console.log(o),alert("刪除貓咪失敗"),window.location.href="./login.html"})})})}).catch(a=>{console.log(a);const l=a.response.data;if(console.log(l),l==="Private resource access: entity must have a reference to the owner id"){const n=document.getElementById("catInfo");let i=JSON.stringify(`
        <div id="catContainer_add" class="catContainer d-flex justify-content-center align-items-center m-5">
          <h1 id="catAddTitle" class="catAddTitle">快來新增您的愛貓！</h1>        
        </div>
      `),r=JSON.parse(i);n.innerHTML=r}else alert(a),window.location.href="./login.html"})}B();I.addEventListener("click",s=>{s.preventDefault();const a=I.getAttribute("href");console.log(a),g(a)});
