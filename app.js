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
const slideCont = document.createElement('div');
const queryForm = document.getElementsByClassName('query-form');
const errorMessage = document.createElement('span');

// async function fetchData(url) {
//   const response = await fetch(url);
//   const data = await response.json();
//   console.log(data);
//   return data;
// }

async function fetchData(url) {
 // try {
    
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    // if (data.length > 0) {
    //   return data;
    // } else {
    //   errorHandler();
    // }
    return data;
    
    
  // } catch (error) {
  //   console.log(error);
  //   errorHandler(x);

  // }


}


function errorHandler(x) {
  errorMessage.innerHTML = "";
  // const queryForm = document.getElementsByClassName('query-form');
  // const errorMessage = document.createElement('span');
  
  errorMessage.className = 'error-message';
  errorMessage.innerHTML = 'Tip: There is no photos for this day. Pick up another day !';
  queryForm[0].appendChild(errorMessage);

  

  // console.log(x);
  
  console.log('hata');
  console.log(x);
  return x;
  
}

async function fetchImageDate2() {

    
    listWrap.innerHTML = "";
    errorMessage.innerHTML = "";
    const dateList = document.createElement("select");
    dateList.className='select-box';
    listWrap.className= 'list-wrap';
    listWrap.appendChild(dateList);
    userInterface[0].appendChild(listWrap);
    const URL = `${API}${dateInput.value}?api_key=${API_KEY}`;
    console.log(URL);

    const jsonData = await fetchData(URL);

    if (jsonData.length<1) {
      return errorHandler();
    }

    //console.log(jsonData);
    for (let index = 0; index < jsonData.length; index++) {
        const element = document.createElement('option');
        element.value = jsonData[index].image;
        element.textContent = `Shooting Time: ${jsonData[index].date}  Image ID: ${jsonData[index].image}`;
        dateList.appendChild(element);
      }
    const getValueOfSelection = await fetchImage();
};


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
  slideCont.innerHTML = '';
  slideCont.className= 'slide-cont';
  userInterface[0].appendChild(slideCont);
  const URL = `${API}${dateInput.value}?api_key=${API_KEY}`
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
  const jsonData = await fetchData(URL);
  console.log(URL);

  
  
  for (let index = 0; index < jsonData.length; index++) {
    const singleImageDiv = document.createElement('div');
    singleImageDiv.className = 'single-image-div';
    const imgOnSldWrap = document.createElement('div');
    imgOnSldWrap.className = 'img-on-sld-wrap';
    
    singleImageDiv.appendChild(imgOnSldWrap);
    const img = document.createElement('img');
    const imgCounter = document.createElement('div');
    imgCounter.className='img-counter';
    imgCounter.innerText=`${index+1}  /  ${jsonData.length}`;
    const imgUrl = `${imgApi}${inputValue}/png/${jsonData[index].image}.png?api_key=${API_KEY}`;
    img.alt = 'earth';
    img.src = imgUrl;
    img.classList='img-on-slides';
    imgOnSldWrap.appendChild(img);
    singleImageDiv.appendChild(imgCounter);
    slideWrap.appendChild(singleImageDiv);
    userInterface[0].appendChild(slideWrap);


    const sunCoords = jsonData[index].sun_j2000_position; //distances
    const dscvrCoords = jsonData[index].dscovr_j2000_position; //distances
    const moonCoords = jsonData[index].lunar_j2000_position;
    const sunDistance = Math.floor(Math.sqrt(sunCoords.x**2 + sunCoords.y**2 + sunCoords.z**2)); //distances
    const earthDistance = Math.floor(Math.sqrt(dscvrCoords.x**2 + dscvrCoords.y**2 + dscvrCoords.z**2));
    const moonDistance = Math.floor(Math.sqrt(moonCoords.x**2 + moonCoords.y**2 + moonCoords.z**2));



    const infoPageCont = document.createElement('div'); // info-page
    infoPageCont.className = 'info-page-cont'; // info-page
    infoPageCont.innerHTML = `
      <ul class="info-ul";>
        <li class="info-items info-title ";>Image Information</li>
        <li class="info-items info-bullets";>Date: ${jsonData[index].date.split(" ")[0]}</li>
        <li class="info-items info-bullets";><a href="${imgUrl}"; target="_blank"><i class="fa-solid fa-download"></i>  Download Image</a></li>
        <li class="info-items info-bullets";>DSCVR to Earth: ${earthDistance} km</li>
        <li class="info-items info-bullets";>Moon to Earth: ${moonDistance} km</li>
        <li class="info-items info-bullets";>Sun to Earth: ${sunDistance} km</li>
      </ul>
    `;


   
    singleImageDiv.appendChild(infoPageCont);


  }
  
  slideWrap.appendChild(slidePrevButton);
  slideWrap.appendChild(slideNexButton);
  slideCont.appendChild(slideWrap);
  

  const runSlides = await showSlides(slideIndex);
}



function plusSlides(n) {
  showSlides(slideIndex += n);
}


async function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("single-image-div");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "grid";
}


async function main() {
    const submit = document.getElementById('button');
    submit.addEventListener('click', fetchImageDate2)

}


window.addEventListener('load', main);
