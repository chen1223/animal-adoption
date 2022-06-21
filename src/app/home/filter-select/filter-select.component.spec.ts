import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FilterSelectComponent } from './filter-select.component';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
describe('FilterSelectComponent', () => {
  let component: FilterSelectComponent;
  let fixture: ComponentFixture<FilterSelectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterSelectComponent ],
      imports: [FontAwesomeModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have wrapper', () => {
    const el = fixture.nativeElement.querySelectorAll('.filter-wrapper');
    expect(el.length).toBe(1);
  });

  it('should show selected item', () => {
    expect(fixture.nativeElement.querySelectorAll('.selected').length).toBe(1);
  });

  it('should declare selected value variable', () => {
    expect(component.selectedValue).toBeDefined();
  });

  it('should declare option input', () => {
    expect(component.options).toBeDefined();
  });

  it('should declare option dictionary', () => {
    expect(component.optionDict).toBeDefined();
  });

  it('should call "prepareDict" onInit', () => {
    expect(component.prepareDict).toBeDefined();
    let func = spyOn(component, 'prepareDict');
    component.ngOnInit();
    expect(func).toHaveBeenCalled();
  });

  it('should prepare dictionary', () => {
    component.options = [
      {
        key: 'test1',
        description: 'test 1'
      },
      {
        key: 'test2',
        description: 'test 2'
      }
    ];
    component.optionDict = {};
    component.prepareDict();
    fixture.detectChanges;
    expect(Object.keys(component.optionDict).length).toBe(2);
  });

  it('should return description based on value', () => {
    expect(component.getDesc).toBeDefined();
    component.options = [
      {
        key: 'a',
        description: 'desc a'
      },
      {
        key: 'b',
        description: 'desc b'
      }
    ];
    component.prepareDict();
    fixture.detectChanges();
    expect(component.getDesc('a')).toBe('desc a');
    expect(component.getDesc('c')).toBe('');
  });

  it('should prepare dropdown menu options on view', () => {
    // Test for empty cases
    component.options = [];
    component.optionDict = {};
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.option-item').length).toEqual(0);
    // Test with data
    component.options = [
      {
        key: 'a',
        description: 'desc a'
      },
      {
        key: 'b',
        description: 'desc b'
      }
    ];
    component.prepareDict();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.option-item').length).toEqual(component.options.length);
  });

  it('should set selected value', () => {
    component.selectedValue = '';
    component.setValue('a');
    fixture.detectChanges();
    expect(component.selectedValue).toBe('a');
  });

  it('should display selected description', () => {
    component.options = [
      {
        key: 'a',
        description: 'desc a'
      },
      {
        key: 'b',
        description: 'desc b'
      }
    ];
    component.prepareDict();
    component.setValue('a');
    fixture.detectChanges();

    let selectedEl = <HTMLSpanElement>fixture.nativeElement.querySelectorAll('.selected')[0];
    expect(selectedEl.innerText).toBe(component.getDesc('a'));

  });

  it('should update selected on option clicks', () => {
    component.options = [
      {
        key: 'a',
        description: 'desc a'
      },
      {
        key: 'b',
        description: 'desc b'
      }
    ];
    component.prepareDict();
    fixture.detectChanges();
    let firstOption = fixture.debugElement.queryAll(By.css('.option-item'))[0];
    firstOption.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.selectedValue).toBe('a');
  });

  it('should trigger change detection on option clicks', () => {
    let changeFnc = spyOn(component, 'propagateChange');
    component.options = [
      {
        key: 'a',
        description: 'desc a'
      },
      {
        key: 'b',
        description: 'desc b'
      }
    ];
    component.prepareDict();
    fixture.detectChanges();
    let firstOption = fixture.debugElement.queryAll(By.css('.option-item'))[0];
    firstOption.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(changeFnc).toHaveBeenCalled();
  });

  it('should have css class reflected to status', () => {
    let el = <HTMLElement> fixture.nativeElement.querySelector('.filter-wrapper');
    component.status = 'expanded';
    fixture.detectChanges();
    expect(el.classList.contains('expanded')).toBeTruthy();

    component.status = 'collapsed';
    fixture.detectChanges();
    expect(el.classList.contains('collapsed')).toBeTruthy();
  });

  it('should toggle status class', () => {
    let el = <HTMLElement> fixture.nativeElement.querySelector('.filter-wrapper');
    component.status = 'expanded';
    fixture.detectChanges();
    expect(el.classList.contains('expanded')).toBeTruthy();

    component.toggleClass();
    fixture.detectChanges();
    expect(el.classList.contains('expanded')).toBeFalsy();
    expect(el.classList.contains('collapsed')).toBeTruthy();
  });
});
