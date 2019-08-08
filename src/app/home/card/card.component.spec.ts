import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let dummyData;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardComponent ],
      imports: [FontAwesomeModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    dummyData = {
      album_file: 'https://via.placeholder.com/300/300',
      animal_kind: '狗',
      animal_id: '12345',
      animal_sex: 'M',
      animal_bodytype: 'MEDIUM'
    };
    component.data = dummyData;
    fixture.detectChanges();
  });

  /**
   * Data input
   */
  it('should render image according to input data', () => {
    let imgEl = <HTMLImageElement> fixture.nativeElement.querySelector('.main-img');
    fixture.detectChanges();
    expect(imgEl.alt).toBe(`${dummyData['animal_kind']}: ${dummyData['animal_id']}`);
    expect(imgEl.src).toBe(dummyData['album_file']);
  });

  // Image width and height portion
  it('should call "renderCard" in ngAfterViewInit', () => {
    let fnc = spyOn(component, 'ngAfterViewInit');
    component.ngAfterViewInit();
    expect(fnc).toHaveBeenCalled();
  });
  it('should render width and height portion correctly', () => {
    let cardContainer = <HTMLDivElement> fixture.nativeElement.querySelector('.card-container');
    cardContainer.style.width = '200px';
    fixture.detectChanges();
    component.ngAfterViewInit();
    fixture.detectChanges();
    // Card width and height testing
    let cardHeight = Math.round(200 / component.cardPortion);
    expect(cardContainer.offsetHeight).toBe(cardHeight);
    // Image width and height testing
    let imgWrapper = <HTMLDivElement> fixture.nativeElement.querySelector('.img-wrapper');
    let imgHeight = Math.round(200 / component.imgPortion);
    expect(imgWrapper.offsetHeight).toBe(imgHeight);
  });

  /**
   * Main Layout
   */
  it('should have card container', () => {
    let containerEl = fixture.nativeElement.querySelectorAll('.card-container');
    expect(containerEl.length).toBe(1);
  });
  it('should have a image section and a content section', () => {
    let imgContainer = fixture.nativeElement.querySelectorAll('.img-wrapper');
    expect(imgContainer.length).toBe(1);
    let detailContainer = fixture.nativeElement.querySelectorAll('.detail-wrapper');
    expect(detailContainer.length).toBe(1);
  });

  /**
   * Image section
   */
  it('should have main image', () => {
    let mainImg = fixture.nativeElement.querySelectorAll('.img-wrapper .main-img');
    expect(mainImg.length).toBe(1);
  });

  /**
   * Detail section
   */
  it('should render gender', () => {

  });

});
