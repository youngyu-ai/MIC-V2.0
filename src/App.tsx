import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  TriageCard,
  TriageCategory,
  TriageCounts,
  PrintSettings,
} from './types';
import {
  generateTriageDeck,
  getSanitizedQuestionPool,
} from './data/triageCases';
import { A4PrintSheet } from './components/A4PrintSheet';
import { InstructorAnswerKey } from './components/InstructorAnswerKey';
import { CardEditorModal } from './components/CardEditorModal';
import { QuestionBankModal } from './components/QuestionBankModal';
import { exportToPdfFile, triggerBrowserPrint } from './utils/pdfExport';
import { getStandaloneHtmlString } from './utils/standaloneHtml';
import {
  Printer,
  FileDown,
  Download,
  RefreshCw,
  Plus,
  BookOpen,
  Settings2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Eye,
  Scissors,
  Layers,
} from 'lucide-react';

export default function App() {
  // Manual counts for Red, Yellow, Green, Black
  // Default to 6 people (1 page) as requested in prompt
  const [counts, setCounts] = useState<TriageCounts>({
    red: 2,
    yellow: 2,
    green: 2,
    black: 0,
  });

  // Settings
  const [settings, setSettings] = useState<PrintSettings>({
    showAnswerTag: false, // Default hidden for drills
    answerTagPosition: 'badge',
    showCutLines: true,
    showCardNumber: true,
    includeAnswerSheet: true,
    cardStyle: 'authentic',
    fontSizeDelta: 3, // Default +3
    textAlign: 'center', // Default Centered
  });

  // Current generated deck
  const [cards, setCards] = useState<TriageCard[]>([]);
  const [seed, setSeed] = useState<number>(123456);

  // Active page view in preview (0 for "All Pages")
  const [activePageView, setActivePageView] = useState<number>(1);

  // Modals
  const [editingCard, setEditingCard] = useState<TriageCard | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isBankOpen, setIsBankOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // PDF Export status
  const [pdfProgress, setPdfProgress] = useState<{ msg: string; percent: number } | null>(null);

  // Calculate total automatically
  const totalPeople = useMemo(() => {
    return (
      Number(counts.red || 0) +
      Number(counts.yellow || 0) +
      Number(counts.green || 0) +
      Number(counts.black || 0)
    );
  }, [counts]);

  // Total A4 pages (exactly 6 cards per page)
  const totalCardPages = useMemo(() => {
    return Math.max(1, Math.ceil(cards.length / 6));
  }, [cards.length]);

  // Generate cards whenever counts or seed change
  const handleRegenerate = (newCounts = counts, newSeed = Date.now()) => {
    const deck = generateTriageDeck(newCounts, newSeed);
    setCards(deck);
    setSeed(newSeed);
  };

  // Initial load
  useEffect(() => {
    handleRegenerate(counts, 1001);
  }, []);

  // Update specific category count
  const handleCountChange = (cat: keyof TriageCounts, val: number) => {
    const safeVal = Math.max(0, isNaN(val) ? 0 : val);
    const updated = { ...counts, [cat]: safeVal };
    setCounts(updated);
    handleRegenerate(updated, Date.now());
  };

  // Preset scenarios
  const applyPreset = (presetCounts: TriageCounts) => {
    setCounts(presetCounts);
    handleRegenerate(presetCounts, Date.now());
    setActivePageView(1);
  };

  // Split cards into chunks of 6 for each A4 sheet
  const pagedCards = useMemo(() => {
    const pages: TriageCard[][] = [];
    for (let i = 0; i < cards.length; i += 6) {
      pages.push(cards.slice(i, i + 6));
    }
    if (pages.length === 0) {
      pages.push([]);
    }
    return pages;
  }, [cards]);

  // Card editor callbacks
  const handleEditCard = (card: TriageCard) => {
    setEditingCard(card);
    setIsEditorOpen(true);
  };

  const handleSaveCard = (updated: TriageCard) => {
    setCards((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
  };

  const handleDeleteCard = (cardId: string) => {
    setCards((prev) => {
      const remaining = prev.filter((c) => c.id !== cardId);
      // Re-number
      return remaining.map((c, idx) => ({ ...c, serialNumber: idx + 1 }));
    });
  };

  const handleAddCardFromBank = (newCard: TriageCard) => {
    setCards((prev) => {
      const updated = [...prev, newCard];
      return updated.map((c, idx) => ({ ...c, serialNumber: idx + 1 }));
    });
    // Increment count
    setCounts((prev) => ({
      ...prev,
      [newCard.category]: prev[newCard.category] + 1,
    }));
  };

  // PDF Export
  const handleExportPdf = async () => {
    try {
      setPdfProgress({ msg: '開始準備 PDF 輸出...', percent: 1 });
      await exportToPdfFile('#print-container', `START_檢傷傷卡_${cards.length}人_A4縱向.pdf`, (msg, percent) => {
        setPdfProgress({ msg, percent });
      });
      setTimeout(() => setPdfProgress(null), 1800);
    } catch (err: any) {
      console.error(err);
      alert('匯出 PDF 發生錯誤：' + (err.message || '請使用瀏覽器列印'));
      setPdfProgress(null);
    }
  };

  // Download standalone offline single-file version via in-memory Blob
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const handleDownloadStandalone = () => {
    try {
      const htmlContent = getStandaloneHtmlString();
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'START_現場檢傷傷情卡產生器_離線單機版.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 10000);
      setDownloadNotice('已下載「START_現場檢傷傷情卡產生器_離線單機版.html」！請在電腦下載資料夾中雙擊點開即可，免連網、無任何權限限制。');
      setTimeout(() => setDownloadNotice(null), 6000);
    } catch (e: any) {
      console.error(e);
      alert('產生單機版檔案發生錯誤：' + e.message);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 flex flex-col font-sans">
      {/* Top Header & Navigation - Hidden in print */}
      <header className="no-print sticky top-0 z-40 bg-stone-900 text-stone-100 shadow-md border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-lg">
              S
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-white tracking-wide flex items-center gap-2">
                START 現場檢傷傷情產生器
                <span className="text-[11px] font-normal px-2 py-0.5 rounded bg-stone-800 border border-stone-700 text-stone-300">
                  A4 縱向六人版
                </span>
              </h1>
              <p className="text-[11px] text-stone-400 hidden sm:block">
                已扣除孕婦情境 · 依 2024 START 檢傷分類標準題庫演練
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Open MCI Simulator */}
            <a
              href="./mci_simulator.html"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-sky-300 bg-sky-950/80 hover:bg-sky-900 hover:text-sky-200 rounded-lg border border-sky-700/60 transition-colors shadow-2xs"
              title="開啟消防署大量傷病患系統練習模擬器（含檢傷追蹤、傷卡列印、指揮管制看板）"
            >
              <span>🚑</span>
              <span className="hidden sm:inline">大傷系統模擬器</span>
              <span className="sm:hidden">模擬器</span>
            </a>

            {/* Standalone Offline Version Download */}
            <button
              onClick={handleDownloadStandalone}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900 hover:text-emerald-200 rounded-lg border border-emerald-700/60 transition-colors shadow-2xs"
              title="下載單一 HTML 離線單機版檔案，免連網即可在任何電腦雙擊使用"
            >
              <Download size={14} className="text-emerald-400" />
              <span>下載單機版</span>
            </button>

            <button
              onClick={() => setIsBankOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-300 bg-stone-800 hover:bg-stone-700 hover:text-white rounded-lg border border-stone-700 transition-colors"
              title="查看 144 題臨床演練題庫"
            >
              <BookOpen size={14} className="text-amber-400" />
              <span className="hidden sm:inline">檢傷題庫</span>
            </button>

            <button
              onClick={() => handleRegenerate()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-300 bg-stone-800 hover:bg-stone-700 hover:text-white rounded-lg border border-stone-700 transition-colors"
              title="隨機洗牌重抽傷情"
            >
              <RefreshCw size={14} />
              <span className="hidden sm:inline">重新洗牌</span>
            </button>

            {/* Direct PDF Download */}
            <button
              onClick={handleExportPdf}
              disabled={pdfProgress !== null}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 text-xs font-bold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-all disabled:opacity-50"
            >
              <FileDown size={14} />
              <span>匯出 PDF</span>
            </button>

            {/* Native Browser Print */}
            <button
              onClick={triggerBrowserPrint}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-500 rounded-lg shadow-sm transition-colors"
            >
              <Printer size={14} />
              <span>A4 列印</span>
            </button>
          </div>
        </div>
      </header>

      {/* Standalone download banner notice */}
      {downloadNotice && (
        <div className="no-print bg-emerald-50 border-b border-emerald-200 px-4 py-2.5 text-emerald-900 text-xs">
          <div className="max-w-7xl mx-auto flex items-center gap-2 font-medium">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            <span>{downloadNotice}</span>
          </div>
        </div>
      )}

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 flex flex-col lg:flex-row gap-6">
        {/* Left Control Panel - Hidden in print */}
        <aside className="no-print w-full lg:w-80 xl:w-96 shrink-0 space-y-5">
          {/* 1. Quick Presets */}
          <div className="bg-white rounded-xl shadow-xs border border-stone-200 p-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5 flex items-center justify-between">
              <span>快速演練組合</span>
              <span className="text-[11px] font-normal text-stone-400">點選快速填入</span>
            </h2>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => applyPreset({ red: 2, yellow: 2, green: 2, black: 0 })}
                className="p-2 rounded-lg border border-stone-200 hover:border-amber-500 hover:bg-amber-50/50 text-left transition-all"
              >
                <div className="font-bold text-stone-800">6人單頁組 (1頁)</div>
                <div className="text-[11px] text-stone-500 mt-0.5">2紅 · 2黃 · 2綠</div>
              </button>

              <button
                onClick={() => applyPreset({ red: 3, yellow: 4, green: 4, black: 1 })}
                className="p-2 rounded-lg border border-stone-200 hover:border-amber-500 hover:bg-amber-50/50 text-left transition-all"
              >
                <div className="font-bold text-stone-800">12人標準組 (2頁)</div>
                <div className="text-[11px] text-stone-500 mt-0.5">3紅 · 4黃 · 4綠 · 1黑</div>
              </button>

              <button
                onClick={() => applyPreset({ red: 4, yellow: 6, green: 6, black: 2 })}
                className="p-2 rounded-lg border border-stone-200 hover:border-amber-500 hover:bg-amber-50/50 text-left transition-all"
              >
                <div className="font-bold text-stone-800">18人進階組 (3頁)</div>
                <div className="text-[11px] text-stone-500 mt-0.5">4紅 · 6黃 · 6綠 · 2黑</div>
              </button>

              <button
                onClick={() => applyPreset({ red: 6, yellow: 8, green: 8, black: 2 })}
                className="p-2 rounded-lg border border-stone-200 hover:border-amber-500 hover:bg-amber-50/50 text-left transition-all"
              >
                <div className="font-bold text-stone-800">24人大量災難 (4頁)</div>
                <div className="text-[11px] text-stone-500 mt-0.5">6紅 · 8黃 · 8綠 · 2黑</div>
              </button>
            </div>
          </div>

          {/* 2. Manual Counts & Auto-Calculation */}
          <div className="bg-white rounded-xl shadow-xs border border-stone-200 p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <h2 className="font-bold text-stone-900 text-sm">
                  手動輸入紅黃綠人數
                </h2>
                <p className="text-[11px] text-stone-500">
                  系統將自動加總人數並計算 A4 頁數
                </p>
              </div>

              {/* Summary Indicator */}
              <div className="text-right">
                <div className="text-xs text-stone-400">總人數</div>
                <div className="text-xl font-extrabold text-stone-900">
                  {totalPeople} <span className="text-xs font-normal text-stone-500">人</span>
                </div>
              </div>
            </div>

            {/* Input Rows for Red, Yellow, Green, Black */}
            <div className="space-y-3">
              {/* Red */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-red-50/60 border border-red-100">
                <div className="flex items-center gap-2.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-red-600 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-red-950">
                      🔴 紅色 (重傷·立即處理)
                    </div>
                    <div className="text-[10px] text-red-600/80">
                      呼吸&gt;30/&lt;10 · 橈動脈弱 · CRT&ge;2s · 意識不清
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleCountChange('red', counts.red - 1)}
                    className="w-7 h-7 rounded bg-white border border-red-200 text-red-700 font-bold hover:bg-red-100 flex items-center justify-center transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={counts.red}
                    onChange={(e) => handleCountChange('red', parseInt(e.target.value, 10))}
                    className="w-12 text-center font-bold text-stone-900 bg-white border border-red-200 rounded py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleCountChange('red', counts.red + 1)}
                    className="w-7 h-7 rounded bg-white border border-red-200 text-red-700 font-bold hover:bg-red-100 flex items-center justify-center transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Yellow */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-amber-50/60 border border-amber-100">
                <div className="flex items-center gap-2.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-amber-500 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-amber-950">
                      🟡 黃色 (中傷·延遲處理)
                    </div>
                    <div className="text-[10px] text-amber-700/80">
                      無法行走 · 但呼吸、循環、意識穩定
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleCountChange('yellow', counts.yellow - 1)}
                    className="w-7 h-7 rounded bg-white border border-amber-200 text-amber-800 font-bold hover:bg-amber-100 flex items-center justify-center transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={counts.yellow}
                    onChange={(e) => handleCountChange('yellow', parseInt(e.target.value, 10))}
                    className="w-12 text-center font-bold text-stone-900 bg-white border border-amber-200 rounded py-1 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleCountChange('yellow', counts.yellow + 1)}
                    className="w-7 h-7 rounded bg-white border border-amber-200 text-amber-800 font-bold hover:bg-amber-100 flex items-center justify-center transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Green */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100">
                <div className="flex items-center gap-2.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-600 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-emerald-950">
                      🟢 綠色 (輕傷·可自行行走)
                    </div>
                    <div className="text-[10px] text-emerald-700/80">
                      能遵照引導自行步行至集結區
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleCountChange('green', counts.green - 1)}
                    className="w-7 h-7 rounded bg-white border border-emerald-200 text-emerald-800 font-bold hover:bg-emerald-100 flex items-center justify-center transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={counts.green}
                    onChange={(e) => handleCountChange('green', parseInt(e.target.value, 10))}
                    className="w-12 text-center font-bold text-stone-900 bg-white border border-emerald-200 rounded py-1 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleCountChange('green', counts.green + 1)}
                    className="w-7 h-7 rounded bg-white border border-emerald-200 text-emerald-800 font-bold hover:bg-emerald-100 flex items-center justify-center transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Black */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-stone-100/70 border border-stone-200">
                <div className="flex items-center gap-2.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-stone-800 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-stone-900">
                      ⚫ 黑色 (死亡·無呼吸)
                    </div>
                    <div className="text-[10px] text-stone-500">
                      暢通呼吸道後仍無自主呼吸
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleCountChange('black', counts.black - 1)}
                    className="w-7 h-7 rounded bg-white border border-stone-300 text-stone-700 font-bold hover:bg-stone-200 flex items-center justify-center transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={counts.black}
                    onChange={(e) => handleCountChange('black', parseInt(e.target.value, 10))}
                    className="w-12 text-center font-bold text-stone-900 bg-white border border-stone-300 rounded py-1 text-sm focus:outline-none focus:ring-1 focus:ring-stone-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleCountChange('black', counts.black + 1)}
                    className="w-7 h-7 rounded bg-white border border-stone-300 text-stone-700 font-bold hover:bg-stone-200 flex items-center justify-center transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Print Pagination info */}
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs space-y-1">
              <div className="flex justify-between text-stone-700">
                <span>A4 規格列印排版：</span>
                <span className="font-bold text-stone-900">縱向 每頁 6 人</span>
              </div>
              <div className="flex justify-between text-stone-700">
                <span>傷患卡紙張頁數：</span>
                <span className="font-bold text-amber-800 font-mono">
                  共 {totalCardPages} 頁 A4
                </span>
              </div>
              {settings.includeAnswerSheet && (
                <div className="flex justify-between text-stone-500 text-[11px] pt-1 border-t border-stone-200/60">
                  <span>附印教官解答名冊：</span>
                  <span className="font-semibold">+1~2 頁</span>
                </div>
              )}
            </div>
          </div>

          {/* 3. Drill & Print Settings */}
          <div className="bg-white rounded-xl shadow-xs border border-stone-200 p-4 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1 flex items-center gap-1.5">
              <Settings2 size={13} />
              演練與列印選項
            </h2>

            <div className="space-y-2 text-xs">
              {/* Text Alignment */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-stone-50 border border-stone-200">
                <div>
                  <div className="font-semibold text-stone-800">傷卡文字排列</div>
                  <div className="text-[11px] text-stone-400">標題與傷情清單對齊</div>
                </div>
                <div className="inline-flex rounded-lg border border-stone-300 p-0.5 bg-white">
                  <button
                    type="button"
                    onClick={() => setSettings((s) => ({ ...s, textAlign: 'center' }))}
                    className={`px-2.5 py-1 text-xs font-bold rounded transition-colors ${
                      settings.textAlign === 'center'
                        ? 'bg-amber-600 text-white shadow-2xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    居中置中
                  </button>
                  <button
                    type="button"
                    onClick={() => setSettings((s) => ({ ...s, textAlign: 'left' }))}
                    className={`px-2.5 py-1 text-xs font-bold rounded transition-colors ${
                      settings.textAlign === 'left'
                        ? 'bg-amber-600 text-white shadow-2xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    靠左對齊
                  </button>
                </div>
              </div>

              {/* Font Size Modifier */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-stone-50 border border-stone-200">
                <div>
                  <div className="font-semibold text-stone-800">傷卡字體大小</div>
                  <div className="text-[11px] text-stone-400">目前設定：+3 號大字</div>
                </div>
                <div className="inline-flex rounded-lg border border-stone-300 p-0.5 bg-white">
                  {[
                    { val: 0, label: '標準' },
                    { val: 3, label: '+3 放大' },
                    { val: 5, label: '+5 特大' },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => setSettings((s) => ({ ...s, fontSizeDelta: opt.val }))}
                      className={`px-2.5 py-1 text-xs font-bold rounded transition-colors ${
                        settings.fontSizeDelta === opt.val
                          ? 'bg-amber-600 text-white shadow-2xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Show/Hide Triage Answer Badge on Card */}
              <label className="flex items-center justify-between p-2 rounded-lg hover:bg-stone-50 cursor-pointer">
                <div>
                  <div className="font-semibold text-stone-800">
                    在傷卡上顯示檢傷等級答案
                  </div>
                  <div className="text-[11px] text-stone-400">
                    {settings.showAnswerTag
                      ? '已開啟（傷卡右上角印出 紅/黃/綠/黑 標籤）'
                      : '已關閉（演練盲測模式，考生自行依徵象判定）'}
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.showAnswerTag}
                  onChange={(e) =>
                    setSettings((s) => ({ ...s, showAnswerTag: e.target.checked }))
                  }
                  className="w-4 h-4 accent-amber-600 rounded cursor-pointer"
                />
              </label>

              {/* Show Serial Number */}
              <label className="flex items-center justify-between p-2 rounded-lg hover:bg-stone-50 cursor-pointer">
                <div>
                  <div className="font-semibold text-stone-800">
                    印出傷患卡流水編號 (#01 ~ #{cards.length})
                  </div>
                  <div className="text-[11px] text-stone-400">
                    便於演練考核與答案對照
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.showCardNumber}
                  onChange={(e) =>
                    setSettings((s) => ({ ...s, showCardNumber: e.target.checked }))
                  }
                  className="w-4 h-4 accent-amber-600 rounded cursor-pointer"
                />
              </label>

              {/* Show Scissor Cut Lines */}
              <label className="flex items-center justify-between p-2 rounded-lg hover:bg-stone-50 cursor-pointer">
                <div>
                  <div className="font-semibold text-stone-800">
                    印出 6 張卡片裁切虛線 (✂)
                  </div>
                  <div className="text-[11px] text-stone-400">
                    列印後便於使用剪刀或裁刀整齊分割
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.showCutLines}
                  onChange={(e) =>
                    setSettings((s) => ({ ...s, showCutLines: e.target.checked }))
                  }
                  className="w-4 h-4 accent-amber-600 rounded cursor-pointer"
                />
              </label>

              {/* Include Instructor Answer Key */}
              <label className="flex items-center justify-between p-2 rounded-lg hover:bg-stone-50 cursor-pointer">
                <div>
                  <div className="font-semibold text-stone-800">
                    附頁列印教官標準答案對照清冊
                  </div>
                  <div className="text-[11px] text-stone-400">
                    在卡片最後附上詳細檢傷分析名冊
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.includeAnswerSheet}
                  onChange={(e) =>
                    setSettings((s) => ({
                      ...s,
                      includeAnswerSheet: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 accent-amber-600 rounded cursor-pointer"
                />
              </label>
            </div>
          </div>
        </aside>

        {/* Right Preview Area */}
        <section className="flex-1 flex flex-col items-center">
          {/* Top Pagination & Preview Mode Bar - Hidden in print */}
          <div className="no-print w-full flex flex-col sm:flex-row items-center justify-between gap-3 mb-4 bg-white p-3 rounded-xl border border-stone-200 shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-stone-700">預覽視圖：</span>
              <div className="inline-flex rounded-lg border border-stone-200 p-0.5 bg-stone-100 text-xs">
                <button
                  onClick={() => setActivePageView(0)}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    activePageView === 0
                      ? 'bg-white text-stone-900 shadow-2xs font-bold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  全部頁面 ({totalCardPages} 頁)
                </button>
                {Array.from({ length: totalCardPages }, (_, i) => i + 1).map((pg) => (
                  <button
                    key={pg}
                    onClick={() => setActivePageView(pg)}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                      activePageView === pg
                        ? 'bg-white text-stone-900 shadow-2xs font-bold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    第 {pg} 頁
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-stone-500">
              <span className="flex items-center gap-1">
                <Scissors size={13} className="text-stone-400" />
                標準 A4 縱向 · 2×3 六人排版
              </span>
              <span className="text-stone-300">|</span>
              <span className="text-amber-800 font-medium">
                💡 點擊任何傷卡可直接修改傷情
              </span>
            </div>
          </div>

          {/* PDF Export Progress Bar */}
          {pdfProgress && (
            <div className="no-print w-full max-w-lg mb-4 bg-amber-50 border border-amber-200 rounded-lg p-3 shadow-xs">
              <div className="flex items-center justify-between text-xs font-bold text-amber-900 mb-1">
                <span>{pdfProgress.msg}</span>
                <span>{pdfProgress.percent}%</span>
              </div>
              <div className="w-full h-2 bg-amber-200/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-600 transition-all duration-200"
                  style={{ width: `${pdfProgress.percent}%` }}
                />
              </div>
            </div>
          )}

          {/* Printable Container */}
          <div
            id="print-container"
            className="w-full flex flex-col items-center gap-6"
          >
            {/* Show specific page or all pages */}
            {pagedCards.map((pageBatch, pIdx) => {
              const pageNumber = pIdx + 1;
              const isHiddenOnScreen = activePageView !== 0 && activePageView !== pageNumber;

              return (
                <div
                  key={`page-${pageNumber}`}
                  className={`w-full justify-center ${isHiddenOnScreen ? 'hidden print:flex' : 'flex'}`}
                >
                  <A4PrintSheet
                    pageIndex={pageNumber}
                    totalPages={totalCardPages}
                    cards={pageBatch}
                    settings={settings}
                    onEditCard={handleEditCard}
                    isPrintPreview={true}
                  />
                </div>
              );
            })}

            {/* Instructor Answer Key Pages (if enabled) */}
            {settings.includeAnswerSheet && (
              <div
                className={`w-full flex-col items-center ${
                  activePageView !== 0 && activePageView <= totalCardPages ? 'hidden print:flex' : 'flex'
                }`}
              >
                <div className="w-full flex justify-center shadow-xl my-6">
                  <InstructorAnswerKey cards={cards} />
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer - Hidden in print */}
      <footer className="no-print bg-white border-t border-stone-200 py-3 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            START 現場大量傷病患檢傷分類演練工具 · A4 縱向六人傷情排版產生器
          </div>
          <div className="text-[11px] text-stone-400">
            遵循標準 START 演練題庫 · 已排除孕婦情境 · 支援瀏覽器向量列印與 PDF 匯出
          </div>
        </div>
      </footer>

      {/* Card Editor Modal */}
      <CardEditorModal
        card={editingCard}
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSaveCard}
        onDelete={handleDeleteCard}
      />

      {/* Question Bank Explorer Modal */}
      <QuestionBankModal
        isOpen={isBankOpen}
        onClose={() => setIsBankOpen(false)}
        onAddCase={handleAddCardFromBank}
      />
    </div>
  );
}
