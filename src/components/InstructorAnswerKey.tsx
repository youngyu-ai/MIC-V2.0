import React from 'react';
import { TriageCard } from '../types';

interface InstructorAnswerKeyProps {
  cards: TriageCard[];
}

export const InstructorAnswerKey: React.FC<InstructorAnswerKeyProps> = ({ cards }) => {
  const getBadge = (cat: string) => {
    switch (cat) {
      case 'red':
        return <span className="text-red-700 font-bold bg-red-100 px-1.5 py-0.5 rounded text-[11px]">🔴 紅色 (立即)</span>;
      case 'yellow':
        return <span className="text-amber-800 font-bold bg-amber-100 px-1.5 py-0.5 rounded text-[11px]">🟡 黃色 (延遲)</span>;
      case 'green':
        return <span className="text-emerald-800 font-bold bg-emerald-100 px-1.5 py-0.5 rounded text-[11px]">🟢 綠色 (輕傷)</span>;
      case 'black':
      default:
        return <span className="text-stone-800 font-bold bg-stone-200 px-1.5 py-0.5 rounded text-[11px]">⚫ 黑色 (死亡)</span>;
    }
  };

  // Group into pages of up to 16 items per page
  const chunkSize = 16;
  const pages: TriageCard[][] = [];
  for (let i = 0; i < cards.length; i += chunkSize) {
    pages.push(cards.slice(i, i + chunkSize));
  }

  return (
    <>
      {pages.map((pageCards, pIdx) => (
        <div
          key={`answer-page-${pIdx}`}
          className="print-page-sheet bg-white p-4 box-border flex flex-col justify-between"
          style={{
            width: '194mm',
            height: '280mm',
            maxHeight: '280mm',
            pageBreakAfter: pIdx < pages.length - 1 ? 'always' : 'avoid',
            breakAfter: pIdx < pages.length - 1 ? 'page' : 'avoid',
          }}
        >
          <div>
            <div className="flex items-center justify-between pb-2 border-b-2 border-stone-800">
              <div>
                <h2 className="text-lg font-bold text-stone-900 tracking-wide">
                  【教官/考官專用】START 檢傷分類標準答案對照名冊
                </h2>
                <p className="text-xs text-stone-500">
                  演練評核依據 · 共 {cards.length} 位傷患 · 頁次 {pIdx + 1} / {pages.length}
                </p>
              </div>
              <div className="text-xs font-mono text-stone-400">
                A4 參考對照存檔
              </div>
            </div>

            <table className="w-full text-left text-xs border-collapse mt-3">
              <thead>
                <tr className="bg-stone-100 border-b border-stone-300 text-stone-700">
                  <th className="py-1.5 px-2 w-12 text-center">編號</th>
                  <th className="py-1.5 px-2 w-28">對象資料</th>
                  <th className="py-1.5 px-2 w-28">檢傷等級</th>
                  <th className="py-1.5 px-2">臨床判讀關鍵指標與依據</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {pageCards.map((card) => (
                  <tr key={card.id} className="hover:bg-stone-50">
                    <td className="py-2 px-2 text-center font-mono font-bold text-stone-600">
                      #{String(card.serialNumber).padStart(2, '0')}
                    </td>
                    <td className="py-2 px-2 font-medium text-stone-900">
                      {card.demographics}
                    </td>
                    <td className="py-2 px-2">
                      {getBadge(card.category)}
                    </td>
                    <td className="py-2 px-2 text-stone-600 leading-snug">
                      {card.explanation || card.bullets.join('；')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-2 border-t border-stone-200 text-[10px] text-stone-400 flex justify-between">
            <span>START: 1.自行行走(綠) 2.呼吸無(黑)/過速過慢(紅) 3.脈搏/CRT≥2s(紅) 4.指令無法遵從(紅) 5.其餘(黃)</span>
            <span>已排除孕婦情境</span>
          </div>
        </div>
      ))}
    </>
  );
};
