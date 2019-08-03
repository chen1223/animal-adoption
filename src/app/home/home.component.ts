import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { HeroService } from '../services/hero.service';
import { FilterService } from '../services/filter.service';
import { FormBuilder, FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  // Inspired text string
  inspiredText: string = '';
  inspiredList: string[] = [
    '找個可以陪您走下一段旅程的朋友',
    'dummy string 2',
    'dummy string 3',
    'dummy string 4',
  ];
  // Hero image src
  heroImg = '';

  // Filter List
  filterList: Object[] = [];
  additionalFilterList: Object[] = [];

  filterGroup;

  // Determine status of additional filter: true: visible; false: hidden
  additionalFilter: boolean = false;

  // Determine status of the search section in mobile: true: 'search-opened', false: 'search-closed'
  mobileSearchOpen: boolean = false;
  constructor(private heroService: HeroService,
              private filterService: FilterService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.setUpHeroImg();
    this.setInspiredText();
    this.setUpFilter();
    window.addEventListener('scroll', this.onScroll, true);
  }

  // Get hero image
  setUpHeroImg(): void {
    this.heroImg = this.heroService.getHero();
  }

  // Get inspired text
  setInspiredText(): void {
    const index = (Math.floor(Math.random() * 10)) % 4;
    this.inspiredText = this.inspiredList[index];
  }

  // On scroll callback event
  onScroll(): void {
    const heroContainer = <HTMLDivElement> document.querySelector('.hero-img__container');
    if (window.pageYOffset >= heroContainer.offsetHeight) {
      document.querySelector('body').classList.add('scroll-passed');
    } else {
      document.querySelector('body').classList.remove('scroll-passed');
    }
  }

  removeScrollEvent(): void {
    window.removeEventListener('scroll', this.onScroll);
  }

  // Add filter condition to form array
  addToFilter(filter: any): void {
    (<FormGroup> this.filterGroup.get('conditions')).addControl(filter['apiKey'], new FormControl());
  }


  // Set up filter list
  setUpFilter(): void {
    this.filterList = [];
    this.additionalFilterList = [];
    this.filterGroup = this.fb.group({
      conditions: this.fb.group({})
    });
    this.filterGroup.get('conditions').reset();
    this.filterService.getFilterList().forEach(filter => {
      if (!filter['additional']) {
        this.filterList.push(filter);
      } else {
        this.additionalFilterList.push(filter);
      }
      this.addToFilter(filter);
    });
  }

  // Set filter value
  setCondition(ctrlName: string, value: string): void {
    this.filterGroup.get('conditions').get(ctrlName).setValue(value);
  }

  // Reset filter
  clearFilter(): void {
    this.filterGroup.reset();
  }

  // Submit search
  applySearch(): void {
    console.log('filterForm', this.filterGroup, this.filterGroup.value);
  }

  // Toggle additional filter list area
  toggleFilter(): void {
    this.additionalFilter = !this.additionalFilter;
  }

  // Toggle search drawer on mobile devices
  toggleDrawer(): void {
    this.mobileSearchOpen = !this.mobileSearchOpen;
  }

  ngOnDestroy() {
    this.removeScrollEvent();
  }
}
