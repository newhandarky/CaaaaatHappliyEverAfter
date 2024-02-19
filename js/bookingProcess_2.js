import axios from "axios";
import { _url } from "./config";
import { isLogin } from "./isLogin";
import Swal from 'sweetalert2';

//DOM
const chooseFirstCat = document.querySelector("#chooseFirstCat");
const chooseSecondCat = document.querySelector("#chooseSecondCat");
const chooseThirdCat = document.querySelector("#chooseThirdCat");
const remark = document.querySelector(".remark");
const toProcess_3 = document.querySelector(".toProcess_3");


//找會員的UserID編號
let userInfo= JSON.parse(localStorage.getItem('userTokenAndData'));
let userId = userInfo.user.id
//console.log(userId)

//用UserID 去找他的貓咪有誰

axios.get(`${_url}/cats?userId=${userId}`).then(function(response){
    let data = response.data;
    let array = [];
    data.forEach(function(item){
        array.push(item.catName); //把物件資料的貓咪名字推進去array裡面
    });
    //console.log(array); //user的貓咪名字
    //入住貓咪1的選單
    let catList = `<option value="" disabled selected>請選擇貓咪</option>`;
    array.forEach(function(item){
        let contentText = `<option value=${item}>${item}</option> `
        catList += contentText;
    })
    //console.log(catList);
    chooseFirstCat.innerHTML=catList;

    //入住貓咪2的選單
    let catList2Array = [];

    chooseFirstCat.addEventListener("change", function(e){
        array.forEach(function(item){
            if(chooseFirstCat.value !== item){
                catList2Array.push(item)
            }
        });
       // console.log(catList2Array); //確定只有另一隻還沒被選到的貓
        let catList2 = `<option value="" >請選擇貓咪</option>`;
        catList2Array.forEach(function(item){
            let contentText = `<option value=${item}>${item}</option> `;
            catList2 += contentText;
        });
        chooseSecondCat.innerHTML=catList2
       
    });

   

    //入住貓咪3的選單
    let catList3Array = [];
    chooseSecondCat.addEventListener("change", function(e){
        let catList3 = `<option value="" >請選擇貓咪</option>`

        catList2Array.forEach(function(item){
            if(chooseSecondCat.value !== item){
                catList3Array.push(item);
            };
        });
        //console.log(catList3Array);//還沒被選到的貓
        catList3Array.forEach(function(item){
            let contentText = `<option value=${item}>${item}</option> `;
            catList3 += contentText;
        })

        chooseThirdCat.innerHTML = catList3


    })

});



//把要入住的貓咪資訊先包起來

toProcess_3.addEventListener("click", function(e){
    e.preventDefault();
  
    // const toProcess_3Herf = toProcess_3.getAttribute('href');
    // isLogin(toProcess_3Herf);
   
    let obj = {};
    obj["remark"]= remark.value;
    obj["catId"]= [];
   // console.log(obj)
    //選擇入住貓咪1
    if(chooseFirstCat.value === ""){
        
         Swal.fire({icon: "warning",
         text:`請選擇貓咪`,confirmButtonColor:"#fa863e"});
            return  
    }else{

    let stayedCat1 = chooseFirstCat.value;
    axios.get(`${_url}/cats?userId=${userId}&catName=${stayedCat1}`).then(function(response){
        // obj["cat1"]  = response.data[0]['id']
       // console.log(response.data[0]['id'])
        obj["catId"].push(response.data[0]['id']);
      //  console.log(JSON.stringify(obj));
        sessionStorage.setItem("catInfo",JSON.stringify(obj) );
         window.location.href="./bookingProcess_3.html"
        
        
    });
    }
    
//選擇入住貓咪2
    if(chooseSecondCat.value == ''){
        return
    }else{

        let stayedCat2 = chooseSecondCat.value;
        axios.get(`${_url}/cats?userId=${userId}&catName=${stayedCat2}`).then(function(response){

          //  console.log(response.data[0]['id'])
            obj["catId"].push(response.data[0]['id']);
           // console.log(JSON.stringify(obj));
            sessionStorage.setItem("catInfo",JSON.stringify(obj) );
         
        window.location.href="./bookingProcess_3.html"
            
        });

    };
//選擇入住貓咪3
    if(chooseThirdCat.value == ''){
        return
    }else{

        let stayedCat3 = chooseThirdCat.value;
        axios.get(`${_url}/cats?userId=${userId}&catName=${stayedCat3}`).then(function(response){
           // console.log(response.data[0]['id'])
            obj["catId"].push(response.data[0]['id']);
          //  console.log(JSON.stringify(obj));
            sessionStorage.setItem("catInfo",JSON.stringify(obj) );
          
         window.location.href="./bookingProcess_3.html"
            
        });
        

    };

  
            



})

