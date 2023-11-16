/*------------------------------------*\
    儲存所需資料
\*------------------------------------*/
localStorage.setItem("userRole", JSON.parse(localStorage.getItem("userTokenAndData")).user.role);
localStorage.setItem("userName", JSON.parse(localStorage.getItem("userTokenAndData")).user.name);
localStorage.setItem("userId", JSON.parse(localStorage.getItem("userTokenAndData")).user.id);
localStorage.setItem("userLoginToken", JSON.parse(localStorage.getItem("userTokenAndData")).accessToken);
localStorage.removeItem("userTokenAndData");