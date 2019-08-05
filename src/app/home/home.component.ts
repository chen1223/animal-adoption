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

  // TODO: Remove
  dataTodo = {
    "animal_id": 108250,
    "animal_subid": "GAAAG1080710014",
    "animal_area_pkid": 11,
    "animal_shelter_pkid": 69,
    "animal_place": "彰化縣流浪狗中途之家",
    "animal_kind": "狗",
    "animal_sex": "F",
    "animal_bodytype": "MEDIUM",
    "animal_colour": "黃虎斑色",
    "animal_age": "ADULT",
    "animal_sterilization": "T",
    "animal_bacterin": "F",
    "animal_foundplace": "花秀路526巷15號",
    "animal_title": "",
    "animal_status": "OPEN",
    "animal_remark": "入所時有紅色項圈，108.07.17開放認養",
    "animal_caption": "",
    "animal_opendate": "2019-07-17",
    "animal_closeddate": "2999-12-31",
    "animal_update": "2019/08/05",
    "animal_createtime": "2019/07/10",
    "shelter_name": "彰化縣流浪狗中途之家",
    "album_file": "http://asms.coa.gov.tw/amlapp/upload/pic/079c4a3d-2996-4fd4-9630-695e776ed40f_org.jpg",
    "album_update": "",
    "cDate": "2019/08/05",
    "shelter_address": "彰化縣員林鎮大峰里阿寶巷426號",
    "shelter_tel": "04-8590638"
  };

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
