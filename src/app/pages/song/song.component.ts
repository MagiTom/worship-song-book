import { Component, Input, OnInit, Signal, inject } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { SongRes } from '../../models/song.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddModalComponent } from '../../shared/modals/add-modal/add-modal.component';
import { ConfirmationModalComponent } from '../../shared/modals/confirmation-modal/confirmation-modal.component';
import { SongViewComponent } from "../../shared/views/song-view/song-view.component";

@Component({
    selector: 'app-song',
    standalone: true,
    templateUrl: './song.component.html',
    styleUrl: './song.component.scss',
    imports: [CommonModule, MatButtonModule, SongViewComponent]
})
export class SongComponent implements OnInit{
  dialog = inject(MatDialog);
  id = '';
  private firebaseService = inject(FirebaseService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  song = this.firebaseService.selectedSong;

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

getSong(){
  this.firebaseService.getSongById(this.id).subscribe();
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
}
