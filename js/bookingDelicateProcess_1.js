import axios from "axios";
import { _url } from "./config";
import { isLogin } from "./isLogin";
import flatpickr from "flatpickr";
import Swal from 'sweetalert2';


//bookingDelicateProcess_1.html
//DOM
let checkinDate = document.querySelector("#checkinDate");
let checkoutDate = document.querySelector('#checkoutDate');
let toProcess_2 = document.querySelector(".toProcess_2");
let dateForm = document.querySelector("#dateForm");
//console.log(toProcess_2);

//找到今天的日期
let date = new Date();
let currentYear = date.getFullYear();
//console.log(currentYear);
//console.log(date.getDate());
//console.log(date.getMonth()+1);
let currentDate = `${currentYear}-${date.getMonth()+1}-${date.getDate()}`;
//console.log(currentDate);


//房況日曆
axios.get(`${_url}/roomStates`).then(function(response){
    let data = response.data;
    let array = [];
    data. forEach(function(item){
        let obj = {};
        obj.start=item.date;
        obj.title = '';
        if(item.availableCount.delicate>0){
            obj.title=`剩餘${item.availableCount.delicate}間`
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
        //console.log("success")
    }
    
    calendarSystem()
    

});


checkinDate.addEventListener('change', function(e){
    axios.get(`${_url}/roomStates?date=${checkinDate.value}`).then(function(response){
        let data = response.data;
       // console.log(data[0].availableCount.delicate);
        if(data[0].availableCount.delicate <= 0){
         //   console.log(data[0].availableCount.delicate);
         Swal.fire(`${checkinDate.value}已無空房，請重新選擇`);
            return checkinDate.value = ""
        }
        
    })
});

checkoutDate.addEventListener("change", function(e){
    if(checkinDate.value == ""){
        checkoutDate.value = "";
        return Swal.fire("請先選擇入住日期");
    }
    if(checkinDate.value >= checkoutDate.value){
        checkoutDate.value = "";
        checkinDate.value="";
        return Swal.fire("退房日期需晚於入住日期");
    };

    axios.get(`${_url}/roomStates?date_gte=${checkinDate.value}&date_lte=${checkoutDate.value}&date_ne=${checkoutDate.value}`).then(function(response){
        let data = response.data;
       // console.log(data)
        let noRoomDate = '';
        data.forEach(function(item){
         if(item.availableCount.delicate <= 0){
            noRoomDate+= `${item.date} `;
         }}); 
    //console.log(noRoomDate)
    if (noRoomDate !== ""){
        Swal.fire(`${noRoomDate}已無空房，請重新選擇`);
    checkoutDate.value = "";
    checkinDate.value="";
     return
     };
})
});



toProcess_2.addEventListener("click", function(e){
   e.preventDefault();
   axios.get(`${_url}/roomStates?date_gte=${checkinDate.value}&date_lte=${checkoutDate.value}&date_ne=${checkoutDate.value}`).then(function(response){
    if(checkoutDate.value == "" || checkinDate.value == ""){

        Swal.fire(`您尚未選擇入住或退房時間`);
       checkoutDate.value == "" ;
        checkinDate.value == "";
        return;
    };

    if(checkinDate.value >= checkoutDate.value){
        //console.log(checkoutDate.value);
        checkoutDate.value == "" ;
        checkinDate.value == "";
        return Swal.fire("退房日期需晚於入住日期"); 
    };
    
    let data = response.data;
    //console.log(data)
    let noRoomDate = ''

    data.forEach(function(item){
     if(item.availableCount.delicate<= 0){
        noRoomDate+= `${item.date} `;   
     } });

     if (noRoomDate !== ""){
        Swal.fire(`${noRoomDate}已無空房，請重新選擇`);
        checkoutDate.value = "";
        checkinDate.value="";
         return
         };
     
        let obj = {};
        obj["checkIn"] = checkinDate.value;
        obj["checkOut"]=checkoutDate.value;
        obj['bookingDate']=currentDate;
        obj['roomType']= "精緻房"
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
        maxDate: "2024-02-29"
      });
    
      flatpickr("#checkoutDate", {
        enableTime: false,
        dateFormat: "Y-m-d",
        minDate: currentDate,
        maxDate: "2024-02-29"
      });
    

  //取出透過index快速訂房的資料


//console.log(sessionStorage.getItem('indexBooking'));
let indexBooking = JSON.parse(sessionStorage.getItem('indexBooking'));
///console.log(indexBooking);

checkinDate.value = indexBooking[0].checkIn;
checkoutDate.value = indexBooking[0].checkOut;
//console.log(checkinDate.value);
//console.log(checkoutDate.value);
checkinDate.setAttribute('value',checkinDate.value) ;
checkoutDate.setAttribute('value',checkinDate.value) ;