import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainScreenComponent } from './pages/main-screen/main-screen.component';
import { MenuComponent } from './pages/menu/menu.component';
import { SongComponent } from './pages/song/song.component';

export const routes: Routes = [
    {
        path: '',
        component: MainScreenComponent,
        children: [
            {
                path: '',
                component: MenuComponent
            },
            {
                path: 'song/:id',
                component: SongComponent
            }
        ],
    },
   {
    path: 'login',
    component: LoginComponent,
   }
];
