import { Injectable, signal } from '@angular/core';
import Dexie, { Observable, liveQuery } from 'dexie';
import { SongDb, SongRes } from '../models/song.model';

@Injectable({
  providedIn: 'root'
})
export class DbService extends Dexie {
  songList: any;
  private songsDbSig = signal<SongDb[]>([]);
  songsDb = this.songsDbSig.asReadonly();
  private columnsSig = signal<number>(1);
  columns = this.columnsSig.asReadonly();

  constructor() {
    super("DexieDB");                       //database name 'DexieDB'

    this.version(1).stores({
      songList: 'id, title, text, columns', //'myStore1' table, 'empId' primary key
       //'myStore2' table, 'compId' primary key
    });

    this.open()                             //opening the database
    .then(data => console.log("DB Opened"))
    .catch(err => console.log(err.message));
  }

  setColumns(count: number){
    this.columnsSig.set(count);
  }

  getAllList(): Observable<SongDb[]>{
    return liveQuery(() =>  this.table('songList').toArray());
  }

  saveSongsDb(list: SongDb[]){
    this.songsDbSig.set(list);
  }

  addToDB(song: SongRes) {
    this.table('songList')
    .add({...song, columns: this.columns()})
    .then(data => console.log(data))
    .catch(err => console.log(err.message));
}

updateDB(song: SongDb) {
  this.table('songList')
  .update(song.id, song)
  .then(data => console.log(data))
  .catch(err => console.log(err.message));
}

removeFromDB(song: SongDb) {
  this.table('songList')
  .delete(song.id)
  .then(data => console.log(data))
  .catch(err => console.log(err.message));
}
}
