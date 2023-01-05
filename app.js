'use strict';
const body = document.getElementsByTagName('body');
const URL = 'https://epic.gsfc.nasa.gov/api/enhanced/date/2015-10-31';
const imageUrl ='https://epic.gsfc.nasa.gov/api/natural/date/{$year}-{$month}-{$day}'

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}

fetchData(URL);

async function fetchImageDate(url) {
  const dataContainer = document.createElement("select")
  body[0].appendChild(dataContainer);
  //const selection = document.getElementById('date-selection'); 
  const jsonData = await fetchData(url);
  console.log(jsonData);
  for (let index = 0; index < jsonData.length; index++) {
    const element = document.createElement('option');
    element.value = jsonData[index].date;
    element.textContent = jsonData[index].date;
   // selection.appendChild(element);
    dataContainer.appendChild(element);
  }
//;
}

fetchImageDate(URL);
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

//main();

//window.addEventListener('load', main);
