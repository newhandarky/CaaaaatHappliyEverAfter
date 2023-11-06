// import
import axios from "axios";
import Swal from "sweetalert2";

// doms
let tbody = document.querySelector(".tbody");


// 變數
const url = "http://localhost:3000"; // 本機端
// const url = "https://catroomdb.onrender.com"; // json=server端
// 取得當前年月份的字串
let getBookingMonth = `${new Date().getFullYear()}-${new Date().getMonth()+2}`;
let getOneMonthBooking = [];
let str = "";

// 抓整個月份訂房資料
function getBookingData(){
    axios.get(`${url}/bookings?_expand=user&_expand=room&_page=1&_limit=9`)  // posts?_page=7&_limit=20
        .then(function(res){
            res.data.forEach(function(item){
                if(item.checkIn.startsWith(getBookingMonth)){                                        
                    const singleBookingData = {};
                    singleBookingData.id = item.userId;           
                    singleBookingData.name = item.user.name;
                    singleBookingData.checkIn = item.checkIn;
                    singleBookingData.quantity = item.quantity;                   
                    singleBookingData.roomName = item.room.price;
                    singleBookingData.state = item.state;
                    singleBookingData.price = item.price;
                    singleBookingData.feedback = item.feedback;
                    getOneMonthBooking.push(singleBookingData);
                }
            })
            renderTable(getOneMonthBooking);            
        }).catch(function(err){
            console.log(err);
        })
}

// 渲染table資料
function renderTable(arr){
    console.log(arr);
    arr.forEach(function(item){    
        str += `<tr>
                <th scope="row"><a href="">${item.id}</a></th>
                <td>${item.name}</td>
                <td>${item.checkIn}</td>
                <td>${item.quantity}</td>
                <td>${item.roomName}</td>
                <td>${item.state}</td>
                <td>${item.price}</td>
                <td>${item.feedback}</td>
            </tr>`;
    })
    tbody.innerHTML = str;
}
getBookingData()