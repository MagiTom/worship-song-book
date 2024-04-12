import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainScreenComponent } from './pages/main-screen/main-screen.component';
import { SongComponent } from './pages/song/song.component';
import { authGuard, unAuthGuard } from './shared/guard/auth.guard';
import { MenuComponent } from './pages/menu/menu.component';

export const routes: Routes = [
    {
        path: '',
        component: MainScreenComponent,
        canActivate: [authGuard],
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
    canActivate: [unAuthGuard],
   }
];
