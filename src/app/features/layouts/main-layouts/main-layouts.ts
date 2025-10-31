import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layouts',
  imports: [RouterOutlet],
  template: '<router-outlet />',
})
export class MainLayouts {}
