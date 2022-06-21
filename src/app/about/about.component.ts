import { Component, OnInit } from '@angular/core';
import { faAngleLeft, faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  faAngleLeft = faAngleLeft;
  faHome = faHome;
  constructor() { }

  ngOnInit() {
  }

}
