import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { environment } from '../environments/environment.development';
import { routes } from './app.routes';
import { getApps } from 'firebase/app';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding()), provideAnimationsAsync(), 
 importProvidersFrom([
  provideFirebaseApp(() => !getApps().length ? initializeApp(environment.firebaseConfig) : getApp()),
  provideAuth(() => getAuth()),
  provideFirestore(() => getFirestore()),
  provideStorage(() => getStorage())
]), importProvidersFrom(provideAuth(() => getAuth())), 
importProvidersFrom(provideFirestore(() => getFirestore())),
]
};
