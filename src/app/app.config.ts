import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'simple-crm-c4a79',
        appId: '1:801200664226:web:8075ca7b4d69f58a1d31fb',
        storageBucket: 'simple-crm-c4a79.appspot.com',
        apiKey: 'AIzaSyAdmGVygYXHn0BTK6OHE7lxz9LB1YF42lM',
        authDomain: 'simple-crm-c4a79.firebaseapp.com',
        messagingSenderId: '801200664226',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};
