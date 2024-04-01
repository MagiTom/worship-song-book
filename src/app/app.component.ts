import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import firebase from 'firebase';
import { environment } from '../environments/environment.development';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'worship-song-book';


  ngOnInit(): void {

  }
}
