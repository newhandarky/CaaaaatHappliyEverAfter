import Swal from "sweetalert2";
import { _url } from "./config";
import { isLogin } from "./isLogin";
import axios from "axios";

// aside bar 顯示當前頁面
// 因為有兩個 aside bar 所以要用 querySelectorAll
const asideLocation = document.querySelectorAll("#bookingHistory");
asideLocation.forEach((element) => {
  element.classList.add("onThisPage");
});

//navAside 顯示 因為是會員功能頁面
const navAside = document.querySelector("#navAside");
navAside.classList.remove("d-none");

//當資料載入完成時，隱藏 loading 元素
const loadingDom = document.querySelector("#loading");
loadingDom.classList.toggle("d-none");

let getStars = 0; // 得到的星星數

//星星功能
document.addEventListener("DOMContentLoaded", function () {
  const stars = document.querySelectorAll(".star");

  stars.forEach(function (star) {
    star.addEventListener("mouseover", function () {
      const rating = this.getAttribute("data-rating");

      for (let i = 1; i <= 5; i++) {
        const star = document.querySelector(`.star[data-rating="${i}"]`);
        star.classList.toggle("active", i <= rating);
      }
    });

    star.addEventListener("mouseout", function () {
      stars.forEach(function (star) {
        star.classList.remove("active");
      });
    });

    star.addEventListener("click", function () {
      const rating = this.getAttribute("data-rating");

      for (let i = 1; i <= 5; i++) {
        const star = document.querySelector(`.star[data-rating="${i}"]`);
        star.classList.toggle("pressed", i <= rating);
      }

      getStars = parseInt(rating, 10); // Set getStars to the clicked star rating
      console.log("getStars:", getStars); // Output getStars to console (you can remove this line in production)
    });
  });
});

//呈現訂單資料

//取得所需要的資療及DOM元素
const userTokenAndData = JSON.parse(localStorage.getItem("userTokenAndData"));
const { accessToken, user } = userTokenAndData;
const evaluateBooking_Id = JSON.parse(
  localStorage.getItem("evaluateBooking_Id")
);
axios
  .get(`${_url}/600/bookings/${evaluateBooking_Id}?_expand=room`, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  })
  .then((res) => {
    const bookingData = res.data;
    console.log(bookingData);
    const { checkIn, checkOut, room, quantity, cats, price, id } = bookingData;
    const { name } = room;
    const catQuantity = cats.length;
    //抓到DOM 畫面元素
    const checkInDom = document.querySelector("#checkIn");
    const checkOutDom = document.querySelector("#checkOut");
    const roomTypeDom = document.querySelector("#roomType");
    const catsQuantityDom = document.querySelector("#catsQuantity");
    const priceDom = document.querySelector("#price");
    const bookingIdDom = document.querySelector("#bookingId");

    checkInDom.textContent = `入住時間：${checkIn}`;
    checkOutDom.textContent = `退房時間：${checkOut}`;
    roomTypeDom.textContent = `入住房型：${name}`;
    catsQuantityDom.textContent = `貓咪數量：${catQuantity}隻貓`;
    priceDom.textContent = `總金額：${price} NT`;
    bookingIdDom.textContent = `訂房編號：${id}`;
  })
  .catch((err) => {
    console.log(err);
    console.log("獲取資料失敗");
  });

//按下送出評論
const evaluateBtn = document.querySelector("#evaluateBtn");
evaluateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  //當資料載入時，顯示 loading 元素 並隱藏 evaluateBooking 元素
  const evaluateBookingDom = document.querySelector("#evaluateBooking");
  evaluateBookingDom.classList.toggle("d-none");
  const loadingDom = document.querySelector("#loading");
  loadingDom.classList.toggle("d-none");

  let getComment = document.querySelector("#comment").value; //得到的評論
  if (getStars === 0) {
    evaluateBookingDom.classList.toggle("d-none");
    loadingDom.classList.toggle("d-none");
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-custom-confirm",
        cancelButton: "btn btn-custom-cancel",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons.fire({
      title: "請輸入星星數量在發送評論！",
      confirmButtonText: "確定",
    });
  } else {
    axios
      .patch(
        `${_url}/600/bookings/${evaluateBooking_Id}?userId=${user.id}`,
        { feedback: { stars: getStars, comment: getComment } },
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-custom-confirm",
            cancelButton: "btn btn-custom-cancel",
          },
          buttonsStyling: false,
        });
        swalWithBootstrapButtons
          .fire({
            title: "評論送出成功",
            icon: "success",
            confirmButtonText: "確定",
          })
          .then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              isLogin("./bookingHistory.html");
            }
          });
      })
      .catch((err) => {
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
            title: "評論送出失敗",
            text: "請重新登入後再嘗試",
            icon: "error",
            confirmButtonText: "確定",
          })
          .then((result) => {
            window.location.href = "./login.html";
          });
      });
  }
});
