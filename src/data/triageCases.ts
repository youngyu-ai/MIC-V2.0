import { TriageCard, TriageCategory } from '../types';

export interface RawCase {
  id: number;
  demographics: string;
  age: number;
  gender: '男性' | '女性';
  clinical: string;
  category: TriageCategory;
  explanation: string;
}

// 🔴 紅色・重傷 (扣除孕婦 33~40)
export const RAW_RED_CASES: RawCase[] = [
  {
    id: 1,
    demographics: '50歲，男性',
    age: 50,
    gender: '男性',
    clinical: '無法行走、意識模糊、腹部開放性傷口，腸子外露、橈動脈微弱、呼吸：24 / min、微血管充填時間：1秒',
    category: 'red',
    explanation: '意識模糊，無法遵從簡單指令；腹部臟器外露併橈動脈微弱',
  },
  {
    id: 2,
    demographics: '50歲，女性',
    age: 50,
    gender: '女性',
    clinical: '無法行走、意識模糊、胸部挫傷，呼吸淺快、橈動脈微弱、呼吸：24 / min、微血管充填時間：1秒',
    category: 'red',
    explanation: '意識模糊，橈動脈微弱（血行動態不穩定）',
  },
  {
    id: 3,
    demographics: '80歲，女性',
    age: 80,
    gender: '女性',
    clinical: '無法行走、意識模糊、胸部嚴重鈍傷瘀青，嘴唇發紺、橈動脈微弱、呼吸淺慢、呼吸：8 / min、微血管充填時間：4秒',
    category: 'red',
    explanation: '呼吸頻率過慢（8次/分 < 10次/分）、CRT 4秒（≥2秒）、意識模糊',
  },
  {
    id: 4,
    demographics: '70歲，男性',
    age: 70,
    gender: '男性',
    clinical: '無法行走、意識模糊、胸部開放性傷口，咳血、呼吸急深、橈動脈微弱、呼吸：36/ min、微血管充填時間：1秒',
    category: 'red',
    explanation: '呼吸急促（36次/分 > 30次/分）、意識模糊',
  },
  {
    id: 5,
    demographics: '60歲，女性',
    age: 60,
    gender: '女性',
    clinical: '無法行走、意識模糊、胸部鈍傷，四肢多處撕裂傷及擦傷、橈動脈微弱、呼吸淺、呼吸：24/ min、微血管充填時間：1秒',
    category: 'red',
    explanation: '意識模糊，無法執行簡單指令、橈動脈微弱',
  },
  {
    id: 6,
    demographics: '35歲，男性',
    age: 35,
    gender: '男性',
    clinical: '無法行走、意識清楚、胸部有一開放性傷口、橈動脈微弱、呼吸：24 / min、微血管充填時間：4秒',
    category: 'red',
    explanation: '微血管充填時間 4秒（≥ 2秒）、橈動脈微弱，提示嚴重休克',
  },
  {
    id: 7,
    demographics: '40歲，女性',
    age: 40,
    gender: '女性',
    clinical: '無法行走、意識清楚，臉色蒼白、右大腿開放性骨折、橈動脈微弱、呼吸淺快、呼吸：36/ min、微血管充填時間：1秒',
    category: 'red',
    explanation: '呼吸急促（36次/分 > 30次/分）、橈動脈微弱',
  },
  {
    id: 8,
    demographics: '30歲，男性',
    age: 30,
    gender: '男性',
    clinical: '無法行走、意識清楚，冒冷汗、腹部開放性傷口，腸子外露、橈動脈微弱、呼吸淺快、呼吸：24 / min、微血管充填時間：3秒',
    category: 'red',
    explanation: '微血管充填時間 3秒（≥ 2秒）、橈動脈微弱，休克徵候',
  },
  {
    id: 9,
    demographics: '40歲，女性',
    age: 40,
    gender: '女性',
    clinical: '無法行走、意識清楚，嘴唇發紫、右側頸靜脈怒張，氣管偏移、右胸嚴重鈍傷瘀青，有皮下氣腫現象、橈動脈微弱、呼吸：35 / min、微血管充填時間：4秒',
    category: 'red',
    explanation: '疑似張力性氣胸，呼吸 35次/分（>30）、CRT 4秒、橈動脈微弱',
  },
  {
    id: 10,
    demographics: '50歲，男性',
    age: 50,
    gender: '男性',
    clinical: '無法行走、意識清楚，嘴唇發紺、胸部大片瘀青疼痛鈍傷、兩側頸靜脈怒張、橈動脈微弱、呼吸：40 / min、微血管充填時間：4秒',
    category: 'red',
    explanation: '呼吸 40次/分（> 30次/分）、CRT 4秒（≥ 2秒）、心包膜填塞或張力性氣胸疑慮',
  },
  {
    id: 11,
    demographics: '60歲，男性',
    age: 60,
    gender: '男性',
    clinical: '無法行走、意識模糊、腹部鈍傷、橈動脈微弱、呼吸：24 / min、微血管充填時間：1秒',
    category: 'red',
    explanation: '意識模糊，神經學狀態不穩定、橈動脈微弱',
  },
  {
    id: 12,
    demographics: '80歲，女性',
    age: 80,
    gender: '女性',
    clinical: '無法行走、意識清楚，臉色蒼白、胸腹部嚴重鈍傷、橈動脈微弱、呼吸：40 / min、微血管充填時間：4秒',
    category: 'red',
    explanation: '呼吸 40次/分（> 30次/分）、微血管充填時間 4秒（≥ 2秒）',
  },
  {
    id: 13,
    demographics: '20歲，男性',
    age: 20,
    gender: '男性',
    clinical: '無法行走、意識模糊，臉色蒼白，冒冷汗、胸部開放性傷口，右下肢開放性骨折、橈動脈微弱、呼吸：35 / min、微血管充填時間：2秒',
    category: 'red',
    explanation: '呼吸 35次/分（> 30次/分）、意識模糊、CRT 2秒',
  },
  {
    id: 14,
    demographics: '20歲，男性',
    age: 20,
    gender: '男性',
    clinical: '無法行走、意識模糊，臉色蒼白，冒冷汗、骨盆腔骨折合併內出血、橈動脈微弱、呼吸：35 / min、微血管充填時間：2秒',
    category: 'red',
    explanation: '呼吸 35次/分、意識模糊、骨盆腔嚴重創傷休克',
  },
  {
    id: 15,
    demographics: '20歲，男性',
    age: 20,
    gender: '男性',
    clinical: '無法行走、意識模糊、腹部鈍傷瘀青，雙下肢開放性骨折、橈動脈微弱、呼吸微弱、呼吸：36 / min、微血管充填時間：3秒',
    category: 'red',
    explanation: '呼吸 36次/分（> 30次/分）、CRT 3秒、意識模糊',
  },
  {
    id: 16,
    demographics: '70歲，女性',
    age: 70,
    gender: '女性',
    clinical: '無法行走、意識清楚，表情痛苦、下腹部疼痛腫脹，腰部嚴重壓傷、橈動脈微弱、呼吸：35 / min、微血管充填時間：4秒',
    category: 'red',
    explanation: '呼吸 35次/分（> 30次/分）、CRT 4秒（≥ 2秒）',
  },
  {
    id: 17,
    demographics: '15歲，男性',
    age: 15,
    gender: '男性',
    clinical: '無法行走、意識模糊，嘴唇發紫、胸腹部嚴重鈍傷、頸動脈微弱、呼吸急促、呼吸：24 / min、微血管充填時間：1秒',
    category: 'red',
    explanation: '意識模糊，無法遵從指令、循環不良',
  },
  {
    id: 18,
    demographics: '5歲，女性',
    age: 5,
    gender: '女性',
    clinical: '無法行走、意識模糊，活動力差、腹部嚴重鈍傷、肱動脈微弱、呼吸：24 / min、微血管充填時間：1秒',
    category: 'red',
    explanation: '意識模糊，反應差、肱動脈微弱（兒科休克）',
  },
  {
    id: 19,
    demographics: '10歲，男性',
    age: 10,
    gender: '男性',
    clinical: '無法行走、反應遲鈍，臉色蒼白、右大腿開放性骨折、肱動脈微弱、呼吸淺、呼吸：24 / min、微血管充填時間：3秒',
    category: 'red',
    explanation: '反應遲鈍、CRT 3秒（≥ 2秒）、肱動脈微弱',
  },
  {
    id: 20,
    demographics: '1歲，女性',
    age: 1,
    gender: '女性',
    clinical: '無法行走、反應遲鈍，活動力差、胸腹部開放性傷口、肱動脈微弱、呼吸：36 / min、微血管充填時間：1秒',
    category: 'red',
    explanation: '幼兒反應遲鈍、胸腹部穿刺傷合併低血容休克徵兆',
  },
  {
    id: 21,
    demographics: '6歲，男性',
    age: 6,
    gender: '男性',
    clinical: '無法行走、反應模糊，膚色蒼白、雙臂嚴重壓碎傷，開放性骨折、肱動脈微弱、呼吸：24 / min、微血管充填時間：2秒',
    category: 'red',
    explanation: '反應模糊、肱動脈微弱、CRT 2秒',
  },
  {
    id: 22,
    demographics: '4歲，女性',
    age: 4,
    gender: '女性',
    clinical: '無法行走、活動力差、左大腿開放性傷口、肱動脈微弱、呼吸：24 / min、微血管充填時間：3 秒',
    category: 'red',
    explanation: 'CRT 3秒（≥ 2秒）、肱動脈微弱，外傷休克徵兆',
  },
  {
    id: 23,
    demographics: '9歲，男性',
    age: 9,
    gender: '男性',
    clinical: '無法行走、反應活動力差、頭部嚴重鈍傷，全身多處擦傷、肱動脈微弱、呼吸：24 / min、微血管充填時間：3秒',
    category: 'red',
    explanation: '意識活動力差、CRT 3秒、頭部創傷高風險',
  },
  {
    id: 24,
    demographics: '12歲，女性',
    age: 12,
    gender: '女性',
    clinical: '無法行走、反應遲鈍，活動力差、頭部嚴重鈍傷，顏面撕裂傷、頸部動脈微弱、呼吸：24/ min、微血管充填時間：3秒',
    category: 'red',
    explanation: '反應遲鈍、CRT 3秒（≥ 2秒）',
  },
  {
    id: 25,
    demographics: '6歲，男性',
    age: 6,
    gender: '男性',
    clinical: '無法行走、活動力差，反應遲鈍、四肢發紫，胸部鈍傷、肱動脈微弱、呼吸急促、呼吸：60 / min、微血管充填時間：3秒',
    category: 'red',
    explanation: '呼吸顯著過速（60次/分）、CRT 3秒、反應遲鈍',
  },
  {
    id: 26,
    demographics: '2歲，女性',
    age: 2,
    gender: '女性',
    clinical: '無法行走、反應遲鈍，皮膚濕冷、腹部開放性傷口、肱動脈微弱、呼吸：40 / min、微血管充填時間：4秒',
    category: 'red',
    explanation: 'CRT 4秒（≥ 2秒）、反應遲鈍、皮膚濕冷',
  },
  {
    id: 27,
    demographics: '10歲，男性',
    age: 10,
    gender: '男性',
    clinical: '無法行走、意識不清，四肢發紫、兩側下肢壓碎傷、呼吸淺快、呼吸：24 / min、微血管充填時間：2秒',
    category: 'red',
    explanation: '意識不清、嚴重壓碎傷、缺氧發紺',
  },
  {
    id: 28,
    demographics: '8歲，女性',
    age: 8,
    gender: '女性',
    clinical: '無法行走、反應遲鈍，皮膚濕冷、胸腹部嚴重壓碎傷、肱動脈微弱、呼吸：24 / min、微血管充填時間：3秒',
    category: 'red',
    explanation: '反應遲鈍、CRT 3秒、周邊循環灌流不良',
  },
  {
    id: 29,
    demographics: '5歲，男性',
    age: 5,
    gender: '男性',
    clinical: '無法行走、反應遲鈍，臉色蒼白，皮膚濕冷、右下肢開放性骨折，大量出血、肱動脈微弱、呼吸：36 / min、微血管充填時間：4秒',
    category: 'red',
    explanation: '呼吸 36次/分、CRT 4秒、大量失血進行性休克',
  },
  {
    id: 30,
    demographics: '8歲，女性',
    age: 8,
    gender: '女性',
    clinical: '無法行走、反應模糊，四肢發紫、胸部嚴重壓碎傷，右側皮下氣腫、肱動脈微弱、呼吸：30 / min、微血管充填時間：1秒',
    category: 'red',
    explanation: '反應模糊、皮下氣腫併胸部壓碎傷、缺氧',
  },
  {
    id: 31,
    demographics: '7歲，男性',
    age: 7,
    gender: '男性',
    clinical: '無法行走、反應遲鈍、頭部鈍傷，大片頭皮下血腫、瞳孔左右不等大、呼吸：30 / min、微血管充填時間：2秒',
    category: 'red',
    explanation: '反應遲鈍、瞳孔不等大（疑似腦疝 / 顱內出血）',
  },
  {
    id: 32,
    demographics: '3歲，女性',
    age: 3,
    gender: '女性',
    clinical: '無法行走、活動力遲鈍，皮膚濕冷、腹部鈍傷瘀青，壓腹時不安躁動、肱動脈微弱、呼吸：30 / min、微血管充填時間：4秒',
    category: 'red',
    explanation: 'CRT 4秒（≥ 2秒）、活動力遲鈍、腹部內出血疑慮',
  },
];

