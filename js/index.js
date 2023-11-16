console.log("歡迎來到首頁");
import flatpickr from "flatpickr";

const catRoomInput_checkIn = document.getElementById("catRoomInput_checkIn");
const catRoomInput_checkOut = document.getElementById("catRoomInput_checkOut");

const checkInInput = document.getElementById("checkIn");
const checkOutInput = document.getElementById("checkOut");

//flatpickr 套件使用
flatpickr("#checkIn", {
  enableTime: false,
  dateFormat: "Y-m-d",
});

catRoomInput_checkIn.addEventListener("click", (e) => {
  e.preventDefault();
  checkInInput.focus();
});
//flatpickr 套件使用
flatpickr("#checkOut", {
  enableTime: false,
  dateFormat: "Y-m-d",
});

catRoomInput_checkOut.addEventListener("click", (e) => {
  e.preventDefault();
  checkOutInput.focus();
});

// 下拉選單
const roomType = document.getElementById("roomType");
function defaltClolr() {
  if (roomType.value === "請選擇") {
    console.log(roomType.value);
    roomType.style.color = "#ced4da";
  }
}
defaltClolr();

roomType.addEventListener("change", (e) => {
  if (roomType.value !== "請選擇") {
    roomType.style.color = null;
  }
});
