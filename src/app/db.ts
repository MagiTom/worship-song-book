// db.ts
import Dexie, { Table } from 'dexie';

export interface SongList {
  id?: number;
  title: string;
}

export class AppDB extends Dexie {
  songItems!: Table<any, number>;
  songLists!: Table<SongList, number>;

  constructor() {
    super('ngdexieliveQuery');
    this.version(3).stores({
        songItems: '++id, songId',
    });
  }
}

export const db = new AppDB();