// 🟡 黃色・中傷 (扣除孕婦 33~40)
export const RAW_YELLOW_CASES: RawCase[] = [
  {
    id: 1,
    demographics: '50歲，男性',
    age: 50,
    gender: '男性',
    clinical: '無法行走、意識清楚、腹部鈍傷、橈動脈正常、呼吸：24/ min、微血管充填時間：1秒',
    category: 'yellow',
    explanation: '無法行走；呼吸 10~30 次/分、橈動脈正常、CRT < 2秒、意識清楚，符合延遲處理',
  },
  {
    id: 2,
    demographics: '50歲，女性',
    age: 50,
    gender: '女性',
    clinical: '無法行走、意識清楚、右眼穿通傷、呼吸費力、呼吸：18 / min、微血管充填時間：1秒',
    category: 'yellow',
    explanation: '無法自行行走，但生命徵象（呼吸、循環、意識）均維持穩定',
  },
  {
    id: 3,
    demographics: '80歲，女性',
    age: 80,
    gender: '女性',
    clinical: '無法行走、意識清楚、背部重物鈍傷瘀青、呼吸：18 / min、微血管充填時間：1秒',
    category: 'yellow',
    explanation: '無法自行行走；呼吸 18次/分、橈動脈搏動佳、CRT 1秒、意識清楚',
  },
  {
    id: 4,
    demographics: '70歲，男性',
    age: 70,
    gender: '男性',
    clinical: '無法行走、意識清楚、右大腿開放性傷口，無法行走、左大腿擦傷、足背動脈正常、呼吸：24/ min、微血管充填時間：1秒',
    category: 'yellow',
    explanation: '右大腿傷無法行走，但呼吸 24次/分、足背動脈佳、意識清楚',
  },
  {
    id: 5,
    demographics: '60歲，女性',
    age: 60,
    gender: '女性',
    clinical: '無法行走、意識清楚、胸部鈍傷、四肢多處撕裂傷及擦傷、橈動脈正常、呼吸淺、呼吸：20 / min、微血管充填時間：1秒',
    category: 'yellow',
    explanation: '無法行走；呼吸 20次/分、橈動脈可觸及、CRT 1秒、意識清楚',
  },
  {
    id: 6,
    demographics: '35歲，男性',
    age: 35,
    gender: '男性',
    clinical: '無法行走、意識清楚、左前臂撕裂傷，出血、橈動脈正常、呼吸：12 / min、微血管充填時間：1秒',
    category: 'yellow',
    explanation: '無法行走；呼吸 12次/分（10~30）、橈動脈正常、CRT 1秒、意識清楚',
  },
  {
    id: 7,
    demographics: '40歲，女性',
    age: 40,
    gender: '女性',
    clinical: '無法行走、意識清楚，臉色蒼白、右大腿開放性骨折、足臂動脈正常、呼吸淺快、呼吸：24/ min、微血管充填時間：1秒',
    category: 'yellow',
    explanation: '下肢骨折無法行走；呼吸 24次/分、脈搏正常、CRT 1秒、意識清楚',
  },
  {
    id: 8,
    demographics: '30歲，男性',
    age: 30,
    gender: '男性',
    clinical: '無法行走、意識清楚、腹部鈍傷、橈動脈正常、呼吸淺快、呼吸：18 / min、微血管充填時間：1秒',
    category: 'yellow',
    explanation: '無法行走；呼吸 18次/分、橈動脈正常、CRT 1秒、意識清楚',
  },
  {
    id: 9,
    demographics: '40歲，女性',
    age: 40,
    gender: '女性',
    clinical: '無法行走、意識清楚、兩側上肢18%二度灼傷、橈動脈正常、呼吸：18 / min、微血管充填時間：1秒',
    category: 'yellow',
    explanation: '二度灼傷無法走動；呼吸 18次/分、脈搏有力、CRT 1秒、意識清楚',
  },
  {
    id: 10,
    demographics: '50歲，男性',
    age: 50,
    gender: '男性',
    clinical: '無法行走、意識清楚、胸部大面積燒燙傷18%(二度)、橈動脈正常、呼吸：24 / min、微血管充填時間：1秒',
    category: 'yellow',
    explanation: '無法行走；呼吸 24次/分、橈動脈正常、CRT 1秒、意識清楚',
  },
  {
    id: 11,
    demographics: '60歲，男性',
    age: 60,
    gender: '男性',
    clinical: '無法行走、意識清楚、右上肢及右下肢開放性骨折、橈動脈正常、呼吸：24 / min、微血管充填時間：1秒',
    category: 'yellow',
    explanation: '四肢骨折無法走；呼吸 24次/分、脈搏正常、CRT 1秒、意識清楚',
  },
  {
    id: 12,
    demographics: '80歲，女性',
    age: 80,
    gender: '女性',
    clinical: '無法行走、意識清楚、左上肢及左下肢開放性骨折、橈動脈正常、呼吸：24/ min、微血管充填時間：1秒',
    category: 'yellow',
    explanation: '無法行走；呼吸 24次/分、橈動脈正常、CRT 1秒、意識清楚',
  },
  {
    id: 13,
    demographics: '20歲，男性',
    age: 20,
    gender: '男性',
    clinical: '無法行走、意識清楚、全身大面積燒傷達40%(二度)、橈動脈正常、呼吸：24 / min、微血管充填時間：1秒',
    category: 'yellow',
    explanation: '嚴重燒燙傷無法走；目前呼吸 24次/分、橈動脈正常、CRT 1秒、意識清楚',
  },
  {
    id: 14,
    demographics: '40歲，女性',
    age: 40,
    gender: '女性',
    clinical: '無法行走、意識清楚，驚慌、雙下肢嚴重燒傷達30%(二度)、呼吸淺快、呼吸：26 / min、微血管充填時間：1秒',
    category: 'yellow',
    explanation: '下肢燒燙傷無法行走；呼吸 26次/分、CRT 1秒、意識清楚',
  },
  {
    id: 15,
    demographics: '20歲，男性',
    age: 20,
    gender: '男性',
    clinical: '無法行走、意識清楚、顏面及頸部燒灼傷、橈動脈正常、呼吸：20 / min、微血管充填時間：1秒',
    category: 'yellow',
    explanation: '無法行走；呼吸 20次/分、橈動脈正常、CRT 1秒、意識清楚（需密切監測呼吸道）',
  },
  {
    id: 16,
    demographics: '70歲，女性',
    age: 70,
    gender: '女性',
    clinical: '無法行走、意識清楚，表情痛苦、雙下肢閉鎖性骨折、足背動脈正常、呼吸：18 / min、微血管充填時間：1秒',
    category: 'yellow',
    explanation: '雙下肢骨折無法自行走；呼吸 18次/分、足背動脈可及、CRT 1秒、意識清楚',
  },
  {
    id: 17,
    demographics: '15歲，男性',
    age: 15,
    gender: '男性',
    clinical: '無法行走、意識清楚、高處墜樓雙下肢嚴重骨折、呼吸急促、橈動脈正常、呼吸：20 / min、微血管充填時間：1秒',
    category: 'yellow',
    explanation: '無法自行行走；呼吸 20次/分、橈動脈正常、CRT 1秒、意識清楚',
  },
  {
    id: 18,
    demographics: '5歲，女性',
    age: 5,
    gender: '女性',
    clinical: '無法行走、意識清楚、嚴重燒傷面積達10%(二度)、大聲哭鬧、肱動脈正常、呼吸：20 / min、微血管充填時間：1秒',
    category: 'yellow',
    explanation: '無法行走；呼吸 20次/分、肱動脈正常、CRT 1秒、哭鬧能互動，意識正常',
  },
  {
    id: 19,
    demographics: '10歲，男性',
    age: 10,
    gender: '男性',
    clinical: '無法行走、反應正常，膚色紅潤、右大腿閉鎖性骨折、肱動脈正常、呼吸淺、呼吸：20 / min、微血管充填時間：1秒',
    category: 'yellow',
    explanation: '無法行走；呼吸 20次/分、肱動脈正常、CRT 1秒、反應正常',
  },
  {
    id: 20,
    demographics: '1歲，女性',
    age: 1,
    gender: '女性',
    clinical: '無法行走、反應正常，活動力尚可、右前臂開放性骨折、肱動脈正常、呼吸：26 / min、微血管充填時間：1秒',
    category: 'yellow',
    explanation: '無法行走；呼吸 26次/分、肱動脈正常、CRT 1秒、反應活動力尚可',
  },
  {
    id: 21,
    demographics: '6歲，男性',
    age: 6,
    gender: '男性',
    clinical: '無法行走、反應正常，膚色紅潤、雙臂燒燙傷達10%(二度)、肱動脈正常、呼吸：20 / min、微血管充填時間：1秒',
    category: 'yellow',
    explanation: '無法行走；呼吸 20次/分、肱動脈正常、CRT 1秒、反應正常',
  },
  {
    id: 22,
    demographics: '4歲，女性',
    age: 4,
    gender: '女性',
    clinical: '無法行走、活動力正常、左大腿開放性傷口、肱動脈正常、呼吸：18 / min、微血管充填時間：1秒',
    category: 'yellow',
    explanation: '無法行走；呼吸 18次/分、肱動脈正常、CRT 1秒、活動力正常',
  },
  {
    id: 23,
    demographics: '9歲，男性',
    age: 9,
    gender: '男性',
    clinical: '無法行走、反應活動力正常、右前臂開放性傷口，中度流血、肱動脈正常、呼吸：20 / min、微血管充填時間：1秒',
    category: 'yellow',
    explanation: '無法行走；呼吸 20次/分、肱動脈正常、CRT 1秒、反應正常',
  },
  {
    id: 24,
    demographics: '12歲，女性',
    age: 12,
    gender: '女性',
    clinical: '無法行走、反應正常、頭部5公分撕裂傷、頸部動脈正常、呼吸：26 / min、微血管充填時間：1秒',
    category: 'yellow',
    explanation: '無法行走；呼吸 26次/分、動脈搏動正常、CRT 1秒、反應正常',
  },
  {
    id: 25,
    demographics: '6歲，男性',
    age: 6,
    gender: '男性',
    clinical: '無法行走、活動力正常、腹部鈍傷，有壓痛感、肱動脈正常、呼吸：18 / min、微血管充填時間：1秒',
    category: 'yellow',
    explanation: '無法行走；呼吸 18次/分、肱動脈正常、CRT 1秒、活動力正常',
  },
  {
    id: 26,
    demographics: '2歲，女性',
    age: 2,
    gender: '女性',
    clinical: '無法行走、反應正常、雙下肢熱水燙傷達12%(二度)、肱動脈正常、呼吸：26 / min、微血管充填時間：1秒',
    category: 'yellow',
    explanation: '無法行走；呼吸 26次/分、肱動脈正常、CRT 1秒、反應正常',
  },
  {
    id: 27,
    demographics: '10歲，男性',
    age: 10,
    gender: '男性',
    clinical: '無法行走、反應及活動力正常、全身燙傷面積達16%(二度)、呼吸：20 / min、微血管充填時間：1秒',
    category: 'yellow',
    explanation: '無法行走；呼吸 20次/分、脈搏正常、CRT 1秒、反應活動正常',
  },
  {
    id: 28,
    demographics: '8歲，女性',
    age: 8,
    gender: '女性',
    clinical: '無法行走、反應正常、胸腹部鈍傷、肱動脈正常、呼吸：24 / min、微血管充填時間：1秒',
    category: 'yellow',
    explanation: '無法行走；呼吸 24次/分、肱動脈正常、CRT 1秒、反應正常',
  },
  {
    id: 29,
    demographics: '5歲，男性',
    age: 5,
    gender: '男性',
    clinical: '無法行走、反應正常、右下肢開放性骨折，出血、肱動脈正常、呼吸：20 / min、微血管充填時間：1秒',
    category: 'yellow',
    explanation: '無法行走；呼吸 20次/分、肱動脈正常、CRT 1秒、意識反應正常',
  },
  {
    id: 30,
    demographics: '8歲，女性',
    age: 8,
    gender: '女性',
    clinical: '無法行走、反應及活動力正常、眼部燒灼傷、呼吸正常、肱動脈正常、呼吸：18 / min、微血管充填時間：1秒',
    category: 'yellow',
    explanation: '無法行走；呼吸 18次/分、肱動脈正常、CRT 1秒、反應正常',
  },
  {
    id: 31,
    demographics: '47歲，男性',
    age: 47,
    gender: '男性',
    clinical: '無法行走、意識清楚、脊椎受傷及腹部鈍傷、橈動脈正常、呼吸：20 / min、微血管充填時間：1秒',
    category: 'yellow',
    explanation: '疑似脊椎損傷無法行走；呼吸 20次/分、橈動脈正常、CRT 1秒、意識清楚',
  },
  {
    id: 32,
    demographics: '33歲，女性',
    age: 33,
    gender: '女性',
    clinical: '無法行走、意識清楚、全身嚴重燒燙傷面積達30%(二度)、橈動脈正常、呼吸：18 / min、微血管充填時間：1秒',
    category: 'yellow',
    explanation: '無法行走；呼吸 18次/分、橈動脈正常、CRT 1秒、意識清楚',
  },
];

