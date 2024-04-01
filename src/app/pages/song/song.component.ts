import { Component, Input, OnInit, Signal, inject, signal } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { SongDb, SongRes } from '../../models/song.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddModalComponent } from '../../shared/modals/add-modal/add-modal.component';
import { ConfirmationModalComponent } from '../../shared/modals/confirmation-modal/confirmation-modal.component';
import { SongViewComponent } from "../../shared/views/song-view/song-view.component";
import { DbService } from '../../services/db.service';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-song',
    standalone: true,
    templateUrl: './song.component.html',
    styleUrl: './song.component.scss',
    imports: [CommonModule, MatButtonModule, SongViewComponent, MatIcon]
})
export class SongComponent implements OnInit{
  db = inject(DbService);
  dialog = inject(MatDialog);
  id = '';
  private firebaseService = inject(FirebaseService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  song = this.firebaseService.selectedSong;
  songDb!: SongDb | undefined;
  columnsCount = signal(1);

  constructor() {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
          console.log('iddd', this.id)
          this.getSong();
      }
  })

}

checkIfSongInDb(){
  return this.db.songsDb().find(item => this.song()?.id === item.id);
}

getSong(){
  this.firebaseService.getSongById(this.id).subscribe(() =>{
    this.songDb = this.checkIfSongInDb();
    if(this.songDb){
      this.columnsCount.set(this.songDb.columns);
    } else {
      this.columnsCount.set(this.db.columns());
    }
    console.log('columns', this.columnsCount)
  });
}

 removeSong() {
    const dialogRef = this.dialog.open(ConfirmationModalComponent);

    dialogRef.afterClosed()
    .subscribe(async result => {
      if(result){
        await this.firebaseService.deleteSong(this.id);
        await this.router.navigate(['']);
      }
    });

  }

  editSong() {
    console.log('song', this.song())
    const dialogRef = this.dialog.open(AddModalComponent, {
      data: {song: this.song()},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getSong();
    });
     }

     changeColumnsCount(){
        this.columnsCount.update(prev => prev === 3 ? 1 : prev + 1);
        if(!this.songDb){
          this.db.setColumns(this.columnsCount());
        } else {
          this.db.updateDB({...this.songDb, columns: this.columnsCount()})
        }
        console.log('columnsxxx', this.columnsCount())
     }
}
