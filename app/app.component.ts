import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { HomePage } from '../pages/home/home';
import { AuthPageComponent } from '../pages/auth-page/auth-page.component';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor() {
    firebase.initializeApp({
      apiKey: "AIzaSyDnlvRQ4UJl9ypzQjcQkMfIe8i9yEJ4oe0",
      authDomain: "firestore-event-manager.firebaseapp.com",
      databaseURL: "https://firestore-event-manager.firebaseio.com",
      projectId: "firestore-event-manager",
      storageBucket: "firestore-event-manager.appspot.com",
      messagingSenderId: "823274361576",
      appId: "1:823274361576:web:96975e3016ca2c76"
    });

    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.rootPage = AuthPageComponent;
        unsubscribe();
      } else {
        this.rootPage = HomePage;
        unsubscribe();
      }
    });

  }

}
