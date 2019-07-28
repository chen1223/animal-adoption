import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HeroService } from '../services/hero.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, FormArray } from '@angular/forms';
import { FilterService } from '../services/filter.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NO_ERRORS_SCHEMA } from '@angular/core';
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let heroService: HeroService;
  let filterService: FilterService;
  let fb: FormBuilder;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FontAwesomeModule],
      declarations: [ HomeComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [HeroService,
                  FilterService,
                  FormBuilder]
    }).compileComponents();
    heroService = TestBed.get(HeroService);
    filterService = TestBed.get(FilterService);
    fb = TestBed.get(FormBuilder);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
    expect(component.filterList.length).toBe(4);
    expect(component.additionalFilterList.length).toBe(4);
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
    expect(fixture.nativeElement.querySelectorAll('filter-select').length).toBe(4);
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

});
