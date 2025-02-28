import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, inject, input } from '@angular/core';
import { SongDbRes, SongRes } from '../../../models/song.model';
import { FirebaseService } from '../../../services/firebase.service';


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
  columnsCount = input(1);
  transpose = input.required<number>();
  song = input.required<SongRes | SongDbRes>();
  fireBaseService = inject(FirebaseService);

  private readonly chromaticScale: string[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  songArr = computed(() => {
    return this.song().text.split('\n') || [];
  });


checkIfChords(verse:string): boolean{
  const regex = /\[(.*?)\]/g;
  return !!verse.match(regex);
}

removeSquereBrackets(verse:string){
const chords = verse.replace(/\[(.*?)\]/g, '$1');
  return this.transposeChordLine(chords);  
}

private transposeChordLine(line: string): string {
  const chordsOnly = line.replace(/\[|\]/g, ''); 
  return chordsOnly.replace(/([A-G][#b]?m?(maj7|7|m7|dim|aug|sus\d|\/[^\s]*)?)/g, (match) => {
    return this.transposeChord(match);
  });
}

private transposeChord(chord: string): string {
  const regex = /^([A-G][#b]?)(.*)$/; 
  const match = chord.match(regex);
  if (!match) return chord; 

  const [, root, suffix] = match;
  let index = this.chromaticScale.indexOf(root);
  if (index === -1) return chord; 

  const transposeValue = this.transpose();
  const newIndex = (index + transposeValue + 12) % 12;

  return this.chromaticScale[newIndex] + suffix;
}
}
