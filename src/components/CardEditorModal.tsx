import React, { useState, useEffect } from 'react';
import { TriageCard, TriageCategory } from '../types';
import { X, RefreshCw, Trash2, Check } from 'lucide-react';
import { RAW_RED_CASES, RAW_YELLOW_CASES, RAW_GREEN_CASES, RAW_BLACK_CASES, formatCaseBullets } from '../data/triageCases';

interface CardEditorModalProps {
  card: TriageCard | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: TriageCard) => void;
  onDelete: (cardId: string) => void;
}

export const CardEditorModal: React.FC<CardEditorModalProps> = ({
  card,
  isOpen,
  onClose,
  onSave,
  onDelete,
}) => {
  if (!isOpen || !card) return null;

  const [category, setCategory] = useState<TriageCategory>(card.category);
  const [demographics, setDemographics] = useState(card.demographics);
  const [bulletText, setBulletText] = useState(card.bullets.join('\n'));
  const [explanation, setExplanation] = useState(card.explanation || '');

  useEffect(() => {
    if (card) {
      setCategory(card.category);
      setDemographics(card.demographics);
      setBulletText(card.bullets.join('\n'));
      setExplanation(card.explanation || '');
    }
  }, [card]);

  const handleSwapRandom = () => {
    let pool = RAW_RED_CASES;
    if (category === 'yellow') pool = RAW_YELLOW_CASES;
    if (category === 'green') pool = RAW_GREEN_CASES;
    if (category === 'black') pool = RAW_BLACK_CASES;

    const filtered = pool.filter((c) => !c.demographics.includes('孕婦') && !c.clinical.includes('孕婦'));
    const randomPick = filtered[Math.floor(Math.random() * filtered.length)];
    if (randomPick) {
      setDemographics(randomPick.demographics);
      const newBullets = formatCaseBullets(randomPick.clinical, category);
      setBulletText(newBullets.join('\n'));
      setExplanation(randomPick.explanation);
    }
  };

  const handleSave = () => {
    const lines = bulletText
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);

    const ageMatch = demographics.match(/(\d+)\s*歲/);
    const parsedAge = ageMatch ? parseInt(ageMatch[1], 10) : card.age;
    const parsedGender: '男性' | '女性' = demographics.includes('女') ? '女性' : '男性';

    onSave({
      ...card,
      category,
      demographics,
      age: parsedAge,
      gender: parsedGender,
      bullets: lines,
      explanation,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2">
            <span className="font-bold text-stone-900 text-base">
              編輯傷患卡 #{String(card.serialNumber).padStart(2, '0')}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Triage Category Selector */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              檢傷分類判定
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { cat: 'red', label: '🔴 紅色 (立即)', color: 'border-red-500 bg-red-50 text-red-700' },
                { cat: 'yellow', label: '🟡 黃色 (延遲)', color: 'border-amber-500 bg-amber-50 text-amber-800' },
                { cat: 'green', label: '🟢 綠色 (輕傷)', color: 'border-emerald-500 bg-emerald-50 text-emerald-800' },
                { cat: 'black', label: '⚫ 黑色 (死亡)', color: 'border-stone-600 bg-stone-100 text-stone-800' },
              ].map((item) => (
                <button
                  key={item.cat}
                  type="button"
                  onClick={() => setCategory(item.cat as TriageCategory)}
                  className={`py-2 px-1 text-xs font-semibold rounded-lg border-2 text-center transition-all ${
                    category === item.cat
                      ? `${item.color} shadow-xs font-bold`
                      : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Demographics */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-stone-700">
                基本資料 (年齡、性別)
              </label>
              <button
                type="button"
                onClick={handleSwapRandom}
                className="inline-flex items-center gap-1 text-[11px] text-amber-800 hover:text-amber-900 font-medium hover:underline"
              >
                <RefreshCw size={12} />
                隨機換一題官方題庫
              </button>
            </div>
            <input
              type="text"
              value={demographics}
              onChange={(e) => setDemographics(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="例如：6歲，男性"
            />
          </div>

          {/* Bullets content */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              傷情徵候清單 (每行一條，會自動加上 ▸ 箭頭)
            </label>
            <textarea
              rows={5}
              value={bulletText}
              onChange={(e) => setBulletText(e.target.value)}
              className="w-full px-3 py-2 text-sm font-mono border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed"
              placeholder="無法自行行走&#10;有自主呼吸，呼吸速率 13 次/分&#10;橈動脈搏動：可觸及&#10;微血管充填時間：2.4 秒"
            />
            <p className="text-[11px] text-stone-400 mt-1">
              提示：可包含「行走能力」、「呼吸狀態」、「脈搏博動」、「微血管充填時間」、「意識狀態」、「外觀傷勢」
            </p>
          </div>

          {/* Clinical Rationale */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              判定理由 (供教官解答名冊使用)
            </label>
            <input
              type="text"
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="例如：呼吸 > 30 次/分，符合紅色重傷立即處理標準"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-stone-200 bg-stone-50">
          <button
            type="button"
            onClick={() => {
              if (confirm('確定要刪除這張傷患卡嗎？')) {
                onDelete(card.id);
                onClose();
              }
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={14} />
            刪除卡片
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-800 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors"
            >
              取消
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-amber-700 hover:bg-amber-850 rounded-lg transition-colors shadow-xs"
            >
              <Check size={14} />
              儲存更新
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
