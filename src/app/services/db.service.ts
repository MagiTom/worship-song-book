import { Injectable, signal } from '@angular/core';
import Dexie, { Observable, liveQuery } from 'dexie';
import { SongRes } from '../models/song.model';

@Injectable({
  providedIn: 'root'
})
export class DbService extends Dexie {
  songList: any;
  private songsDbSig = signal<SongRes[]>([]);
  songsDb = this.songsDbSig.asReadonly();

  constructor() {
    super("DexieDB");                       //database name 'DexieDB'

    this.version(1).stores({
      songList: 'id, title, text', //'myStore1' table, 'empId' primary key
       //'myStore2' table, 'compId' primary key
    });

    this.open()                             //opening the database
    .then(data => console.log("DB Opened"))
    .catch(err => console.log(err.message));
  }

  getAllList(): Observable<SongRes[]>{
    return liveQuery(() =>  this.table('songList').toArray());
  }

  saveSongsDb(list: SongRes[]){
    this.songsDbSig.set(list);
  }

  addToDB(song: SongRes) {
    this.table('songList')
    .add(song)
    .then(data => console.log(data))
    .catch(err => console.log(err.message));
}

removeFromDB(song: SongRes) {
  this.table('songList')
  .delete(song.id)
  .then(data => console.log(data))
  .catch(err => console.log(err.message));
}
}
