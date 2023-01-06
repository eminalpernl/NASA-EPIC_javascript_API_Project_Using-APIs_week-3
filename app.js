'use strict';
const body = document.getElementsByTagName('body');
const API = 'https://api.nasa.gov/EPIC/api/natural/date/';
const dateInput = document.getElementById("date-input");
const button = document.getElementById('button');
const listWrap = document.createElement('div');
const exampleQuery = 'https://api.nasa.gov/EPIC/archive/natural/2019/05/30/png/epic_1b_20190530011359.png?api_key=CR6PmDZLb5fTpRM9XpBhg7Ptm55c56rv8q5xfzxq';
                      //https://api.nasa.gov/EPIC/archive/natural/2016-01-05/png/epic_RGB_20160105111530.png?api_key=CR6PmDZLb5fTpRM9XpBhg7Ptm55c56rv8q5xfzxq
                      //https://api.nasa.gov/EPIC/api/natural/date/2019-05-30?api_key=CR6PmDZLb5fTpRM9XpBhg7Ptm55c56rv8q5xfzxq
                      //https://api.nasa.gov/EPIC/archive/natural/2019/02/07/png/epic_1b_20190207023358.png?api_key=CR6PmDZLb5fTpRM9XpBhg7Ptm55c56rv8q5xfzxq
                      //https://api.nasa.gov/EPIC/archive/natural/2019-02-07/png/epic_1b_20190207023358.png?api_key=CR6PmDZLb5fTpRM9XpBhg7Ptm55c56rv8q5xfzxq
                      //https://api.nasa.gov/EPIC/archive/natural/2019/02/07/png/epic_1b_20190207023358.png?api_key=CR6PmDZLb5fTpRM9XpBhg7Ptm55c56rv8q5xfzxq

const imgApi = 'https://api.nasa.gov/EPIC/archive/natural/';
const API_KEY = 'CR6PmDZLb5fTpRM9XpBhg7Ptm55c56rv8q5xfzxq';
//const imageUrl ='https://epic.gsfc.nasa.gov/api/natural/date/{$year}-{$month}-{$day}'

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
    listWrap.appendChild(dateList);
    body[0].appendChild(listWrap);
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

async function fetchImage() {
  const selected = document.getElementsByClassName('select-box');
  const inputValue = (dateInput.value).split('-').join('/');
  selected[0].addEventListener('change', async (event) => {
    const grabImageId = event.target.value;
    const imgUrl = `${imgApi}${inputValue}/png/${grabImageId}.png?api_key=${API_KEY}`;
    console.log(grabImageId);
    const imgWrap = document.createElement('div');
    const earthImg = document.createElement('img');
    imgWrap.appendChild(earthImg);
    body[0].appendChild(imgWrap);
    console.log(imgUrl);

    // const imgFetch = await (await fetch(grabApi)).json();
    // console.log(imgFetch);
    // earthImg.src = imgFetch.sprites.other.home.front_default;
    // earthImg.alt = imgFetch.forms[0].name;
  });
}

// async function fetchImage() {
//   const selected = document.getElementById('select-box');
//   const 
//   selected.addEventListener('change', async (event) => {
//     const grabApi = event.target.value;
//     const imgWrap = document.createElement('div');
//     const earthImg = document.createElement('img');
//     imgWrap.appendChild(earthImg);
//     body[0].appendChild(imgWrap);

//     const imgFetch = await (await fetch(grabApi)).json();
//     console.log(imgFetch);
//     pokeImg.src = imgFetch.sprites.other.home.front_default;
//     pokeImg.alt = imgFetch.forms[0].name;
//   });
// }


// async function fetchImageDate(url, query) {
//   const urlDate = `${url}${query}`;
//   const dateInput = document.getElementById('date-input');
//   const dateList = document.createElement("select");
//   const submit = document.getElementById('submit');
//   body[0].appendChild(dateList);
//   submit.addEventListener('click', async (event) => {
//     const inputValue = dateInput.target.value;
//         // const pokeImg = document.getElementById('poke-img');
//         const imgFetch = await (await fetch(grabDate)).json();
//         console.log(inputValue);
//         // pokeImg.src = imgFetch.sprites.other.home.front_default;
//         // pokeImg.alt = imgFetch.forms[0].name;
//       });
//   //const selection = document.getElementById('date-selection'); 
//   const jsonData = await fetchData(urlDate);
//   console.log(jsonData);
//   for (let index = 0; index < jsonData.length; index++) {
//     const element = document.createElement('option');
//     element.value = jsonData[index].date;
//     element.textContent = jsonData[index].date;
//    // selection.appendChild(element);
//     dateList.appendChild(element);
//   }
// //;
// }

// fetchImageDate(URL, '2022-01-01');

// async function fetchImage() {
//   const selected = document.getElementById('poke-list');
//   selected.addEventListener('change', async (event) => {
//     const grabApi = event.target.value;
//     const pokeImg = document.getElementById('poke-img');
//     const imgFetch = await (await fetch(grabApi)).json();
//     console.log(imgFetch);
//     pokeImg.src = imgFetch.sprites.other.home.front_default;
//     pokeImg.alt = imgFetch.forms[0].name;
//   });
// }

// async function main() {
//   try {
//     await fetchData(URL);
//     await fetchAndPopulatePokemons(URL);
//     await fetchImage();
//   } catch (error) {
//     console.log(error);
//   }
// }

async function main() {
    const submit = document.getElementById('button');
    submit.addEventListener('click', fetchImageDate2)

}


window.addEventListener('load', main);
