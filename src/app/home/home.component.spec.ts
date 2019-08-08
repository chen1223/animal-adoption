import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HeroService } from '../services/hero.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, FormArray } from '@angular/forms';
import { FilterService } from '../services/filter.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AnimalService } from '../services/animal.service';
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let heroService: HeroService;
  let filterService: FilterService;
  let animalService: AnimalService;
  let fb: FormBuilder;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FontAwesomeModule],
      declarations: [ HomeComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [HeroService,
                  FilterService,
                  AnimalService,
                  FormBuilder]
    }).compileComponents();
    heroService = TestBed.get(HeroService);
    filterService = TestBed.get(FilterService);
    animalService = TestBed.get(AnimalService);
    fb = TestBed.get(FormBuilder);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Layout
   */
  it('should have a layout wrapper', () => {
    expect(fixture.nativeElement.querySelectorAll('.layout').length).toBe(1);
  });

  /**
   * Inspired text
   */
  it('should have inspiring text variable', () => {
    expect(component.inspiredText).toBeTruthy();
  });
  it('should have inspiring text of type h1', () => {
    expect(fixture.nativeElement.querySelectorAll('h1.inspire-text').length).toBe(1);
  });
  it('should have a function called setInspiredText', () => {
    expect(component.setInspiredText).toBeTruthy();
  });
  it('should have an inspired list of 4 items', () => {
    expect(component.inspiredList.length).toBe(4);
  });
  it('should call setInspiredText onInit', () => {
    const func = spyOn(component, 'setInspiredText');
    component.ngOnInit();
    expect(func).toHaveBeenCalled();
  });
  it('should have the correct inspiring text', () => {
    let text = <HTMLSpanElement> fixture.nativeElement.querySelector('.inspire-text');
    spyOn(component, 'setInspiredText').and.callFake(() => {
      component.inspiredText = 'test';
    });
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.inspiredText).toBe('test');
    expect(text.innerText).toBe(component.inspiredText);
  });

  /**
   * Hero image
   */
  it('should have a hero image wrapper element', () => {
    expect(fixture.nativeElement.querySelectorAll('.hero-wrapper').length).toBe(1);
  });
  it('should have a hero image', () => {
    expect(fixture.nativeElement.querySelectorAll('.hero-img').length).toBe(1);
  });
  it('should call heroAPI onInit', () => {
    const fakeResponse = {
        "url": "https://cdn2.thedogapi.com/images/B1IcfgqE7_1280.jpg"
    };
    spyOn(heroService, 'getHero').and.callFake(() => {
      return of([fakeResponse]);
    });
    component.ngOnInit();
    expect(heroService.getHero).toHaveBeenCalled();
  });
  it('should set hero image from hero service', () => {
    const dummyImg = '/assets/img/hero1.jpg';
    spyOn(heroService, 'getHero').and.returnValue(dummyImg);
    component.setUpHeroImg();
    fixture.detectChanges();
    const heroImg = <HTMLElement> fixture.nativeElement.querySelector('.hero-img');
    expect(heroImg.style.backgroundImage).toBe(`url("${dummyImg}")`);
  });

  /**
   * Scroll event
   */
  it('should have a on scroll event callback', () => {
    expect(component.onScroll).toBeTruthy();
  });
  it('should have a onscroll removal function', () => {
    expect(component.removeScrollEvent).toBeTruthy();
  });
  it('should remove onScroll event listener on destroy', () => {
    const func = spyOn(component, 'removeScrollEvent');
    component.ngOnDestroy();
    expect(func).toHaveBeenCalled();
  });

  /**
   * Secondary header
   */
  it('should have a secondary header', () => {
    expect(fixture.nativeElement.querySelectorAll('.secondary-header').length).toBe(1);
  });

  /**
   * Search section
   */
  it('should have a search title', () => {
    expect(fixture.nativeElement.querySelectorAll('.search-title').length).toBe(1);
  });
  it('should call "setUpFilter" onInit', () => {
    let func = spyOn(component, 'setUpFilter');
    component.ngOnInit();
    expect(func).toHaveBeenCalled();
  });
  it('should call setUpFilter "getFilterList"', () => {
    let func = spyOn(filterService, 'getFilterList').and.returnValue([
      {
        additional: true
      },
      {
        additional: false
      }
    ]);
    component.setUpFilter();
    expect(func).toHaveBeenCalled();
  });
  it('should separate filter to filterList and additionalFilterList', () => {
    spyOn(filterService, 'getFilterList').and.returnValue([
      {
        additional: true
      },
      {
        additional: false
      }
    ]);
    component.filterList = [];
    component.additionalFilterList = [];
    component.setUpFilter();
    fixture.detectChanges();
    expect(component.filterList.length).not.toEqual(0);
    expect(component.additionalFilterList.length).not.toEqual(0);
  });
  it('should empty list before setting up filter list', () => {
    component.filterList = [{ additional: false }];
    component.additionalFilterList = [{ additional: true }];
    component.setUpFilter();
    fixture.detectChanges();
    expect(component.filterList.length).toBe(3);
    expect(component.additionalFilterList.length).toBe(5);
  });
  it('should declare "addToFilter" function', () => {
    expect(component.addToFilter).toBeTruthy();
  });
  it('should add filterList and additionalFilterList to form group', () => {
    component.filterGroup = fb.group({
      conditions: fb.group({})
    });
    component.setUpFilter();
    fixture.detectChanges();
    expect(Object.keys(component.filterGroup.get('conditions').controls).length).toBe(8);
  });
  it('should render filterList on page', () => {
    expect(fixture.nativeElement.querySelectorAll('filter-select').length).toBe(8);
  });
  it('should declare "setCondition" function', () => {
    expect(component.setCondition).toBeTruthy();
  });
  it('should have search button on page', () => {
    expect(fixture.nativeElement.querySelectorAll('.search-btn-wrapper').length).toBe(1);
    expect(fixture.nativeElement.querySelectorAll('.search-btn').length).toBe(3);
  });
  it('should call search function', () => {
    let searchBtn = <HTMLButtonElement> fixture.nativeElement.querySelector('.search-btn.--search');
    let fnc = spyOn(component, 'applySearch');
    searchBtn.click();
    fixture.detectChanges();
    expect(fnc).toHaveBeenCalled();
  });
  it('should reset search function', () => {
    let resetBtn = <HTMLButtonElement> fixture.nativeElement.querySelector('.search-btn.--reset');
    let fnc = spyOn(component, 'clearFilter');
    resetBtn.click();
    fixture.detectChanges();
    expect(fnc).toHaveBeenCalled();
  });
  it('should toggle additional filter list area', () => {
    let filterArea = <HTMLDivElement> fixture.nativeElement.querySelector('.filter-inner-wrapper.--additional');
    component.additionalFilter = false;
    fixture.detectChanges();
    expect(filterArea.classList).toContain('hidden');

    let moreBtn = <HTMLButtonElement> fixture.nativeElement.querySelector('.search-btn.--more');
    moreBtn.click();
    fixture.detectChanges();
    expect(component.additionalFilter).toBeTruthy();
    expect(filterArea.classList).not.toContain('hidden');
  });
  it('should toggle search section by clicking search button', () => {
    let searchIconBtn = <HTMLButtonElement> fixture.nativeElement.querySelector('button.search-icon');
    let searchContainerEl = <HTMLDivElement> fixture.nativeElement.querySelector('.search-container');
    searchContainerEl.classList.remove('search-opened');
    searchContainerEl.classList.add('search-closed');
    searchIconBtn.click();
    fixture.detectChanges();
    expect(searchContainerEl.classList).toContain('search-opened');
  });

  // Animal API Testing
  it('should call getAnimals on ngInit', () => {
    let fnc = spyOn(component, 'getAnimals');
    component.ngOnInit();
    expect(fnc).toHaveBeenCalled();
  });
  it('should have a variable called animalPools to hold all animal data', () => {
    expect(component.animalPools).toBeTruthy();
  });
  it('should make API call by calling the getAnimals function', () => {
    let apiFnc = spyOn(animalService, 'getAnimals').and.returnValue(of([{
      dummy: 'test2'
    }]));
    component.getAnimals();
    expect(apiFnc).toHaveBeenCalled();
  });
  it('should clear animal pools before calling the getAnimals function', () => {
    component.animalPools = [{ dummy: 'test' }];
    spyOn(animalService, 'getAnimals').and.returnValue(of([
      {
        dummy: 'test2'
      }
    ]));
    component.getAnimals();
    fixture.detectChanges();
    expect(component.animalPools.length).toBe(1);
  });
  it('should have a variable called animalShowing to hold animal data currently shown to the user', () => {
    expect(component.animalShowing).toBeTruthy();
  });
  it('should render correct number of cards on screen', () => {
    const dummyData = [{ dummy: 'test' }, { dummy: 'test 2' }];
    component.animalShowing = dummyData;
    fixture.detectChanges();
    let cardElments = fixture.nativeElement.querySelectorAll('animal-card');
    expect(cardElments.length).toBe(dummyData.length);
  });
  it('should map animal city for incoming animal API data', () => {
    const dummyData = [{
      animal_area_pkid: 11
    }];
    spyOn(animalService, 'getAnimals').and.returnValue(of(dummyData));
    component.getAnimals();
    fixture.detectChanges();
    let firstEntry = component.animalShowing[0];
    expect(firstEntry['city']).toBeTruthy();
    expect(firstEntry['city']).toBe(animalService.getCity(dummyData[0]['animal_area_pkid']));
  });
  it('should map animal shelter location for incoming animal API data', () => {
    const dummyData = [{
      "animal_shelter_pkid": 69
    }];
    spyOn(animalService, 'getAnimals').and.returnValue(of(dummyData));
    component.getAnimals();
    fixture.detectChanges();
    let firstEntry = component.animalShowing[0];
    expect(firstEntry['shelter']).toBeTruthy();
    expect(firstEntry['shelter']).toBe(animalService.getShelter(dummyData[0]['animal_shelter_pkid']));
  });
  it('should map animal body size for incoming animal API data', () => {
    const dummyData = [{
      "animal_bodytype": 'BIG'
    }];
    spyOn(animalService, 'getAnimals').and.returnValue(of(dummyData));
    component.getAnimals();
    fixture.detectChanges();
    let firstEntry = component.animalShowing[0];
    expect(firstEntry['size']).toBeTruthy();
    expect(firstEntry['size']).toBe(animalService.getSize(dummyData[0]['animal_bodytype']));
  });
  it('should store animal_sex to a variable called gender', () => {
    const dummyData = [{
      "animal_sex": 'M'
    }];
    spyOn(animalService, 'getAnimals').and.returnValue(of(dummyData));
    component.getAnimals();
    fixture.detectChanges();
    let firstEntry = component.animalShowing[0];
    expect(firstEntry['gender']).toBeTruthy();
    expect(firstEntry['gender']).toBe(dummyData[0]['animal_sex']);
  });

});
