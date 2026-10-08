// Generates the 100% self-contained offline HTML string for START Triage Generator
export function getStandaloneHtmlString(): string {
  return `<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>START 現場檢傷傷情卡產生器 (單機離線版 · A4六人縱向列印)</title>
  <style>
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif;
      background-color: #f5f5f4;
      color: #1c1917;
      line-height: 1.5;
    }
    header {
      background-color: #1c1917;
      color: #f5f5f4;
      padding: 12px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .brand-icon {
      width: 36px;
      height: 36px;
      background-color: rgba(245, 158, 11, 0.2);
      border: 1px solid rgba(245, 158, 11, 0.5);
      color: #f59e0b;
      font-weight: bold;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
    }
    .brand-title {
      font-size: 18px;
      font-weight: bold;
      color: #fff;
    }
    .brand-sub {
      font-size: 12px;
      color: #a8a29e;
    }
    .main-container {
      display: flex;
      gap: 24px;
      max-width: 1400px;
      margin: 20px auto;
      padding: 0 20px;
    }
    .sidebar {
      width: 360px;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .panel {
      background: #fff;
      border: 1px solid #e7e5e4;
      border-radius: 12px;
      padding: 18px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    .panel-title {
      font-size: 13px;
      font-weight: bold;
      text-transform: uppercase;
      color: #78716c;
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .preset-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .btn-preset {
      background: #fff;
      border: 1px solid #d6d3d1;
      padding: 8px 10px;
      border-radius: 8px;
      text-align: left;
      cursor: pointer;
      font-size: 12px;
      transition: all 0.15s;
    }
    .btn-preset:hover {
      border-color: #d97706;
      background-color: #fffbeb;
    }
    .btn-preset-name {
      font-weight: bold;
      color: #292524;
    }
    .btn-preset-desc {
      font-size: 11px;
      color: #78716c;
      margin-top: 2px;
    }
    .count-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 12px;
      border-radius: 8px;
      margin-bottom: 8px;
      border: 1px solid transparent;
    }
    .row-red { background: #fef2f2; border-color: #fee2e2; }
    .row-yellow { background: #fffbeb; border-color: #fef3c7; }
    .row-green { background: #ecfdf5; border-color: #d1fae5; }
    .row-black { background: #f5f5f4; border-color: #e7e5e4; }
    .cat-label {
      font-size: 13px;
      font-weight: bold;
    }
    .cat-desc {
      font-size: 11px;
      color: #78716c;
    }
    .cat-ctrls {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .btn-step {
      width: 28px;
      height: 28px;
      border: 1px solid #d6d3d1;
      background: #fff;
      border-radius: 4px;
      font-weight: bold;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .input-count {
      width: 48px;
      text-align: center;
      font-weight: bold;
      font-size: 14px;
      border: 1px solid #d6d3d1;
      border-radius: 4px;
      padding: 4px;
    }
    .summary-box {
      background: #fafaf9;
      border: 1px solid #e7e5e4;
      border-radius: 8px;
      padding: 12px;
      margin-top: 12px;
      font-size: 12px;
    }
    .summary-line {
      display: flex;
      justify-content: space-between;
      margin-bottom: 4px;
    }
    .summary-total {
      font-size: 18px;
      font-weight: 800;
      color: #1c1917;
    }
    .toggle-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 0;
      font-size: 13px;
      border-bottom: 1px solid #f5f5f4;
      cursor: pointer;
    }
    .toggle-sub {
      font-size: 11px;
      color: #a8a29e;
    }
    .btn {
      padding: 8px 16px;
      font-size: 13px;
      font-weight: bold;
      border-radius: 8px;
      cursor: pointer;
      border: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s;
    }
    .btn-primary {
      background: #dc2626;
      color: #fff;
    }
    .btn-primary:hover {
      background: #b91c1c;
    }
    .btn-dark {
      background: #292524;
      color: #fff;
      border: 1px solid #44403c;
    }
    .btn-dark:hover {
      background: #44403c;
    }
    .preview-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .preview-bar {
      width: 100%;
      background: #fff;
      border: 1px solid #e7e5e4;
      border-radius: 12px;
      padding: 10px 16px;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
    }
    .print-page-sheet {
      width: 194mm;
      height: 280mm;
      max-height: 280mm;
      background: #ffffff;
      box-shadow: 0 4px 16px rgba(0,0,0,0.12);
      border: 1px solid #e7e5e4;
      margin-bottom: 24px;
      padding: 3mm;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
    }
    .sheet-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      color: #78716c;
      padding-bottom: 4px;
      margin-bottom: 4px;
      border-bottom: 1px solid #e7e5e4;
    }
    .sheet-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(3, 1fr);
      gap: 10px;
      flex: 1;
      height: calc(100% - 32px);
      position: relative;
    }
    .sheet-footer {
      font-size: 10px;
      color: #a8a29e;
      padding-top: 4px;
      margin-top: 4px;
      border-top: 1px solid #e7e5e4;
      display: flex;
      justify-content: space-between;
    }
    .triage-card {
      background-color: #f6f3e9;
      border: 1px solid #ded8c7;
      border-radius: 8px;
      padding: 12px 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.15s;
    }
    .triage-card:hover {
      box-shadow: 0 3px 8px rgba(0,0,0,0.08);
      border-color: #f59e0b;
    }
    .card-top {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }
    .card-title {
      font-size: 20px;
      font-weight: 800;
      color: #1c1917;
      letter-spacing: 0.5px;
      text-align: center;
    }
    .card-badge {
      font-size: 11px;
      font-weight: bold;
      padding: 2px 8px;
      border-radius: 4px;
      color: #fff;
    }
    .badge-red { background-color: #dc2626; }
    .badge-yellow { background-color: #f59e0b; }
    .badge-green { background-color: #059669; }
    .badge-black { background-color: #292524; }
    .card-divider {
      width: 100%;
      border-bottom: 2px dashed #cbbfab;
      margin: 8px 0;
    }
    .card-bullets {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 6px;
      text-align: center;
    }
    .bullet-item {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16.5px;
      line-height: 1.35;
      font-weight: 600;
      color: #1c1917;
      text-align: center;
    }
    .bullet-arrow {
      color: #8e8571;
      font-weight: bold;
      margin-right: 6px;
      font-size: 15px;
      user-select: none;
      flex-shrink: 0;
    }
    .card-footer {
      border-top: 1px dashed rgba(222, 216, 199, 0.8);
      margin-top: 8px;
      padding-top: 6px;
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      color: #78716c;
      font-family: monospace;
    }
    .cut-line-v {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      border-right: 1px dashed rgba(168, 162, 158, 0.6);
      pointer-events: none;
    }
    .cut-line-h1 {
      position: absolute;
      left: 0;
      right: 0;
      top: 33.33%;
      border-bottom: 1px dashed rgba(168, 162, 158, 0.6);
      pointer-events: none;
    }
    .cut-line-h2 {
      position: absolute;
      left: 0;
      right: 0;
      top: 66.66%;
      border-bottom: 1px dashed rgba(168, 162, 158, 0.6);
      pointer-events: none;
    }
    .empty-card {
      border: 2px dashed #e7e5e4;
      border-radius: 8px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #d6d3d1;
      font-size: 12px;
      background: #fafaf9;
    }
    .answer-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
      margin-top: 12px;
    }
    .answer-table th, .answer-table td {
      border-bottom: 1px solid #e7e5e4;
      padding: 8px;
      text-align: left;
    }
    .answer-table th {
      background: #f5f5f4;
      font-weight: bold;
      color: #44403c;
    }
    @media print {
      @page {
        size: A4 portrait;
        margin: 8mm;
      }
      body {
        background: #fff !important;
        color: #000 !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      header, .sidebar, .preview-bar, .no-print {
        display: none !important;
      }
      .main-container {
        margin: 0 !important;
        padding: 0 !important;
        max-width: 100% !important;
      }
      .preview-container {
        width: 100% !important;
      }
      .print-page-sheet {
        box-shadow: none !important;
        border: none !important;
        margin: 0 !important;
        page-break-after: always !important;
        break-after: page !important;
        height: 281mm !important;
        max-height: 281mm !important;
      }
      .print-page-sheet:last-of-type {
        page-break-after: avoid !important;
        break-after: avoid !important;
      }
    }
  </style>
</head>
<body>
  <header class="no-print">
    <div class="brand">
      <div class="brand-icon">S</div>
      <div>
        <div class="brand-title">START 現場檢傷傷情卡產生器 (單機離線版)</div>
        <div class="brand-sub">已排除孕婦情境 · A4 縱向六人傷卡 · 雙面演練裁切標準版</div>
      </div>
    </div>
    <div style="display: flex; gap: 10px; align-items: center;">
      <button class="btn btn-dark" onclick="shuffleDeck()">🎲 重新洗牌</button>
      <button class="btn btn-primary" onclick="window.print()">🖨️ A4 列印 / 另存 PDF</button>
    </div>
  </header>
  <div class="main-container">
    <aside class="sidebar no-print">
      <div class="panel">
        <div class="panel-title">快速演練組合</div>
        <div class="preset-grid">
          <div class="btn-preset" onclick="setPreset(2,2,2,0)">
            <div class="btn-preset-name">6人單頁組 (1頁)</div>
            <div class="btn-preset-desc">2紅 · 2黃 · 2綠</div>
          </div>
          <div class="btn-preset" onclick="setPreset(3,4,4,1)">
            <div class="btn-preset-name">12人標準組 (2頁)</div>
            <div class="btn-preset-desc">3紅 · 4黃 · 4綠 · 1黑</div>
          </div>
          <div class="btn-preset" onclick="setPreset(4,6,6,2)">
            <div class="btn-preset-name">18人進階組 (3頁)</div>
            <div class="btn-preset-desc">4紅 · 6黃 · 6綠 · 2黑</div>
          </div>
          <div class="btn-preset" onclick="setPreset(6,8,8,2)">
            <div class="btn-preset-name">24人大量傷病 (4頁)</div>
            <div class="btn-preset-desc">6紅 · 8黃 · 8綠 · 2黑</div>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-title">手動設定紅黃綠人數</div>
        <div class="count-row row-red">
          <div>
            <div class="cat-label" style="color: #991b1b;">🔴 紅色 (重傷·立即處置)</div>
            <div class="cat-desc">呼吸&gt;30/&lt;10 · 橈動脈弱 · CRT&ge;2s</div>
          </div>
          <div class="cat-ctrls">
            <button class="btn-step" onclick="adjustCount('red', -1)">-</button>
            <input type="number" id="count-red" class="input-count" value="2" min="0" onchange="onInputChange()">
            <button class="btn-step" onclick="adjustCount('red', 1)">+</button>
          </div>
        </div>
        <div class="count-row row-yellow">
          <div>
            <div class="cat-label" style="color: #92400e;">🟡 黃色 (中傷·延遲處置)</div>
            <div class="cat-desc">無法行走 · 呼吸循環意識正常</div>
          </div>
          <div class="cat-ctrls">
            <button class="btn-step" onclick="adjustCount('yellow', -1)">-</button>
            <input type="number" id="count-yellow" class="input-count" value="2" min="0" onchange="onInputChange()">
            <button class="btn-step" onclick="adjustCount('yellow', 1)">+</button>
          </div>
        </div>
        <div class="count-row row-green">
          <div>
            <div class="cat-label" style="color: #065f46;">🟢 綠色 (輕傷·可自行行走)</div>
            <div class="cat-desc">能步行至指定集結區</div>
          </div>
          <div class="cat-ctrls">
            <button class="btn-step" onclick="adjustCount('green', -1)">-</button>
            <input type="number" id="count-green" class="input-count" value="2" min="0" onchange="onInputChange()">
            <button class="btn-step" onclick="adjustCount('green', 1)">+</button>
          </div>
        </div>
        <div class="count-row row-black">
          <div>
            <div class="cat-label" style="color: #292524;">⚫ 黑色 (死亡·無生命徵象)</div>
            <div class="cat-desc">暢通呼吸道後仍無呼吸心跳</div>
          </div>
          <div class="cat-ctrls">
            <button class="btn-step" onclick="adjustCount('black', -1)">-</button>
            <input type="number" id="count-black" class="input-count" value="0" min="0" onchange="onInputChange()">
            <button class="btn-step" onclick="adjustCount('black', 1)">+</button>
          </div>
        </div>
        <div class="summary-box">
          <div class="summary-line">
            <span>總傷患人數：</span>
            <span id="summary-total-people" class="summary-total">6 人</span>
          </div>
          <div class="summary-line">
            <span>A4 紙張頁數 (每頁6人)：</span>
            <span id="summary-total-pages" style="font-weight: bold; color: #b45309;">1 頁</span>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-title">演練與列印選項</div>
        <label class="toggle-row">
          <div>
            <div>傷卡顯示答案等級標籤</div>
            <div class="toggle-sub">開啟印出紅/黃/綠/黑標記；關閉為盲測卡</div>
          </div>
          <input type="checkbox" id="opt-show-answers" onchange="renderSheets()">
        </label>
        <label class="toggle-row">
          <div>
            <div>印出卡片編號 (#01~#N)</div>
            <div class="toggle-sub">便於演練計分與對照</div>
          </div>
          <input type="checkbox" id="opt-show-numbers" checked onchange="renderSheets()">
        </label>
        <label class="toggle-row">
          <div>
            <div>印出 6 張裁切虛線 (✂)</div>
            <div class="toggle-sub">分割 A4 為 6 張獨立實體卡片</div>
          </div>
          <input type="checkbox" id="opt-show-cuts" checked onchange="renderSheets()">
        </label>
        <label class="toggle-row">
          <div>
            <div>附印教官標準答案對照清冊</div>
            <div class="toggle-sub">末頁附加詳細判定指引與理由</div>
          </div>
          <input type="checkbox" id="opt-show-key" checked onchange="renderSheets()">
        </label>
      </div>
    </aside>
    <main class="preview-container">
      <div class="preview-bar no-print">
        <div style="font-weight: bold; color: #44403c;">
          A4 縱向規格預覽 (210×297mm · 2×3 六人版)
        </div>
        <div style="color: #78716c; font-size: 12px;">
          💡 列印時請在印表機設定中勾選「背景圖形」以保留傷卡底色
        </div>
      </div>
      <div id="sheets-output" style="width: 100%; display: flex; flex-direction: column; align-items: center;"></div>
    </main>
  </div>
  <script>
    const CASE_BANK = {
      red: [
        { id: 1, age: 50, gender: "男性", clinical: "無法行走、意識模糊、腹部開放性傷口，腸子外露、橈動脈微弱、呼吸：24 / min、微血管充填時間：1秒", exp: "意識模糊、臟器外露併橈動脈微弱" },
        { id: 2, age: 50, gender: "女性", clinical: "無法行走、意識模糊、胸部挫傷，呼吸淺快、橈動脈微弱、呼吸：24 / min、微血管充填時間：1秒", exp: "意識模糊，橈動脈微弱" },
        { id: 3, age: 80, gender: "女性", clinical: "無法行走、意識模糊、胸部嚴重鈍傷瘀青，嘴唇發紺、橈動脈微弱、呼吸淺慢、呼吸：8 / min、微血管充填時間：4秒", exp: "呼吸過慢(8<10次/分)、CRT 4秒、意識模糊" },
        { id: 4, age: 70, gender: "男性", clinical: "無法行走、意識模糊、胸部開放性傷口，咳血、呼吸急深、橈動脈微弱、呼吸：36/ min、微血管充填時間：1秒", exp: "呼吸急促(36>30次/分)、意識模糊" },
        { id: 5, age: 60, gender: "女性", clinical: "無法行走、意識模糊、胸部鈍傷，四肢多處撕裂傷及擦傷、橈動脈微弱、呼吸淺、呼吸：24/ min、微血管充填時間：1秒", exp: "意識模糊，橈動脈微弱" },
        { id: 6, age: 35, gender: "男性", clinical: "無法行走、意識清楚、胸部有一開放性傷口、橈動脈微弱、呼吸：24 / min、微血管充填時間：4秒", exp: "CRT 4秒(≥2秒)、橈動脈微弱，休克危象" },
        { id: 7, age: 40, gender: "女性", clinical: "無法行走、意識清楚，臉色蒼白、右大腿開放性骨折、橈動脈微弱、呼吸淺快、呼吸：36/ min、微血管充填時間：1秒", exp: "呼吸急促(36>30次/分)、橈動脈微弱" },
        { id: 8, age: 30, gender: "男性", clinical: "無法行走、意識清楚，冒冷汗、腹部開放性傷口，腸子外露、橈動脈微弱、呼吸淺快、呼吸：24 / min、微血管充填時間：3秒", exp: "CRT 3秒(≥2秒)、橈動脈微弱" },
        { id: 9, age: 40, gender: "女性", clinical: "無法行走、意識清楚，嘴唇發紫、右側頸靜脈怒張，氣管偏移、右胸嚴重鈍傷瘀青，有皮下氣腫現象、橈動脈微弱、呼吸：35 / min、微血管充填時間：4秒", exp: "疑似張力性氣胸，呼吸 35次/分、CRT 4秒" },
        { id: 10, age: 50, gender: "男性", clinical: "無法行走、意識清楚，嘴唇發紺、胸部大片瘀青疼痛鈍傷、兩側頸靜脈怒張、橈動脈微弱、呼吸：40 / min、微血管充填時間：4秒", exp: "呼吸 40次/分(>30次/分)、CRT 4秒" },
        { id: 11, age: 60, gender: "男性", clinical: "無法行走、意識模糊、腹部鈍傷、橈動脈微弱、呼吸：24 / min、微血管充填時間：1秒", exp: "意識模糊，無法遵從簡單口令" },
        { id: 12, age: 80, gender: "女性", clinical: "無法行走、意識清楚，臉色蒼白、胸腹部嚴重鈍傷、橈動脈微弱、呼吸：40 / min、微血管充填時間：4秒", exp: "呼吸 40次/分、CRT 4秒" },
        { id: 13, age: 20, gender: "男性", clinical: "無法行走、意識模糊，臉色蒼白，冒冷汗、胸部開放性傷口，右下肢開放性骨折、橈動脈微弱、呼吸：35 / min、微血管充填時間：2秒", exp: "呼吸 35次/分、意識模糊、CRT 2秒" },
        { id: 15, age: 20, gender: "男性", clinical: "無法行走、意識模糊、腹部鈍傷瘀青，雙下肢開放性骨折、橈動脈微弱、呼吸微弱、呼吸：36 / min、微血管充填時間：3秒", exp: "呼吸 36次/分、CRT 3秒、意識模糊" },
        { id: 16, age: 70, gender: "女性", clinical: "無法行走、意識清楚，表情痛苦、下腹部疼痛腫脹，腰部嚴重壓傷、橈動脈微弱、呼吸：35 / min、微血管充填時間：4秒", exp: "呼吸 35次/分、CRT 4秒" },
        { id: 17, age: 15, gender: "男性", clinical: "無法行走、意識模糊，嘴唇發紫、胸腹部嚴重鈍傷、頸動脈微弱、呼吸急促、呼吸：24 / min、微血管充填時間：1秒", exp: "意識模糊、嘴唇發紺、頸動脈微弱" },
        { id: 18, age: 5, gender: "女性", clinical: "無法行走、意識模糊，活動力差、腹部嚴重鈍傷、肱動脈微弱、呼吸：24 / min、微血管充填時間：1秒", exp: "小兒意識模糊活動力差、肱動脈微弱" },
        { id: 19, age: 10, gender: "男性", clinical: "無法行走、反應遲鈍，臉色蒼白、右大腿開放性骨折、肱動脈微弱、呼吸淺、呼吸：24 / min、微血管充填時間：3秒", exp: "反應遲鈍、CRT 3秒、肱動脈微弱" },
        { id: 21, age: 6, gender: "男性", clinical: "無法行走、反應模糊，膚色蒼白、雙臂嚴重壓碎傷，開放性骨折、肱動脈微弱、呼吸：24 / min、微血管充填時間：2秒", exp: "反應模糊、肱動脈微弱、CRT 2秒" },
        { id: 25, age: 6, gender: "男性", clinical: "無法行走、活動力差，反應遲鈍、四肢發紫，胸部鈍傷、肱動脈微弱、呼吸急促、呼吸：60 / min、微血管充填時間：3秒", exp: "呼吸過速 60次/分、CRT 3秒、反應遲鈍" },
        { id: 29, age: 5, gender: "男性", clinical: "無法行走、反應遲鈍，臉色蒼白，皮膚濕冷、右下肢開放性骨折，大量出血、肱動脈微弱、呼吸：36 / min、微血管充填時間：4秒", exp: "呼吸 36次/分、CRT 4秒、大出血休克" },
        { id: 31, age: 7, gender: "男性", clinical: "無法行走、反應遲鈍、頭部鈍傷，大片頭皮下血腫、瞳孔左右不等大、呼吸：30 / min、微血管充填時間：2秒", exp: "反應遲鈍、瞳孔左右不等大(腦疝疑慮)" }
      ],
      yellow: [
        { id: 1, age: 50, gender: "男性", clinical: "無法行走、意識清楚、腹部鈍傷、橈動脈正常、呼吸：24/ min、微血管充填時間：1秒", exp: "無法自行行走；呼吸10~30、橈動脈正常、CRT<2s、意識清楚" },
        { id: 2, age: 50, gender: "女性", clinical: "無法行走、意識清楚、右眼穿通傷、呼吸費力、呼吸：18 / min、微血管充填時間：1秒", exp: "無法自行行走；生命徵象穩定，意識清楚" },
        { id: 3, age: 80, gender: "女性", clinical: "無法行走、意識清楚、背部重物鈍傷瘀青、呼吸：18 / min、微血管充填時間：1秒", exp: "無法行走；呼吸18、橈動脈佳、意識清楚" },
        { id: 4, age: 70, gender: "男性", clinical: "無法行走、意識清楚、右大腿開放性傷口，無法行走、左大腿擦傷、足背動脈正常、呼吸：24/ min、微血管充填時間：1秒", exp: "下肢創傷無法行走；生命徵象均穩定" },
        { id: 5, age: 60, gender: "女性", clinical: "無法行走、意識清楚、胸部鈍傷、四肢多處撕裂傷及擦傷、橈動脈正常、呼吸淺、呼吸：20 / min、微血管充填時間：1秒", exp: "無法行走；呼吸20次/分、橈動脈正常" },
        { id: 6, age: 35, gender: "男性", clinical: "無法行走、意識清楚、左前臂撕裂傷，出血、橈動脈正常、呼吸：12 / min、微血管充填時間：1秒", exp: "無法行走；呼吸12次/分、脈搏正常、CRT 1秒" },
        { id: 7, age: 40, gender: "女性", clinical: "無法行走、意識清楚，臉色蒼白、右大腿開放性骨折、足臂動脈正常、呼吸淺快、呼吸：24/ min、微血管充填時間：1秒", exp: "下肢骨折無法行走；呼吸24、意識清楚" },
        { id: 9, age: 40, gender: "女性", clinical: "無法行走、意識清楚、兩側上肢18%二度灼傷、橈動脈正常、呼吸：18 / min、微血管充填時間：1秒", exp: "肢體燒燙傷無法行走；各徵象穩定" },
        { id: 10, age: 50, gender: "男性", clinical: "無法行走、意識清楚、胸部大面積燒燙傷18%(二度)、橈動脈正常、呼吸：24 / min、微血管充填時間：1秒", exp: "二度燙傷無法自行走；呼吸24、脈搏正常" },
        { id: 11, age: 60, gender: "男性", clinical: "無法行走、意識清楚、右上肢及右下肢開放性骨折、橈動脈正常、呼吸：24 / min、微血管充填時間：1秒", exp: "骨折無法自行走；呼吸循環意識正常" },
        { id: 16, age: 70, gender: "女性", clinical: "無法行走、意識清楚，表情痛苦、雙下肢閉鎖性骨折、足背動脈正常、呼吸：18 / min、微血管充填時間：1秒", exp: "雙下肢骨折無法行走；呼吸18、脈搏佳" },
        { id: 17, age: 15, gender: "男性", clinical: "無法行走、意識清楚、高處墜樓雙下肢嚴重骨折、呼吸急促、橈動脈正常、呼吸：20 / min、微血管充填時間：1秒", exp: "高墜骨折無法行走；呼吸20、橈動脈正常" },
        { id: 19, age: 10, gender: "男性", clinical: "無法行走、反應正常，膚色紅潤、右大腿閉鎖性骨折、肱動脈正常、呼吸淺、呼吸：20 / min、微血管充填時間：1秒", exp: "無法行走；呼吸20、肱動脈正常、反應良好" },
        { id: 31, age: 47, gender: "男性", clinical: "無法行走、意識清楚、脊椎受傷及腹部鈍傷、橈動脈正常、呼吸：20 / min、微血管充填時間：1秒", exp: "疑似脊椎創傷無法行走；生命徵象穩定" }
      ],
      green: [
        { id: 1, age: 47, gender: "男性", clinical: "可行走、意識清楚，面部表情疼痛、右上臂開放性骨折，左手多處擦傷、呼吸：14 /min、微血管充填時間：1秒", exp: "可自行行走，屬於優先疏散之輕傷" },
        { id: 2, age: 70, gender: "男性", clinical: "可行走、意識清楚，面部表情疼痛、右下腿開放性骨折，雙下肢多處擦傷、呼吸：16 / min、微血管充填時間：1秒", exp: "可自行行走至安全集結區" },
        { id: 3, age: 60, gender: "女性", clinical: "可行走、意識清楚，表情疼痛，大聲呼叫、右前臂閉鎖性骨折，四肢多處擦傷、呼吸：16 / min、微血管充填時間：1秒", exp: "可自行行走，能清楚呼救" },
        { id: 4, age: 10, gender: "男性", clinical: "可行走、活動正常，言語清楚、左前臂腫脹、瘀青，疑閉鎖性骨折、呼吸：16 / min、微血管充填時間：1秒", exp: "活動言語正常、可自行行走" },
        { id: 5, age: 50, gender: "男性", clinical: "可行走、大聲呼救，面部表情疼痛，意識清楚、上肢多處擦傷，顏面1公分撕裂傷、呼吸：16 / min、微血管充填時間：1秒", exp: "可自行行走" },
        { id: 7, age: 60, gender: "男性", clinical: "可行走、意識清楚，面部表情疼痛、右上臂多處擦傷、橈動脈強、呼吸：14 / min、微血管充填時間：小於1秒", exp: "可自行行走，血行動態穩定" },
        { id: 8, age: 60, gender: "女性", clinical: "可行走、意識清楚、雙下肢多處擦傷瘀青、橈動脈強、呼吸：16 / min、微血管充填時間：1秒", exp: "可自行行走，表淺挫傷" },
        { id: 9, age: 18, gender: "男性", clinical: "可行走、意識清楚、顏面多處擦傷、橈動脈強、呼吸：14 / min、微血管充填時間：小於1秒", exp: "可自行行走" },
        { id: 13, age: 28, gender: "男性", clinical: "可行走、意識清楚、右前臂2公分撕裂傷、呼吸：16 / min、微血管充填時間：1秒", exp: "可自行行走，表淺撕裂傷" },
        { id: 18, age: 40, gender: "女性", clinical: "可行走、意識清楚、頭部血腫，兩眼瞳孔正常、呼吸：24 / min、微血管充填時間：2秒", exp: "可自行行走，神經學反射佳" },
        { id: 25, age: 30, gender: "男性", clinical: "可行走、意識清楚、頭部鈍傷，2公分皮下血腫、瞳孔反射正常、呼吸：14 / min、微血管充填時間：2秒", exp: "可自行行走" },
        { id: 29, age: 40, gender: "男性", clinical: "可行走、意識清楚、右側鎖骨封閉性骨折、橈動脈強、呼吸：16 / min、微血管充填時間：1秒", exp: "可自行行走" }
      ],
      black: [
        { id: 1, age: 47, gender: "男性", clinical: "無法行走、無意識、外觀無傷痕或骨折、無脈搏、無呼吸", exp: "暢通呼吸道後仍無自主呼吸、無心跳脈搏" },
        { id: 2, age: 70, gender: "男性", clinical: "無法行走、無意識、明顯多處開放性骨折、無呼吸、微血管充填時間：1秒", exp: "暢通呼吸道後無自主呼吸" },
        { id: 3, age: 60, gender: "女性", clinical: "無法行走、內臟脫出、意識喪失、無脈搏、無呼吸", exp: "致命傷，無自主呼吸及脈搏" },
        { id: 4, age: 10, gender: "男性", clinical: "無法行走、嚴重頭部外傷、無呼吸、無脈搏", exp: "無呼吸、無脈搏" },
        { id: 5, age: 50, gender: "男性", clinical: "無法行走、頭部嚴重鈍傷，腦漿外溢、無呼吸、無心跳", exp: "腦組織外溢，明顯死亡無呼吸" },
        { id: 10, age: 20, gender: "男性", clinical: "無法行走、意識喪失、四肢軀幹分離、無心跳、無脈搏", exp: "軀幹分離，明顯死亡" },
        { id: 17, age: 38, gender: "男性", clinical: "無法行走、無意識、頭部與軀幹分離、無呼吸、無心跳", exp: "頭部分離，明顯死亡" },
        { id: 19, age: 18, gender: "男性", clinical: "無法行走、高處墜落、明顯多處骨折、無意識、無呼吸、無心跳", exp: "高墜無生命徵象" }
      ]
    };
    let currentCards = [];
    function formatBullets(rawClinical, cat) {
      const parts = rawClinical.split(/[、，,]/).map(s => s.trim()).filter(Boolean);

      // 1. 【可否行走、意識狀態】
      let walk = (cat === 'green' || rawClinical.includes('可行走') || rawClinical.includes('可自行行走')) ? '可自行行走' : '無法自行行走';
      let neuro = '意識清楚 (能遵從指令)';
      if (rawClinical.includes('無意識') || rawClinical.includes('意識喪失') || rawClinical.includes('意識不清') || cat === 'black') {
        neuro = '無意識 / 昏迷 (對刺激無反應)';
      } else if (rawClinical.includes('意識模糊') || rawClinical.includes('反應模糊')) {
        neuro = '意識模糊 (無法遵從指令)';
      } else if (rawClinical.includes('反應遲鈍') || rawClinical.includes('活動力差') || rawClinical.includes('表情呆滯')) {
        neuro = '反應遲鈍，活動力差';
      } else if (rawClinical.includes('焦躁不安') || rawClinical.includes('嗜睡')) {
        neuro = '意識嗜睡/焦躁不安';
      } else if (rawClinical.includes('意識清楚') || rawClinical.includes('言語清楚')) {
        neuro = '意識清楚 (能遵從簡單指令)';
      }
      const line1 = walk + '、' + neuro;

      // 2. 【呼吸狀態、次數】
      const respMatch = rawClinical.match(/呼吸[:：]?\\s*(\\d+)\\s*\\/\\s*min/i);
      const noResp = rawClinical.includes('無呼吸') || rawClinical.includes('呼吸停止') || (respMatch && parseInt(respMatch[1], 10) === 0);
      let respText = '';
      if (noResp || cat === 'black') {
        respText = '暢通呼吸道後仍無自主呼吸 (0 次/分)';
      } else if (respMatch) {
        const rate = parseInt(respMatch[1], 10);
        let depth = '有自主呼吸';
        if (rawClinical.includes('呼吸淺慢') || rate < 10) depth = '呼吸淺慢';
        else if (rawClinical.includes('呼吸淺快') || rate > 30) depth = '呼吸淺快';
        else if (rawClinical.includes('呼吸急促')) depth = '呼吸急促';
        else if (rawClinical.includes('呼吸急深')) depth = '呼吸急深';
        else if (rawClinical.includes('呼吸微弱')) depth = '呼吸微弱';
        else if (rawClinical.includes('呼吸費力')) depth = '呼吸費力';
        respText = depth + '，速率 ' + rate + ' 次/分';
      } else if (rawClinical.includes('呼吸正常')) {
        respText = '自主呼吸正常平穩，約 16 次/分';
      } else if (cat === 'red') {
        respText = '呼吸淺快，速率 34 次/分';
      } else {
        respText = '自主呼吸平穩，速率 16 次/分';
      }
      const line2 = respText;

      // 3. 【微血管充填時間】
      const crtMatch = rawClinical.match(/微血管充填時間[:：]?\\s*([小大於0-9.]+秒?)/);
      let crtText = '';
      if (crtMatch) {
        const rawVal = crtMatch[1].replace('秒', '').trim();
        crtText = rawVal + '秒';
      } else if (rawClinical.includes('微血管充填時間：小於1秒') || rawClinical.includes('小於1秒')) {
        crtText = '<1秒';
      } else if (cat === 'black') {
        crtText = '無周邊血液灌流';
      } else if (cat === 'red') {
        crtText = '≥2.5秒';
      } else {
        crtText = '<2秒';
      }
      const line3 = '微血管充填時間：' + crtText;

      // 4. 【其他臨床評估或傷情徵候、脈搏、血壓】
      let pulseText = '';
      if (rawClinical.includes('無脈搏') || rawClinical.includes('無心跳')) {
        pulseText = '無動脈搏動/無心跳';
      } else if (rawClinical.includes('橈動脈微弱')) {
        pulseText = '橈動脈微弱';
      } else if (rawClinical.includes('橈動脈強') || rawClinical.includes('橈動脈正常')) {
        pulseText = '橈動脈正常有力';
      } else if (rawClinical.includes('肱動脈微弱')) {
        pulseText = '肱動脈微弱';
      } else if (rawClinical.includes('肱動脈正常')) {
        pulseText = '肱動脈正常';
      } else if (rawClinical.includes('足背動脈正常')) {
        pulseText = '足背動脈正常可觸及';
      } else if (rawClinical.includes('頸動脈微弱')) {
        pulseText = '頸動脈微弱';
      } else if (cat === 'black') {
        pulseText = '動脈無法觸及';
      } else if (cat === 'red') {
        pulseText = '橈動脈微弱或無法觸及';
      } else {
        pulseText = '橈動脈正常有力';
      }

      let bpText = '';
      if (cat === 'black') {
        bpText = '0/0 mmHg';
      } else if (cat === 'red') {
        if (rawClinical.includes('橈動脈微弱') || rawClinical.includes('大出血') || rawClinical.includes('休克')) {
          bpText = '80/48 mmHg';
        } else if (rawClinical.includes('8 / min') || rawClinical.includes('氣胸')) {
          bpText = '76/42 mmHg';
        } else {
          bpText = '88/54 mmHg';
        }
      } else if (cat === 'yellow') {
        bpText = '122/76 mmHg';
      } else {
        bpText = '118/74 mmHg';
      }

      const injuryClues = parts.filter(p => (
        !p.includes('行走') &&
        !p.includes('呼吸') &&
        !p.includes('動脈') &&
        !p.includes('心跳') &&
        !p.includes('脈搏') &&
        !p.includes('微血管') &&
        !p.includes('意識') &&
        !p.includes('反應')
      ));
      let injuryDesc = injuryClues.length > 0 ? injuryClues.join('、') : '';
      if (!injuryDesc) {
        if (cat === 'black') injuryDesc = '致命創傷、四肢冰冷';
        else if (cat === 'red') injuryDesc = '全身多處重度挫傷、休克徵候';
        else if (cat === 'yellow') injuryDesc = '中度骨折或創傷、局部壓痛';
        else injuryDesc = '肢體輕度擦挫傷';
      }
      const line4 = injuryDesc + '、' + pulseText + '、血壓 ' + bpText;

      return [line1, line2, line3, line4];
    }
    function generateDeck() {
      const redCount = parseInt(document.getElementById('count-red').value) || 0;
      const yellowCount = parseInt(document.getElementById('count-yellow').value) || 0;
      const greenCount = parseInt(document.getElementById('count-green').value) || 0;
      const blackCount = parseInt(document.getElementById('count-black').value) || 0;
      const deck = [];
      const addCategoryCards = (cat, count) => {
        const pool = CASE_BANK[cat];
        for (let i = 0; i < count; i++) {
          const item = pool[i % pool.length];
          deck.push({
            category: cat,
            demographics: item.age + '歲，' + item.gender,
            bullets: formatBullets(item.clinical, cat),
            explanation: item.exp
          });
        }
      };
      addCategoryCards('red', redCount);
      addCategoryCards('yellow', yellowCount);
      addCategoryCards('green', greenCount);
      addCategoryCards('black', blackCount);
      for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
      }
      currentCards = deck.map((c, idx) => ({ ...c, serialNumber: idx + 1 }));
      updateSummary();
      renderSheets();
    }
    function shuffleDeck() { generateDeck(); }
    function setPreset(r, y, g, b) {
      document.getElementById('count-red').value = r;
      document.getElementById('count-yellow').value = y;
      document.getElementById('count-green').value = g;
      document.getElementById('count-black').value = b;
      generateDeck();
    }
    function adjustCount(cat, delta) {
      const input = document.getElementById('count-' + cat);
      let val = (parseInt(input.value) || 0) + delta;
      if (val < 0) val = 0;
      input.value = val;
      generateDeck();
    }
    function onInputChange() { generateDeck(); }
    function updateSummary() {
      const total = currentCards.length;
      const pages = Math.max(1, Math.ceil(total / 6));
      document.getElementById('summary-total-people').textContent = total + ' 人';
      document.getElementById('summary-total-pages').textContent = '共 ' + pages + ' 頁 A4';
    }
    function renderSheets() {
      const showAnswers = document.getElementById('opt-show-answers').checked;
      const showNumbers = document.getElementById('opt-show-numbers').checked;
      const showCuts = document.getElementById('opt-show-cuts').checked;
      const showKey = document.getElementById('opt-show-key').checked;
      const container = document.getElementById('sheets-output');
      container.innerHTML = '';
      const total = currentCards.length;
      const totalPages = Math.max(1, Math.ceil(total / 6));
      const catBadges = {
        red: { text: '🔴 紅色 (立即)', cls: 'badge-red' },
        yellow: { text: '🟡 黃色 (延遲)', cls: 'badge-yellow' },
        green: { text: '🟢 綠色 (輕傷)', cls: 'badge-green' },
        black: { text: '⚫ 黑色 (死亡)', cls: 'badge-black' }
      };
      for (let p = 0; p < totalPages; p++) {
        const pageCards = currentCards.slice(p * 6, (p + 1) * 6);
        while (pageCards.length < 6) {
          pageCards.push(null);
        }
        const sheetEl = document.createElement('div');
        sheetEl.className = 'print-page-sheet';
        let html = '<div class="sheet-header"><div><strong>START 現場檢傷演練傷卡 (縱向六人版)</strong> · A4規格</div><div>第 ' + (p + 1) + ' 頁 / 共 ' + totalPages + ' 頁</div></div><div class="sheet-grid">';
        pageCards.forEach(c => {
          if (c) {
            const badge = catBadges[c.category];
            html += '<div class="triage-card"><div><div class="card-top">' +
              (showNumbers ? '<span style="position: absolute; left: 0; font-family: monospace; font-size: 11px; background: #e7e5e4; padding: 2px 6px; border-radius: 4px; font-weight: bold;">#' + String(c.serialNumber).padStart(2, '0') + '</span>' : '') +
              '<span class="card-title">' + c.demographics.replace(/^年齡[、，]性別[：:]\s*/, '') + '</span>' +
              (showAnswers ? '<span class="card-badge ' + badge.cls + '" style="position: absolute; right: 0;">' + badge.text + '</span>' : '') +
              '</div><div class="card-divider"></div><ul class="card-bullets">' +
              c.bullets.map(b => {
                let cleanB = b
                  .replace(/^可否行走[、，]意識狀態[：:]\s*/, '')
                  .replace(/^呼吸狀態[、，]次數[：:]\s*/, '')
                  .replace(/^其他臨床評估或傷情徵候[、，]脈搏[、，]血壓[：:]\s*/, '');
                cleanB = cleanB
                  .replace(/\s*\([<≥>].*?\)/g, '')
                  .replace(/\s*\([^)]*灌流[^)]*\)/g, '')
                  .replace(/\s*\([^)]*低血壓[^)]*\)/g, '')
                  .replace(/\s*\([^)]*休克[^)]*\)/g, '');
                const cIdx = cleanB.indexOf('：');
                const pfx = cIdx !== -1 ? cleanB.slice(0, cIdx + 1) : '';
                const cnt = cIdx !== -1 ? cleanB.slice(cIdx + 1) : cleanB;
                return '<li class="bullet-item"><span class="bullet-arrow">▸</span><span>' + (pfx ? '<strong>' + pfx + '</strong>' : '') + cnt + '</span></li>';
              }).join('') +
              '</ul></div><div class="card-footer"><span>START 檢傷演練卡 · #' + String(c.serialNumber).padStart(2, '0') + '</span><span>' + (showAnswers ? badge.text : '[現場演練判讀]') + '</span></div></div>';
          } else {
            html += '<div class="empty-card"><div style="font-weight: bold; margin-bottom: 4px;">空白備用格</div><div>演練手填傷情</div></div>';
          }
        });
        if (showCuts) {
          html += '<div class="cut-line-v"></div><div class="cut-line-h1"></div><div class="cut-line-h2"></div>';
        }
        html += '</div><div class="sheet-footer"><span>檢傷指標：呼吸(&gt;30或&lt;10) · 脈搏/CRT&ge;2s · 意識遵從指令</span><span>排除孕婦情境 · START 標準演練題庫</span></div>';
        sheetEl.innerHTML = html;
        container.appendChild(sheetEl);
      }
      if (showKey && currentCards.length > 0) {
        const keySheet = document.createElement('div');
        keySheet.className = 'print-page-sheet';
        keySheet.innerHTML = '<div class="sheet-header"><div><strong>【教官/裁判專用】START 檢傷分類標準答案對照名冊</strong></div><div>參考存檔頁</div></div><div style="flex: 1; overflow: hidden;"><table class="answer-table"><thead><tr><th style="width: 48px; text-align: center;">編號</th><th style="width: 100px;">傷患基本資料</th><th style="width: 110px;">檢傷判定</th><th>判定關鍵依據與臨床徵候</th></tr></thead><tbody>' + currentCards.map(c => '<tr><td style="text-align: center; font-weight: bold; font-family: monospace;">#' + String(c.serialNumber).padStart(2, '0') + '</td><td><strong>' + c.demographics + '</strong></td><td><span class="card-badge ' + catBadges[c.category].cls + '">' + catBadges[c.category].text + '</span></td><td style="color: #44403c;">' + c.explanation + '</td></tr>').join('') + '</tbody></table></div><div class="sheet-footer"><span>演練評核存檔名冊 · 已扣除孕婦情境</span><span>START Disaster Triage Evaluation Key</span></div>';
        container.appendChild(keySheet);
      }
    }
    window.addEventListener('DOMContentLoaded', () => { generateDeck(); });
  </script>
</body>
</html>`;
}
