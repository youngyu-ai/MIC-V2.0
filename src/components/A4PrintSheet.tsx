import React from 'react';
import { TriageCard, PrintSettings } from '../types';
import { TriageCardView } from './TriageCardView';

interface A4PrintSheetProps {
  pageIndex: number;
  totalPages: number;
  cards: TriageCard[];
  settings: PrintSettings;
  onEditCard?: (card: TriageCard) => void;
  isPrintPreview?: boolean;
}

export const A4PrintSheet: React.FC<A4PrintSheetProps> = ({
  pageIndex,
  totalPages,
  cards,
  settings,
  onEditCard,
  isPrintPreview = false,
}) => {
  // Pad with empty cards up to 6 if needed
  const totalSlots = 6;
  const cardSlots: (TriageCard | null)[] = [...cards];
  while (cardSlots.length < totalSlots) {
    cardSlots.push(null);
  }

  return (
    <div
      className={`
        print-page-sheet relative bg-white mx-auto
        box-border flex flex-col justify-between
        ${isPrintPreview ? 'shadow-xl rounded-sm border border-stone-200 my-6' : ''}
      `}
      style={{
        width: '194mm',
        height: '280mm',
        maxHeight: '280mm',
        padding: '2mm',
        pageBreakAfter: pageIndex < totalPages ? 'always' : 'avoid',
        breakAfter: pageIndex < totalPages ? 'page' : 'avoid',
      }}
    >
      {/* Discreet Header on Sheet (for drill instructors) */}
      <div className="flex items-center justify-between text-[11px] text-stone-500 pb-1 mb-1 border-b border-stone-200">
        <div className="flex items-center gap-2">
          <span className="font-bold text-stone-700 tracking-wider">
            START 現場大量傷病檢傷演練卡 (縱向六人版)
          </span>
          <span className="text-stone-400">·</span>
          <span>A4 規格 (210×297mm)</span>
        </div>
        <div className="font-mono text-stone-500">
          第 {pageIndex} 頁 / 共 {totalPages} 頁
        </div>
      </div>

      {/* 2 Columns x 3 Rows Grid: EXACTLY 6 CARDS */}
      <div
        className="grid grid-cols-2 grid-rows-3 gap-2.5 flex-1 relative"
        style={{
          height: 'calc(100% - 24px)',
        }}
      >
        {cardSlots.map((card, idx) => {
          if (card) {
            return (
              <div key={card.id || idx} className="h-full w-full">
                <TriageCardView
                  card={card}
                  settings={settings}
                  onEdit={onEditCard}
                  interactive={!isPrintPreview}
                />
              </div>
            );
          }

          // Empty Slot (Placeholder for remaining slots on the page)
          return (
            <div
              key={`empty-${idx}`}
              className="h-full w-full border-2 border-dashed border-stone-200 rounded-lg p-4 flex flex-col items-center justify-center text-stone-300 text-xs select-none bg-stone-50/50"
            >
              <div className="font-mono text-sm font-semibold mb-1">
                空白備用格 #{pageIndex * 6 - 6 + idx + 1}
              </div>
              <p className="text-[11px] text-stone-400">現場演練手寫補充用</p>
            </div>
          );
        })}

        {/* Optional Scissor Cut Lines */}
        {settings.showCutLines && (
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
          >
            {/* Center vertical cut line */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 border-r border-dashed border-stone-300/60" />
            {/* Horizontal cut line 1 */}
            <div className="absolute left-0 right-0 top-1/3 -translate-y-1/2 border-b border-dashed border-stone-300/60" />
            {/* Horizontal cut line 2 */}
            <div className="absolute left-0 right-0 top-2/3 -translate-y-1/2 border-b border-dashed border-stone-300/60" />
          </div>
        )}
      </div>

      {/* Bottom Footer on Sheet */}
      <div className="pt-1 mt-1 border-t border-stone-200 flex items-center justify-between text-[10px] text-stone-400">
        <span>檢傷指引：呼吸(&gt;30或&lt;10)、循環(橈動脈/CRT&ge;2秒)、意識(執行指令)</span>
        <span>排除孕婦情境 · START 演練題庫</span>
      </div>
    </div>
  );
};
