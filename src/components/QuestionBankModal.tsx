import React, { useState } from 'react';
import { X, Search, Plus, Filter } from 'lucide-react';
import { RAW_RED_CASES, RAW_YELLOW_CASES, RAW_GREEN_CASES, RAW_BLACK_CASES, formatCaseBullets, RawCase } from '../data/triageCases';
import { TriageCard, TriageCategory } from '../types';

interface QuestionBankModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCase: (card: TriageCard) => void;
}

export const QuestionBankModal: React.FC<QuestionBankModalProps> = ({
  isOpen,
  onClose,
  onAddCase,
}) => {
  const [filterCat, setFilterCat] = useState<'all' | TriageCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const allCases: RawCase[] = [
    ...RAW_RED_CASES.filter((c) => !c.demographics.includes('孕婦')),
    ...RAW_YELLOW_CASES.filter((c) => !c.demographics.includes('孕婦')),
    ...RAW_GREEN_CASES.filter((c) => !c.demographics.includes('孕婦')),
    ...RAW_BLACK_CASES.filter((c) => !c.demographics.includes('孕婦')),
  ];

  const filtered = allCases.filter((c) => {
    if (filterCat !== 'all' && c.category !== filterCat) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.demographics.toLowerCase().includes(q) ||
        c.clinical.toLowerCase().includes(q) ||
        c.explanation.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleAdd = (raw: RawCase) => {
    const newCard: TriageCard = {
      id: `bank-${raw.category}-${raw.id}-${Date.now()}`,
      serialNumber: 0,
      category: raw.category,
      demographics: raw.demographics,
      age: raw.age,
      gender: raw.gender,
      bullets: formatCaseBullets(raw.clinical, raw.category),
      explanation: raw.explanation,
    };
    onAddCase(newCard);
  };

  const getBadge = (cat: TriageCategory) => {
    switch (cat) {
      case 'red':
        return <span className="bg-red-100 text-red-800 text-[11px] font-bold px-2 py-0.5 rounded">🔴 紅色 (立即)</span>;
      case 'yellow':
        return <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2 py-0.5 rounded">🟡 黃色 (延遲)</span>;
      case 'green':
        return <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded">🟢 綠色 (輕傷)</span>;
      case 'black':
      default:
        return <span className="bg-stone-200 text-stone-800 text-[11px] font-bold px-2 py-0.5 rounded">⚫ 黑色 (死亡)</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full h-[85vh] flex flex-col border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-stone-200 bg-stone-50">
          <div>
            <h2 className="font-bold text-stone-900 text-base">
              START 檢傷分類官方題庫總覽 (已排除孕婦情境)
            </h2>
            <p className="text-xs text-stone-500">
              收錄共 {allCases.length} 筆臨床演練傷情題庫，可挑選並直接加入列印名單
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="px-5 py-3 border-b border-stone-200 bg-white flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜尋年齡、性別、外傷徵象、骨折、橈動脈..."
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: '全部' },
              { id: 'red', label: '🔴 紅色 (32)' },
              { id: 'yellow', label: '🟡 黃色 (32)' },
              { id: 'green', label: '🟢 綠色 (40)' },
              { id: 'black', label: '⚫ 黑色 (40)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterCat(tab.id as any)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  filterCat === tab.id
                    ? 'bg-amber-800 text-white font-bold'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-stone-100 space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-stone-400 text-xs">
              沒有找到符合條件的傷情卡
            </div>
          ) : (
            filtered.map((item, idx) => (
              <div
                key={`${item.category}-${item.id}-${idx}`}
                className="pt-3 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-stone-50/70 p-2.5 rounded-lg transition-colors"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900 text-sm">
                      {item.demographics}
                    </span>
                    {getBadge(item.category)}
                    <span className="text-[11px] font-mono text-stone-400">
                      題庫 #{item.category === 'red' ? 'R' : item.category === 'yellow' ? 'Y' : item.category === 'green' ? 'G' : 'B'}-{String(item.id).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed font-sans">
                    {item.clinical}
                  </p>
                  <p className="text-[11px] text-stone-500">
                    <span className="font-semibold text-stone-600">判定依據：</span>
                    {item.explanation}
                  </p>
                </div>

                <div className="shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => handleAdd(item)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors shadow-2xs"
                  >
                    <Plus size={13} />
                    加入傷卡名冊
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs text-stone-500">
          <span>共顯示 {filtered.length} 題</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium bg-white border border-stone-300 rounded-lg text-stone-700 hover:bg-stone-100 transition-colors"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  );
};
