import { Component, Input } from '@angular/core';
import { SongDbRes } from '../../../models/song.model';
import { SongViewComponent } from "../song-view/song-view.component";
import { MatDividerModule } from '@angular/material/divider';

@Component({
    selector: 'app-print',
    standalone: true,
    templateUrl: './print.component.html',
    styleUrl: './print.component.scss',
    imports: [SongViewComponent, MatDividerModule]
})
export class PrintComponent {
@Input() songs: SongDbRes[] = [];
}
