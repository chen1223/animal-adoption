import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  // Hero image list
  heroList = [
    '/assets/img/hero1.jpg',
    '/assets/img/hero2.jpg',
    '/assets/img/hero3.jpg',
    '/assets/img/hero4.jpg'
  ];
  selected = [];
  index = 0;
  constructor(private http: HttpClient) { }

  // Randomly select Hero image
  getHero(): string {
    let randomIndex = (Math.floor(Math.random() * 10) % 4);
    if (this.selected.length === 4) {
      this.selected = [];
    }
    // Get a new index if it already exist in selected list
    while(this.selected.indexOf(randomIndex) > -1) {
      randomIndex = Math.floor(Math.random() * 3);
    }
    this.selected.push(randomIndex);
    return this.heroList[randomIndex];
  }
}
