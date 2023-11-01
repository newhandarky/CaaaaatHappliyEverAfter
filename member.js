import axios from "axios";

const host = "https://catroomdb.onrender.com";
const userTokenAndData = JSON.parse(localStorage.getItem("userTokenAndData"));
const { accessToken, user } = userTokenAndData;
const signoutBtn = document.getElementById("signout");

//抓到localsorage 的資料去後端回傳
function lodingMember(userTokenAndData) {
  //使用 Json Server 驗證路由 /600
  const { accessToken, user } = userTokenAndData;
  const memberId = user.id;
  axios
    .get(`${host}/600/users/${memberId}`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      const { name, gender, birthday, address, phone, email } = res.data;

      //抓取頁面物件 準備推資料
      const nameDom = document.getElementById("name");
      const genderDom = document.getElementById("gender");
      const birthdayDom = document.getElementById("birthday");
      const addressDom = document.getElementById("address");
      const phoneDom = document.getElementById("phone");
      const emailDom = document.getElementById("email");

      console.log(name, gender, birthday, address, phone, email);

      nameDom.textContent = name;
      genderDom.textContent = `性別： ${gender}`;
      birthdayDom.textContent = `生日： ${birthday}`;
      addressDom.textContent = `地址： ${address}`;
      phoneDom.textContent = `電話： ${phone}`;
      emailDom.textContent = `信箱：${email}`;
    })
    .catch((err) => {
      console.log(err);
      alert(err);
      window.location.href = "./login.html";
    });
}

lodingMember(userTokenAndData);

//登出點擊後 刪除 localStorage 資料 並導回首頁
signoutBtn.addEventListener("click", () => {
  localStorage.removeItem("userTokenAndData");
  window.location.href = "./index.html";
});
