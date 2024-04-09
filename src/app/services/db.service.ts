import { Injectable, signal } from '@angular/core';
import Dexie, { Observable, liveQuery } from 'dexie';
import { SongDb, SongDbRes, SongRes } from '../models/song.model';
import { db, SongList } from '../db';

@Injectable({
  providedIn: 'root'
})
export class DbService extends Dexie {
  songList: any;
  private songsDbSig = signal<SongDbRes[]>([]);
  songsDb = this.songsDbSig.asReadonly();
  private columnsSig = signal<number>(1);
  columns = this.columnsSig.asReadonly();
  private tranposeSig = signal<number>(0);
  transpose = this.tranposeSig.asReadonly();
  songList$ = liveQuery(() => db.songItems.toArray());

  // constructor() {
  //   super("DexieDB");                       //database name 'DexieDB'

  //   this.version(1).stores({
  //     songList: '++id, songId, title, text, columns', //'myStore1' table, 'empId' primary key
  //      //'myStore2' table, 'compId' primary key
  //   });

  //   this.open()                             //opening the database
  //   .then(data => console.log("DB Opened"))
  //   .catch(err => console.log(err.message));
  // }

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
    // this.table('songList')
    // .add(songToAdd)
    // .then(data => console.log(data))
    // .catch(err => console.log(err.message));
    await db.songItems.add(songToAdd);
}

updateDB(song: SongDbRes) {
  db.songItems
  .update(song.id, {...song, transpose: this.transpose()} )
  .then(data => console.log(data))
  .catch(err => console.log(err.message));
}

reorderDb(songs: SongDbRes[]){
  console.log('songs', songs)
  const songsUP = songs.map(song => ({title: song.title,
    text: song.text,
    songId: song.songId,
    columns: song.columns}))
  // console.log('songsUP', songsUP)
  db.songItems.clear();
  db.songItems
  .bulkAdd(songsUP)
  .then(data => console.log(data))
  .catch(err => console.log(err.message));
}


removeFromDB(song: SongDbRes) {
  db.songItems.delete(song.id)
  .then(data => console.log(data))
  .catch(err => console.log(err.message));
}
}