// 🟢 綠色・輕傷 (全部 1~40，均無孕婦)
export const RAW_GREEN_CASES: RawCase[] = [
  {
    id: 1,
    demographics: '47歲，男性',
    age: 47,
    gender: '男性',
    clinical: '可行走、意識清楚，面部表情疼痛、右上臂開放性骨折，左手多處擦傷、呼吸：14 /min、微血管充填時間：1秒',
    category: 'green',
    explanation: '可自行行走，屬於優先疏散之輕傷（綠色）',
  },
  {
    id: 2,
    demographics: '70歲，男性',
    age: 70,
    gender: '男性',
    clinical: '可行走、意識清楚，面部表情疼痛、右下腿開放性骨折，雙下肢多處擦傷、呼吸：16 / min、微血管充填時間：1秒',
    category: 'green',
    explanation: '可自行行走至安全集結區',
  },
  {
    id: 3,
    demographics: '60歲，女性',
    age: 60,
    gender: '女性',
    clinical: '可行走、意識清楚，表情疼痛，大聲呼叫、右前臂閉鎖性骨折，四肢多處擦傷、呼吸：16 / min、微血管充填時間：1秒',
    category: 'green',
    explanation: '可自行行走，意識清楚呼叫',
  },
  {
    id: 4,
    demographics: '10歲，男性',
    age: 10,
    gender: '男性',
    clinical: '可行走、活動正常，言語清楚、左前臂腫脹、瘀青，疑閉鎖性骨折、呼吸：16 / min、微血管充填時間：1秒',
    category: 'green',
    explanation: '可行走、活動言語正常',
  },
  {
    id: 5,
    demographics: '50歲，男性',
    age: 50,
    gender: '男性',
    clinical: '可行走、大聲呼救，面部表情疼痛，意識清楚、上肢多處擦傷，顏面1公分撕裂傷、呼吸：16 / min、微血管充填時間：1秒',
    category: 'green',
    explanation: '可自行行走、意識清楚',
  },
  {
    id: 6,
    demographics: '90歲，女性',
    age: 90,
    gender: '女性',
    clinical: '可行走、意識清楚，顏面擦傷、呼吸：14 / min、微血管充填時間：1秒',
    category: 'green',
    explanation: '可自行行走，輕微顏面擦傷',
  },
  {
    id: 7,
    demographics: '60歲，男性',
    age: 60,
    gender: '男性',
    clinical: '可行走、意識清楚，面部表情疼痛、右上臂多處擦傷、橈動脈強、呼吸：14 / min、微血管充填時間：小於1秒',
    category: 'green',
    explanation: '可自行行走，血行動態穩定',
  },
  {
    id: 8,
    demographics: '60歲，女性',
    age: 60,
    gender: '女性',
    clinical: '可行走、意識清楚、雙下肢多處擦傷瘀青、橈動脈強、呼吸：16 / min、微血管充填時間：1秒',
    category: 'green',
    explanation: '可自行行走，表淺擦傷',
  },
  {
    id: 9,
    demographics: '18歲，男性',
    age: 18,
    gender: '男性',
    clinical: '可行走、意識清楚、顏面多處擦傷、橈動脈強、呼吸：14 / min、微血管充填時間：小於1秒',
    category: 'green',
    explanation: '可自行行走，生命徵象良好',
  },
  {
    id: 10,
    demographics: '20歲，男性',
    age: 20,
    gender: '男性',
    clinical: '可行走、意識清楚、顏面1公分表淺性撕裂傷、呼吸：14 / min、微血管充填時間：小於1秒',
    category: 'green',
    explanation: '可自行行走，小撕裂傷',
  },
  {
    id: 11,
    demographics: '60歲，男性',
    age: 60,
    gender: '男性',
    clinical: '可行走、意識清楚，面部表情疼痛、右上臂多處擦傷、橈動脈強、呼吸：14 / min、微血管充填時間：小於1秒',
    category: 'green',
    explanation: '可自行行走',
  },
  {
    id: 12,
    demographics: '18歲，女性',
    age: 18,
    gender: '女性',
    clinical: '可行走、意識清楚，驚慌失惜、身上多處擦傷、呼吸：14 / min、微血管充填時間：小於1秒',
    category: 'green',
    explanation: '可自行行走，驚慌但生命徵象穩定',
  },
  {
    id: 13,
    demographics: '28歲，男性',
    age: 28,
    gender: '男性',
    clinical: '可行走、意識清楚、右前臂2公分撕裂傷、呼吸：16 / min、微血管充填時間：1秒',
    category: 'green',
    explanation: '可自行行走，局限性撕裂傷',
  },
  {
    id: 14,
    demographics: '48歲，女性',
    age: 48,
    gender: '女性',
    clinical: '可行走、表情呆滯、身上多處擦傷、呼吸：24 / min、微血管充填時間：2秒',
    category: 'green',
    explanation: '可自行行走',
  },
  {
    id: 15,
    demographics: '68歲，男性',
    age: 68,
    gender: '男性',
    clinical: '可行走、意識清楚、兩側前臂多處表淺性撕裂傷、橈動脈強、呼吸：14 / min、微血管充填時間：小於1秒',
    category: 'green',
    explanation: '可自行行走，前臂表淺傷',
  },
  {
    id: 16,
    demographics: '80歲，女性',
    age: 80,
    gender: '女性',
    clinical: '可行走、意識清楚，顏面挫傷、身上多處擦傷、呼吸：24 / min、微血管充填時間：2秒',
    category: 'green',
    explanation: '可自行行走',
  },
  {
    id: 17,
    demographics: '38歲，男性',
    age: 38,
    gender: '男性',
    clinical: '可行走、意識清楚、左臉2公分撕裂傷、呼吸：14 / min、微血管充填時間：小於1秒',
    category: 'green',
    explanation: '可自行行走，左臉表淺傷',
  },
  {
    id: 18,
    demographics: '40歲，女性',
    age: 40,
    gender: '女性',
    clinical: '可行走、意識清楚、頭部血腫，兩眼瞳孔正常、呼吸：24 / min、微血管充填時間：2秒',
    category: 'green',
    explanation: '可自行行走，瞳孔等大反應佳',
  },
  {
    id: 19,
    demographics: '18歲，男性',
    age: 18,
    gender: '男性',
    clinical: '可行走、意識清楚、右肩關節脫臼，身上多處擦傷、呼吸：36/ min、微血管充填時間：2秒',
    category: 'green',
    explanation: '可自行行走（雖因疼痛呼吸淺快，START流程首要條件可行走判定綠色）',
  },
  {
    id: 20,
    demographics: '28歲，女性',
    age: 28,
    gender: '女性',
    clinical: '可行走、意識清楚、左踝扭傷，可行走、呼吸：36/ min、微血管充填時間：2秒',
    category: 'green',
    explanation: '可自行行走',
  },
  {
    id: 21,
    demographics: '70歲，男性',
    age: 70,
    gender: '男性',
    clinical: '可行走、意識清楚、左肘關節脫臼，身上多處擦傷、呼吸：24/ min、微血管充填時間：2秒',
    category: 'green',
    explanation: '可自行行走',
  },
  {
    id: 22,
    demographics: '80歲，女性',
    age: 80,
    gender: '女性',
    clinical: '可行走、意識清楚、右上臂3公分撕裂傷、橈動脈強、呼吸：18/ min、微血管充填時間：3秒',
    category: 'green',
    explanation: '可自行行走',
  },
  {
    id: 23,
    demographics: '36歲，男性',
    age: 36,
    gender: '男性',
    clinical: '可行走、意識清楚、右大腿3公分撕裂傷、足背動脈正常、呼吸：24/ min、微血管充填時間：2秒',
    category: 'green',
    explanation: '可自行行走',
  },
  {
    id: 24,
    demographics: '40歲，女性',
    age: 40,
    gender: '女性',
    clinical: '可行走、意識清楚、左下肢1公分撕裂傷、身上多處擦傷、呼吸：24/ min、微血管充填時間：1秒',
    category: 'green',
    explanation: '可自行行走',
  },
  {
    id: 25,
    demographics: '30歲，男性',
    age: 30,
    gender: '男性',
    clinical: '可行走、意識清楚、頭部鈍傷，2公分皮下血腫、瞳孔反射正常、呼吸：14 / min、微血管充填時間：2秒',
    category: 'green',
    explanation: '可自行行走，意識神經反射佳',
  },
  {
    id: 26,
    demographics: '40歲，女性',
    age: 40,
    gender: '女性',
    clinical: '可行走、意識清楚、頭皮4公分撕裂傷，已自行加壓止血、瞳孔反射正常、呼吸：16 / min、微血管充填時間：1秒',
    category: 'green',
    explanation: '可自行行走，已自行加壓止血',
  },
  {
    id: 27,
    demographics: '20歲，男性',
    age: 20,
    gender: '男性',
    clinical: '可行走、意識清楚、右手姆指脫臼疼痛、呼吸：16 / min、微血管充填時間：1秒',
    category: 'green',
    explanation: '可自行行走',
  },
  {
    id: 28,
    demographics: '22歲，女性',
    age: 22,
    gender: '女性',
    clinical: '可行走、意識清楚、左前臂多處擦傷、呼吸正常、呼吸：14 / min、微血管充填時間：2秒',
    category: 'green',
    explanation: '可自行行走，擦傷輕傷',
  },
  {
    id: 29,
    demographics: '40歲，男性',
    age: 40,
    gender: '男性',
    clinical: '可行走、意識清楚、右側鎖骨封閉性骨折、橈動脈強、呼吸：16 / min、微血管充填時間：1秒',
    category: 'green',
    explanation: '可自行行走',
  },
  {
    id: 30,
    demographics: '60歲，女性',
    age: 60,
    gender: '女性',
    clinical: '可行走、意識清楚，受驚嚇狀、四肢多處擦傷、呼吸：36/ min、微血管充填時間：1秒',
    category: 'green',
    explanation: '可自行行走',
  },
  {
    id: 31,
    demographics: '48歲，女性',
    age: 48,
    gender: '女性',
    clinical: '可行走、表情呆滯、顏面1公分撕裂傷、呼吸正常、呼吸：16 / min、微血管充填時間：1秒',
    category: 'green',
    explanation: '可自行行走',
  },
  {
    id: 32,
    demographics: '58歲，男性',
    age: 58,
    gender: '男性',
    clinical: '可行走、意識清楚、上唇撕裂傷，牙齒斷落、呼吸正常、呼吸：24/ min、微血管充填時間：3秒',
    category: 'green',
    explanation: '可自行行走',
  },
  {
    id: 33,
    demographics: '90歲，女性',
    age: 90,
    gender: '女性',
    clinical: '可行走、意識清楚、右耳聽力受損，身上多處擦傷、呼吸正常、呼吸：24/ min、微血管充填時間：3秒',
    category: 'green',
    explanation: '可自行行走',
  },
  {
    id: 34,
    demographics: '1歲，男性',
    age: 1,
    gender: '男性',
    clinical: '可行走、反應正常，膚色正常，哭鬧不休、身上多處擦傷、呼吸：16 / min、微血管充填時間：1秒',
    category: 'green',
    explanation: '幼兒可行走活動、哭鬧有反應',
  },
  {
    id: 35,
    demographics: '5歲，女性',
    age: 5,
    gender: '女性',
    clinical: '可行走、反應正常，膚色正常、顏面1公分撕裂傷、呼吸：24/ min、微血管充填時間：2秒',
    category: 'green',
    explanation: '可行走、反應正常',
  },
  {
    id: 36,
    demographics: '10歲，男性',
    age: 10,
    gender: '男性',
    clinical: '可行走、反應正常、右手臂2%燙傷(二度)、呼吸：16 / min、微血管充填時間：1秒',
    category: 'green',
    explanation: '可行走、小面積燙傷',
  },
  {
    id: 37,
    demographics: '12歲，女性',
    age: 12,
    gender: '女性',
    clinical: '可行走、意識清楚，膚色正常、雙下肢熱水燙傷，面積4%、呼吸：24/ min、微血管充填時間：2秒',
    category: 'green',
    explanation: '可行走、小面積熱水燙傷',
  },
  {
    id: 38,
    demographics: '14歲，男性',
    age: 14,
    gender: '男性',
    clinical: '可行走、意識清楚、右下肢5%二度灼傷、呼吸正常、呼吸：16 / min、微血管充填時間：1秒',
    category: 'green',
    explanation: '可行走、灼傷局限',
  },
  {
    id: 39,
    demographics: '21歲，男性',
    age: 21,
    gender: '男性',
    clinical: '可行走、意識清楚、前胸多處擦傷、右下肢2公分表淺性撕裂傷、呼吸：24/ min、微血管充填時間：2秒',
    category: 'green',
    explanation: '可自行行走',
  },
  {
    id: 40,
    demographics: '44歲，女性',
    age: 44,
    gender: '女性',
    clinical: '可行走、意識清楚、右手骨折，身上多處擦傷、呼吸正常、呼吸：24/ min、微血管充填時間：3秒',
    category: 'green',
    explanation: '可自行行走',
  },
];

