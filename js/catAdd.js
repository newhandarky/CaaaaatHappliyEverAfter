import axios from "axios";
import { _url } from "./config";
import { isLogin } from "./isLogin";
import flatpickr from "flatpickr";
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

//flatpickr 套件使用
flatpickr("#catBirthday", {
  enableTime: false,
  dateFormat: "Y-m-d",
});

//當資料載入完成時，隱藏 loading 元素
const loadingDom = document.querySelector("#loading");
loadingDom.classList.toggle("d-none");

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
          title: "新增貓咪成功",
          icon: "success",
          confirmButtonText: "確定",
        })
        .then((result) => {
          //按下確定後頁面跳轉
          window.location.href = "./catData.html";
        });

      //再來要同步更新會員裡面的 catDataId
      //始終覺得catDataId不需要 新增貓咪及編輯都要配合很麻煩 先暫時不寫
    })
    .catch((err) => {
      //錯誤提示
      console.log(err);
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-custom-confirm",
          cancelButton: "btn btn-custom-cancel",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "新增貓咪失敗",
          text: "請重新登入後再嘗試",
          confirmButtonText: "確定",
        })
        .then((result) => {
          window.location.href = "./login.html";
        });
    });
}

// //按下完成新增
addCatFrom.addEventListener("submit", (e) => {
  e.preventDefault();

  //當資料載入時，顯示 loading 元素 並隱藏 catInfo 元素
  const catAddDom = document.querySelector("#catAdd");
  catAddDom.classList.toggle("d-none");
  const loadingDom = document.querySelector("#loading");
  loadingDom.classList.toggle("d-none");

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
    catBreeds: catBreedsDom.value,
    colors: catColorsDom.value,
    gender: gender(),
    birthday: catBirthdayDom.value,
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
