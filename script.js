'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// let map;
// let mapEvent;

class App {
  #map;
  #mapEvent;

  constructor() {
    this._getPositions();
    form.addEventListener('submit', this._newWorkout.bind(this));

    inputType.addEventListener('change', function () {
      inputElevation
        .closest('.form__row')
        .classList.toggle('form__row--hidden');
      inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    });
  }

  _getPositions() {
    // We pass _loadMap as a callback, but callbacks lose their `this`.
    // bind(this) ensures that inside _loadMap, `this` still points to the App instance.
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your position');
        },
        {
          enableHighAccuracy: true,
        },
      );
  }

  _loadMap(position) {
    // console.log(position);
    const { latitude, longitude } = position.coords;
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];

    // Leaflet Code from from leaflet
    this.#map = L.map('map').setView(coords, 13);
    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      {
        attribution: '&copy; OpenStreetMap &copy; CartoDB',
      },
    ).addTo(this.#map);

    L.marker(coords)
      .addTo(this.#map)
      .bindPopup('A pretty CSS popup.<br> Easily customizable.')
      .openPopup();

    // handling clicks on map
    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    console.log(this.#mapEvent);
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleWorkout() {}

  _newWorkout(e) {
    e.preventDefault();

    if (!this.#mapEvent) return; // ✅ important
    if (!this.#map) return; // ✅ safety

    // Clear input fields
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';

    // Display the marker
    const { lat, lng } = this.#mapEvent.latlng;
    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        }),
      )
      .setPopupContent('Workout')
      .openPopup();
  }
}

const app = new App();
