# crypto-tracker

**NOTE:** This is a personal project to demonstrate my abilities as a front-end developer. Please DO NOT use this for your own finances as it has not been thoroughly tested.

## Overview
A simple CRUD app for managing finances using the [Coincap](https://docs.coincap.io/) API. Allows users to add a holding, specifying the amount spent and amount bought, then track the value of this holding, seeing how much the value has changed based on exchange rates. 

## Features
- Can add, remove and edit holdings
- Uses web sockets to update exchange rates in real-time
- Can switch themes dynamically
- Can dynamically change which FIAT currency holdings are converted to
- Ability to dynamically set the scale of the UI using predefined increments
- Adaptive UI to small screen sizes
- Secure authentication using [Auth0](https://auth0.com/)

## Technical info
Built using Angular 13 and (NestJS)[https://nestjs.com/], using [Auth0](https://auth0.com/) for authentication, (NgRx)[https://ngrx.io/] for state management and (Angular Material)[https://v13.material.angular.io/] for form controls and buttons.

The other components and SCSS themes are built by hand!

## Screenshots

### Desktop overview
![Desktop view](https://user-images.githubusercontent.com/25081953/216793473-8e0d1a1c-296b-4730-a984-2b95995e7c84.png)

### Settings menu
![Settings menu](https://user-images.githubusercontent.com/25081953/216793479-1d0a6824-357b-42e2-9e54-f656e073aa04.png)

### Light theme
![Light theme](https://user-images.githubusercontent.com/25081953/216793492-1bd46983-5658-461a-8788-40abc19ce7fa.png)

### Edit asset dialog (same as add asset)
![Edit asset dialog (same as add asset)](https://user-images.githubusercontent.com/25081953/216793505-5f8d0a07-6c17-459e-b0db-5baa6cd0cd2b.png)

### Mobile view
![Mobile view](https://user-images.githubusercontent.com/25081953/216793508-5f8d118b-67c4-41f8-9f5a-e02663cef4ab.png)
