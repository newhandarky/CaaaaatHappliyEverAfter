/*------------------------------------*\
    import
\*------------------------------------*/
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import { _url } from "./config";
import { headerObj } from "./admin_config";
import * as d3 from 'd3';
import c3 from "c3";

/*------------------------------------*\
    doms
\*------------------------------------*/
const bookingMonth = document.querySelector(".bookingMonth");
const before = document.querySelector(".before");
const after = document.querySelector(".after");

/*------------------------------------*\
    變數
\*------------------------------------*/
// 取得當前年月份的字串
let getBookingMonth = `${localStorage.getItem("thisMonth")}`;

const roomObj = {
    classic: "經典房",
    delicate: "精緻房",
    luxury: "豪華房"
}

bookingMonth.textContent = getBookingMonth;
// if(moment(getBookingMonth).isBefore(moment())){
//     before.setAttribute("disabled", true)
// }
/*------------------------------------*\
    function
\*------------------------------------*/
axios.get(`${_url}/660/roomStates`, headerObj)
    .then(function (res) {
        console.log(res.data);
        let monthBookingArr = [];       // 準備接資料的陣列
        let classicArr = [];
        let delicateArr = [];
        let luxuryArr = [];
        let x = ["x"];
        
        res.data.forEach(function(item){
            // 房況日期不可在今日之前
            // if(!moment(item.date).isBefore(moment()) && item.date.startsWith(getBookingMonth)){
            if(item.date.startsWith(getBookingMonth)){
                monthBookingArr.push(item);
            }
        })

        monthBookingArr.forEach(function(item){
            classicArr.push(item.availableCount.classic);
            delicateArr.push(item.availableCount.delicate);
            luxuryArr.push(item.availableCount.luxury);
            x.push(item.date)
        })        

        // 陣列開頭加上房型
        classicArr.unshift(roomObj.classic);
        delicateArr.unshift(roomObj.delicate);
        luxuryArr.unshift(roomObj.luxury);

        // 印出表格
        let chart = c3.generate({
            bindto: '#chart',
            data: {
                x: "x",
                // hide: [delicateArr, luxuryArr],
                columns: [
                    x,
                    classicArr,
                    delicateArr,
                    luxuryArr
                ],
                types: {
                    經典房: 'area-step',
                    精緻房: 'area-step',
                    豪華房: 'area-step',
                }
            },
            axis:{
                x: {
                    type: "timeseries",
                    tick: {
                        format: "%Y-%m-%d"
                    }
                },
                y: {
                    tick: {
                        values: [0, 1, 2, 3, 4, 5]
                    }
                }
            },
        });
        
    }).catch(function (err) {
        console.log(err);            
    })

/*------------------------------------*\
    事件
\*------------------------------------*/

// 月份往前與往後
before.addEventListener("click", function () {
    let month = moment(localStorage.getItem("thisMonth")).add(-1, "month").format("YYYY-MM");
    localStorage.setItem("thisMonth", month);
    location.reload();  // 切換月份重整網頁
})

after.addEventListener("click", function () {
    let month = moment(localStorage.getItem("thisMonth")).add(1, "month").format("YYYY-MM");
    localStorage.setItem("thisMonth", month);
    location.reload();  // 切換月份重整網頁
})