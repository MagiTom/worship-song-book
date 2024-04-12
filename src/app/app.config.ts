import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { environment } from '../environments/environment.development';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding()), provideAnimationsAsync(), 
 importProvidersFrom([
  provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
  provideAuth(() => getAuth()),
  provideFirestore(() => getFirestore()),
  provideStorage(() => getStorage())
]), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"worship-book-d9bd0","appId":"1:389653363046:web:84e2450b10dd37038bb0a7","storageBucket":"worship-book-d9bd0.appspot.com","apiKey":"AIzaSyCgTu_lkoXcOmyszpsP2CnGqJ4QBIWAtbU","authDomain":"worship-book-d9bd0.firebaseapp.com","messagingSenderId":"389653363046","measurementId":"G-7FTJ9VX0DQ"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore())),
]
};
