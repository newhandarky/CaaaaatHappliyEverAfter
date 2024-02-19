import axios from "axios";
import { _url } from "./config";
import { isLogin } from "./isLogin";


//DOM
const checkInDate = document.querySelector(".checkInDate");
const checkOutDate = document.querySelector(".checkOutDate");
const roomType = document.querySelector(".roomType");
const catNum = document.querySelector(".catNum");
const catName = document.querySelector(".catName");
const price = document.querySelector(".price");
const remark = document.querySelector(".remark");
const toComfirmation = document.querySelector(".toComfirmation");
//console.log(toComfirmation)

//拿取暫存在sesson.storage的資訊
let catInfo = JSON.parse(sessionStorage.getItem('catInfo'));
let bookingData = JSON.parse(sessionStorage.getItem('bookingData'));
//console.log(catInfo);
//console.log(bookingData);
//-----渲染頁面-----
//渲染checkin checkout date
checkInDate.innerHTML = bookingData.checkIn;
checkOutDate.innerHTML = bookingData.checkOut;
//渲染房型資訊
roomType.innerHTML = bookingData.roomType;
//渲染貓咪數量資訊
catNum.innerHTML =(catInfo.catId).length;
//渲染入住貓咪名字
let catId = catInfo.catId;
//console.log(`貓咪ID:${catId}`);

let str = "";
catId.forEach(function(item){
    axios.get(`${_url}/cats/${item}`).then(function(response){
      //  console.log(`貓的名字${response.data["catName"]}`);
        str += ` ${response.data["catName"]} `;
       // console.log(str);
        catName.textContent = str;
    });
    
});

//渲染價錢資訊

//用以下方式計算日期差異
//  let day1 = "2023-02-02";
//  let day2 = "2023-02-04";
// let date1 = new Date(day1); 會變成毫秒
// let date2 = new Date(day2);
// console.log((date2.getTime()-date1.getTime())/ (1000 * 3600 * 24))


axios.get(`${_url}/rooms?name=${bookingData.roomType}`).then(function(response){
   // console.log(`房型資訊${response.data}`);
    let day1 = bookingData.checkIn;
    let day2 = bookingData.checkOut;
    let date1 = new Date(day1);
    let date2 = new Date(day2);
    let nights = (date2.getTime()-date1.getTime())/ (1000 * 3600 * 24)
   // console.log(`住${nights}晚`)
   // console.log(`貓${catInfo.catId.length}隻`)
    let additionalCat = catInfo.catId.length-1;
  //  console.log(`加${additionalCat}隻貓`);
    let totalPrice = response.data[0].price*nights + 300*additionalCat*nights;
    price.innerHTML = `${totalPrice}元`;
    booking.price = totalPrice; //順便把價錢打包進去下方的booking{}
    booking['quantity'] = nights;
    bookingHistorys['quantity'] = nights;
    bookingHistorys['price'] = totalPrice;
});

//渲染remark
remark.innerHTML = catInfo.remark;

//打包資料傳到資料庫--拿到local storage裡面的資料-------
let userTokenAndData = JSON.parse(localStorage.getItem('userTokenAndData'));
//console.log(`userId:${userTokenAndData.user.id}`);
//準備要打包到booking的資料
 let booking = {};
 booking['userId'] = userTokenAndData.user.id;
 booking['bookingDate'] = bookingData.bookingDate;
 booking['checkIn']= bookingData.checkIn;
 booking['checkOut']=bookingData.checkOut;
 booking['roomType'] = bookingData.roomType;
//  axios.get(`${_url}/rooms?name=${bookingData.roomType}`).then(function(response){
//     console.log(response.data);
//     let day1 = bookingData.checkIn;
//     let day2 = bookingData.checkOut;
//     let date1 = new Date(day1);
//     let date2 = new Date(day2);
//     let nights = (date2.getTime()-date1.getTime())/ (1000 * 3600 * 24);
//     booking['price'] = response.data[0].price*nights + 300*additionalCat;
// });
//catID remark也要一起打包進去booking{}
booking['cats'] = catInfo.catId;
booking['remark'] = catInfo.remark;
booking['state'] = "已預訂";
booking['history'] = [];
booking['admin']= {};
if(bookingData.roomType === "經典房"){
    booking['roomId']= 51;
};
if(bookingData.roomType === "精緻房"){
    booking['roomId']= 52;
};
if(bookingData.roomType === "豪華房"){
    booking['roomId']= 53;
};
booking['feedback']= '';
//console.log(`打包到bookings`);
//console.log(booking);

