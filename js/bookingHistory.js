import axios from "axios";
import { _url } from "./config";
import { isLogin } from "./isLogin";

//取得所需要的資療及DOM元素
const userTokenAndData = JSON.parse(localStorage.getItem("userTokenAndData"));
const { accessToken, user } = userTokenAndData;

//呈現全部的資料
function lodingBookin() {
  const memberId = user.id;

  axios
    .get(`${_url}/600/bookings?userId=${memberId}&_expand=user&_expand=room`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      const allBookingData = res.data;

      allBookingData.forEach((element, index) => {
        //抽出所需要的資料
        const { bookingDate, checkIn, checkOut, state, price, room, id } =
          element;
        const { name } = room;

        // console.log(bookingDate, checkIn, checkOut, state, price, name);

        //抓到 DOM 並呈現資料
        const bookingInfo = document.getElementById("bookingInfo");
        bookingInfo.innerHTML = `<h3 id="checkIn" class="checkDate">${checkIn}</h3>
        <h3>→</h3>
        <h3 id="checkOut_${index}" class="checkDate">${checkOut}</h3>
        <h3 id="roomType_${index}" class="roomType">${name}</h3>
        <h5 id="bookingId_${index}" class="bookingId">訂單編號 ${id}</h5>
        <h1 id="price_${index}" class="price">${price}</h1>
        <h5 id="bookingDate_${index}" class="bookingDate">下單日期 ${bookingDate}</h5>
        <a id="editBooking_${index}" data-Index="${index}" data-catId="${id}" class="editBooking" href="./editBooking.html">修改訂單</a>
        <button id="cancelBooking_${index}" data-Index="${index}" data-catId="${id}" class="cancelBooking">取消訂單</button>`;
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
        const bookingInfo = document.getElementById("bookingInfo");
        let createCatAddDataDOM = JSON.stringify(`
        <div id="catContainer_add" class="catContainer">
        <h1 id="catAddTitle" class="catAddTitle">尚未有訂單資料！</h1>        
      </div>
      `);

        let resultDom = JSON.parse(createCatAddDataDOM);

        bookingInfo.innerHTML = resultDom;
      } else {
        alert(err);
        window.location.href = "./login.html";
      }
    });
}

lodingBookin();
