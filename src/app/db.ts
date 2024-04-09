// db.ts
import Dexie, { Table } from 'dexie';
import { SongDb } from './models/song.model';

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
    // this.on('populate', () => this.populate());
  }

//   async populate() {
//     const todoListId = await db.songLists.add({
//       title: 'songs',
//     });
//     // await db.songItems.bulkAdd([
//     //   {
//     //     todoListId,
//     //     title: 'Feed the birds',
//     //   },
//     //   {
//     //     todoListId,
//     //     title: 'Watch a movie',
//     //   },
//     //   {
//     //     todoListId,
//     //     title: 'Have some sleep',
//     //   },
//     // ]);
//   }
}

export const db = new AppDB();
