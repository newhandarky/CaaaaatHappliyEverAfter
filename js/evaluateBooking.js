// aside bar 顯示當前頁面
// 因為有兩個 aside bar 所以要用 querySelectorAll
const asideLocation = document.querySelectorAll("#bookingHistory");
asideLocation.forEach((element) => {
  element.classList.add("onThisPage");
});

//星星功能
let getStars = 0; // 得到的星星數
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
