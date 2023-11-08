import axios from "axios";
import { _url } from "./config";
import { isLogin } from "./isLogin";
import flatpickr from "flatpickr";

//flatpickr 套件使用
flatpickr("#catBirthday", {
  enableTime: false,
  dateFormat: "Y-m-d",
});

//取得所需要的資療及DOM元素
const userTokenAndData = JSON.parse(localStorage.getItem("userTokenAndData"));
const { accessToken, user } = userTokenAndData;
const catEditId = JSON.parse(localStorage.getItem("catEditId"));
const editCatFrom = document.getElementById("editCatFrom");

const myCatFile = document.getElementById("myCatFile");
const catlDelete = document.getElementById("catlDelete");

// 上傳圖片需要轉存為 Base64 數據宣告
const imageData = {};
console.log(imageData);

// 呈現input 舊資料的值
function showOriginalData() {
  axios
    .get(`${_url}/600/cats/${catEditId}`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      const {
        catName,
        catBreeds,
        colors,
        gender,
        birthday,
        weight,
        userId,
        catPhoto,
      } = res.data;

      console.log(birthday);
      //抓取表單資料

      const catNameDom = document.getElementById("catName");
      const catMaleDom = document.getElementById("catMale");
      const catFemaleDom = document.getElementById("catFemale");
      const catOtherDom = document.getElementById("catOther");
      const catBirthdayDom = document.getElementById("catBirthday");
      const catBreedsDom = document.getElementById("catBreeds");
      const catColorsDom = document.getElementById("catColors");
      const catWeightDom = document.getElementById("catWeight");
      const catPhotoDom = document.getElementById("catPhoto");

      // 把原有的資料呈現 input 裡面
      catNameDom.value = catName;
      // 資料是什麼性別 DOM就呈現在 input 裡面
      (function isGender() {
        if (gender === "male") {
          catMaleDom.checked = true;
        } else if (gender === "female") {
          catFemaleDom.checked = true;
        } else if (gender === "other") {
          catOtherDom.checked = true;
        }
      })();
      catBirthdayDom.value = birthday;
      catBreedsDom.value = catBreeds;
      catColorsDom.value = colors;
      catWeightDom.value = weight;
      catPhotoDom.setAttribute("src", catPhoto);
    })
    .catch((err) => {
      console.log(err);
      alert(err);
      window.location.href = "./login.html";
    });
}

showOriginalData();

// // 變更資料 function
function editData(catData) {
  const memberId = user.id;
  axios
    .patch(`${_url}/600/cats/${catEditId}`, catData, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      console.log(res);
      alert("修改貓咪資料成功");
      window.location.href = "./catData.html";
    })
    .catch((err) => {
      //錯誤提示
      console.log(err);
      alert(
        `修改貓咪資料失敗 請重新登入後嘗試 /n錯誤提示：${err.response.data}`
      );
      window.location.href = "./login.html";
    });
}

// //按下完成編輯
editCatFrom.addEventListener("submit", (e) => {
  e.preventDefault();

  //先判斷是否為登入狀態
  // isLoginStay 是自訂一的函數 判斷登入狀態
  isLogin();

  //抓取表單資料 除了圖片

  const catNameDom = document.getElementById("catName");
  const catMaleDom = document.getElementById("catMale");
  const catFemaleDom = document.getElementById("catFemale");
  const catOtherDom = document.getElementById("catOther");
  const catBirthdayDom = document.getElementById("catBirthday");
  const catBreedsDom = document.getElementById("catBreeds");
  const catColorsDom = document.getElementById("catColors");
  const catWeightDom = document.getElementById("catWeight");

  //判斷哪個性別被選取
  let gender = () =>
    // 使用三元条件运算符来判断哪个性别被选取，并返回相应的值
    catMaleDom.checked
      ? catMaleDom.value
      : catFemaleDom.checked
      ? catFemaleDom.value
      : catOtherDom.checked
      ? catOtherDom.value
      : "Not Specified";

  let catData = {
    catName: catNameDom.value,
    catBreeds: catBreedsDom.value,
    colors: catColorsDom.value,
    gender: gender(),
    birthday: catBirthdayDom.value,
    weight: catWeightDom.value,
    catPhoto: imageData.base64Image,
    userId: user.id,
  };
  console.log(catData);

  // 使用編輯函數來編輯會員資料
  editData(catData);
});

// 按下取消編輯時 偵測是否為登入狀態
cancelEdit.addEventListener("click", (e) => {
  e.preventDefault();

  const cancelEditHerf = cancelEdit.getAttribute("href");

  // isLoginToHref 是自訂一的函數 判斷登入狀態 需要帶入前往的網址頁面路徑
  isLogin(cancelEditHerf);
});

//上傳圖片

myCatFile.addEventListener("change", (event) => {
  // 抓到選擇的圖片檔案描述
  const selectedFile = event.target.files[0];

  // 轉換圖片格式為 Base64
  const reader = new FileReader();

  reader.onload = (e) => {
    const base64Data = e.target.result;

    // 将图像数据编码为 Base64 字符串

    imageData.base64Image = base64Data;
    imageData.fileName = selectedFile.name;

    // 将图像数据显示在<img>元素中
    const catPhotoDom = document.getElementById("catPhoto");
    catPhotoDom.src = imageData.base64Image;

    // 在这里可以将 imageData 发送到后端，更新用户的头像等操作
  };

  reader.readAsDataURL(selectedFile);
  console.dir(imageData);
});
