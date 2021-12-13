import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';

import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent {
  public authForm: FormGroup;
  public authButtonText: string = 'Login';
  public authType: string = 'login';
  public showResetMessage: boolean = false;

  constructor(
    public navCtrl: NavController,
    formBuilder: FormBuilder
  ) {
    this.authForm = formBuilder.group({
      email: [
        '',
        Validators.required
      ],
      password: ['']
    });
  }

  goToLogin(): void {
    this.authButtonText = 'Login';
    this.authType = 'login';
  }

  goToSignup(): void {
    this.authButtonText = 'Signup';
    this.authType = 'signup';
  }

  goToReset(): void {
    this.authButtonText = 'Reset your password';
    this.authType = 'reset';
    this.showResetMessage = false;
  }

  loginUser(email: string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signupUser(email: string, password: string): Promise<any> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
  }

  resetPassword(email:string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  handleForm(authType, email: string, password: string = null): void {
    if(authType === 'login') {
      this.loginUser(email, password).then(() => {
        this.navCtrl.setRoot(HomePage);
      });
    } else if(authType === 'signup') {
      this.signupUser(email, password).then(() => {
        this.navCtrl.setRoot(HomePage);
      });
    } else if(authType === 'reset') {
      this.resetPassword(email).then(() => {
        this.showResetMessage = true;
      });
    }
  }
}