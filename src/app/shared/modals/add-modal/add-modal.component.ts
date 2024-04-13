import { Component, Inject, OnInit, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { FirebaseService } from '../../../services/firebase.service';
import { Song, SongRes } from '../../../models/song.model';

@Component({
  selector: 'app-add-modal',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule,  MatDialogContent,
    MatDialogActions, MatDialogTitle, MatDialogClose, ReactiveFormsModule],
  templateUrl: './add-modal.component.html',
  styleUrl: './add-modal.component.scss'
})
export class AddModalComponent implements OnInit{
private fireBaseService = inject(FirebaseService)
private dialog = inject(MatDialog)
private formBuilder = inject(FormBuilder);
song!: SongRes;
constructor(@Inject(MAT_DIALOG_DATA) public data: {song: SongRes}, public dialogRef: MatDialogRef<AddModalComponent>){
  
}
songForm = this.formBuilder.group({
  title: ['', Validators.required],
  text: ['', Validators.required],
  link: [''],
});

ngOnInit(): void {
  this.song = this.data?.song;
  if(this.song){
    this.songForm.setValue({
      title: this.song.title,
      text: this.song.text,
      link: this.song?.link || ''
    })
  }
}

  async submitForm() {
    const songToSave: Song = {
      title: this.songForm.value.title || '', 
      text: this.songForm.value.text || '',
      link: this.songForm.value.link || '',
    }
      if(!this.song){
        this.addSong(songToSave);
      } else {
        this.editSong(songToSave);
      }
      this.dialogRef.close();
  }

  async addSong(songToSave: Song){
 
    await this.fireBaseService.addSong(songToSave)
  }
  async editSong(songToSave: Song){
    await this.fireBaseService.editSong(this.song.id, songToSave)
  }
}
