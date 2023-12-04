import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed  } from './servise/cat-api';
import './css/style.css';


const selectBreed = document.querySelector('.breed-select');
const container = document.querySelector('.cat-info');
const loaderAnime = document.querySelector('.loader');
const body = document.querySelector('body');

body.style.backgroundColor = '#263038';

const options = {
  position: 'center-bottom',
  distance: '30px',
  borderRadius: '5px',
  opacity: 0.8,
  timeout: 8000,
  clickToClose: true,
  cssAnimationStyle: 'zoom',
};

loaderAnime.hidden = true;

selectBreed.addEventListener('change', event => {
    loaderAnime.hidden = false;
    container.hidden = true;
    
  const breedId = event.target.value;
  fetchCatByBreed(breedId)
    .then(breeds => renderBreedDesc(breeds))
    .catch(error => err())
    .finally(() => {
    loaderAnime.hidden = true;
    container.hidden = false;
    });
});

function err() {
  Notify.success(`Oops! Something went wrong! Try reloading the page!`, options);
}

const renderOptions = breeds => {
  const markup = breeds
    .map(selectBreed => {
      return `<option value="${selectBreed.id}">${selectBreed.name}</option>`;
    })
    .join();
  selectBreed.insertAdjacentHTML('beforeend', markup);
  new SlimSelect({
    select: '#single',
  });
};

const renderBreedDesc = selectBreed => {
  container.innerHTML = '';
  
    const { url } = selectBreed[0];
    const descriptionBreed =
        `<div class="image-card"><img class="image" src="${url}" alt="${selectBreed[0].breeds[0].name}"></div>
         <div class="desc-card"><h2 class="title">${selectBreed[0].breeds[0].name}</h2>
            <p>${selectBreed[0].breeds[0].description}</p>
            <p><span class="title">Temperament:</span> ${selectBreed[0].breeds[0].temperament}</p></div>`;
  
    container.insertAdjacentHTML('beforeend', descriptionBreed);
};

const breedAndFetch = () => {
  fetchBreeds()
    .then(breeds => renderOptions(breeds))
    .catch(error => err());
};

breedAndFetch();