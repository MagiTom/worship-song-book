import { Injectable, inject, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Dexie, { liveQuery } from 'dexie';
import { db } from '../db';
import { SongDb, SongDbRes, SongRes } from '../models/song.model';
import { AlertComponent } from '../shared/modals/alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class DbService extends Dexie {
  private snackBar = inject(MatSnackBar)
  songList: any;
  private songsDbSig = signal<SongDbRes[]>([]);
  songsDb = this.songsDbSig.asReadonly();
  private columnsSig = signal<number>(1);
  columns = this.columnsSig.asReadonly();
  private tranposeSig = signal<number>(0);
  transpose = this.tranposeSig.asReadonly();
  songList$ = liveQuery(() => db.songItems.toArray());

  setColumns(count: number){
    this.columnsSig.set(count);
  }
  setTranspose(count: number){
    this.tranposeSig.set(count);
  }

  saveSongsDb(list: SongDbRes[]){
    this.songsDbSig.set(list);
  }

  async addToDB(song: SongRes) {
    const songToAdd: SongDb = {
      title: song.title,
      text: song.text,
      songId: song.id,
      columns: this.columns(),
      transpose: this.transpose()
    }
    try{
      await db.songItems.add(songToAdd);
    } catch{
      this.openSnackBar('Błąd');
    }

}

updateDB(song: SongDbRes) {
  db.songItems
  .update(song.id, {...song, transpose: this.transpose()} )
  .then(data => console.log(data))
  .catch(err => this.openSnackBar(err.message));
}

reorderDb(songs: SongDbRes[]){
  console.log('songs', songs)
  const songsUP = songs.map(song => ({title: song.title,
    text: song.text,
    songId: song.songId,
    columns: song.columns}))
  db.songItems.clear();
  db.songItems
  .bulkAdd(songsUP)
  .then(data => console.log(data))
  .catch(err => this.openSnackBar(err.message));
}


removeFromDB(song: SongDbRes) {
  db.songItems.delete(song.id)
  .then(data => console.log(data))
  .catch(err => this.openSnackBar(err.message));
}

openSnackBar(message: string) {
  this.snackBar.openFromComponent(AlertComponent, {
    duration: 3000,
    data: {message}
  });
}
}
