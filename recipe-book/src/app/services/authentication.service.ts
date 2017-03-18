import { Injectable } from '@angular/core';

declare var firebase: any;

@Injectable()
export class AuthenticationService {
  constructor() { }
  
  signUpUser(email: string, password: string) {
   return firebase.auth().createUserWithEmailAndPassword(email, password);
  }
  
  signInUser(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
  
  isAuthenticated() {
    return !!firebase.auth().currentUser;
  }
  
  logout () {
    firebase.auth().signOut();
  }

}
