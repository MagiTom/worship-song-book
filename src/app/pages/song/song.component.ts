import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { SongDbRes } from '../../models/song.model';
import { DbService } from '../../services/db.service';
import { FirebaseService } from '../../services/firebase.service';
import { AddModalComponent } from '../../shared/modals/add-modal/add-modal.component';
import { ConfirmationModalComponent } from '../../shared/modals/confirmation-modal/confirmation-modal.component';
import { TransposerComponent } from "../../shared/transposer/transposer.component";
import { SongViewComponent } from "../../shared/views/song-view/song-view.component";

@Component({
    selector: 'app-song',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    templateUrl: './song.component.html',
    styleUrl: './song.component.scss',
    imports: [CommonModule, MatButtonModule, SongViewComponent, MatIcon, TransposerComponent]
})
export class SongComponent implements OnInit{

  db = inject(DbService);
  dialog = inject(MatDialog);
  id = '';
  private firebaseService = inject(FirebaseService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  song = this.firebaseService.selectedSong;
  songDb!: SongDbRes | undefined;
  columnsCount = signal(1);
  transpose = this.db.transpose;

  constructor() {
    effect(()=>{
      this.songDb = this.checkIfSongInDb();
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
          this.getSong();
      }
  })

}

checkIfSongInDb(){
  return this.db.songsDb().find(item => this.song()?.id === item.songId);
}

getTransposeCount($event: number) {
   this.db.setTranspose($event);
   if(this.songDb){
    this.db.updateDB({...this.songDb})
  }
}

getSong(){
  this.firebaseService.getSongById(this.id).subscribe(() =>{
    this.songDb = this.checkIfSongInDb();
    if(this.songDb){
      this.columnsCount.set(this.songDb.columns);
    } else {
      this.columnsCount.set(this.db.columns());
    }
    this.db.setTranspose(this.songDb?.transpose || 0);
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
    const dialogRef = this.dialog.open(AddModalComponent, {
      data: {song: this.song()},
      width: '80%',
      height: '80%',
    });

    dialogRef.afterClosed().subscribe(result => {
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
     }
}
