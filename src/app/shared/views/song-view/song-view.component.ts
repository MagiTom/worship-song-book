import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, inject } from '@angular/core';
import * as Transposer from 'chord-transposer';
import { SongDbRes, SongRes } from '../../../models/song.model';
import { FirebaseService } from '../../../services/firebase.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


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
  return Transposer.transpose(chords).up(this.transpose);  
}


}
