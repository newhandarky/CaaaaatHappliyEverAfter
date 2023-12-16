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
const btnReload = document.querySelector(".btnReload");

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
/*------------------------------------*\
    function
\*------------------------------------*/
axios.get(`${_url}/660/roomStates`, headerObj)
    .then(function (res) {
        let monthBookingArr = [];       // 準備接資料的陣列
        let classicArr = [];
        let delicateArr = [];
        let luxuryArr = [];
        let x = ["x"];

        res.data.forEach(function (item) {
            if (item.date.startsWith(getBookingMonth)) {
                monthBookingArr.push(item);
            }
        })

        if (monthBookingArr.length === 0) {
            Swal.fire({
                title: "尚未建立此月份的房況資料 是否建立?",
                showDenyButton: true,
                confirmButtonText: "確定建立",
                denyButtonText: `取消返回`
            }).then((result) => {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "center",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "info",
                    title: "資料建立中"
                });
                if (result.isConfirmed) {
                    let startDate = moment(getBookingMonth).format("YYYY-MM-DD");
                    let endDate = moment(getBookingMonth).add(1, "month").format("YYYY-MM-DD");
                    let diffDays = moment(endDate).diff(startDate, 'days');
                    let roomStatesPromise = [];
                    for (let i = 0; i < diffDays; i++) {
                        let roomStateObj = {
                            "date": moment(getBookingMonth).add(i, "days").format("YYYY-MM-DD"),
                            "availableCount": {
                                "classic": 5,
                                "delicate": 5,
                                "luxury": 5
                            },
                            "status": {
                                "classic_A_canUse": true,
                                "classic_B_canUse": true,
                                "classic_C_canUse": true,
                                "classic_D_canUse": true,
                                "classic_E_canUse": true,
                                "delicate_A_canUse": true,
                                "delicate_B_canUse": true,
                                "delicate_C_canUse": true,
                                "delicate_D_canUse": true,
                                "delicate_E_canUse": true,
                                "luxury_A_canUse": true,
                                "luxury_B_canUse": true,
                                "luxury_C_canUse": true,
                                "luxury_D_canUse": true,
                                "luxury_E_canUse": true
                            }
                        }
                        roomStatesPromise.push(axios.post(`${_url}/660/roomStates`, roomStateObj, headerObj));
                    }
                    Promise.all(roomStatesPromise)
                        .then(function (results) {
                            Swal.fire({
                                title: "資料建立成功",
                                confirmButtonText: "OK",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    location.reload();
                                }
                            });
                        }).catch(function (err) {
                            reLogin(err.response.data);
                        })
                } else if (result.isDenied) {
                    Swal.fire("資料尚未建立", "", "info");
                }
            });
        } else {
            monthBookingArr.forEach(function (item) {
                classicArr.push(item.availableCount.classic);
                delicateArr.push(item.availableCount.delicate);
                luxuryArr.push(item.availableCount.luxury);
                x.push(item.date)
            })
        }

        // 陣列開頭加上房型
        classicArr.unshift(roomObj.classic);
        delicateArr.unshift(roomObj.delicate);
        luxuryArr.unshift(roomObj.luxury);

        // 印出表格
        let chart = c3.generate({
            bindto: '#chart',
            data: {
                x: "x",
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
            axis: {
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
        reLogin(err.response.data);
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

btnReload.addEventListener("click", function () {
    location.reload();
})