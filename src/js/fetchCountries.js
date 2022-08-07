export default class ApiCountries {
  constructor() {
    this.input = '';
    this.endPoint = `https://restcountries.com/v3.1/name/`;
  }
  searchCountry() {
    let url = this.endPoint + this.input;

    return fetch(url).then(r => {
      return r.json();
    });
  }
}
