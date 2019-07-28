import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  filterList = [
    {
      type: '類型',
      apiKey: 'animal_kind',
      additional: false,
      options: [
        {
          description: '全部',
          key: null
        },
        {
          description: '狗',
          key: '狗'
        },
        {
          description: '貓',
          key: '貓'
        }
      ]
    },
    {
      type: '體型',
      apiKey: 'animal_bodytype',
      additional: false,
      options: [
        {
          description: '全部',
          key: null
        },
        {
          description: '小',
          key: 'SMALL'
        },
        {
          description: '中',
          key: 'MEDIUM'
        },
        {
          description: '大',
          key: 'BIG'
        }
      ]
    },
    {
      type: '性別',
      apiKey: 'animal_sex',
      additional: false,
      options: [
        {
          description: '全部',
          key: null
        },
        {
          description: '公',
          key: 'M'
        },
        {
          description: '母',
          key: 'F'
        }
      ]
    },
    {
      type: '年齡',
      apiKey: 'animal_age',
      additional: false,
      options: [
        {
          description: '全部',
          key: null
        },
        {
          description: '幼年',
          key: 'CHILD'
        },
        {
          description: '成年',
          key: 'ADULT'
        }
      ]
    },
    {
      type: '縣市',
      apiKey: 'animal_area_pkid',
      additional: true,
      options: [
        {
          description: '全部',
          key: null,
        },
        {
          description: '臺北市',
          key: 2
        },
        {
          description: '新北市',
          key: 3
        },
        {
          description: '基隆市',
          key: 4
        },
        {
          description: '宜蘭縣',
          key: 5
        },
        {
          description: '桃園縣',
          key: 6
        },
        {
          description: '新竹縣',
          key: 7
        },
        {
          description: '新竹市',
          key: 8
        },
        {
          description: '苗栗縣',
          key: 9
        },
        {
          description: '臺中市',
          key: 10
        },
        {
          description: '彰化縣',
          key: 11
        },
        {
          description: '南投縣',
          key: 12
        },
        {
          description: '雲林縣',
          key: 13
        },
        {
          description: '嘉義縣',
          key: 14
        },
        {
          description: '嘉義市',
          key: 15
        },
        {
          description: '臺南市',
          key: 16
        },
        {
          description: '高雄市',
          key: 17
        },
        {
          description: '屏東縣',
          key: 18
        },
        {
          description: '花蓮縣',
          key: 19
        },
        {
          description: '臺東縣',
          key: 20
        },
        {
          description: '澎湖縣',
          key: 21
        },
        {
          description: '金門縣',
          key: 22
        },
        {
          description: '連江縣',
          key: 23
        }
      ]
    },
    {
      type: '收容所',
      apiKey: 'animal_shelter_pkid',
      additional: true,
      options: [
        {
          description: '全部',
          key: null
        },
        {
          description: '基隆市寵物銀行',
          key: 48
        },
        {
          description: '臺北市動物之家',
          key: 49
        },
        {
          description: '新北市板橋區公立動物之家',
          key: 50
        },
        {
          description: '新北市新店區公立動物之家',
          key: 51
        },
        {
          description: '新北市中和區公立動物之家',
          key: 53
        },
        {
          description: '新北市淡水區公立動物之家',
          key: 55
        },
        {
          description: '新北市瑞芳區公立動物之家',
          key: 56
        },
        {
          description: '新北市五股區公立動物之家',
          key: 58
        },
        {
          description: '新北市八里區公立動物之家',
          key: 59
        },
        {
          description: '新北市三芝區公立動物之家',
          key: 60
        },
        {
          description: '桃園市動物保護教育園區',
          key: 61
        },
        {
          description: '新竹市動物收容所',
          key: 62
        },
        {
          description: '新竹縣動物收容所',
          key: 63
        },
        {
          description: '臺中市動物之家南屯園區',
          key: 67
        },
        {
          description: '臺中市動物之家后里園區',
          key: 68
        },
        {
          description: '彰化縣流浪狗中途之家',
          key: 69
        },
        {
          description: '南投縣公立動物收容所',
          key: 70
        },
        {
          description: '嘉義市流浪犬收容中心',
          key: 71
        },
        {
          description: '嘉義縣流浪犬中途之家',
          key: 72
        },
        {
          description: '臺南市動物之家灣裡站',
          key: 73
        },
        {
          description: '臺南市動物之家善化站',
          key: 74
        },
        {
          description: '高雄市壽山動物保護教育園區',
          key: 75
        },
        {
          description: '高雄市燕巢動物保護關愛園區',
          key: 76
        },
        {
          description: '屏東縣流浪動物收容所',
          key: 77
        },
        {
          description: '宜蘭縣流浪動物中途之家',
          key: 78
        },
        {
          description: '花蓮縣流浪犬中途之家',
          key: 79
        },
        {
          description: '臺東縣動物收容中心',
          key: 80
        },
        {
          description: '連江縣流浪犬收容中心',
          key: 81
        },
        {
          description: '澎湖縣流浪動物收容中心',
          key: 83
        },
        {
          description: '雲林縣流浪動物收容所',
          key: 89
        },
        {
          description: '新北市政府動物保護防疫處',
          key: 92
        },
        {
          description: '苗栗縣生態保育教育中心',
          key: 96
        }
      ]
    },
    {
      type: '絕育',
      apiKey: 'animal_sterilization',
      additional: true,
      options: [
        {
          description: '全部',
          key: null
        },
        {
          description: '有',
          key: 'T'
        },
        {
          description: '無',
          key: 'F'
        }
      ]
    },
    {
      type: '施打狂犬疫苗',
      apiKey: 'animal_bacterin',
      additional: true,
      options: [
        {
          description: '全部',
          key: null
        },
        {
          description: '有',
          key: 'T'
        },
        {
          description: '無',
          key: 'F'
        }
      ]
    }
  ];
  constructor() { }

  // Get filter list
  getFilterList(): Object[] {
    return this.filterList;
  }
}