// ⚫ 黑色・死亡 (全部 1~40，均無孕婦)
export const RAW_BLACK_CASES: RawCase[] = [
  {
    id: 1,
    demographics: '47歲，男性',
    age: 47,
    gender: '男性',
    clinical: '無法行走、無意識、外觀無傷痕或骨折、無脈搏、無呼吸',
    category: 'black',
    explanation: '暢通呼吸道後仍無自主呼吸、無心跳脈搏',
  },
  {
    id: 2,
    demographics: '70歲，男性',
    age: 70,
    gender: '男性',
    clinical: '無法行走、無意識、明顯多處開放性骨折、無呼吸、微血管充填時間：1秒',
    category: 'black',
    explanation: '暢通呼吸道後無自主呼吸',
  },
  {
    id: 3,
    demographics: '60歲，女性',
    age: 60,
    gender: '女性',
    clinical: '無法行走、內臟脫出、意識喪失、無脈搏、無呼吸',
    category: 'black',
    explanation: '嚴重致命創傷，無自主呼吸及脈搏',
  },
  {
    id: 4,
    demographics: '10歲，男性',
    age: 10,
    gender: '男性',
    clinical: '無法行走、嚴重頭部外傷、無呼吸、無脈搏',
    category: 'black',
    explanation: '無呼吸、無脈搏，明顯死亡',
  },
  {
    id: 5,
    demographics: '50歲，男性',
    age: 50,
    gender: '男性',
    clinical: '無法行走、頭部嚴重鈍傷，腦漿外溢、無呼吸、無心跳',
    category: 'black',
    explanation: '腦組織外溢，明顯致命傷無呼吸心跳',
  },
  {
    id: 6,
    demographics: '90歲，女性',
    age: 90,
    gender: '女性',
    clinical: '無法行走、意識喪失，四肢發紺、無心跳、無呼吸',
    category: 'black',
    explanation: '呼吸停止、無心跳',
  },
  {
    id: 7,
    demographics: '6歲，男性',
    age: 6,
    gender: '男性',
    clinical: '無法行走、呼吸停止、無脈搏、無意識、全身多處擦傷',
    category: 'black',
    explanation: '呼吸停止、無脈搏',
  },
  {
    id: 8,
    demographics: '60歲，女性',
    age: 60,
    gender: '女性',
    clinical: '無法行走、意識喪失、無呼吸、微血管充填時間：1秒',
    category: 'black',
    explanation: '暢通呼吸道後仍無呼吸',
  },
  {
    id: 9,
    demographics: '18歲，男性',
    age: 18,
    gender: '男性',
    clinical: '無法行走、意識喪失、高處墜樓，臉色發紫、無心跳、無脈搏',
    category: 'black',
    explanation: '高墜無生命徵象，無呼吸心跳',
  },
  {
    id: 10,
    demographics: '20歲，男性',
    age: 20,
    gender: '男性',
    clinical: '無法行走、意識喪失、四肢軀幹分離、無心跳、無脈搏',
    category: 'black',
    explanation: '軀幹分離，明顯死亡',
  },
  {
    id: 11,
    demographics: '60歲，男性',
    age: 60,
    gender: '男性',
    clinical: '無法行走、意識喪失、極度低體溫、明顯胸部內臟脫出、無心跳、無脈搏',
    category: 'black',
    explanation: '內臟脫出，無生命徵象',
  },
  {
    id: 12,
    demographics: '18歲，女性',
    age: 18,
    gender: '女性',
    clinical: '無法行走、無意識、有體溫，全身多處明顯骨折、瞳孔放大、呼吸：0/ min、微血管充填時間：5秒',
    category: 'black',
    explanation: '呼吸：0次/分，暢通呼吸道後無呼吸',
  },
  {
    id: 13,
    demographics: '28歲，男性',
    age: 28,
    gender: '男性',
    clinical: '無法行走、意識喪失、無呼吸、無心跳、無脈搏',
    category: 'black',
    explanation: '無呼吸心跳',
  },
  {
    id: 14,
    demographics: '48歲，女性',
    age: 48,
    gender: '女性',
    clinical: '無法行走、頭部嚴重壓碎、意識喪失、身上多處擦傷、無呼吸、無脈搏',
    category: 'black',
    explanation: '頭部嚴重壓碎，無呼吸脈搏',
  },
  {
    id: 15,
    demographics: '68歲，男性',
    age: 68,
    gender: '男性',
    clinical: '無法行走、無意識、臉色發紫、胸部重物壓碎、無呼吸、無脈搏',
    category: 'black',
    explanation: '重物壓碎無呼吸脈搏',
  },
  {
    id: 16,
    demographics: '80歲，女性',
    age: 80,
    gender: '女性',
    clinical: '無法行走、無意識、極度低體溫、腹部內臟外露、雙下肢開放性骨折、無呼吸、無脈搏',
    category: 'black',
    explanation: '無呼吸、無脈搏',
  },
  {
    id: 17,
    demographics: '38歲，男性',
    age: 38,
    gender: '男性',
    clinical: '無法行走、無意識、頭部與軀幹分離、無呼吸、無心跳',
    category: 'black',
    explanation: '頭部與身軀分離，明顯死亡',
  },
  {
    id: 18,
    demographics: '40歲，女性',
    age: 40,
    gender: '女性',
    clinical: '無法行走、無意識、嚴重腹部壓碎傷、無呼吸、無心跳',
    category: 'black',
    explanation: '腹部壓碎無呼吸心跳',
  },
  {
    id: 19,
    demographics: '18歲，男性',
    age: 18,
    gender: '男性',
    clinical: '無法行走、高處墜落、明顯多處骨折、無意識、無呼吸、無心跳',
    category: 'black',
    explanation: '高墜無生命徵象',
  },
  {
    id: 20,
    demographics: '28歲，女性',
    age: 28,
    gender: '女性',
    clinical: '無法行走、高處墜落、四肢軀幹扭曲、意識喪失、呼吸：0/ min、微血管充填時間：5秒',
    category: 'black',
    explanation: '呼吸 0次/分',
  },
  {
    id: 21,
    demographics: '70歲，男性',
    age: 70,
    gender: '男性',
    clinical: '無法行走、意識喪失、全身嚴重燒灼、無呼吸、呼吸：0/ min、微血管充填時間：5秒',
    category: 'black',
    explanation: '嚴重燒灼無呼吸',
  },
  {
    id: 22,
    demographics: '80歲，女性',
    age: 80,
    gender: '女性',
    clinical: '無法行走、意識喪失、無呼吸、無心跳',
    category: 'black',
    explanation: '無自主呼吸心跳',
  },
  {
    id: 23,
    demographics: '36歲，男性',
    age: 36,
    gender: '男性',
    clinical: '無法行走、意識喪失、全身性多處骨折、頸部彎曲、無呼吸、無心跳',
    category: 'black',
    explanation: '頸椎折斷無生命徵象',
  },
  {
    id: 24,
    demographics: '40歲，女性',
    age: 40,
    gender: '女性',
    clinical: '無法行走、意識喪失、全身冰冷，嘴唇發紫、無呼吸、無心跳',
    category: 'black',
    explanation: '全身冰冷無呼吸心跳',
  },
  {
    id: 25,
    demographics: '30歲，男性',
    age: 30,
    gender: '男性',
    clinical: '無法行走、無意識、頭骨破裂、瞳孔放大、無脈搏、無呼吸',
    category: 'black',
    explanation: '頭骨破裂無呼吸脈搏',
  },
  {
    id: 26,
    demographics: '40歲，女性',
    age: 40,
    gender: '女性',
    clinical: '無法行走、無意識、嚴重腹部及骨盆腔壓碎傷、無呼吸、微血管充填時間：5秒',
    category: 'black',
    explanation: '骨盆壓碎無呼吸',
  },
  {
    id: 27,
    demographics: '20歲，男性',
    age: 20,
    gender: '男性',
    clinical: '無法行走、高處墜樓、四肢骨折、無意識、無呼吸、無心跳',
    category: 'black',
    explanation: '高墜無生命徵象',
  },
  {
    id: 28,
    demographics: '22歲，女性',
    age: 22,
    gender: '女性',
    clinical: '無法行走、意識喪失、臉色發黑、胸部重物壓傷、無脈搏、無呼吸',
    category: 'black',
    explanation: '窒息重壓無呼吸脈搏',
  },
  {
    id: 29,
    demographics: '40歲，男性',
    age: 40,
    gender: '男性',
    clinical: '無法行走、軀幹扭曲、低體溫、無心跳、無呼吸',
    category: 'black',
    explanation: '軀幹嚴重扭曲變形無呼吸',
  },
  {
    id: 30,
    demographics: '60歲，女性',
    age: 60,
    gender: '女性',
    clinical: '無法行走、意識喪失、四肢嚴重壓碎傷、無呼吸、無心跳',
    category: 'black',
    explanation: '四肢壓碎無呼吸心跳',
  },
  {
    id: 31,
    demographics: '48歲，女性',
    age: 48,
    gender: '女性',
    clinical: '無法行走、顏面嚴重燒灼傷、無意識、呼吸停止、無心跳',
    category: 'black',
    explanation: '呼吸停止、無心跳',
  },
  {
    id: 32,
    demographics: '58歲，男性',
    age: 58,
    gender: '男性',
    clinical: '無法行走、無意識、嚴重燒灼傷、臉色發紫、無呼吸、無心跳',
    category: 'black',
    explanation: '嚴重燒灼無呼吸心跳',
  },
  {
    id: 33,
    demographics: '90歲，女性',
    age: 90,
    gender: '女性',
    clinical: '無法行走、胸腹嚴重壓碎傷、無意識、無心跳、無呼吸',
    category: 'black',
    explanation: '胸腹壓碎無呼吸心跳',
  },
  {
    id: 34,
    demographics: '1歲，男性',
    age: 1,
    gender: '男性',
    clinical: '無法行走、臉色發紫、腹部腫脹、多處瘀傷、無呼吸、無心跳',
    category: 'black',
    explanation: '幼兒無呼吸、無心跳',
  },
  {
    id: 35,
    demographics: '11歲，男性',
    age: 11,
    gender: '男性',
    clinical: '無法行走、頭部嚴重鈍傷、瞳孔放大、無呼吸、無心跳',
    category: 'black',
    explanation: '頭部重傷瞳孔放大無呼吸心跳',
  },
  {
    id: 36,
    demographics: '18歲，女性',
    age: 18,
    gender: '女性',
    clinical: '無法行走、高處墜樓、胸腹嚴重鈍傷、下肢骨折、無呼吸、無心跳',
    category: 'black',
    explanation: '墜樓無呼吸無心跳',
  },
  {
    id: 37,
    demographics: '10歲，男性',
    age: 10,
    gender: '男性',
    clinical: '無法行走、腹部鈍傷、四肢冰冷、無呼吸、無心跳',
    category: 'black',
    explanation: '四肢冰冷無呼吸心跳',
  },
  {
    id: 38,
    demographics: '8歲，女性',
    age: 8,
    gender: '女性',
    clinical: '無法行走、胸部鈍傷，臉色發紫、無呼吸、無心跳',
    category: 'black',
    explanation: '缺氧發紺無呼吸心跳',
  },
  {
    id: 39,
    demographics: '30歲，男性',
    age: 30,
    gender: '男性',
    clinical: '無法行走、胸部嚴重穿通傷、呼吸停止、無呼吸、無脈搏',
    category: 'black',
    explanation: '胸部穿刺呼吸停止無脈搏',
  },
  {
    id: 40,
    demographics: '30歲，男性',
    age: 30,
    gender: '男性',
    clinical: '無法行走、胸部嚴重穿通傷、呼吸停止、無脈搏',
    category: 'black',
    explanation: '胸部穿通傷呼吸停止無脈搏',
  },
];

