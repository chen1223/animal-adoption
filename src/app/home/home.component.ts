import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { HeroService } from '../services/hero.service';
import { FilterService } from '../services/filter.service';
import { FormBuilder, FormArray, FormControl, FormGroup } from '@angular/forms';
import { AnimalService } from '../services/animal.service';
import { map } from 'rxjs/operators';
import { IPageInfo } from 'ngx-virtual-scroller';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('in', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(-20px)'
        }),
        animate(300)])
    ])
  ]
})
export class HomeComponent implements OnInit, OnDestroy {

  // Inspired text string
  inspiredText: string = '';
  inspiredList: string[] = [
    '找個可以陪您走下一段旅程的朋友',
    '讓牠重新感受家的溫暖',
    '領養代替購買，創造一份幸福'
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

  // Determine number of items fetch from API everytime
  batchSize: number = 20;

  // Animals array that hold data of all animals currently shown to user
  animalShowing: Object[] = [];

  // Determine if there are currently API loading more data
  loading: boolean = false;

  // Determine the last called API index
  lastCalledIndex: number = 0;

  constructor(private heroService: HeroService,
              private filterService: FilterService,
              private animalService: AnimalService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.setUpHeroImg();
    this.setInspiredText();
    this.setUpFilter();
    window.addEventListener('scroll', this.onScroll, true);
    this.getAnimals(0, true);
  }

  // Get hero image
  setUpHeroImg(): void {
    this.heroImg = this.heroService.getHero();
  }

  // Get inspired text
  setInspiredText(): void {
    const index = (Math.floor(Math.random() * 10)) % 3;
    this.inspiredText = this.inspiredList[index];
  }

  // On scroll callback event
  onScroll(): void {
    const heroContainer = <HTMLDivElement> document.querySelector('.hero-img__container');
    if (heroContainer && window.pageYOffset >= heroContainer.offsetHeight) {
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
    this.getAnimals(0, true);
    if (this.additionalFilter) {
      this.toggleFilter();
    }
    if (this.mobileSearchOpen) {
      this.toggleDrawer();
    }
  }

  // Toggle additional filter list area
  toggleFilter(): void {
    this.additionalFilter = !this.additionalFilter;
  }

  // Toggle search drawer on mobile devices
  toggleDrawer(): void {
    this.mobileSearchOpen = !this.mobileSearchOpen;
  }

  // Remove empty keys
  getConditions(): Object {
    const conditions = this.filterGroup.get('conditions').value;
    Object.keys(conditions).forEach(key => {
      if (!conditions[key]) {
        delete conditions[key];
      }
    });
    return conditions;
  }

  // Get animals
  getAnimals(skip: number = 0, init: boolean = false): void {
    this.lastCalledIndex = skip;
    if (init) {
      this.animalShowing = [];
    }
    // Set up conditions
    const conditions = this.getConditions();
    skip = skip !== -1 ? skip: 0;
    this.animalService.getAnimals(skip, this.batchSize, conditions)
        .pipe(
          map((dataset: Object[]) => {
            dataset.forEach(data => {
              // Map city
              data['city'] = this.animalService.getCity(data['animal_area_pkid']);
              // Map shelter
              data['shelter'] = this.animalService.getShelter(data['animal_shelter_pkid']);
              // Map body size
              data['size'] = this.animalService.getSize(data['animal_bodytype']);
              // Store gender to a separate variable
              data['gender'] = data['animal_sex'];
            });
            return dataset;
          })
        )
        .subscribe(
          (data: any) => {
            this.loading = false;
            this.animalShowing.push(...data);
          },
          err => {}
        );
  }

  fetchMore(e: IPageInfo): void {
    const currentIndex = e.endIndexWithBuffer === -1 ? 0 : e.endIndexWithBuffer;
    if (e.endIndex !== this.animalShowing.length - 1 || currentIndex === this.lastCalledIndex) {
      return;
    }
    this.loading = true;
    this.getAnimals(currentIndex);
  }

  ngOnDestroy() {
    this.removeScrollEvent();
  }
}
