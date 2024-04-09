import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Signal, effect, inject } from '@angular/core';
import { SongDbRes, SongRes } from '../../../models/song.model';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../../services/firebase.service';
import * as Transposer from 'chord-transposer';

import { transpose, Chord, KeySignatures } from 'chord-transposer';

@Component({
  selector: 'app-song-view',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './song-view.component.html',
  styleUrl: './song-view.component.scss'
})
export class SongViewComponent{
  cdr = inject(ChangeDetectorRef);
  @Input() columnsCount = 1;
  @Input({required: true}) transpose!: number;
  @Input({required: true}) set song(value: SongRes | SongDbRes){
    this.songEl = value;
    this.songArr = this.songEl?.text.split('\n') || [];
    console.log('songEl', value)
  };
  songEl!: SongRes | SongDbRes;
  fireBaseService = inject(FirebaseService);
  songArr!: string[];
  test = 0;

constructor() {

}

checkIfChords(verse:string): boolean{
  const regex = /\[(.*?)\]/g;
  return !!verse.match(regex);
}

removeSquereBrackets(verse:string){
const song = this.songEl as SongDbRes;
const chords = verse.replace(/\[(.*?)\]/g, '$1');
console.log('verse', verse)
console.log('this.transpose', this.transpose)
  return Transposer.transpose(chords).up(this.transpose);  
}
}
