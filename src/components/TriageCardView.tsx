import React from 'react';
import { TriageCard, PrintSettings } from '../types';

interface TriageCardViewProps {
  card: TriageCard;
  settings: PrintSettings;
  onEdit?: (card: TriageCard) => void;
  interactive?: boolean;
}

export const TriageCardView: React.FC<TriageCardViewProps> = ({
  card,
  settings,
  onEdit,
  interactive = false,
}) => {
  const getCategoryInfo = (cat: string) => {
    switch (cat) {
      case 'red':
        return {
          label: '紅色 (立即處置)',
          short: '紅',
          badgeBg: 'bg-red-600 text-white',
          borderAccent: 'border-l-4 border-l-red-600',
          dotBg: 'bg-red-600',
        };
      case 'yellow':
        return {
          label: '黃色 (延遲處置)',
          short: '黃',
          badgeBg: 'bg-amber-500 text-white',
          borderAccent: 'border-l-4 border-l-amber-500',
          dotBg: 'bg-amber-500',
        };
      case 'green':
        return {
          label: '綠色 (輕傷優先)',
          short: '綠',
          badgeBg: 'bg-emerald-600 text-white',
          borderAccent: 'border-l-4 border-l-emerald-600',
          dotBg: 'bg-emerald-600',
        };
      case 'black':
      default:
        return {
          label: '黑色 (死亡/無呼吸)',
          short: '黑',
          badgeBg: 'bg-stone-800 text-white',
          borderAccent: 'border-l-4 border-l-stone-800',
          dotBg: 'bg-stone-800',
        };
    }
  };

  const catInfo = getCategoryInfo(card.category);
  const isCentered = (settings.textAlign ?? 'center') === 'center';
  const delta = settings.fontSizeDelta ?? 3;

  // Calculated font sizes based on delta (+3)
  const titleSize = 17 + delta; // 20px
  const bulletSize = 13.5 + delta; // 16.5px

  return (
    <div
      onClick={() => interactive && onEdit?.(card)}
      className={`
        relative flex flex-col justify-between
        bg-[#f6f3e9] text-stone-900
        border border-[#ded8c7] rounded-lg p-3 sm:p-3.5
        box-border overflow-hidden
        h-full w-full select-text transition-all
        ${interactive ? 'hover:shadow-md hover:border-amber-400 cursor-pointer group' : ''}
      `}
      style={{
        backgroundColor: '#f6f3e9',
      }}
    >
      {/* Top Header: Demographics (Centered) + Badges */}
      <div>
        <div className={`relative flex items-center ${isCentered ? 'justify-center' : 'justify-between'}`}>
          {/* Card Serial Number */}
          {settings.showCardNumber && (
            <span
              className={`text-[11px] font-mono font-semibold text-stone-500 bg-stone-200/80 px-1.5 py-0.5 rounded ${
                isCentered ? 'absolute left-0 top-1/2 -translate-y-1/2' : ''
              }`}
            >
              #{String(card.serialNumber).padStart(2, '0')}
            </span>
          )}

          {/* Demographics Title (Centered & Font size +3) */}
          <h3
            className="font-extrabold text-stone-900 tracking-wide leading-tight text-center"
            style={{ fontSize: `${titleSize}px` }}
          >
            {card.demographics}
          </h3>

          {/* Answer Tag: Badge mode */}
          {settings.showAnswerTag && (
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded tracking-wide shadow-xs ${catInfo.badgeBg} ${
                isCentered ? 'absolute right-0 top-1/2 -translate-y-1/2' : ''
              }`}
            >
              {catInfo.label}
            </span>
          )}
        </div>

        {/* Reference Image Dotted Divider */}
        <div
          className="w-full my-2 border-b-2 border-dashed border-[#cbbfab]"
          aria-hidden="true"
        />

        {/* Clinical Bullets (Centered & Font size +3) */}
        <ul
          className={`space-y-1.5 text-stone-900 leading-snug ${
            isCentered ? 'text-center' : 'text-left'
          }`}
          style={{ fontSize: `${bulletSize}px` }}
        >
          {card.bullets.map((bullet, idx) => {
            const colonIdx = bullet.indexOf('：');
            const hasPrefix = colonIdx !== -1;
            const prefix = hasPrefix ? bullet.slice(0, colonIdx + 1) : '';
            const content = hasPrefix ? bullet.slice(colonIdx + 1) : bullet;

            return (
              <li
                key={idx}
                className={`flex items-start ${
                  isCentered ? 'justify-center text-center' : 'justify-start text-left'
                }`}
              >
                <span
                  className="text-[#8e8571] mr-1 font-bold select-none shrink-0 mt-0.5"
                  style={{ fontSize: `${bulletSize - 2}px` }}
                  aria-hidden="true"
                >
                  ▸
                </span>
                <span className="font-medium text-stone-900 break-words leading-snug">
                  {hasPrefix && (
                    <span className="font-bold text-stone-800">{prefix}</span>
                  )}
                  <span>{content}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Bottom Footer or Fold-tab guide */}
      <div className={`mt-2 pt-1.5 border-t border-dashed border-[#ded8c7]/80 flex items-center ${
        isCentered ? 'justify-between' : 'justify-between'
      } text-[11px] text-stone-500`}>
        <span className="font-mono text-[10.5px] tracking-wider text-stone-400 uppercase">
          START 檢傷卡 · #{String(card.serialNumber).padStart(2, '0')}
        </span>

        {!settings.showAnswerTag && (
          <span className="text-[10.5px] text-stone-400 italic">
            [演練卡 · 檢傷判讀]
          </span>
        )}

        {interactive && (
          <span className="text-[10.5px] text-stone-400 group-hover:text-amber-700 underline transition-colors">
            點擊編輯傷情
          </span>
        )}
      </div>
    </div>
  );
};
