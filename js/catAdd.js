import axios from "axios";
import { _url } from "./config";
import { isLogin } from "./isLogin";

//取得所需要的資療及DOM元素
const userTokenAndData = JSON.parse(localStorage.getItem("userTokenAndData"));
const { accessToken, user } = userTokenAndData;
const addCatFrom = document.getElementById("addCatFrom");
const cancelAdd = document.getElementById("cancelAdd");
const myCatFile = document.getElementById("myCatFile");

// 上傳圖片需要轉存為 Base64 數據宣告
const imageData = {};

// // 新增貓咪資料 function
function catAddData(catData) {
  axios
    .post(`${_url}/cats`, catData, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      console.log(res);
      alert("新增貓咪資料成功");
      window.location.href = "./catData.html";

      //再來要同步更新會員裡面的 catDataId
      //始終覺得catDataId不需要 新增貓咪及編輯都要配合很麻煩 先暫時不寫
    })
    .catch((err) => {
      //錯誤提示
      console.log(err);
      alert(
        `新增貓咪資料失敗 請重新登入後嘗試 /n錯誤提示：${err.response.data}`
      );
      window.location.href = "./login.html";
    });
}

// //按下完成新增
addCatFrom.addEventListener("submit", (e) => {
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

  console.dir(catMaleDom);

  let catData = {
    catName: catNameDom.value,
    catBreeds: catBirthdayDom.value,
    colors: catColorsDom.value,
    gender: gender(),
    birthday: catBreedsDom.value,
    weight: catWeightDom.value,
    catPhoto: imageData.base64Image || "https://i.imgur.com/slCGtuf.png",
    userId: user.id,
  };
  console.log(catData);

  // // 使用新增貓咪函數來新增貓咪會員資料
  catAddData(catData);
});

// 按下取消新增時 偵測是否為登入狀態
cancelAdd.addEventListener("click", (e) => {
  e.preventDefault();

  const cancelAddHerf = cancelAdd.getAttribute("href");

  // isLoginToHref 是自訂一的函數 判斷登入狀態 需要帶入前往的網址頁面路徑
  isLogin(cancelAddHerf);
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
  console.log(imageData);
});
