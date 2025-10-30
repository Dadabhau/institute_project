import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth implements OnInit {
  http = inject(HttpClient);

  ngOnInit(): void {}

  login(cred: any) {
    return this.http.post('https://freeapi.miniprojectideas.com/api/BigBasket/Login', cred);
  }

  getmovie() {
    return this.http.get('https://api.themoviedb.org/3/search/movie');
  }
}
