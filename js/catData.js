import axios from "axios";
import { _url } from "./config";
import { isLogin } from "./isLogin";

//取得所需要的資療及DOM元素
const userTokenAndData = JSON.parse(localStorage.getItem("userTokenAndData"));
const { accessToken, user } = userTokenAndData;

const catAdd = document.getElementById("catAdd");

//創建 呈現貓咪資料的 HTML DOM 元素

//先抓到後端使用者的貓咪資料
function lodingCat() {
  const memberId = user.id;
  console.log(`${_url}/600/cats?_expand=user&userId=${memberId}`);

  axios
    .get(`${_url}/600/cats?_expand=user&userId=${memberId}`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
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
        <div id="catContainer_${index}" class="catContainer">
        <h1 id="catName_${index}" class="catName">${catName}</h1>
        <ul>
          <li id="catGender_${index}" class="catGender">性別：${genderToChiniese()}</li>
          <li id="catBirthday_${index}" class="catBirthday">生日：${birthday}</li>
          <li id="catBreeds_${index}" class="catBreeds">品種：${catBreeds}</li>
          <li id="catColors_${index}" class="catColors">花色：${colors}</li>
          <li id="catWeight_${index}" class="catWeight">體重：${weight} Kg</li>
        </ul>
        <img id="catPhoto_${index}" src="${catPhoto}" alt="貓咪照片" />
        <br />
        <a id="catEdit_${index}" data-Index="${index}" data-catId="${id}" class="catEdit" href="./editCat.html">編輯資料</a>
      </div>
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
        <div id="catContainer_add" class="catContainer">
        <h1 id="catAddTitle" class="catAddTitle">快來新增您的愛貓！</h1>        
      </div>
      `);

        let resultDom = JSON.parse(createCatAddDataDOM);

        catInfoDOM.innerHTML = resultDom;
      } else {
        alert(err);
        window.location.href = "./login.html";
      }
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

// 當按下編輯貓咪時 判斷是不是已登入 同時存入要編輯貓咪的 Id 到 localstorage

// catEdit.addEventListener("click", (e) => {
//   e.preventDefault();

//   const catEditHerf = catEdit.getAttribute("href");

//   //存入要編輯貓咪的 Id 到 localstorage
//   const catEditId = catEdit.getAttribute("data-catId");

//   console.log(catEditId, catEditHerf);

//   // isLogin 是自訂一的函數 判斷登入狀態 可以在確認後前往的網址頁面路徑
//   // isLogin(catEditHerf);
// });