/**
 * Format raw clinical description string into structured bullet list
 * matching the user's reference image visual layout:
 * ▸ 無法自行行走
 * ▸ 有自主呼吸，呼吸速率 13 次/分
 * ▸ 橈動脈搏動：可觸及
 * ▸ 微血管充填時間：2.4 秒
 */
export function formatCaseBullets(rawClinical: string, category: TriageCategory): string[] {
  const bullets: string[] = [];
  const parts = rawClinical.split(/[、，,]/).map((s) => s.trim()).filter(Boolean);

  // 1. 行走能力
  if (category === 'green' || rawClinical.includes('可行走') || rawClinical.includes('可自行行走')) {
    bullets.push('可自行行走');
  } else {
    bullets.push('無法自行行走');
  }

  // 2. 呼吸評估
  const respMatch = rawClinical.match(/呼吸[:：]?\s*(\d+)\s*\/\s*min/i);
  const noResp = rawClinical.includes('無呼吸') || rawClinical.includes('呼吸停止') || (respMatch && parseInt(respMatch[1], 10) === 0);

  if (noResp) {
    bullets.push('呼吸狀態：暢通呼吸道後仍無自主呼吸');
  } else if (respMatch) {
    const rate = parseInt(respMatch[1], 10);
    const depth = rawClinical.includes('呼吸淺慢')
      ? '呼吸淺慢'
      : rawClinical.includes('呼吸淺快')
      ? '呼吸淺快'
      : rawClinical.includes('呼吸急促')
      ? '呼吸急促'
      : rawClinical.includes('呼吸急深')
      ? '呼吸急深'
      : rawClinical.includes('呼吸微弱')
      ? '呼吸微弱'
      : rawClinical.includes('呼吸費力')
      ? '呼吸費力'
      : '自主呼吸';
    bullets.push(`${depth}，呼吸速率 ${rate} 次/分`);
  } else if (rawClinical.includes('呼吸正常')) {
    bullets.push('有自主呼吸，呼吸正常平穩 (約 16 次/分)');
  } else {
    bullets.push('有自主呼吸，頻率規則');
  }

  // 3. 循環 / 脈搏評估
  let pulseText = '';
  if (rawClinical.includes('無脈搏') || rawClinical.includes('無心跳')) {
    pulseText = '脈搏博動：無脈搏 / 無心跳';
  } else if (rawClinical.includes('橈動脈微弱')) {
    pulseText = '橈動脈搏動：微弱';
  } else if (rawClinical.includes('橈動脈強') || rawClinical.includes('橈動脈正常')) {
    pulseText = '橈動脈搏動：正常有力、可觸及';
  } else if (rawClinical.includes('肱動脈微弱')) {
    pulseText = '肱動脈搏動：微弱';
  } else if (rawClinical.includes('肱動脈正常')) {
    pulseText = '肱動脈搏動：正常可觸及';
  } else if (rawClinical.includes('足背動脈正常')) {
    pulseText = '足背動脈搏動：正常可觸及';
  } else if (rawClinical.includes('頸動脈微弱')) {
    pulseText = '頸動脈搏動：微弱';
  } else if (category === 'red') {
    pulseText = '橈動脈搏動：微弱或無法觸及';
  } else if (category === 'black') {
    pulseText = '動脈搏動：無法觸及';
  } else {
    pulseText = '橈動脈搏動：正常可觸及';
  }
  bullets.push(pulseText);

  // 4. 微血管充填時間 (CRT)
  const crtMatch = rawClinical.match(/微血管充填時間[:：]?\s*([小大於0-9.]+秒?)/);
  if (crtMatch) {
    const rawVal = crtMatch[1].replace('秒', '');
    bullets.push(`微血管充填時間：${rawVal} 秒`);
  } else if (rawClinical.includes('微血管充填時間：小於1秒')) {
    bullets.push('微血管充填時間：< 1 秒');
  } else if (category === 'red' && rawClinical.includes('橈動脈微弱')) {
    bullets.push('微血管充填時間：≥ 2.5 秒 (周邊灌流差)');
  } else if (category === 'black') {
    bullets.push('微血管充填時間：無灌流 / > 5 秒');
  } else {
    bullets.push('微血管充填時間：< 2 秒 (微血管回充迅速)');
  }

  // 5. 意識與反應
  let neuro = '';
  if (rawClinical.includes('無意識') || rawClinical.includes('意識喪失') || rawClinical.includes('意識不清')) {
    neuro = '意識狀態：無意識 / 昏迷';
  } else if (rawClinical.includes('意識模糊') || rawClinical.includes('反應模糊')) {
    neuro = '意識狀態：意識模糊，無法遵從指令';
  } else if (rawClinical.includes('反應遲鈍') || rawClinical.includes('活動力差') || rawClinical.includes('表情呆滯')) {
    neuro = '意識狀態：反應遲鈍，活動力差';
  } else if (rawClinical.includes('意識清楚') || rawClinical.includes('言語清楚')) {
    neuro = '意識狀態：意識清楚，能遵從簡單指令';
  }
  if (neuro) {
    bullets.push(neuro);
  }

  // 6. 具體傷勢徵候
  const injuryClues = parts.filter((p) => {
    return (
      !p.includes('行走') &&
      !p.includes('呼吸') &&
      !p.includes('動脈') &&
      !p.includes('心跳') &&
      !p.includes('微血管') &&
      !p.includes('意識') &&
      !p.includes('反應')
    );
  });
  if (injuryClues.length > 0) {
    bullets.push(`外觀傷勢：${injuryClues.join('、')}`);
  }

  return bullets;
}

