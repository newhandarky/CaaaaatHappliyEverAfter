import axios from "axios";
import { _url } from "./config";

//取得所需要的資療及DOM元素
const userTokenAndData = JSON.parse(localStorage.getItem("userTokenAndData"));
const { accessToken, user } = userTokenAndData;
const catEdit = document.getElementById("catEdit");
const catDelete = document.getElementById("catDelete");

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
      console.log(userCat);

      //抓到 CatUser DOM 元素
      const catUser = document.getElementById("catUser");
      console.log(catUser.innerHTML);
      //開始創建 DOM 元素
    })
    .catch((err) => {
      console.log(err);
      //   alert(err);
      //   window.location.href = "./login.html";
    });
}

lodingCat();
