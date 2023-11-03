import axios from "axios";
import { _url } from "./config";

//取得所需要的資療及DOM元素
const userTokenAndData = JSON.parse(localStorage.getItem("userTokenAndData"));
const { accessToken, user } = userTokenAndData;
const catEdit = document.getElementById("catEdit");
const catDelete = document.getElementById("catDelete");

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

        const { catName, gender, birthday, catBreeds, colors, weight, id } =
          element;

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
          <li id="catWeight_${id}" class="catWeight">體重：${weight}</li>
        </ul>
        <img id="catPhoto_${id}" src="" alt="貓咪照片" />
        <br />
        <button id="catEdit_${id}" class="catEdit">編輯資料</button>
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
      //   alert(err);
      //   window.location.href = "./login.html";
    });
}

lodingCat();