/**
 * Procedural Dynamic Case Generator for unlimited varied cases
 * strictly excluding any pregnancy mentions.
 */
export function generateProceduralCase(
  index: number,
  category: TriageCategory
): TriageCard {
  const genders: ('男性' | '女性')[] = ['男性', '女性'];
  const gender = genders[Math.floor(Math.random() * genders.length)];
  const ages = [
    5, 8, 12, 17, 21, 25, 29, 34, 38, 42, 46, 51, 55, 62, 68, 73, 81
  ];
  const age = ages[Math.floor(Math.random() * ages.length)];
  const demographics = `${age}歲，${gender}`;

  let bullets: string[] = [];
  let explanation = '';
  let primaryInjury = '';

  if (category === 'black') {
    bullets = [
      '無法自行行走',
      '呼吸狀態：經暢通呼吸道處置後仍無自主呼吸',
      '動脈搏動：橈動脈/頸動脈均無搏動',
      '微血管充填時間：無周邊血液灌流 (> 5秒)',
      '意識狀態：無意識、對疼痛刺激無反應',
      '外觀徵候：瞳孔放大固定、四肢冰冷或有致命創傷',
    ];
    explanation = '暢通呼吸道後仍無自主呼吸，無脈搏心跳，判定黑色（死亡）';
    primaryInjury = '創傷後無自主呼吸與脈搏';
  } else if (category === 'red') {
    const redReasons = [
      {
        r: '呼吸過速 (>30次/分)',
        lines: [
          '無法自行行走',
          `有自主呼吸，呼吸淺快，呼吸速率 ${32 + Math.floor(Math.random() * 8)} 次/分`,
          '橈動脈搏動：微弱',
          `微血管充填時間：${(2.2 + Math.random() * 1.5).toFixed(1)} 秒`,
          '意識狀態：焦躁不安、冒冷汗',
          '外觀傷勢：胸壁挫傷血腫、多處深部撕裂傷',
        ],
        exp: '呼吸頻率大於30次/分，微血管充填時間大於2秒，判定紅色（立即處置）',
      },
      {
        r: '微血管充填延遲 (CRT ≥ 2秒) / 無法觸及橈動脈',
        lines: [
          '無法自行行走',
          '有自主呼吸，呼吸速率 26 次/分',
          '橈動脈搏動：無法觸及 (肱動脈微弱)',
          `微血管充填時間：${(3.0 + Math.random() * 1.5).toFixed(1)} 秒`,
          '意識狀態：意識模糊、皮膚蒼白濕冷',
          '外觀傷勢：骨盆骨折併骨盆腔內大出血疑慮',
        ],
        exp: '無法觸及橈動脈且微血管充填時間超過2秒，休克危象，判定紅色',
      },
      {
        r: '意識不清 / 無法遵從簡單指令',
        lines: [
          '無法自行行走',
          '有自主呼吸，呼吸速率 22 次/分',
          '橈動脈搏動：可觸及微弱',
          '微血管充填時間：1.8 秒',
          '意識狀態：意識混亂、嗜睡，無法遵從簡單口令',
          '外觀傷勢：頭部鈍傷併大片血腫、耳鼻無滲出液',
        ],
        exp: '無法遵從簡單口頭指令，中樞神經系統危急，判定紅色',
      },
    ];
    const picked = redReasons[Math.floor(Math.random() * redReasons.length)];
    bullets = picked.lines;
    explanation = picked.exp;
    primaryInjury = '嚴重休克徵候或呼吸神經功能受損';
  } else if (category === 'yellow') {
    const yellowInjuries = [
      '右下肢開放性骨折併中度出血、左膝擦傷',
      '全身多處深二度燒燙傷 (約 18%)',
      '疑似骨盆閉鎖性骨折、下腹壓痛、脊椎局部固定',
      '左大腿深部撕裂傷 (加壓包紮中)、右側多處挫傷',
      '嚴重腰椎挫傷、雙側下肢無力但感覺正常',
    ];
    const injury = yellowInjuries[Math.floor(Math.random() * yellowInjuries.length)];
    const rate = 16 + Math.floor(Math.random() * 10); // 16~25
    bullets = [
      '無法自行行走 (需搬運協助)',
      `有自主呼吸，呼吸平穩，速率 ${rate} 次/分`,
      '橈動脈搏動：可觸及、強弱正常',
      '微血管充填時間：1.2 秒 (< 2秒)',
      '意識狀態：意識清楚，能遵從口頭指令',
      `外觀傷勢：${injury}`,
    ];
    explanation = '無法自行行走，但呼吸、循環、意識三大生命徵象均穩定，判定黃色（延遲處理）';
    primaryInjury = injury;
  } else {
    // Green
    const greenInjuries = [
      '右上臂輕度擦挫傷、顏面 1 公分表淺撕裂傷',
      '右手指閉鎖性扭傷、前臂多處擦傷',
      '頭皮 2 公分表淺性撕裂傷 (已壓迫止血)',
      '雙膝擦傷、手腕輕微扭傷、面部擦傷',
      '右肩軟組織挫傷、肢體多處表淺擦破皮',
    ];
    const injury = greenInjuries[Math.floor(Math.random() * greenInjuries.length)];
    const rate = 14 + Math.floor(Math.random() * 8); // 14~21
    bullets = [
      '可自行行走 (可步行至安全集結區)',
      `有自主呼吸，速率 ${rate} 次/分`,
      '橈動脈搏動：強而有力、可觸及',
      '微血管充填時間：小於 1 秒',
      '意識狀態：意識清楚、言語正常',
      `外觀傷勢：${injury}`,
    ];
    explanation = '第一時間可依口令自行行走離場，判定綠色（輕傷）';
    primaryInjury = injury;
  }

  return {
    id: `procedural-${category}-${index}`,
    serialNumber: index,
    category,
    demographics,
    age,
    gender,
    bullets,
    primaryInjury,
    explanation,
    isCustom: true,
  };
}

