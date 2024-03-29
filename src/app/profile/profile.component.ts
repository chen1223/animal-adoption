import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { faAngleLeft, faHome } from '@fortawesome/free-solid-svg-icons';
import { AnimalService } from '../services/animal.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  faAngleLeft = faAngleLeft;
  faHome = faHome;

  // Input data
  data;
  constructor(private animalService: AnimalService) { }

  ngOnInit() {
    window.scroll(0, 0);
    this.addBackgroundImg();
    this.loadAnimalData();
  }

  addBackgroundImg():void {
    let bodyEl = <HTMLBodyElement> document.querySelector('body');
    bodyEl.classList.add('show');
  }

  // Load data from sessionStorage
  loadAnimalData(): void {
    this.data = this.animalService.loadAnimal();
  }

  ngOnDestroy() {
    let bodyEl = <HTMLBodyElement> document.querySelector('body');
    bodyEl.classList.remove('show');
  }
}
