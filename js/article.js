import axios from "axios";
import { _url } from "./config";
import Swal from 'sweetalert2';
// core version + navigation, pagination modules:
import Swiper from 'swiper/bundle';
import { Navigation, Pagination } from 'swiper/modules';
 //import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



//FAQ
//DOM
const articleList = document.querySelector(".articleList");
const articleTitle = document.querySelector(".articleTitle");
const cardBody = document.querySelector(".card-body");
console.log(articleTitle);

axios.get(`${_url}/faqs`).then(function(response){
    console.log(response.data);
    let data = response.data;
    console.log(data);
    let str = '';
    data.forEach(function(item){
        console.log(item.title);
        console.log(item.content);
        str += `<li class="mb-3  id="">
        <p class="">
           <a class="border border-primary w-100  btn articleTitle text-start" data-bs-toggle="collapse" href="#${item.title}" role="button" aria-expanded="false" aria-controls="collapseExample">
            ${item.title}
           </a>

        </p>
         <div class="collapse " id="${item.title}">
          <div class="card card-body border-0 w-100 mt-1" style="background-color:#E2c6c4;">
             ${item.content}
         </div>
         </div>
       </li>`
    });
    console.log(str);
    articleList.innerHTML = str
    

});

//catArticle
//DOM
const catArticleList = document.querySelector(".catArticleList");
const selector = document.querySelector('#selector');
console.log(selector);

axios.get(`${_url}/article`).then(function(response){
    let data = response.data;
    console.log(data);
    render(data);

    selector.addEventListener('change', function(e){
        let filterData = [];
//        console.log(selector.value);

        if(selector.value == "全部"){
            return render(data);
        };
        
        data.forEach(function(item){
            if(item.keyword === selector.value){
                filterData.push(item);
            };
           
        });

        console.log(filterData);
        render(filterData)

     })
});




function render(data){
    let str = ""
    data.forEach(function(item){
        str += `<li class="mb-3 " id="">
        <p class="">
           <a class="border border-primary w-100   btn articleTitle text-start" data-bs-toggle="collapse" href="#${item.title}" role="button" aria-expanded="false" aria-controls="collapseExample">
            ${item.title}
            <span style="color: #e2c6c4;" class="keyword" >#${item.keyword}</span>
           </a>

        </p>
         <div class="collapse w-100 " id="${item.title}">
          <div class="card card-body border-0 mt-1 " style="background-color:#E2c6c4;">
             ${item.content}
         </div>
         </div>
       </li>`
    });
    console.log(str);
    catArticleList.innerHTML = str;
}

//顧客回饋區域
//DOM
const swiperWapper = document.querySelector('.swiper-wrapper')
 const feedbackArea = document.querySelector('.feedbackArea');


var swiper = new Swiper(".mySwiper", {
    slidesPerView:3,
    spaceBetween: 30,
    centeredSlides: true,
   autoplay: {
    delay: 1000,
    disableOnInteraction: false,
   },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  let str = '';
  let arr = [];
  
  axios.get(`${_url}/bookings`).then(function(response){
    //  console.log(response.data);
      let data = response.data;
      let userFeedbackList = []
      
      data.forEach(function(item){
          let obj = {};
          if(item.feedback !== ""){
           let userId = item.userId//找到userID
           obj['userId'] = item.userId;
           obj['feedback']=item.feedback;
           userFeedbackList.push(obj)
          };
          
      });
      console.log(userFeedbackList);

      userFeedbackList.forEach(function(item){
        axios.get(`${_url}/users/${item.userId}`).then(function(response){
            console.log(response.data);
            let userPhoto = response.data.userPhoto;
            console.log(userPhoto);
            
            let name  = response.data.name; //找到名字
            //console.log(name.split('')[0]);
            let lastName = name.split('')[0] //找到姓
            let add = response.data.address;
            let area = ''; //找到住哪個縣市
            console.log(add.split(''));
            area += (add.split(''))[0] + (add.split(''))[1] + (add.split(''))[2]
            console.log(area);
    
            let gender = ''; //找到先生小姐
            if(response.data.gender == 'female'){
             gender = "馬麻";
            };
            if(response.data.gender == 'male'){
             gender = "把拔";
            };
    
            axios.get(`${_url}/bookings?userId=${item.userId}`).then(function(response){
                console.log(response.data);
                let feedbackStr = '';
                let bookingData = response.data;
                bookingData.forEach(function(item){
                    if(item.feedback !== ""){
                        feedbackStr += item.feedback;

                    }
                });
                console.log(feedbackStr);

                axios.get(`${_url}/cats?userId=${item.userId}`).then(function(response){
                    console.log(response.data);
                    let catData = response.data;
                    let catsName = [];
                    catData.forEach(function(item){
                        console.log(item);
                        catsName.push(item.catName)
                    });
                    console.log(catsName);

                    str += `<li class="swiper-slide d-flex flex-column justify-content-around bg-primary02 border border-light
                    pb-3 mb-5" style="border-radius: 32px;">
                    <img src="${userPhoto}" alt="" class="rounded-circle" >

                    

                    <ul class="d-flex flex-column align-items-start" style="padding-left:32px; padding-right:32px">
                    
                    <li class="text-start">${area}<span class="text-primary">${catsName}</span> の ${gender}：</li>
                    <li class="d-flex ">
                    <span class="material-symbols-outlined me-2">pets</span>
                    <p>  
                    ${feedbackStr}</p></li>
                    </ul>
                   
                    
                    
                    
                </li>`;
    
                swiperWapper.innerHTML = str;
                feedbackArea.innerHTML=str;
                   
                })
                



            });
    
        });
      });


  });
