//console.log("suc");

import axios from "axios";
import { _url } from "./config";
import { isLogin } from "./isLogin";
import flatpickr from "flatpickr";
import Swal from 'sweetalert2';

//bookingClassicProcess_1.html
//DOM
let checkinDate = document.querySelector("#checkinDate");
let checkoutDate = document.querySelector('#checkoutDate');
let toProcess_2 = document.querySelector(".toProcess_2");
let dateForm = document.querySelector("#dateForm");
//console.log(toProcess_2);

//找到今天的日期
let date = new Date();
let currentYear = date.getFullYear();
//console.log(date.getDate());
//console.log(date.getMonth()+1);
let month = date.getMonth()+1;
if(month < 10){
    month = "0"+month
};
let dates = date.getDate();
if(dates<10){
   dates = "0"+dates
}
//console.log(dates)
let currentDate = `${currentYear}-${month}-${dates}`;
//console.log(currentDate)



//房況日曆
axios.get(`${_url}/roomStates`).then(function(response){
    let data = response.data;
    let array = [];
    data.forEach(function(item){
        let obj = {};
        obj.start=item.date;
        obj.title = '';
        if(item.availableCount.classic>0){
            obj.title=`剩餘${item.availableCount.classic}間`
        }else{
            obj.title="已無空房"
        }
        array.push(obj);  
    });
    //console.log(array);

    function calendarSystem(){

        var calendarEl = document.getElementById('calendar');
        var calendar = new FullCalendar.Calendar(calendarEl, {
          initialView: 'dayGridMonth',
          locale: 'zh-tw',
          events:array
        });
        calendar.render();
       // console.log("success")
    }
    
    calendarSystem()
    

});


checkinDate.addEventListener('change', function(e){
    axios.get(`${_url}/roomStates?date=${checkinDate.value}`).then(function(response){
        let data = response.data;
       // console.log(data[0].availableCount.classic);
        if(data[0].availableCount.classic <= 0){
          //  console.log(data[0].availableCount.classic);
         // Swal.fire(`${checkinDate.value}已無空房，請重新選擇`);
          Swal.fire({icon: "error",
          text:`${checkinDate.value}已無空房，請重新選擇`,confirmButtonColor:"#fa863e"});
          checkinDate.value = "";
          checkoutDate.value = ""
          return 
        }
        
    })
});

checkoutDate.addEventListener("change", function(e){
    if(checkinDate.value == ""){
        checkoutDate.value = "";
        //Swal.fire("請先選擇入住日期");
        Swal.fire({icon: "error",
     text:"請先選擇入住日期",confirmButtonColor:"#fa863e"});
     return 
    };
    if(checkinDate.value >= checkoutDate.value){
       // console.log(checkoutDate.value);
        checkoutDate.value = "";
        checkinDate.value="";
        Swal.fire({icon: "error",
     text:"退房日期需晚於入住日期",confirmButtonColor:"#fa863e"});
        return 
    };
    axios.get(`${_url}/roomStates?date_gte=${checkinDate.value}&date_lte=${checkoutDate.value}&date_ne=${checkoutDate.value}`).then(function(response){
        let data = response.data;
      //  console.log(data)
        let noRoomDate = '';
        let noRoomDateArr = [];
        data.forEach(function(item){
            if(item.availableCount.classic <= 0){
               noRoomDateArr.push(item.date)
            }});
            noRoomDateArr.sort();
            console.log(noRoomDateArr);
            noRoomDateArr.forEach((item)=>{
                noRoomDate += ` ${item} ,`
            })
         if(noRoomDate !== ""){
            //Swal.fire(`${noRoomDate}已無空房，請重新選擇`);
            Swal.fire({icon: "error",
          text:`${noRoomDate}已無空房，請重新選擇`,confirmButtonColor:"#fa863e"});
            checkoutDate.value = "";
            checkinDate.value="";
             return   
         }

})});



toProcess_2.addEventListener("click", function(e){
     e.preventDefault();
     if(checkoutDate.value == "" || checkinDate.value == ""){
        Swal.fire({icon: "error",
        text:"您尚未選擇入住/退房日期",confirmButtonColor:"#fa863e"});
        checkoutDate.value == "" ;
         checkinDate.value == "";
         return;
     };

     if(checkinDate.value >= checkoutDate.value){
        // console.log(checkoutDate.value);
         checkoutDate.value == "" ;
         checkinDate.value == "";
        Swal.fire({icon: "error",
         text:"退房日期需晚於入住日期",confirmButtonColor:"#fa863e"});
         return 
     };

    axios.get(`${_url}/roomStates?date_gte=${checkinDate.value}&date_lte=${checkoutDate.value}&date_ne=${checkoutDate.value}`).then(function(response){

        let data = response.data;
       // console.log(data);
        let noRoomDate = '';
        let noRoomDateArr = [];
        data.forEach(function(item){
            if(item.availableCount.classic <= 0){
               noRoomDateArr.push(item.date)
            }});
            noRoomDateArr.sort();
            console.log(noRoomDateArr);
            noRoomDateArr.forEach((item)=>{
                noRoomDate += ` ${item} ,`
            })

    if (noRoomDate !== ''){
        Swal.fire({icon: "error",
        text:`${noRoomDate}已無空房，請重新選擇`,confirmButtonColor:"#fa863e"});
        checkoutDate.value = "";
        checkinDate.value="";
        return
     };
       
         let obj = {};
            obj["checkIn"] = checkinDate.value;
            obj["checkOut"]=checkoutDate.value;
            obj['bookingDate']=currentDate;
            obj['roomType']= "經典房"
           // console.log(obj)
            let bookingData = JSON.stringify(obj);
            sessionStorage.setItem("bookingData", bookingData);
            isLogin("./bookingProcess_2.html");




})

    });

    //flatpickr
flatpickr("#checkinDate", {
    enableTime: false,
    dateFormat: "Y-m-d",
    minDate: currentDate,
    maxDate: "2024-12-31"
  });

  flatpickr("#checkoutDate", {
    enableTime: false,
    dateFormat: "Y-m-d",
    minDate: currentDate,
    maxDate: "2024-12-31"
  });

  //取出透過index快速訂房的資料


//console.log(sessionStorage.getItem('indexBooking'));
let indexBooking = JSON.parse(sessionStorage.getItem('indexBooking'));
//console.log(indexBooking);

checkinDate.value = indexBooking[0].checkIn;
checkoutDate.value = indexBooking[0].checkOut;
//console.log(checkinDate.value);
//console.log(checkoutDate.value);
checkinDate.setAttribute('value',checkinDate.value) ;
checkoutDate.setAttribute('value',checkinDate.value) ;

