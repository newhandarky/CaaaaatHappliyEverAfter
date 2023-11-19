import axios from "axios";
import { _url } from "./config";
import { isLogin } from "./isLogin";


//bookingDelicateProcess_1.html
//DOM
let checkinDate = document.querySelector("#checkinDate");
let checkoutDate = document.querySelector('#checkoutDate');
let toProcess_2 = document.querySelector(".toProcess_2");
let dateForm = document.querySelector("#dateForm");
console.log(toProcess_2);


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
        console.log(data[0].availableCount.delicate);
        if(data[0].availableCount.delicate == 0){
            console.log(data[0].availableCount.delicate);
            alert(`${checkinDate.value}已無空房，請重新選擇`);
            return dateForm.reset();
        }
        
    })
});

checkoutDate.addEventListener("change", function(e){
    if(checkinDate.value >= checkoutDate.value){
        checkoutDate.value = ""
        return alert("checkout 日期需晚於checkin 日期")
    }
    axios.get(`${_url}/roomStates?date_gte=${checkinDate.value}&date_lte=${checkoutDate.value}&date_ne=${checkoutDate.value}`).then(function(response){
        let data = response.data;
        console.log(data)
        data.forEach(function(item){
         if(item.availableCount.delicate == 0){
            alert(`${item.date}已無空房，請重新選擇`);
            return dateForm.reset();
            
         }
})})});



toProcess_2.addEventListener("click", function(e){
   e.preventDefault();
     const toProcess_2Herf = toProcess_2.getAttribute("href");
     isLogin(toProcess_2Herf)
    if(checkoutDate.value == "" || checkinDate.value == ""){
        return  alert("您尚未選擇chech in 或 check out 時間")
    }

    else{
         let obj = {};
         obj["checkIn"] = checkinDate.value;
         obj["checkOut"]=checkoutDate.value;
         obj['bookingDate']=new Date();
         obj['roomType']= "精緻房"
         console.log(obj)
         let bookingData = JSON.stringify(obj);
         sessionStorage.setItem("bookingData", bookingData);
         window.location.href = "./bookingProcess_2.html";
         
        }
    });


  