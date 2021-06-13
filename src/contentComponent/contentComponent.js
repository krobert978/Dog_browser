import '../css/contentComponent.css';
import yall from 'yall-js';
import preloading from '../img/preloading.gif';


// az export default ide is beírható, akkor a file végére már nem kell..
export default class ContentComponent {

  // ha van már kép megjelenítve akkor azt töröljük
  clearContent() {
    const content = document.querySelector('#content');
    content.innerHTML = '';
  }

  clearErrors() {
    const errors = document.querySelector('.errors');
    errors.innerHTML = '';
  }

  // megjelenít egy hibaüzenetet a felhasználónak
  displayError(message) {
    this.clearErrors();
    const popupMessage = document.createElement('h2');
    popupMessage.classList.add('error-message');
    popupMessage.innerHTML = message;
    // <h2 class="error-message"> message </h2>
    document.querySelector('.errors').appendChild(popupMessage);
  }

  handleContentDisplay(searchTerm) {
    // 2.feladat
    let inputValue = parseInt(document.querySelector('#imageNumberInput').value);
    let count;
    if (isNaN(inputValue) === true) {
      count = 1;
    } else {
      count = inputValue;
    }
    this.getImages(searchTerm).then(result => {

      // ha csak egy dolgot kell csinálni az if block-ban, akkor a kódblokk {} elhagyható
      if (result) {
        this.clearErrors(); // 2.feladat
        this.clearContent();
        for (let i = 1; i <= count; i++) {
          this.displayImage(result);
        }
      }
    });
  }

  setSearchTerm(term) {
    document.querySelector('#dogSearchInput').value = term;
  }

  // Ez a metódus letölti az adatot az API-ról
  async getImages(dogbreed) {
    if (!dogbreed) {
      this.displayError('Nem lett beírva semmi a keresőbe, nem tudunk keresni!');
      // megállítjuk a getImages függvény futását
      return;
    }

    let urlString = '';
    dogbreed = dogbreed.toLowerCase().split(' '); // 1.feladat - toLowerCase
    // dogbreed = dogbreed.split(' ');
    // a dogbreed változó mostmár egy tömb!
    if (dogbreed.length === 1) {
      urlString = `https://dog.ceo/api/breed/${dogbreed[0]}/images`;
    } else if (dogbreed.length === 2) {
      urlString = `https://dog.ceo/api/breed/${dogbreed[1]}/${dogbreed[0]}/images`;
    }
    const response = await fetch(urlString);
    const data = await response.json();
    // a data változó egy objecteket tartalmazó tömb
    return data;
  }

  // ez a metódus megjelenít egy képet (véletlenszerűen)
  displayImage(data) {
    // this.clearErrors();
    // this.clearContent();
    const image = document.createElement('img');
    // a data.message tömbből egy véletlenszerű elemet kiválasztunk
    image.src = '../img/preloading.gif';
    image.dataset.src = data.message[Math.floor(Math.random() * data.message.length)];
    image.classList.add('lazy');
    // image.src = data.message[Math.floor(Math.random() * data.message.length)];
    document.querySelector('#content').appendChild(image);
    yall({
      events: {
        load: event => {
          if (event.target.nodeName == 'IMG' && !event.target.classList.contains('lazy')) {
            event.target.classList.add('yall-loaded');
          }
        }
      }
    });
    // console.log(data);
  }



}
