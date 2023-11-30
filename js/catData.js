import axios from "axios";
import { _url } from "./config";
import { isLogin } from "./isLogin";
import Swal from "sweetalert2";

// aside bar 顯示當前頁面
// 因為有兩個 aside bar 所以要用 querySelectorAll
const asideLocation = document.querySelectorAll("#catData");
asideLocation.forEach((element) => {
  element.classList.add("onThisPage");
});

//navAside 顯示 因為是會員功能頁面
const navAside = document.querySelector("#navAside");
navAside.classList.remove("d-none");

//取得所需要的資療及DOM元素
const userTokenAndData = JSON.parse(localStorage.getItem("userTokenAndData"));
const { accessToken, user } = userTokenAndData;

const catAdd = document.getElementById("catAdd");

//創建 呈現貓咪資料的 HTML DOM 元素

//先抓到後端使用者的貓咪資料
function lodingCat() {
  const memberId = user.id;

  axios
    .get(`${_url}/600/cats?_expand=user&userId=${memberId}`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      //當資料載入完成時，隱藏 loading 元素
      const loadingDom = document.querySelector("#loading");
      loadingDom.classList.toggle("d-none");

      //回傳貓咪資料
      const userCat = res.data;
      //抓到後端回傳的貓咪資料 到 localstorage 的 userTokenAndData
      const userTokenAndData = JSON.parse(
        localStorage.getItem("userTokenAndData")
      );
      userTokenAndData.showCatinCatPage = userCat;

      localStorage.setItem(
        "userTokenAndData",
        JSON.stringify(userTokenAndData)
      );

      //開始創建 DOM 元素
      let resultDom = [];

      userCat.forEach((element, index) => {
        console.log(element);

        const {
          catName,
          catPhoto,
          gender,
          birthday,
          catBreeds,
          colors,
          weight,
          id,
        } = element;

        console.log(catName, gender, birthday, catBreeds, colors, weight, id);

        const genderToChiniese = () =>
          gender === "male"
            ? "男 "
            : gender === "female"
            ? "女 "
            : gender === "other"
            ? "其他 "
            : "未定義";

        const catInfoDOM = document.getElementById("catInfo");
        //準備 innerHtml 添加資料

        let createCatDataDOM = JSON.stringify(`
        <div class="d-flex flex-column">
            <div
              class="catData d-flex flex-lg-row flex-column justify-content-center align-items-center"
            >
              <div
                id="userDataPresent"
                class="userDataPresent flex-grow-1 position-relative d-flex justify-content-center"
              >
                <div
                  id="catContainer_${index}"
                  class="w-10 d-inline-flex flex-column"
                >
                  <h1 id="catName_${index}" class="catName">${catName}</h1>
                  <ul>
                    <li id="catGender_${index}" class="catGender">
                      性別：${genderToChiniese()}
                    </li>
                    <li id="catBirthday_${index}" class="catBirthday">
                      生日：${birthday}
                    </li>
                    <li id="catBreeds_${index}" class="catBreeds">
                      品種：${catBreeds}
                    </li>
                    <li id="catColors_${index}" class="catColors">
                      花色：${colors}
                    </li>
                    <li id="catWeight_${index}" class="catWeight">
                      體重：${weight} Kg
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
                    id="catPhoto_${index}"
                    class="photo img-fluid rounded mx-auto d-block"
                    src="${catPhoto}"
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
                  id="catEdit_${index}"
                  data-Index="${index}"
                  data-catId="${id}"
                  class="catEdit"
                  href="./editCat.html"
                  >編輯貓咪</a
                >
              </div>
              <div class="catBtn primaryFill-btn-primary">
                <button
                  id="catDelete_${index}"
                  data-Index="${index}"
                  data-catId="${id}"
                  class="catDelete"
                >
                  刪除貓咪
                </button>
              </div>
            </div>
          </div>
          <hr class="m-5" style="border: 1.5px solid black;">
        `);

        resultDom += JSON.parse(createCatDataDOM);
        console.log(resultDom);

        catInfoDOM.innerHTML = resultDom;
      });

      // 抓到每隻編輯貓咪的按鈕
      const catEdit = document.querySelectorAll(".catEdit");
      console.log(catEdit);
      //掛載每隻編輯貓咪按鈕的監聽
      catEdit.forEach((element) => {
        element.addEventListener("click", (e) => {
          e.preventDefault();

          const catEditHerf = element.getAttribute("href");

          //傳送要編輯隻貓咪的 Id 到 localstorge
          const catEditId = element.getAttribute("data-catId");
          console.log(catEditId);

          localStorage.setItem("catEditId", JSON.stringify(catEditId));

          // isLogin 是自訂一的函數 判斷登入狀態 可以在確認後前往的網址頁面路徑
          isLogin(catEditHerf);
        });
      });

      // 抓到每隻刪除貓咪的按鈕
      const catDelete = document.querySelectorAll(".catDelete");
      console.log(catDelete);

      //掛載每隻刪除貓咪按鈕的監聽
      catDelete.forEach((element) => {
        // 按下刪除貓咪時 偵測是否為登入狀態
        element.addEventListener("click", (e) => {
          e.preventDefault();

          // isLoginToHref 是自訂一的函數 判斷登入狀態 需要帶入前往的網址頁面路徑
          isLogin();

          //彈跳確認提示 按下後確認刪除
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-custom-confirm",
              cancelButton: "btn btn-custom-cancel",
            },
            buttonsStyling: false,
          });
          swalWithBootstrapButtons
            .fire({
              title: "確定要刪除貓咪嗎?",
              text: "刪除後將無法還原此貓咪資料",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "是的 我要刪除!",
              cancelButtonText: "不 取消刪除!",
              reverseButtons: true,
            })
            .then((result) => {
              if (result.isConfirmed) {
                //當資料載入時，顯示 loading 元素 並隱藏 catInfo 元素
                const catInfoDom = document.querySelector("#catInfo");
                catInfoDom.classList.toggle("d-none");
                const loadingDom = document.querySelector("#loading");
                loadingDom.classList.toggle("d-none");

                //執行刪除貓咪
                const catEditId = element.getAttribute("data-catId");
                console.log(catEditId);
                axios
                  .delete(`${_url}/600/cats/${catEditId}`, {
                    headers: {
                      authorization: `Bearer ${accessToken}`,
                    },
                  })
                  .then((res) => {
                    console.log(res);
                    swalWithBootstrapButtons
                      .fire({
                        title: "貓咪已刪除",
                        icon: "success",
                        confirmButtonText: "確定",
                      })
                      .then((result) => {
                        //按下確定後頁面跳轉
                        window.location.href = "./catData.html";
                      });
                  })
                  .catch((err) => {
                    console.log(err);

                    swalWithBootstrapButtons
                      .fire({
                        title: "刪除貓咪失敗",
                        text: "請重新登入後再嘗試",
                        confirmButtonText: "確定",
                      })
                      .then((result) => {
                        window.location.href = "./login.html";
                      });
                  });
              }
            });
        });
      });
    })
    .catch((err) => {
      console.log(err);
      const response = err.response.data;

      console.log(response);

      if (
        response ===
        "Private resource access: entity must have a reference to the owner id"
      ) {
        const catInfoDOM = document.getElementById("catInfo");
        let createCatAddDataDOM = JSON.stringify(`
        <div id="catContainer_add" class="catContainer d-flex justify-content-center align-items-center m-5">
          <h1 id="catAddTitle" class="catAddTitle">快來新增您的愛貓！</h1>        
        </div>
      `);

        let resultDom = JSON.parse(createCatAddDataDOM);

        catInfoDOM.innerHTML = resultDom;
      } else {
        alert(err);
        window.location.href = "./login.html";
      }
      //當資料載入完成時，隱藏 loading 元素
      const loadingDom = document.querySelector("#loading");
      loadingDom.classList.add("d-none");
    });
}

lodingCat();

//當按下新增貓咪檢查是否為登入狀態

catAdd.addEventListener("click", (e) => {
  e.preventDefault();

  const catAddHerf = catAdd.getAttribute("href");
  console.log(catAddHerf);

  isLogin(catAddHerf);
});
