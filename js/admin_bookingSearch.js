/*------------------------------------*\
    import
\*------------------------------------*/
import axios from "axios";
import Swal from "sweetalert2";
import { _url } from "./config";

/*------------------------------------*\
    doms
\*------------------------------------*/
// const startDate = document.querySelector(".startDate");
// const endDate = document.querySelector(".endDate");
const tbody = document.querySelector(".tbody");
const searchContent = document.querySelector(".searchContent");


// startDate.textContent = localStorage.getItem("startDate");
// endDate.textContent = localStorage.getItem("endDate");
/*------------------------------------*\
    變數
\*------------------------------------*/
const searchResult = JSON.parse(localStorage.getItem("searchResult"));

/*------------------------------------*\
    function
\*------------------------------------*/
// 渲染table資料
function renderTable(searchResult) {
    const tbody = document.querySelector(".tbody");
    let str = "";
    searchResult.forEach(function (item) {       // 
        str += `<tr>
                <th class="text-nowrap border-0 text-center d-flex align-items-center justify-content-center" scope="row"><a class="bookingNum adminLink" data-bookingnum="${item.id}" href="../pages/admin_updateBooking.html">${item.id}</a></th>       
                <td class="text-nowrap text-center">${item.user.name}</td>
                <td class="text-nowrap text-center">${item.checkIn}</td>
                <td class="text-nowrap text-center">${item.quantity}</td>
                <td class="text-nowrap text-center">${item.room.name}</td>
                <td class="text-nowrap text-center">${item.state}</td>
                <td class="text-nowrap text-center">${item.price}</td>
                <td class="text-nowrap text-start">${item.remark}</td>
            </tr>`;
    })
    tbody.innerHTML = str;
    searchContent.innerHTML = localStorage.getItem("h2Content");
}

/*------------------------------------*\
    事件
\*------------------------------------*/
// 點擊訂單編號時儲存訂單編號到localStorage
tbody.addEventListener("click", function(e){
    if(e.target.classList.contains("bookingNum")){
        localStorage.setItem("bookingNum", e.target.dataset.bookingnum);
    }
})

renderTable(searchResult)