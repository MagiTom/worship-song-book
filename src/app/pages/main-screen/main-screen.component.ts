import { Component, OnInit, inject } from '@angular/core';
import { ToolbarComponent } from "../../shared/toolbar/toolbar.component";
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavListComponent } from "../../shared/sidenavs/sidenav-list/sidenav-list.component";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import {
    MatDialog,
  } from '@angular/material/dialog';
import { AddModalComponent } from '../../shared/modals/add-modal/add-modal.component';
import { FirebaseService } from '../../services/firebase.service';
import Dexie, { Observable, liveQuery } from 'dexie';
import { SongRes } from '../../models/song.model';
import { CommonModule } from '@angular/common';
import { DbService } from '../../services/db.service';

@Component({
    selector: 'app-main-screen',
    standalone: true,
    templateUrl: './main-screen.component.html',
    styleUrl: './main-screen.component.scss',
    imports: [ToolbarComponent, MatSidenavModule, SidenavListComponent, RouterOutlet,
        MatToolbarModule, MatIconModule, MatListModule, MatButtonModule, CommonModule]
})
export class MainScreenComponent implements OnInit{
dialog = inject(MatDialog);
firebaseService = inject(FirebaseService);
db = inject(DbService);
height = 56;
songs = this.firebaseService.songs;
songsFromDb = this.db.songsDb;

ngOnInit(){
 this.firebaseService.getAllSongs().subscribe();
 this.db.getAllList().subscribe(list => this.db.saveSongsDb(list));
}

openAddSong() {
    const dialogRef = this.dialog.open(AddModalComponent, {
        // data: {name: this.name, animal: this.animal},
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        // this.animal = result;
      });
    }
}