/**
 * Build the base question pool without any pregnant cases
 */
export function getSanitizedQuestionPool(): {
  red: RawCase[];
  yellow: RawCase[];
  green: RawCase[];
  black: RawCase[];
} {
  const filterOutPregnant = (cases: RawCase[]) =>
    cases.filter((c) => !c.demographics.includes('孕婦') && !c.clinical.includes('孕婦') && !c.clinical.includes('懷孕'));

  return {
    red: filterOutPregnant(RAW_RED_CASES),
    yellow: filterOutPregnant(RAW_YELLOW_CASES),
    green: filterOutPregnant(RAW_GREEN_CASES),
    black: filterOutPregnant(RAW_BLACK_CASES),
  };
}

/**
 * Generate a complete set of TriageCards matching the user's requested counts.
 */
export function generateTriageDeck(
  counts: { red: number; yellow: number; green: number; black: number },
  seed: number = Date.now()
): TriageCard[] {
  const pool = getSanitizedQuestionPool();
  const deck: TriageCard[] = [];

  // Fisher-Yates shuffle with simple seeded PRNG
  let prng = seed;
  const nextRandom = () => {
    prng = (prng * 9301 + 49297) % 233280;
    return prng / 233280;
  };

  const shuffle = <T>(arr: T[]): T[] => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(nextRandom() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const categories: TriageCategory[] = ['red', 'yellow', 'green', 'black'];

  const categoryLists: Record<TriageCategory, TriageCard[]> = {
    red: [],
    yellow: [],
    green: [],
    black: [],
  };

  categories.forEach((cat) => {
    const needed = counts[cat];
    const available = shuffle(pool[cat]);
    const items: TriageCard[] = [];

    for (let i = 0; i < needed; i++) {
      if (i < available.length) {
        const raw = available[i];
        items.push({
          id: `${cat}-${raw.id}-${i}`,
          serialNumber: 0,
          category: cat,
          demographics: raw.demographics,
          age: raw.age,
          gender: raw.gender,
          bullets: formatCaseBullets(raw.clinical, cat),
          explanation: raw.explanation,
        });
      } else {
        // More than available bank items, dynamically generate realistic case!
        const gen = generateProceduralCase(i + 1, cat);
        items.push(gen);
      }
    }
    categoryLists[cat] = items;
  });

  // Interleave or keep user preference: let's shuffle the full deck so drill cards are mixed
  const allCards = shuffle([
    ...categoryLists.red,
    ...categoryLists.yellow,
    ...categoryLists.green,
    ...categoryLists.black,
  ]);

  // Assign sequential 1-based serial numbers
  return allCards.map((card, idx) => ({
    ...card,
    serialNumber: idx + 1,
  }));
}
