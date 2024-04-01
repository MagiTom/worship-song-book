import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { initializeAppCheck, ReCaptchaEnterpriseProvider, provideAppCheck } from '@angular/fire/app-check';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';
import { environment } from '../environments/environment.development';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding()), provideAnimationsAsync(), 
//     importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"worship-book-d9bd0","appId":"1:389653363046:web:84e2450b10dd37038bb0a7","storageBucket":"worship-book-d9bd0.appspot.com","apiKey":"AIzaSyCgTu_lkoXcOmyszpsP2CnGqJ4QBIWAtbU","authDomain":"worship-book-d9bd0.firebaseapp.com","messagingSenderId":"389653363046","measurementId":"G-7FTJ9VX0DQ"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideAnalytics(() => getAnalytics())), ScreenTrackingService, UserTrackingService, 
//     importProvidersFrom(provideAppCheck(() => {
//   // TODO get a reCAPTCHA Enterprise here https://console.cloud.google.com/security/recaptcha?project=_
//   const provider = new ReCaptchaEnterpriseProvider('6LdZVqopAAAAACe5XZobp4a2NDIHbJLOwn80Hd2U');
//   return initializeAppCheck(undefined, { provider, isTokenAutoRefreshEnabled: false });
// })), 
// importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideDatabase(() => getDatabase())), importProvidersFrom(provideFunctions(() => getFunctions())), importProvidersFrom(provideMessaging(() => getMessaging())), importProvidersFrom(providePerformance(() => getPerformance())), importProvidersFrom(provideStorage(() => getStorage())),
//  importProvidersFrom(provideRemoteConfig(() => getRemoteConfig())),
 importProvidersFrom([
  provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
  provideAuth(() => getAuth()),
  provideFirestore(() => getFirestore()),
  provideStorage(() => getStorage())
]),
]
};
