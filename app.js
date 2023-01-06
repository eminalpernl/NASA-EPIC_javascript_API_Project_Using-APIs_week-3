'use strict';
const body = document.getElementsByTagName('body');
const API = 'https://epic.gsfc.nasa.gov/api/enhanced/date/';
const dateInput = document.getElementById("date-input");
const button = document.getElementById('button');
const listWrap = document.createElement('div');
//const imageUrl ='https://epic.gsfc.nasa.gov/api/natural/date/{$year}-{$month}-{$day}'

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}

//fetchData(URL);




// const displayInput = function() {
//     const value = dateInput.value;
//     console.log(value);
//     return value;
// };

// button.addEventListener('click', displayInput);


async function fetchImageDate2() {

    
    listWrap.innerHTML = "";
    const dateList = document.createElement("select");
    listWrap.appendChild(dateList);
    body[0].appendChild(listWrap);
    const URL = `${API}${dateInput.value}`;
    const jsonData = await fetchData(URL);
    for (let index = 0; index < jsonData.length; index++) {
        const element = document.createElement('option');
        element.value = jsonData[index].date;
        element.textContent = jsonData[index].date;
        dateList.appendChild(element);
      }
    //   console.log(URL);
    //   console.log(dateInput.value);
    //   console.log(dateList);
};

// fetchImageDate2();


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

function main() {
    const submit = document.getElementById('button');
    submit.addEventListener('click', fetchImageDate2)

}


window.addEventListener('load', main);
