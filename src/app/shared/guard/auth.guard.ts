// auth.guard.ts
import { NgZone, inject } from "@angular/core";
  import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

  
export const authGuard: any = () => {
    const router = inject(Router);
    const auth = inject(Auth);

   return auth.onAuthStateChanged((user) => {
        if (!user?.email) {
            router.navigate(['login']);
            return false;
          } else {
            return true;
          }
      });
   
  };

  export const unAuthGuard: any = () => {
    const router = inject(Router);
    const auth = inject(Auth);
    const zone = inject(NgZone);

   return auth.onAuthStateChanged((user) => {
        if (user?.email) {
           zone.run(() => {
            router.navigate(['']);
                });
      
            return false;
          } else {
            return true;
          }
      });

  };