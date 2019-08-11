import { TestBed } from '@angular/core/testing';

import { AnimalService } from './animal.service';

describe('AnimalService', () => {
  let animalService: AnimalService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnimalService]
    });
    animalService = TestBed.get(AnimalService);
  });

  afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  // City related testing
  it('should have a city mapping dictionary', () => {
    expect(animalService.cityDict).toBeTruthy();
  });
  it('should return city based on animal_area_pkid', () => {
    Object.keys(animalService.cityDict).forEach(key => {
      expect(animalService.getCity(+key)).toBe(animalService.cityDict[+key]);
    });
  });

  // Animal shilter related testing
  it('should have a shelter mapping dictionary', () => {
    expect(animalService.shelterDict).toBeTruthy();
  });
  it('should return animal shelter based on shelter id', () => {
    Object.keys(animalService.shelterDict).forEach(key => {
      expect(animalService.getShelter(+key)).toBe(animalService.shelterDict[+key]);
    });
  });

  // Animal body size related testing
  it('should have a body size mapping dictionary', () => {
    expect(animalService.sizeDict).toBeTruthy();
  });
  it('should return animal body size based on api key', () => {
    Object.keys(animalService.sizeDict).forEach(key => {
      expect(animalService.getSize(key)).toBe(animalService.sizeDict[key]);
    });
  });

  it('should store animal data in localStorage and sessionStorage', () => {
    localStorage.clear();
    sessionStorage.clear();
    animalService.storeAnimal({ test: 'test' });
    let localData = localStorage.getItem('selectedAnimal');
    let sessionData = sessionStorage.getItem('selectedAnimal');
    expect(localData).toBeTruthy();
    expect(sessionData).toBeTruthy();
  });
  it('should get data from sessionStorage', () => {
    const dummyData = { test: 'test' };
    sessionStorage.setItem('selectedAnimal', JSON.stringify(dummyData));
    let dataRetrieved = animalService.loadAnimal();
    expect(dataRetrieved['test']).toBe(dummyData['test']);
  });

  // Animal API testing
  it('should declare API link', () => {
    expect(animalService.apiLink).toBeDefined();
  });

});
