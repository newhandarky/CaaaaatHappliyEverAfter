import{a as D,_ as $}from"./config-3a988531.js";import{i as m}from"./navbar-64ba0015.js";import"./aside-136a93d9.js";const w=document.querySelectorAll("#catData");w.forEach(s=>{s.classList.add("onThisPage")});const C=document.querySelector("#navAside");C.classList.remove("d-none");const _=JSON.parse(localStorage.getItem("userTokenAndData")),{accessToken:I,user:k}=_,A=document.getElementById("catAdd");function B(){const s=k.id;D.get(`${$}/600/cats?_expand=user&userId=${s}`,{headers:{authorization:`Bearer ${I}`}}).then(a=>{document.querySelector("#loading").classList.add("d-none");const u=a.data,n=JSON.parse(localStorage.getItem("userTokenAndData"));n.showCatinCatPage=u,localStorage.setItem("userTokenAndData",JSON.stringify(n));let l=[];u.forEach((e,t)=>{console.log(e);const{catName:c,catPhoto:o,gender:r,birthday:h,catBreeds:v,colors:p,weight:y,id:g}=e;console.log(c,r,h,v,p,y,g);const b=()=>r==="male"?"男 ":r==="female"?"女 ":r==="other"?"其他 ":"未定義",E=document.getElementById("catInfo");let S=JSON.stringify(`
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
                      性別：${b()}
                    </li>
                    <li id="catBirthday_${t}" class="catBirthday">
                      生日：${h}
                    </li>
                    <li id="catBreeds_${t}" class="catBreeds">
                      品種：${v}
                    </li>
                    <li id="catColors_${t}" class="catColors">
                      花色：${p}
                    </li>
                    <li id="catWeight_${t}" class="catWeight">
                      體重：${y} Kg
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
                  data-catId="${g}"
                  class="catEdit"
                  href="./editCat.html"
                  >編輯貓咪</a
                >
              </div>
              <div class="catBtn primaryFill-btn-primary">
                <button
                  id="catDelete_${t}"
                  data-Index="${t}"
                  data-catId="${g}"
                  class="catDelete"
                >
                  刪除貓咪
                </button>
              </div>
            </div>
          </div>
          <hr class="m-5" style="border: 1.5px solid black;">
        `);l+=JSON.parse(S),console.log(l),E.innerHTML=l});const i=document.querySelectorAll(".catEdit");console.log(i),i.forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();const c=e.getAttribute("href"),o=e.getAttribute("data-catId");console.log(o),localStorage.setItem("catEditId",JSON.stringify(o)),m(c)})});const f=document.querySelectorAll(".catDelete");console.log(f),f.forEach(e=>{e.addEventListener("click",t=>{t.preventDefault(),m();const c=e.getAttribute("data-catId");console.log(c),D.delete(`${$}/600/cats/${c}`,{headers:{authorization:`Bearer ${I}`}}).then(o=>{console.log(o),alert("刪除貓咪成功"),window.location.href="./catData.html"}).catch(o=>{console.log(o),alert("刪除貓咪失敗"),window.location.href="./login.html"})})})}).catch(a=>{console.log(a);const d=a.response.data;if(console.log(d),d==="Private resource access: entity must have a reference to the owner id"){const n=document.getElementById("catInfo");let l=JSON.stringify(`
        <div id="catContainer_add" class="catContainer d-flex justify-content-center align-items-center m-5">
          <h1 id="catAddTitle" class="catAddTitle">快來新增您的愛貓！</h1>        
        </div>
      `),i=JSON.parse(l);n.innerHTML=i}else alert(a),window.location.href="./login.html";document.querySelector("#loading").classList.add("d-none")})}B();A.addEventListener("click",s=>{s.preventDefault();const a=A.getAttribute("href");console.log(a),m(a)});
