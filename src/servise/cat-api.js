//import axios from 'axios';

//const API_KEY =
//  'live_V8HYuwQGHrCRuDbKWADV94hb3cIE0fKwbJIkP3ilFvA8HvXoQWdO7ytqkZcSG1Wg';

//axios.defaults.headers.common['x-api-key'] = API_KEY;


const API_KEY =
  'live_V8HYuwQGHrCRuDbKWADV94hb3cIE0fKwbJIkP3ilFvA8HvXoQWdO7ytqkZcSG1Wg';
const BREED_URL = 'https://api.thecatapi.com/v1/breeds?api_key';
const IMG_URL = 'https://api.thecatapi.com/v1/images/search?api_key';

export const fetchBreeds = () => {
  return fetch(`${BREED_URL}=${API_KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
};

export const fetchCatByBreed = breedId => {
  return fetch(`${IMG_URL}=${API_KEY}&breed_ids=${breedId}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    }
  );
};