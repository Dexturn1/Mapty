'use strict';
// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// let map;
// let mapEvent;
class Workout {
  date = new Date();
  id = Date.now().toString().slice(-10);
  constructor(coords, distance, duration) {
    // this.date = ...
    // this.id = ...
    this.coords = coords; // [lat, long]
    this.distance = distance; // in km
    this.duration = duration; //im min
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
  }

  calcSpeed() {
    //km/hr
    this.speed = this.distance / (this.duration / 60);
  }
}

// const run1 = new Running([39, -12], 5.2, 24, 176);
// const cycling1 = new Cycling([39, -12], 27, 95, 573);

// console.log(run1, cycling1);

//////////////////////////////////////////////////////////

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
//   APPLICATION ARCHITECTURE
class App {
  #map;
  #mapEvent;
  #workouts = [];

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
          console.log('Fallback Triggered');
          this._loadMap({
            coords: {
              latitude: 28.6139,
              longitude: 77.209,
            },
          });
        }.bind(this),
        {
          enableHighAccuracy: true,
        },
      );
  }

  _loadMap(position) {
    console.log(position);
    const { latitude, longitude } = position.coords;
    // console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

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
    const validInputs = (...inputs) => inputs.every(inp => isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    e.preventDefault();

    // Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    if (!this.#mapEvent) return;
    if (!this.#map) return;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // If workout running, create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;
      // check if data is valid
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('Input have to be positive numbers');

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    //  If workOut cycling, create cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert('Input have to be positive numbers');
      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add new object to workout array
    this.#workouts.push(workout);
    console.log(workout);

    // Render workout on map as marker
    this.renderWorkoutMarker(workout);

    // Render workout on list

    // Hide form + Clear input fields

    if (!this.#mapEvent) return; // ✅ important
    if (!this.#map) return; // ✅ safety

    // Clear input fields
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';

    // Display the marker
  }

  renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        }),
      )
      .setPopupContent(`${workout.type}`)
      .openPopup();
  }
}

const app = new App();
