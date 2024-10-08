import { Injectable, inject, signal } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, setDoc, updateDoc } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import 'firebase/firestore';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Song, SongRes } from '../models/song.model';
import { AlertComponent } from '../shared/modals/alert/alert.component';

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

  constructor(private snackBar: MatSnackBar) { }


  getAllSongs(): Observable<any> {
    return collectionData(collection(this.firestore, this.dbPath))
    .pipe(
      map(res => res.sort((a: any, b: any) => a.title.localeCompare(b.title))),
      tap(res => this.songsSig.set(res as any)),
      catchError((err: any) => {
        this.openSnackBar(err.message)
        throw Error(err);
      })
    );
  }

  getSongById(id: any): Observable<SongRes | any> {
    if(this.songs().length){
      const song = this.songs().find(song => song.id === id);
      this.selectedSongSig.set(song);
      return of(song);
    }
    return docData(doc(this.firestore, this.dbPath + '/' + id))
    .pipe(
      tap(res =>this.selectedSongSig.set(res as SongRes)),
      catchError((err: any) => {
        this.openSnackBar(err.message)
        throw Error(err);
      }));
  }

  async addSong(data: Song) {
    console.log('data', data);

    await addDoc(collection(this.firestore, this.dbPath), data).then(
      (ref: any) => {
        setDoc(ref, { ...data, id: ref.id });
        return ref;
      }
    ).catch(err => this.openSnackBar(err.message));
  }


  async editSong(id: string, data: Song | any) {
    try{
      await updateDoc(doc(this.firestore, this.dbPath + '/' + id), data);
    } catch{
      this.openSnackBar('Błąd')
    }

  }

  async deleteSong(id: any) {
    try{
      await deleteDoc(doc(this.firestore, this.dbPath + '/' + id));
    } catch{
      this.openSnackBar('Błąd')
    }
  }

  openSnackBar(message: string) {
    this.snackBar.openFromComponent(AlertComponent, {
      duration: 3000,
      data: {message}
    });
  }
}