//準備要打包到bookingHistory的資料
let bookingHistorys = {};
bookingHistorys['updateTime'] = bookingData.bookingDate;
bookingHistorys['state'] = "已預訂";
bookingHistorys['catNum'] = catInfo.catId.length;
bookingHistorys['remark'] = catInfo.remark;
bookingHistorys['checkIn']= bookingData.checkIn;
bookingHistorys['checkOut']=bookingData.checkOut;
bookingHistorys['userId']=userTokenAndData.user.id;
bookingHistorys['roomType']= bookingData.roomType;
bookingHistorys['roomId']= [];
bookingHistorys['admin']= "user";
if(bookingData.roomType === "經典房"){
    bookingHistorys['roomId']= 51;
};
if(bookingData.roomType === "精緻房"){
    bookingHistorys['roomId']= 52;
};
if(bookingData.roomType === "豪華房"){
    bookingHistorys['roomId']= 53;
};
//console.log(`打包到bookingHistorys`)
//console.log(bookingHistorys)


//打包資料傳到資料庫--post到booking
toComfirmation.addEventListener("click", function(e){
    e.preventDefault();
    postPatch();
})


function postPatch(){
    postBooking();
    patchData();


};


function postBooking(){
    axios.post(`${_url}/bookings`, booking).then(response =>{
       // console.log(response.data['id']);
        let bookingId = response.data['id'];
        bookingHistorys["bookingId"] = bookingId; //把booking的ID放進去bookingHistorys{}裡面
       // console.log(`NEW bookingHistory物件`)
       // console.log(bookingHistorys)
       // console.log(bookingId);
        
                //把新的bookingHistorys（有bookingID)post到bookingHistorys
                axios.post(`${_url}/bookingHistorys?bookingsId=${bookingId}`, bookingHistorys ).then((response)=>{
                   // console.log(`try`)
                   // console.log(response.data);
        
                    //透過bookingId與UserID取得訂單的所有bookingHistoryID;一個bookingId可能會有多種狀態
                axios.get(`${_url}/bookingHistorys?userId=${userTokenAndData.user.id}&bookingId=${bookingId}`).then((response) => {
                    //console.log(`訂單的booking History`)
                   // console.log(response.data);
                    let arr = response.data;
                    let bookingHistoryId = [];
                    arr.forEach(function(item){
                        //console.log(item['id'])
                        bookingHistoryId.push(item.id);
                    })
                   // console.log(bookingHistoryId);
        
                    booking["history"] = bookingHistoryId;
                    //console.log(booking)
        
                    axios.patch(`${_url}/bookings/${bookingId}`, booking).then((response)=>{
                        //console.log(response.data)
                    });
                    
                })
                });
        
                
        
            
            
        
    })
    .catch(error =>{
        console.error(error);
    })
};



//扣掉房間的function
function patchData(){
    let newData = []
    //確認房間數量
    axios.get(`${_url}/roomStates?date_gte=${bookingData.checkIn}&date_lte=${bookingData.checkOut}&date_ne=${bookingData.checkOut}`).then(function(response){

        let data = response.data;
        //console.log(data)
        //每晚減1個房間
        data.forEach(function(item){
            if(bookingData.roomType === "經典房"){
                item.availableCount.classic -=1;
                //console.log(item);
                newData.push(item);
                };

            if(bookingData.roomType === "精緻房"){
            item.availableCount.delicate -=1;
           // console.log(item);
            newData.push(item);
            };

            if(bookingData.roomType === "豪華房"){
                item.availableCount.luxury -=1;
               // console.log(item);
                newData.push(item);
                };
            
            
        });
        //console.log(newData);

        //用新的資料patch過去roomStates
        newData.forEach(function(item){
            let roomStatesId = item.id;
            //console.log(roomStatesId);
            axios.patch(`${_url}/roomStates/${roomStatesId}`, item).then(function(response){
               // console.log(response.data)
            })
        })
    });

    
};

























