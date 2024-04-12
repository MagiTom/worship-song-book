import { Component, OnInit } from '@angular/core';
import { FirebaseAppModule } from '@angular/fire/app';
import { RouterOutlet } from '@angular/router';
import { NgxPrintModule } from 'ngx-print';

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
