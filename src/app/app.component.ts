import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment.development';
import { NgxPrintModule } from 'ngx-print';
import { FirebaseAppModule } from '@angular/fire/app';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxPrintModule, FirebaseAppModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'worship-song-book';


  ngOnInit(): void {

  }
}
