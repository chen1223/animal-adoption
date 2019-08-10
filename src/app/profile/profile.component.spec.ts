import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AnimalService } from '../services/animal.service';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let animalService: AnimalService;
  let fixture: ComponentFixture<ProfileComponent>;
  let dummyData = {
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
    "album_file": "https://via.placeholder.com/300/300",
    "album_update": "",
    "cDate": "2019/08/05",
    "shelter_address": "彰化縣員林鎮大峰里阿寶巷426號",
    "shelter_tel": "04-8590638"
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      providers: [AnimalService],
      imports: [FontAwesomeModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    animalService = TestBed.get(AnimalService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Navigation button
  it('should have a navigation button', () => {
    let el = fixture.nativeElement.querySelectorAll('.navigation-btn');
    expect(el.length).toBe(1);
  });

  it('should load data from sessionStorage on init', () => {
    let fnc = spyOn(animalService, 'loadAnimal').and.callFake(() => {});
    component.ngOnInit();
    expect(fnc).toHaveBeenCalled();
  });

  it('should have a profile image', () => {
    let profileEl = fixture.nativeElement.querySelectorAll('.profile-img');
    expect(profileEl.length).toBe(1);
  });
  it('should render profile image', () => {
    component.data = dummyData;
    let profileImg = <HTMLImageElement> fixture.nativeElement.querySelector('.profile-img');
    fixture.detectChanges();
    expect(profileImg.src).toBe(component['data']['album_file']);
    let alt = `${component['data']['animal_kind']}: ${component['data']['animal_id']}`;
    expect(profileImg.alt).toBe(alt);
  });
});
