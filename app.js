'use strict';
let slideIndex = 1;
const body = document.getElementsByTagName('body');
const userInterface = document.getElementsByClassName('user-interface');
const API = 'https://api.nasa.gov/EPIC/api/natural/date/';
const imgApi = 'https://api.nasa.gov/EPIC/archive/natural/';
const dateInput = document.getElementById("date-input");
const button = document.getElementById('button');
const listWrap = document.createElement('div');
const API_KEY = 'CR6PmDZLb5fTpRM9XpBhg7Ptm55c56rv8q5xfzxq';

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}


async function fetchImageDate2() {

    
    listWrap.innerHTML = "";
    const dateList = document.createElement("select");
    dateList.className='select-box';
    listWrap.className= 'list-wrap';
    listWrap.appendChild(dateList);
    userInterface[0].appendChild(listWrap);
    const URL = `${API}${dateInput.value}?api_key=${API_KEY}`;
    console.log(URL);
    const jsonData = await fetchData(URL);
    console.log(jsonData);
    for (let index = 0; index < jsonData.length; index++) {
        const element = document.createElement('option');
        element.value = jsonData[index].image;
        element.textContent = `Shooting Time: ${jsonData[index].date}  Image ID: ${jsonData[index].image}`;
        dateList.appendChild(element);
      }
    const getValueOfSelection = await fetchImage();
};



// async function fetchImage() {
//   const imgWrap = document.createElement('div');
//   imgWrap.className = 'img-wrap';
//   const earthImg = document.createElement('img');
//   const selected = document.getElementsByClassName('select-box');
//   const inputValue = (dateInput.value).split('-').join('/');
//   selected[0].addEventListener('change', async (event) => {
//     imgWrap.innerHTML='';
//     const grabImageId = event.target.value;
//     const imgUrl = `${imgApi}${inputValue}/png/${grabImageId}.png?api_key=${API_KEY}`;
//     console.log(grabImageId);
//     imgWrap.appendChild(earthImg);
//     body[0].appendChild(imgWrap);
//     console.log(imgUrl);
//     earthImg.className = 'earth-image';
//     earthImg.src = imgUrl;
//     earthImg.alt = 'Earth';
//   });
// }

async function fetchImage() {
  const imgWrap = document.createElement('div');
  imgWrap.className = 'img-wrap';
  const earthImg = document.createElement('img');
  const selected = document.getElementsByClassName('select-box');
  const inputValue = (dateInput.value).split('-').join('/');
  selected[0].addEventListener('change', async (event) => {
    imgWrap.innerHTML='';
    const grabImageId = event.target.value;
    const imgUrl = `${imgApi}${inputValue}/png/${grabImageId}.png?api_key=${API_KEY}`;
    console.log(grabImageId);
    imgWrap.appendChild(earthImg);
    userInterface[0].appendChild(imgWrap);
    console.log(imgUrl);
    earthImg.className = 'earth-image';
    earthImg.src = imgUrl;
    earthImg.alt = 'Earth';
  });

  const printIdList = await makeImageSlide();

}

async function makeImageSlide(){
  const slideNexButton = document.createElement('a');
  slideNexButton.className = 'next';
  slideNexButton.setAttribute('onclick', "plusSlides(1)");
  slideNexButton.innerHTML = '&#10095;';
  const slidePrevButton = document.createElement('a');
  slidePrevButton.className = 'prev';
  slidePrevButton.setAttribute('onclick', "plusSlides(-1)");
  slidePrevButton.innerHTML = '&#10094;';
  const inputValue = (dateInput.value).split('-').join('/');
  const ImgIdList = document.getElementsByTagName('option');
  const slideWrap = document.createElement('div');
  slideWrap.className = 'slide-wrap';
  
  for (let index = 0; index < ImgIdList.length; index++) {
    const singleImageDiv = document.createElement('div');
    singleImageDiv.className = 'single-image-div';

    const img = document.createElement('img');
    const captionDiv = document.createElement('div');
    captionDiv.className='img-counter';
    captionDiv.innerText=`${index+1}/${ImgIdList.length}`;
    const imgUrl = `${imgApi}${inputValue}/png/${ImgIdList[index].value}.png?api_key=${API_KEY}`;
    img.alt = 'earth';
    img.src = imgUrl;
    img.classList='img-on-slides';
    singleImageDiv.appendChild(img);
    singleImageDiv.appendChild(captionDiv);
    slideWrap.appendChild(singleImageDiv);
    userInterface[0].appendChild(slideWrap);

    const infoPageCont = document.createElement('div'); // info-page
    infoPageCont.className = 'info-page-cont'; // info-page
    infoPageCont.innerHTML = `


      <ul>
        <li class="info-items";><a href="";>${ImgIdList[index].value}</a></li>
        <li class="info-items";>Distance to Earth:</li>
        <li class="info-items";>Distance to Sun:</li>
        <li class="info-items";>Sun to Earth:</li>
      </ul>

    
    
    
    `;
    singleImageDiv.appendChild(infoPageCont);


  }
  
  slideWrap.appendChild(slidePrevButton);
  slideWrap.appendChild(slideNexButton);

  // for (let index = 0; index < ImgIdList.length; index++) {
  //   const infoPageCont = document.createElement('div'); // info-page
  //   infoPageCont.className = 'info-page-cont'; // info-page
  //   infoPageCont.innerHTML = `
  //   <h3><a href="";>${ImgIdList[index].value}</a></h3></br>
  //   <p>Distance to Earth:</p>
  //   `;
  //   singleImageDiv[0].appendChild(infoPageCont);
  // }


  const runSlides = await showSlides(slideIndex);
}




// async function createInfoPage(a) {
//   const infoPageCont = document.createElement('div');
//   infoPageCont.className = 'info-page-cont';
//   infoPageCont.innerHTML = `
//     <h3><a href="";>${a[index]}</a></h3></br>
//     <p>Distance to Earth:</p>
//   `;


  
// }



function plusSlides(n) {
  showSlides(slideIndex += n);
}


async function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("single-image-div");
  //let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "flex";
}


async function main() {
    const submit = document.getElementById('button');
    submit.addEventListener('click', fetchImageDate2)

}


window.addEventListener('load', main);
