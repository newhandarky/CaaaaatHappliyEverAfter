import axios from "axios";
import { _url } from "./config";
import { isLogin } from "./isLogin";

//取得所需要的資療及DOM元素
const userTokenAndData = JSON.parse(localStorage.getItem("userTokenAndData"));
const { accessToken, user } = userTokenAndData;
const catEdit = document.getElementById("catEdit");
const catDelete = document.getElementById("catDelete");
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
      //抓到後端回傳的貓咪資料
      const userCat = res.data;

      //開始創建 DOM 元素
      let resultDom = [];
      userCat.forEach((element) => {
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

        const catInfoDOM = document.getElementById("catInfo");
        let createCatDataDOM = JSON.stringify(`
        <div id="catContainer_${id}" class="catContainer">
        <h1 id="catName_${id}" class="catName">${catName}</h1>
        <ul>
          <li id="catGender_${id}" class="catGender">性別：${gender}</li>
          <li id="catBirthday_${id}" class="catBirthday">生日：${birthday}</li>
          <li id="catBreeds_${id}" class="catBreeds">品種：${catBreeds}</li>
          <li id="catColors_${id}" class="catColors">花色：${colors}</li>
          <li id="catWeight_${id}" class="catWeight">體重：${weight} Kg</li>
        </ul>
        <img id="catPhoto_${id}" src="${catPhoto}" alt="貓咪照片" />
        <br />
        <button id="catEdit_${id}" data-catId="${id}" class="catEdit">編輯資料</button>
        <button id="catDelete_${id}" class="catDelete">刪除資料</button>
      </div>
      `);

        resultDom += JSON.parse(createCatDataDOM);
        console.log(resultDom);

        catInfoDOM.innerHTML = resultDom;
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
