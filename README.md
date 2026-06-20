# Mapty

A workout tracking web application built with JavaScript, Object-Oriented Programming (OOP), Geolocation API, Local Storage, and Leaflet maps.

## Live Demo

🔗 https://dexturn1.github.io/Mapty/

---

## Overview

Mapty allows users to log running and cycling workouts directly on an interactive map. The application uses the browser's Geolocation API to determine the user's location and displays an interactive map powered by Leaflet and OpenStreetMap. Workouts are persisted using Local Storage, allowing data to remain available after page refreshes. Leaflet is a popular open-source JavaScript library for interactive maps and is commonly used with OpenStreetMap tiles.

---

## Features

### Current Features

- Detect user location using Geolocation API
- Display interactive map with Leaflet
- Log running workouts
- Log cycling workouts
- Add workout markers on the map
- Display workouts in a sidebar list
- Move map to workout location when clicked
- Persist workouts using Local Storage
- Responsive and interactive UI

---

## Built With

- HTML5
- CSS3
- JavaScript (ES6+)
- Object-Oriented Programming (OOP)
- Geolocation API
- Local Storage API
- Leaflet.js
- OpenStreetMap

---

## Concepts Practiced

This project helped me practice:

- Classes and Inheritance
- Encapsulation
- DOM Manipulation
- Event Handling
- Geolocation API
- Third-Party Libraries
- Application Architecture
- Local Storage
- Object-Oriented Design Patterns
- Debugging and Refactoring

---

## 📂 Project Structure

```text
Mapty/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## Application Flow

1. User grants location permission.
2. Current location is displayed on the map.
3. User clicks on a map location.
4. Workout form appears.
5. User enters workout details.
6. Workout is saved and rendered.
7. Marker is added to the map.
8. Data is stored in Local Storage.

---

## Future Improvements

- Edit workouts
- Delete individual workouts
- Delete all workouts
- Sort workouts
- Filter workouts
- Statistics dashboard
- Dark mode
- Export/Import workout data
- Backend integration with Node.js and MongoDB

---

## 🧑‍💻 Author

**Prabhat Kapkoti**

GitHub: https://github.com/DexTurn1

---

## Acknowledgements

This project was built while following _The Complete JavaScript Course_ by Jonas Schmedtmann.

Map functionality is powered by Leaflet and OpenStreetMap.
