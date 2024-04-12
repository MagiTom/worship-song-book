import { Component, Input, inject } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { SongDb, SongRes } from '../../../models/song.model';
import { Router } from '@angular/router';
import { DbService } from '../../../services/db.service';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { FirebaseService } from '../../../services/firebase.service';

@Component({
  selector: 'app-sidenav-list',
  standalone: true,
  imports: [MatListModule, MatIconModule, MatButtonModule, CommonModule, MatDividerModule],
  templateUrl: './sidenav-list.component.html',
  styleUrl: './sidenav-list.component.scss'
})
export class SidenavListComponent {
db = inject(DbService);
firebaseService = inject(FirebaseService);
private router = inject(Router);
@Input({required: true}) songs!: SongRes[];
@Input() printMode: boolean = false;

goToSong(id: string, ev: any) {
  ev.stopPropagation();
  this.router.navigate(['/song', id])
  }

  addToDB(song: SongRes, ev: any) {
    ev.stopPropagation();
    this.db.addToDB(song).then();
}
}
