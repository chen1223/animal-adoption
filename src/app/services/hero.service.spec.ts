import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeroService } from './hero.service';

describe('HeroService', () => {
  let service: HeroService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService]
    });
    service = TestBed.get(HeroService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  // Random API
  it('should select an hero from the array', () => {
    expect(service.getHero()).toBeTruthy();
  });
  it('shoul store shown item in selected array', () => {
    service.selected = [];
    service.getHero();
    expect(service.selected.length).toBe(1);
  });
  it('should empty selected array if its full (length of 4)', () => {
    service.selected = [0, 1, 2, 3];
    service.getHero();
    expect(service.selected.length).toBe(1);
  });

  // Hero API
  it('should have a hero list of 4', () => {
    expect(service.heroList.length).toBe(4);
  });
});
