/*------------------------------------*\
    import
\*------------------------------------*/
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import { _url } from "./config";
import { headerObj } from "./admin_config";
import { reLogin } from "./loginIsTimeUp";
import * as d3 from 'd3';
import c3 from "c3";

/*------------------------------------*\
    doms
\*------------------------------------*/
const bookingMonth = document.querySelector(".bookingMonth");
const before = document.querySelector(".before");
const after = document.querySelector(".after");
// const btnReload = document.querySelector(".btnReload");

/*------------------------------------*\
    變數
\*------------------------------------*/
// 取得當前年月份的字串
let getBookingMonth = `${localStorage.getItem("thisMonth")}`;
bookingMonth.textContent = getBookingMonth;

/*------------------------------------*\
    function
\*------------------------------------*/
axios.get(`${_url}/660/roomStates`, headerObj)
    .then(function (res) {
        const roomStates = res.data;
        let monthBookingArr = [];       // 準備接資料的陣列
        let classic = 0;
        let delicate = 0;
        let luxury = 0;
        
        roomStates.forEach(function(item){
            if(item.date.startsWith(getBookingMonth)){
                // 抓取當前選取的月份資料
                monthBookingArr.push(item);
                // 累計空房
                classic += item.availableCount.classic;
                delicate += item.availableCount.delicate;
                luxury += item.availableCount.luxury;
            }
        })

        if(monthBookingArr.length === 0){
            Swal.fire({
                icon: "error",
                title: "尚未有房況資料",
                text: "請前往檢視房況表功能頁面進行新增",
                footer: '<a href="admin_bookingRoomTable.html">點我前往</a>'
            });
            return;
        }else{
            // 總房扣去空房得到各房型訂房數
            let classicBooked = monthBookingArr.length * 5 - classic;
            let delicateBooked = monthBookingArr.length * 5 - delicate;
            let luxuryBooked = monthBookingArr.length * 5 - luxury;
    
            let chart1 = c3.generate({
                bindto: '#chart1',
                data: {
                    columns: [
                        ['經典房', classicBooked],
                        ['空房', classic],
                    ],
                    type : 'donut',
                },
                donut: {
                    title: "經典房"
                }
            });
            
            let chart2 = c3.generate({
                bindto: '#chart2',
                data: {
                    columns: [
                        ['精緻房', delicateBooked],
                        ['空房', delicate],
                    ],
                    type : 'donut'
                },
                donut: {
                    title: "精緻房"
                }
            });
            let chart3 = c3.generate({
                bindto: '#chart3',
                data: {
                    columns: [
                        ['豪華房', luxuryBooked],
                        ['空房', luxury],
                    ],
                    type : 'donut'
                },
                donut: {
                    title: "豪華房"
                }
            });
            let chart4 = c3.generate({
                bindto: '#chart4',
                data: {
                    columns: [
                        ['經典房', classicBooked],
                        ['精緻房', delicateBooked],
                        ['豪華房', luxuryBooked],
                        ['總空房', (monthBookingArr.length * 15) - (classicBooked + delicateBooked + luxuryBooked)],
                    ],
                    type : 'donut'
                },
                donut: {
                    title: "總住房比例"
                }
            });
        }

    }).catch(function (err) {
        reLogin(err.response.data);
    })


/*------------------------------------*\
    事件
\*------------------------------------*/
// 月份往前與往後
after.addEventListener("click", function () {
    let month = moment(localStorage.getItem("thisMonth")).add(1, "month").format("YYYY-MM");
    localStorage.setItem("thisMonth", month);
    location.reload();  // 切換月份重整網頁
})

before.addEventListener("click", function () {
    let month = moment(localStorage.getItem("thisMonth")).add(-1, "month").format("YYYY-MM");
    if (month === "2023-08") {
        Swal.fire({
            title: "抱歉並無2023-09以前的資料",
            icon: "error"
        });
        before.setAttribute("disabled", true);
        return;
    }
    localStorage.setItem("thisMonth", month);
    bookingMonth.textContent = localStorage.getItem("thisMonth");
    location.reload();  // 切換月份重整網頁
})