// import generatorLis from './genLis';
// import generatorCard from './genCard';

// import API from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ApiCountries from './fetchCountries';
const debounce = require('lodash.debounce');

const refs = {
  input: document.querySelector('#search-box'),
  ul: document.querySelector('.country-list'),
  card: document.querySelector('.country-info'),
};

refs.input.addEventListener(
  'input',
  debounce(e => contriesAdd(e.target.value), 1000)
);
function contriesAdd(text) {
  const countriesHandler = new ApiCountries();
  countriesHandler.input = text.trim();
  let contries = countriesHandler.searchCountry();
  contries.then(data => {
    console.log(data);
    if (!data.length) {
      return Notify.failure('Oops, there is no country with that name');
    }

    if (data.length > 10) {
      return Notify.failure('to match', {
        useIcon: false,
      });
    }

    createContry(data);
  });
}

function createContry(data) {
  data.forEach(element => {
    let li, img, ul, span, population, capital, languages;

    ul = document.querySelector('.country-list');
    li = document.createElement('li');
    li.classList.add('contry');
    span = document.createElement('span');
    span.classList.add('country_name');
    span.innerHTML = element.name.official;
    img = document.createElement('img');
    img.setAttribute('src', element.flags.svg);
    img.setAttribute('height', '30px');
    img.setAttribute('width', '60px');
    li.append(img);
    li.append(span);
    ul.append(li);
    if (data.length === 1) {
      population = document.createElement('li');
      capital = document.createElement('li');
      languages = document.createElement('li');
      population.innerHTML = element.population;
      capital.innerHTML = element.capital[0];
      languages.innerHTML = Object.values(element.languages).join(', ');
      console.log(Object.values(element.languages));
      ul.append(capital);
      ul.append(population);
      ul.append(languages);
    }
  });
}
