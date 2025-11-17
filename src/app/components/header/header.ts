import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faWebAwesome } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-header',
  imports: [FaIconComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  faWebAwesome = faWebAwesome;
}
