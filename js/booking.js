
import axios from "axios";
import { _url } from "./config";
import { isLogin } from "./isLogin";
import Swal from 'sweetalert2';
import 'animate.css';

console.log("suc")



//首頁的快速預約房型
//DOM
const searchBarBtn = document.querySelector('.searchBarBtn');
const checkIn = document.querySelector('#checkIn');
const checkOut = document.querySelector('#checkOut');
const roomType = document.querySelector('#roomType');
console.log(roomType.value );

searchBarBtn.addEventListener("click", function(e){
        //console.log("請填寫入住日期、退房日期與選擇房型");
        if(checkOut.value == "" ||checkIn.value == "" || roomType.value == "請選擇" ){
            // alert("請填寫入住日期、退房日期與選擇房型")
            // Swal.fire(`您尚未選擇入住或退房時間或選擇房型`)
            alert("您尚未選擇入住或退房時間或選擇房型")
            console.log("請填寫入住日期、退房日期與選擇房型");
            return
        }

        else if(checkOut.value <= checkIn.value){
            alert("退房日期需晚於入住日期")
             console.log("退房日期需晚於入住日期");
             checkOut.value = "";
             checkIn.value = "";
             return
        }
 //選到經典房
        else if (roomType.value == "經典房"){
            console.log("經典房");
            axios.get(`${_url}/roomStates?date_gte=${checkIn.value}&date_lte=${checkOut.value}&date_ne=${checkOut.value}`).then(function(response){
                let data = response.data;
                let noRoomDate = '';
                console.log(data)
                data.forEach(function(item){
                 if(item.availableCount.classic <= 0){
                    noRoomDate += `${item.date} `  
                 };
            })

        console.log(noRoomDate)
        if(noRoomDate !== ''){
           alert(`${noRoomDate}已無空房，請重新選擇`);
           checkOut.value = "";
           checkIn.value= "";
           roomType.value = "";
           return
        };
       indexBooking()
    
         })
        }
//選到精緻房

        else if (roomType.value == "精緻房"){
            console.log("精緻房");
            axios.get(`${_url}/roomStates?date_gte=${checkIn.value}&date_lte=${checkOut.value}&date_ne=${checkOut.value}`).then(function(response){
                let data = response.data;
                let noRoomDate = '';
                console.log(data)
                data.forEach(function(item){
                 if(item.availableCount.delicate <= 0){
                    noRoomDate += `${item.date} ` 
                 };     
        });
        console.log(noRoomDate);
        if(noRoomDate !==''){
            alert(`${noRoomDate}已無空房，請重新選擇`);
            checkOut.value = "";
            checkIn.value= "";
            roomType.value = "";
            return
         };
            indexBooking()
        });
    }

//選到豪華房
       
        else if (roomType.value == "豪華房"){
            console.log("豪華房");
            axios.get(`${_url}/roomStates?date_gte=${checkIn.value}&date_lte=${checkOut.value}&date_ne=${checkOut.value}`).then(function(response){
                let data = response.data;
                let noRoomDate = '';
                console.log(data)
                data.forEach(function(item){
                 if(item.availableCount.luxury <= 0){
                    noRoomDate += `${item.date} `  
                 };     
        })
        if(noRoomDate !==''){
            alert(`${noRoomDate}已無空房，請重新選擇`);
            checkOut.value = "";
            checkIn.value= "";
            roomType.value = "";
            return
         };
   
        indexBooking()
    
    });
        }
        
    
});

function indexBooking(){
    let indexBookingArr = [];
    let indexBooking = {};
    indexBooking['checkIn'] = checkIn.value;
    indexBooking['checkOut'] = checkOut.value;
    indexBooking['roomType'] = roomType.value;
    console.log(indexBooking);
    indexBookingArr.push(indexBooking);
    let indexBookingString = JSON.stringify(indexBookingArr);
    console.log(indexBookingString);
    sessionStorage.setItem('indexBooking', indexBookingString);
    
    if(roomType.value == "經典房"){
        isLogin("./bookingClassicProcess_1.html")
         //window.location.href = "./bookingClassicProcess_1.html"
    };
    if(roomType.value == "精緻房"){
        isLogin("./bookingDelicateProcess_1.html")
        //window.location.href = "./bookingDelicateProcess_1.html"
    };
    if(roomType.value == "豪華房"){
        isLogin("./bookingLuxProcess_1.html")
    }
    
};


//找到今天的日期
let date = new Date();
let currentYear = date.getFullYear();
console.log(currentYear);
console.log(date.getDate());
console.log(date.getMonth()+1);
let currentDate = `${currentYear}-${date.getMonth()+1}-${date.getDate()}`;
console.log(currentDate);

    //flatpickr
    flatpickr("#checkIn", {
        enableTime: false,
        dateFormat: "Y-m-d",
        minDate: currentDate,
        maxDate: "2024-02-29"
      });
    
      flatpickr("#checkOut", {
        enableTime: false,
        dateFormat: "Y-m-d",
        minDate: currentDate,
        maxDate: "2024-02-29"
      });
