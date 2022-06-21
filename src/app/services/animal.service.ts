import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  // Actual API link
  apiLink: string = 'https://zueoy5tslhg6fq7hvgys32fsoy0mtvwx.lambda-url.ap-northeast-1.on.aws/';
  publicApiLink: string = 'https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL';

  // Body size mapping dictionary
  sizeDict = {
    'SMALL': '小型',
    'MEDIUM': '中型',
    'BIG': '大型'
  };

  // City mapping dictionary
  cityDict = {
    2: '臺北市',
    3: '新北市',
    4: '基隆市',
    5: '宜蘭縣',
    6: '桃園縣',
    7: '新竹縣',
    8: '新竹市',
    9: '苗栗縣',
    10: '臺中市',
    11: '彰化縣',
    12: '南投縣',
    13: '雲林縣',
    14: '嘉義縣',
    15: '嘉義市',
    16: '臺南市',
    17: '高雄市',
    18: '屏東縣',
    19: '花蓮縣',
    20: '臺東縣',
    21: '澎湖縣',
    22: '金門縣',
    23: '連江縣'
  };

  // Animal shelter mapping dictionary
  shelterDict = {
    48: '基隆市寵物銀行',
    49: '臺北市動物之家',
    50: '新北市板橋區公立動物之家',
    51: '新北市新店區公立動物之家',
    53: '新北市中和區公立動物之家',
    55: '新北市淡水區公立動物之家',
    56: '新北市瑞芳區公立動物之家',
    58: '新北市五股區公立動物之家',
    59: '新北市八里區公立動物之家',
    60: '新北市三芝區公立動物之家',
    61: '桃園市動物保護教育園區',
    62: '新竹市動物收容所',
    63: '新竹縣動物收容所',
    67: '臺中市動物之家南屯園區',
    68: '臺中市動物之家后里園區',
    69: '彰化縣流浪狗中途之家',
    70: '南投縣公立動物收容所',
    71: '嘉義市流浪犬收容中心',
    72: '嘉義縣流浪犬中途之家',
    73: '臺南市動物之家灣裡站',
    74: '臺南市動物之家善化站',
    75: '高雄市壽山動物保護教育園區',
    76: '高雄市燕巢動物保護關愛園區',
    77: '屏東縣流浪動物收容所',
    78: '宜蘭縣流浪動物中途之家',
    79: '花蓮縣流浪犬中途之家',
    80: '臺東縣動物收容中心',
    81: '連江縣流浪犬收容中心',
    82: '金門縣動物收容中心',
    83: '澎湖縣流浪動物收容中心',
    89: '雲林縣流浪動物收容所',
    92: '新北市政府動物保護防疫處',
    96: '苗栗縣生態保育教育中心'
  };

  constructor(private http: HttpClient) { }

  // Return animal body size based on incoming key
  getSize(sizeKey: string): string {
    return this.sizeDict[sizeKey];
  }

  // Return city based on area id
  getCity(areaID: number): string {
    return this.cityDict[areaID];
  }

  // Return animal shelter based on shelter id
  getShelter(shelterID: number): string {
    return this.shelterDict[shelterID];
  }

  // Return list of animals
  getAnimals(skip: number, top: number, conditions: Object): Observable<Object> {
    const params = {
      '$top': top.toString(),
      '$skip': skip.toString()
    };
    Object.keys(conditions).forEach(key => {
      params[key] = conditions[key];
    });
    const body = {
      govLink: this.publicApiLink,
      params
    };
    return this.http.post(this.apiLink, body);
  }

  // Store given data to localStorage and sessionStorage
  storeAnimal(data): void {
    localStorage.setItem('selectedAnimal', JSON.stringify(data));
    sessionStorage.setItem('selectedAnimal', JSON.stringify(data));
  }

  // Load data from sessionStorage
  loadAnimal(): Object {
    const data = sessionStorage.getItem('selectedAnimal');
    return data ? JSON.parse(data) : null;
  }
}
