import { Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,

} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AlertComponent } from '../shared/modals/alert/alert.component';

export interface User{
  email: string;
  uid: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  constructor(// Inject Firestore service
  private router: Router,
  private snackBar: MatSnackBar,
  public afAuth: Auth) {
    this.afAuth.onAuthStateChanged((user) => {
      const userData: User = {
        email: user?.email || '', 
        uid: user?.uid || '', 
      }

      console.log('user', userData);
      this.user.next(userData);
    });

   }

   get isAuthenticated(): boolean {
    return this.afAuth.currentUser !== null;
  }

  login(email: string, password: string) {
    signInWithEmailAndPassword(this.afAuth, email, password)
    .then(()=>  this.router.navigate(['']))
    .catch(err =>{
      console.log('err', err)
      this.openSnackBar('Nieprawidłowy login lub hasło!');
    })
  }

  logout() {
    this.afAuth.signOut()
      .then(() => {
        this.router.navigate(['login']);
      })
      .catch((err) => {
        // An error occurred
        console.log('err', err)
        this.openSnackBar(err?.message);
      });
  }
  openSnackBar(message: string) {
    this.snackBar.openFromComponent(AlertComponent, {
      duration: 3000,
      data: {message}
    });
  }
}
