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

//篩選資料類型
const filterType = document.getElementById("roomType");
filterType.addEventListener("change", (e) => {
  console.log(filterType.value);
  lodingBooking();
});

//跟後端抓資料功能
function graspAxiosData(catRoom_api, bookings_html) {
  //取消訂單按鈕的 HTML 結構
  const cancelBookingHTML = (index, id, checkIn, checkOut) => {
    return `<div class="orderBtns">
<div id="btntype" class="primaryFill-btn-primary">
  <button
    id="cancelBooking_${index}"
    data-bookingsId="${id}"
    data-checkInDate="${checkIn}"
    data-checkOutDate="${checkOut}"
    class="cancelBookingBtn orderBtn"
  >
    取消訂單
  </button>
</div>
</div>`;
  };
  const evaluateBookingHTML = (index, id, checkIn, checkOut) => {
    return `<div class="orderBtns">
<div id="btntype" class="primaryFill-btn-primary02">
  <button
    id="evaluateBooking_${index}"
    data-bookingsId="${id}"
    data-checkInDate="${checkIn}"
    data-checkOutDate="${checkOut}"
    class="evaluateBookingBtn orderBtn"
    
  >
    評價訂單
  </button>
</div>
</div>`;
  };
  const isCancelBookingHTML = (index, id, checkIn, checkOut) => {
    return `<div class="orderBtns">
<div id="btntype" class="primaryDisabled-btn-primary">
  <button
    id="isCancelBooking_${index}"
    data-bookingsId="${id}"
    data-checkInDate="${checkIn}"
    data-checkOutDate="${checkOut}"
    class="isCancelBookingBtn orderBtn"
  >
    已取消
  </button>
</div>
</div>`;
  };

  //主要的 HTML 結構
  const mainBokingHTML = (
    index,
    checkIn,
    checkOut,
    quantity,
    name,
    id,
    bookingDate,
    price,
    btnHTML, //這邊是給判斷用 看是哪一個東西就加入哪個按鈕
    isCancel //如果是取消狀態 就輸入 "isCancel" 不是的話 就不用寫
  ) => {
    return ` 
<br>
<div class="catBarContainer ">
<div class="catEars">
  <div class="catEar">
    <img src="https://raw.githubusercontent.com/newhandarky/CaaaaatHappliyEverAfter/7222ac29b8d1b1ab3264841bac1f6071103016c3/assets/images/catEar02.svg" alt="catEar02" />
  </div>
  <div class="catEar">
    <img src="https://raw.githubusercontent.com/newhandarky/CaaaaatHappliyEverAfter/7222ac29b8d1b1ab3264841bac1f6071103016c3/assets/images/catEar02.svg" alt="catEar02" />
  </div>
</div>
<div class="catBarBorder mx-3">
  <div class="catBarInfo d-flex flex-column ${isCancel}">
    <div class="justify-content-center align-items-center ">
      <div class="d-flex flex-sm-row flex-column mb-5">
        <h3 id="checkIn_${index}" class="d-inline-block ">
          ${checkIn}
        </h3>
        <div class="d-flex justify-content-center mx-3">
          <img
            class="img-fluid d-sm-block d-none"
            src="https://raw.githubusercontent.com/newhandarky/CaaaaatHappliyEverAfter/7222ac29b8d1b1ab3264841bac1f6071103016c3/assets/icons/arrow.svg"
            alt="arrow"
          />
          <img
            class="img-fluid d-sm-none d-block"
            src="https://raw.githubusercontent.com/newhandarky/CaaaaatHappliyEverAfter/7222ac29b8d1b1ab3264841bac1f6071103016c3/assets/icons/arrowDown.svg"
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
  ${btnHTML}
</div>
</div>
<br>
`;
  };
  axios
    .get(catRoom_api, {
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
        bookingInfo.innerHTML +=
          bookings_html === "已預定"
            ? mainBokingHTML(
                index,
                checkIn,
                checkOut,
                quantity,
                name,
                id,
                bookingDate,
                price,
                cancelBookingHTML(index, id, checkIn, checkOut)
              )
            : bookings_html === "已完成"
            ? mainBokingHTML(
                index,
                checkIn,
                checkOut,
                quantity,
                name,
                id,
                bookingDate,
                price,
                evaluateBookingHTML(index, id, checkIn, checkOut)
              )
            : bookings_html === "已取消"
            ? mainBokingHTML(
                index,
                checkIn,
                checkOut,
                quantity,
                name,
                id,
                bookingDate,
                price,
                isCancelBookingHTML(index, id, checkIn, checkOut),
                "isCancel"
              )
            : "";
      });

      console.log(bookingInfo.innerHTML);
      if (bookingInfo.innerHTML === "") {
        bookingInfo.innerHTML = `<h1>沒有${filterType.value}資料</h1>`;
      }

      //掛載取消訂單功能
      cancelBooking();
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

//呈現資料
function lodingBooking() {
  const memberId = user.id;
  //抓到 DOM 並呈現資料
  const bookingInfo = document.getElementById("bookingInfo");
  //判斷當前篩選條件
  if (filterType.value == "已預定") {
    bookingInfo.innerHTML = "";
    graspAxiosData(
      `${_url}/600/bookings?userId=${memberId}&state=已預定&_expand=user&_expand=room`,
      filterType.value
    );
  } else if (filterType.value == "已完成") {
    bookingInfo.innerHTML = "";
    graspAxiosData(
      `${_url}/600/bookings?userId=${memberId}&state=已退房&_expand=user&_expand=room`,
      filterType.value
    );
  } else if (filterType.value == "已取消") {
    bookingInfo.innerHTML = "";
    graspAxiosData(
      `${_url}/600/bookings?userId=${memberId}&state=已取消&_expand=user&_expand=room`,
      filterType.value
    );
  } else {
    bookingInfo.innerHTML = `<div id="catContainer_add" class="catContainer">
    <h1 id="catAddTitle" class="catAddTitle">異常的篩選條件！</h1>        
  </div>`;
  }
}

//取消訂單功能
//取消訂房的邏輯: 修改訂單 -> 變更房型可預約狀態 -> 新增歷史紀錄
function cancelBooking() {
  //抓到該取消訂單的資料
  const cancelBookingBtn = document.querySelectorAll(".cancelBookingBtn");
  cancelBookingBtn.forEach((element) => {
    //抓到當前資料所有的訂單 id
    element.addEventListener("click", (e) => {
      // 按下刪除訂單時 偵測是否為登入狀態
      e.preventDefault();

      // isLoginToHref 是自訂一的函數 判斷登入狀態 需要帶入前往的網址頁面路徑
      isLogin();

      //取得對應資料 id 等等取消修改訂單 變更房型可預約狀態 新增歷史紀錄 都要用到
      let cancelId = element.getAttribute("data-bookingsId");
      console.log(cancelId);

      // //修改 bookins 該 id 訂單資料
      // axios
      //   .patch(
      //     `${_url}/600/bookings/${cancelId}`,
      //     { state: "已取消" },
      //     {
      //       headers: {
      //         authorization: `Bearer ${accessToken}`,
      //       },
      //     }
      //   )
      //   .then((res) => {
      //     alert(`您已取消訂單 `);
      //     console.log(res);
      //     //重新整理網頁
      //     window.location.reload();
      //   })
      //   .catch((err) => {
      //     console(err);
      //     alert("取消訂單失敗");
      //   });

      //取得對應資料的 checkInDay 等等 變更房型可預約狀態 都要用到
      let checkInDay = element.getAttribute("data-checkInDate");
      let checkOutDay = element.getAttribute("data-checkOutDate");
      console.log(checkInDay, checkOutDay);
    });
  });
}

lodingBooking();
