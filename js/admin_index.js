// 若沒有登入直接跳到登入頁面
if (localStorage.length === 0) {
  backToLogin();
}

function backToLogin() {
  location.href = "admin_login.html";
}

/*------------------------------------*\
    儲存所需資料
\*------------------------------------*/
localStorage.setItem(
  "userRole",
  JSON.parse(localStorage.getItem("userTokenAndData")).user.role
);
localStorage.setItem(
  "userName",
  JSON.parse(localStorage.getItem("userTokenAndData")).user.name
);
localStorage.setItem(
  "userId",
  JSON.parse(localStorage.getItem("userTokenAndData")).user.id
);
localStorage.setItem(
  "userLoginToken",
  JSON.parse(localStorage.getItem("userTokenAndData")).accessToken
);
localStorage.removeItem("userTokenAndData");
