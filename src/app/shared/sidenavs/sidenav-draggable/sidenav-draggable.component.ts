import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { SongRes, SongDb, SongDbRes } from '../../../models/song.model';
import { DbService } from '../../../services/db.service';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray, DragDropModule} from '@angular/cdk/drag-drop';
import { FirebaseService } from '../../../services/firebase.service';

@Component({
  selector: 'app-sidenav-draggable',
  standalone: true,
  imports: [MatListModule, MatIconModule, MatButtonModule, CommonModule, MatDividerModule, DragDropModule, CdkDropList, CdkDrag],
  templateUrl: './sidenav-draggable.component.html',
  styleUrl: './sidenav-draggable.component.scss'
})
export class SidenavDraggableComponent {
  firebaseService = inject(FirebaseService);
  db = inject(DbService);
  private router = inject(Router);
  @Input({required: true}) songs!: SongDbRes[];

  goToSong(id: string, ev: any) {
    ev.stopPropagation();
    this.router.navigate(['/song', id])
    }
  
  removeFromDB(song: any, ev: any) {
    ev.stopPropagation();
    this.db.removeFromDB(song);
  }
  drop(event: CdkDragDrop<string[]>) {
    console.log('drop', event)
    moveItemInArray(this.songs, event.previousIndex, event.currentIndex)
    console.log('songs', this.songs)
    console.log('event.currentIndex)', event.currentIndex)
    console.log('event.previousIndex', event.previousIndex);
    this.db.reorderDb(this.songs)
    }
}
