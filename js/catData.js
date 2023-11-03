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
      userCat.forEach((element) => {
        console.log(element);
        const catUserDOM = document.getElementById("catUser");
        let createCatDataDOM = `
        <div id="catUser" class="catUser">
        <h1 id="catName" class="catName"></h1>
        <ul>
          <li id="catGender" class="catGender"></li>
          <li id="catBirthday" class="catBirthday"></li>
          <li id="catBreeds" class="catBreeds"></li>
          <li id="catColors" class="catColors"></li>
          <li id="catWeight" class="catWeight"></li>
        </ul>
        <img id="catPhoto" src="" alt="貓咪照片" />
        <br />
        <button id="catEdit" class="catEdit">編輯資料</button>
        <button id="catDelete" class="catDelete">刪除資料</button>
      </div>
      `;

        catUserDOM.innerHTML = createCatDataDOM;
      });

      console.log(h1);
    })
    .catch((err) => {
      console.log(err);
      //   alert(err);
      //   window.location.href = "./login.html";
    });
}

lodingCat();
