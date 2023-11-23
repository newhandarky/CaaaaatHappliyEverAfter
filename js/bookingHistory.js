import axios from "axios";
import { _url } from "./config";
import { isLogin } from "./isLogin";

// aside bar 顯示當前頁面
// 因為有兩個 aside bar 所以要用 querySelectorAll
const asideLocation = document.querySelectorAll("#bookingHistory");
asideLocation.forEach((element) => {
  element.classList.add("onThisPage");
});

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
      console.log(res);
      allBookingData.forEach((element, index) => {
        //抽出所需要的資料
        const {
          bookingDate,
          checkIn,
          checkOut,
          quantity,
          state,
          price,
          room,
          id,
        } = element;
        const { name } = room;
        // console.log(bookingDate, checkIn, checkOut, state, price, name);

        //抓到 DOM 並呈現資料
        const bookingInfo = document.getElementById("bookingInfo");
        bookingInfo.innerHTML += ` 
        <br>
        <div class="catBarContainer">
        <div class="catEars">
          <div class="catEar">
            <img src="../assets/images/catEar02.svg" alt="catEar02" />
          </div>
          <div class="catEar">
            <img src="../assets/images/catEar02.svg" alt="catEar02" />
          </div>
        </div>
        <div class="catBarBorder mx-3">
          <div class="catBarInfo d-flex flex-column">
            <div class="justify-content-center align-items-center">
              <div class="d-flex flex-sm-row flex-column mb-5">
                <h3 id="checkIn_${index}" class="d-inline-block">
                  ${checkIn}
                </h3>
                <div class="d-flex justify-content-center mx-3">
                  <img
                    class="img-fluid d-sm-block d-none"
                    src="../assets/icons/arrow.svg"
                    alt="arrow"
                  />
                  <img
                    class="img-fluid d-sm-none d-block"
                    src="../assets/icons/arrowDown.svg"
                    alt="arrow"
                  />
                </div>

                <h3 id="checkOut_${index}" class="d-inline-block">
                  ${checkOut}
                </h3>
              </div>
              <div class="d-flex flex-sm-row flex-column">
                <div class="d-flex flex-column">
                  <div class="d-flex">
                    <h3 id="roomType_${index}" class="roomType">
                      ${name}
                    </h3>

                    <h4
                      id="catsQuantity_${index}"
                      class="mt-1 catsQuantity"
                    >
                      ${quantity}隻貓
                    </h4>
                  </div>
                  <div class="d-flex">
                    <h5 class="text-center">訂單編號</h5>
                    <h5
                      id="bookingId_${index}"
                      class="text-center bookingId"
                    >
                      ${id}
                    </h5>
                  </div>
                  <div class="d-flex">
                    <h6 class="orderDate">下單日期</h6>
                    <h6
                      id="bookingId_${index}"
                      class="orderDate bookingId"
                    >
                      ${bookingDate}
                    </h6>
                  </div>
                </div>
                <div class="d-flex flex-grow-5 ms-sm-5 ms-0">
                  <h1 id="price_${index}" class="price">${price}NT</h1>
                </div>
              </div>
            </div>
          </div>
          <div class="orderBtns">
            <div id="btntype" class="primaryFill-btn-primary">
              <button
                id="cancelBooking_${index}"
                data-catId="${id}"
                class="orderBtn"
              >
                取消訂單
              </button>
            </div>
          </div>
        </div>
      </div>
      <br>
      `;
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
