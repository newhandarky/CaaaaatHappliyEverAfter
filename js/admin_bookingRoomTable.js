/*------------------------------------*\
    import
\*------------------------------------*/
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import { _url } from "./config";
import * as d3 from 'd3';
import c3 from "c3";

/*------------------------------------*\
    doms
\*------------------------------------*/
const roomSelected = document.querySelector(".form-select");
const bookingMonth = document.querySelector(".bookingMonth");

/*------------------------------------*\
    變數
\*------------------------------------*/
// 取得當前年月份的字串
let getBookingMonth = `${localStorage.getItem("thisYear")}-${localStorage.getItem("thisMonth")}`;

bookingMonth.textContent = getBookingMonth;
/*------------------------------------*\
    function
\*------------------------------------*/
axios.get(`${_url}/660/roomStates`, {
    headers: {
        authorization: `Bearer ${localStorage.getItem("userLoginToken")}`,
    },
})
    .then(function (res) {
        console.log(res.data);
        let monthBookingArr = [];
        let classicArr = [];
        let delicateArr = [];
        let luxuryArr = [];
        let x = ["x"];
        
        res.data.forEach(function(item){
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

        classicArr.unshift("經典房");
        delicateArr.unshift("精緻房");
        luxuryArr.unshift("豪華房");
        
        console.log(x);

        let chart = c3.generate({
            bindto: '#chart',
            data: {
                x: "x",
                columns: [
                    x,
                    classicArr
                    // delicateArr,
                    // luxuryArr
                ],
                types: {
                    經典房: 'area-step'
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
                        values: [0, 1, 2, 3]
                    }
                }
            }
        });
        
    }).catch(function (err) {
        console.log(err);            
    })
/*------------------------------------*\
    事件
\*------------------------------------*/