import { Component, Input, OnInit, effect, inject } from '@angular/core';
import { SongRes } from '../../../models/song.model';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../../services/firebase.service';

@Component({
  selector: 'app-song-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './song-view.component.html',
  styleUrl: './song-view.component.scss'
})
export class SongViewComponent {
  fireBaseService = inject(FirebaseService);
  songArr: string[] = [];
  song = this.fireBaseService.selectedSong;


constructor() {
effect(() => {
  this.songArr = this.song()?.text.split('\n') || [];
  console.log(this.songArr);
})
}



checkIfChords(verse:string): boolean{
  const regex = /\[(.*?)\]/g;
  return !!verse.match(regex);
}

removeSquereBrackets(verse:string){
  if(this.checkIfChords(verse)){
    return verse.replace(/\[(.*?)\]/g, '$1');
  }
  return verse;
}
}
