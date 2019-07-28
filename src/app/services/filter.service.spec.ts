import { TestBed } from '@angular/core/testing';

import { FilterService } from './filter.service';

describe('FilterService', () => {
  let filterService: FilterService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilterService]
    });
    filterService = TestBed.get(FilterService);
  });

  it('should be created', () => {
    const service: FilterService = TestBed.get(FilterService);
    expect(service).toBeTruthy();
  });

  it('should have a list called "filterList" with all filter conditions', () => {
    expect(filterService.filterList).toBeTruthy();
    expect(filterService.filterList.length).toBe(8);
  });

  it('should return filterList', () => {
    expect(filterService.getFilterList).toBeTruthy();
    expect(filterService.getFilterList()).toBe(filterService.filterList);
  });
});
