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
console.log(toProcess_2);

//找到今天的日期
let date = new Date();
let currentYear = date.getFullYear();
console.log(currentYear);
console.log(date.getDate());
console.log(date.getMonth()+1);
let currentDate = `${currentYear}-${date.getMonth()+1}-${date.getDate()}`;
console.log(currentDate);




//房況日曆
axios.get(`${_url}/roomStates`).then(function(response){
    let data = response.data;
    let array = [];
    data. forEach(function(item){
        let obj = {};
        obj.start=item.date;
        obj.title = '';
        if(item.availableCount.luxury>0){
            obj.title=`剩餘${item.availableCount.luxury}間`
        }else{
            obj.title="已無空房"
        }
        array.push(obj);  
    });
    console.log(array);

    function calendarSystem(){

        var calendarEl = document.getElementById('calendar');
        var calendar = new FullCalendar.Calendar(calendarEl, {
          initialView: 'dayGridMonth',
          locale: 'zh-tw',
          events:array
        });
        calendar.render();
        console.log("success")
    }
    
    calendarSystem()
    

});


checkinDate.addEventListener('change', function(e){
    axios.get(`${_url}/roomStates?date=${checkinDate.value}`).then(function(response){
        let data = response.data;
        console.log(data[0].availableCount.luxury);
        if(data[0].availableCount.luxury == 0){
            console.log(data[0].availableCount.luxury);
            Swal.fire(`${checkinDate.value}已無空房，請重新選擇`);
            return dateForm.reset();
        }
        
    })
});

checkoutDate.addEventListener("change", function(e){
    if(checkinDate.value >= checkoutDate.value){
        checkoutDate.value = ""
        return Swal.fire("退房日期需晚於入住日期");
    }
    axios.get(`${_url}/roomStates?date_gte=${checkinDate.value}&date_lte=${checkoutDate.value}&date_ne=${checkoutDate.value}`).then(function(response){
        let data = response.data;
        console.log(data)
        data.forEach(function(item){
         if(item.availableCount.luxury == 0){
            Swal.fire(`${item.date}已無空房，請重新選擇`);
            return dateForm.reset();
            
         }
})})});



toProcess_2.addEventListener("click", function(e){
   e.preventDefault();
    
    if(checkoutDate.value == "" || checkinDate.value == ""){
        Swal.fire(`您尚未選擇入住或退房時間`);
        return dateForm.reset();
    }

    else{
         let obj = {};
         obj["checkIn"] = checkinDate.value;
         obj["checkOut"]=checkoutDate.value;
         obj['bookingDate']=new Date();
         obj['roomType']= "豪華房"
         console.log(obj)
         let bookingData = JSON.stringify(obj);
         sessionStorage.setItem("bookingData", bookingData);
         const toProcess_2Herf = toProcess_2.getAttribute("href");
         isLogin(toProcess_2Herf)
         window.location.href = "./bookingProcess_2.html";
         
        }
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



  