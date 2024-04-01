import { Routes } from '@angular/router';
import { MainScreenComponent } from './pages/main-screen/main-screen.component';
import { SongComponent } from './pages/song/song.component';

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
    }
];
