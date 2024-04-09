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
import { BreakpointObserver,Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { SidenavDraggableComponent } from "../../shared/sidenavs/sidenav-draggable/sidenav-draggable.component";
import { NgxPrintService, PrintOptions } from 'ngx-print';
import { PrintComponent } from "../../shared/views/print/print.component";

@Component({
    selector: 'app-main-screen',
    standalone: true,
    templateUrl: './main-screen.component.html',
    styleUrl: './main-screen.component.scss',
    imports: [ToolbarComponent, MatSidenavModule, SidenavListComponent, RouterOutlet,
        MatToolbarModule, MatIconModule, MatListModule, MatButtonModule, CommonModule, SidenavDraggableComponent, PrintComponent]
})
export class MainScreenComponent implements OnInit{
dialog = inject(MatDialog);
firebaseService = inject(FirebaseService);
printService = inject(NgxPrintService);
public responsive = inject(BreakpointObserver);
db = inject(DbService);
height = 56;
songs = this.firebaseService.songs;
songsFromDb = this.db.songsDb;
isPhoneviewed = false;

ngOnInit(){
 this.firebaseService.getAllSongs().subscribe();
 this.db.songList$
 .subscribe(list => {
  console.log('list', list)
  this.db.saveSongsDb(list)
 });
 this.responsive.observe(Breakpoints.HandsetPortrait)
 .subscribe(result => {
 this.isPhoneviewed = false;
 if (result.matches) {
 this.isPhoneviewed = true;
 }
})

 
}

openAddSong() {
    const dialogRef = this.dialog.open(AddModalComponent, {
      width: '80%',
      height: '80%',
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        // this.animal = result;
      });
    }

    printSongs() {
      const customPrintOptions: PrintOptions = new PrintOptions({
          printSectionId: 'print-section',
          useExistingCss: true,
          printTitle: 'Worship Book'
          // Add any other print options as needed
      });
      this.printService.print(customPrintOptions)
    }
}
