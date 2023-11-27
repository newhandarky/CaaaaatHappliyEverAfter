import axios from "axios";
import { _url } from "./config";
import Swal from 'sweetalert2';
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
           <a class="border border-primary w-75 btn articleTitle text-start" data-bs-toggle="collapse" href="#${item.title}" role="button" aria-expanded="false" aria-controls="collapseExample">
            ${item.title}
           </a>

        </p>
         <div class="collapse  w-75  " id="${item.title}">
          <div class="card card-body border-0  mt-1" style="background-color:#E2c6c4;">
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

axios.get(`${_url}/article`).then(function(response){
    let data = response.data;
    console.log(data);
    let str = "";
    data.forEach(function(item){
        str += `<li class="mb-3" id="">
        <p class="">
           <a class="border border-primary w-75 btn articleTitle text-start" data-bs-toggle="collapse" href="#${item.title}" role="button" aria-expanded="false" aria-controls="collapseExample">
            ${item.title}
            <span style="color: #e2c6c4;" >#${item.keyword}</span>
           </a>

        </p>
         <div class="collapse w-75" id="${item.title}">
          <div class="card card-body border-0 mt-1 " style="background-color:#E2c6c4;">
             ${item.content}
         </div>
         </div>
       </li>`
    });
    console.log(str);
    catArticleList.innerHTML = str
})