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
//const articleTitle = document.querySelector(".articleTitle");
//const cardBody = document.querySelector(".card-body");
//console.log(articleTitle);

axios.get(`${_url}/faqs`).then(function(response){
 
    let data = response.data;

    let str = '';
    data.forEach(function(item){
      // console.log(item.id);
      // console.log(item.content);


      str += `<li class="accordion-item">
      <h2 class="accordion-header" id="headingTwo">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#c${item.id}" aria-expanded="false" aria-controls="collapseTwo">
          ${item.title}
        </button>
      </h2>
      <div id="c${item.id}" class="accordion-collapse collapse" aria-labelledby="headingTwo" >
        <div class="accordion-body">
         ${item.content}
        </div>
      </div>
    </li>`


    });
   // console.log(str);
    articleList.innerHTML = str
    

});

//catArticle
//DOM
const catArticleList = document.querySelector(".catArticleList");
const selector = document.querySelector('#selector');
//console.log(selector);

axios.get(`${_url}/article`).then(function(response){
    let data = response.data;
    let newData = [];
    data.forEach(function(item){
        if(item.status == "已發佈"){
            newData.push(item);
        }
    })
  //console.log(newData);

  newData.sort(function(a,b){
    let dateA = new Date(a.lastEditOrPublishTime)
    //console.log(dateA);
    let dateB = new Date(b.lastEditOrPublishTime);
   // console.log(dateB)
    return dateB-dateA
  });
  //console.log(newData)
  render(newData)


    selector.addEventListener('change', function(e){
        let filterData = [];
//        console.log(selector.value);

        if(selector.value == "全部"){
            return render(newData);
        };
        
        newData.forEach(function(item){
            if(item.keyword === selector.value){
                filterData.push(item);
            };
           
        });

      //  console.log(filterData);
        render(filterData)

     })
});

//選擇的關鍵字
axios.get(`${_url}/article`).then(function(response){
    let keywordList = [];
    let data = response.data;
    data.forEach(function(item){
        keywordList.push(item.keyword)
    });
  //  console.log(keywordList);

    let str = `<option selected disabled>關鍵字</option>
    <option value="全部">全部</option>`;
    keywordList.forEach(function(item){
        str += `<option value="${item}">${item}</option>`
    });
   // console.log(str);
    selector.innerHTML = str
})


//渲染文章的modal
function render(data){
    let str = ""
    data.forEach(function(item){
        str += 
`<li class="border-bottom py-3 border-primary d-flex justify-content-between align-items-center">
        <!-- Button trigger modal -->
    <p class="fs-5 articleTag" type="button"  data-bs-toggle="modal" data-bs-target="#${item.title}">
    ${item.title} <span class="text-primary"> / ${item.keyword}</span>
    </p>
    <p>
    ${item.lastEditOrPublishTime}
    </p>

<!-- Modal -->
<div class="modal fade " id="${item.title}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog modal-dialog-scrollable" style="width:70%">
<div class="modal-content">
<div class="modal-header">
<h5 class="modal-title" id="exampleModalLabel">${item.title}</h5>
<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body">
<p class="fs-5">${item.content}</p>
</div>
</div>
</div>
</div>
    </li>`
    });
   // console.log(str);
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
           obj['feedback']=item.feedback.comment;
           userFeedbackList.push(obj)
          };
          
      });
    // console.log(userFeedbackList);

      userFeedbackList.forEach(function(item){
        axios.get(`${_url}/users/${item.userId}`).then(function(response){
         //   console.log(response.data);
            let userPhoto = response.data.userPhoto;
        //    console.log(userPhoto);
            
            let name  = response.data.name; //找到名字
            //console.log(name.split('')[0]);
            let lastName = name.split('')[0] //找到姓
            let add = response.data.address;
            let area = ''; //找到住哪個縣市
         //   console.log(add.split(''));
            area += (add.split(''))[0] + (add.split(''))[1] + (add.split(''))[2]
         //   console.log(area);
    
            let gender = ''; //找到先生小姐
            if(response.data.gender == 'female'){
             gender = "馬麻";
            };
            if(response.data.gender == 'male'){
             gender = "把拔";
            };
    
            axios.get(`${_url}/bookings?userId=${item.userId}`).then(function(response){
             //   console.log(response.data);
                let feedbackStr = '';
                let bookingData = response.data;
                let stars = 0;
                
                bookingData.forEach(function(item){
                    if(item.feedback !== ""){
                        feedbackStr += item.feedback.comment;
                        stars += item.feedback.stars;
                    }
                });
         //       console.log(feedbackStr);
           //     console.log(stars);
             //   console.log(5-stars);
                let starsSpan = `<span class="material-symbols-outlined">kid_star</span>`
                let noStarSpan = `<span class="material-symbols-outlined text-light">kid_star</span>`

               




            
            

                axios.get(`${_url}/cats?userId=${item.userId}`).then(function(response){
                   // console.log(response.data);
                    let catData = response.data;
                    let catsName = [];
                    catData.forEach(function(item){
                      //  console.log(item);
                        catsName.push(item.catName)
                    });
                   // console.log(catsName);
                   

                    str += 
            `<li class="swiper-slide d-flex flex-column justify-content-around bg-primary02 border border-light
                    pb-3 mb-5" style="border-radius: 32px;">
                    <img src="${userPhoto}" alt="" class=" w-75 mt-5 mb-2" style="border-radius:32px ; height:400px" >

                    

                    <ul class="d-flex flex-column " style="padding-left:32px; padding-right:32px">
                    
                    <li class="text-start">${area}<span class="text-primary">${catsName}</span> の ${gender}：
                     ${feedbackStr}
                    </li>
                    
                    <li class="d-flex justify-content-center mt-5">
                       ${starsSpan.repeat(stars)}${noStarSpan.repeat(5-stars)} 
                    </li>
                    </ul>
                   
                    
                    
                    
            </li>`;
    
                swiperWapper.innerHTML = str;
                feedbackArea.innerHTML=str;
                   
                })
                



            });
    
        });
      });


  });
