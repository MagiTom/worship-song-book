import { Routes } from '@angular/router';
import { MainScreenComponent } from './pages/main-screen/main-screen.component';
import { SongComponent } from './pages/song/song.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    {
        path: '',
        component: MainScreenComponent,
        children: [
            {
                path: 'song/:id',
                component: SongComponent
            }
        ]
    },
   {
    path: 'login',
    component: LoginComponent
   }
];
