import { Injectable, Signal, inject, signal } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, getDocs, setDoc, updateDoc } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import 'firebase/firestore'; 
import { Observable, tap, map, of, filter } from 'rxjs';
import { Song, SongRes } from '../models/song.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  firestore = inject(Firestore);
  private dbPath = '/songs';
  private songsSig = signal<SongRes[]>([]);
  songs = this.songsSig.asReadonly();
  selectedSongSig = signal<SongRes | undefined>(undefined);
  selectedSong = this.selectedSongSig.asReadonly();

  constructor() { }


  getAllSongs(): Observable<any> {
    return collectionData(collection(this.firestore, this.dbPath)).pipe(tap(res => this.songsSig.set(res as any)));
  }

  getSongById(id: any): Observable<SongRes | any> {
    if(this.songs().length){
      const song = this.songs().find(song => song.id === id);
      this.selectedSongSig.set(song);
      return of(song);
    }
    return docData(doc(this.firestore, this.dbPath + '/' + id))
    .pipe(
      tap(res =>this.selectedSongSig.set(res as SongRes)));
  }

  async addSong(data: Song) {
    console.log('data', data);

    await addDoc(collection(this.firestore, this.dbPath), data).then(
      (ref: any) => {
        setDoc(ref, { ...data, id: ref.id });
        return ref;
      }
    );
  }


  async editSong(id: string, data: Song | any) {
    await updateDoc(doc(this.firestore, this.dbPath + '/' + id), data);
  }

  async deleteSong(id: any) {
    await deleteDoc(doc(this.firestore, this.dbPath + '/' + id));
  }
}
