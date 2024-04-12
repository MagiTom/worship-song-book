import { Component, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { SongRes } from '../../models/song.model';
import { DbService } from '../../services/db.service';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  db = inject(DbService);
  firebaseService = inject(FirebaseService);
  private router = inject(Router);
  songs!: SongRes[];
  songsCopy!: SongRes[];

  constructor() {
    toObservable(this.firebaseService.songs).subscribe(res =>{
      this.songs = res;
      this.songsCopy = JSON.parse(JSON.stringify(this.songs));
    });
  }

  goToSong(id: string, ev: any) {
    ev.stopPropagation();
    this.router.navigate(['/song', id])
    }

  addToDB(song: SongRes, ev: any) {
    ev.stopPropagation();
    this.db.addToDB(song).then();
}

setFilter(ev: any): void {
  console.log(ev.target.value)
  const value = ev.target.value;
  this.songs = [...this.songsCopy].filter((obj) =>
    obj.title.toLowerCase().includes(value.toLowerCase())
  );

}
}
