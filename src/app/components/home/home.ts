import { Component } from '@angular/core';
import { Header } from '../header/header';
@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  imports: [Header],
})
export class Home {}
