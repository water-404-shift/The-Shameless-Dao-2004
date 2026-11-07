import React from 'react';
import { ASSETS, CHARACTERS } from '../game/data';

interface TitleScreenProps {
  onStartGame: (initialMode?: 'map' | 'shura' | 'codex') => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({ onStartGame }) => {
  const heroList = [
    CHARACTERS['四水若言'],
    CHARACTERS['容九淵'],
    CHARACTERS['陸長安'],
    CHARACTERS['蘇知弦'],
    CHARACTERS['葉聽禪'],
  ];

  return (
    <div
      data-testid="title-screen"
      className="relative flex h-full w-full flex-col justify-between overflow-hidden select-none"
      style={{
        background:
          'radial-gradient(circle at 72% 42%, rgba(92, 48, 128, 0.55) 0%, rgba(28, 15, 43, 0.96) 65%, #12091c 100%)',
      }}
    >
      {/* Subtle Illustrated Backdrop on Right 60%, leaving Left 40% Calm Negative Space */}
      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          backgroundImage: `url(${ASSETS.mapSceneRef})`,
          backgroundSize: '165% auto',
          backgroundPosition: '46% 36%',
          maskImage:
            'linear-gradient(90deg, transparent 10%, rgba(0,0,0,0.35) 42%, rgba(0,0,0,0.92) 100%)',
          WebkitMaskImage:
            'linear-gradient(90deg, transparent 10%, rgba(0,0,0,0.35) 42%, rgba(0,0,0,0.92) 100%)',
        }}
      />

      {/* Top Subtle Ornamental Corner Frame */}
      <div className="pointer-events-none relative z-20 flex items-center justify-between px-10 pt-7">
        <div className="flex items-center gap-3 text-xs tracking-widest text-[#e6d2b5]/80">
          <span>太清宗 · 梵音谷 · 合歡宗 · 魔域</span>
          <span aria-hidden="true">·</span>
          <span>八千年天道之謎</span>
        </div>
        <div className="text-xs text-[#e6d2b5]/75">
          東方仙俠 · 戀愛養成 · 喜劇視覺小說
        </div>
      </div>

      {/* Main Asymmetric Split: Left 42% Negative Space with Bespoke SVG Emblem & CTAs, Right 58% Hero Showcase */}
      <div className="relative z-20 mx-auto flex w-full max-w-[1360px] flex-1 items-center justify-between gap-8 px-10">
        {/* Left Column: Bespoke Inline SVG Title Lockup + <= 3 Actions */}
        <div className="flex max-w-[500px] flex-col items-start">
          {/* Bespoke Inline SVG Title Emblem for 《賤修》 */}
          <svg
            viewBox="0 0 440 165"
            className="mb-4 h-auto w-[390px] drop-shadow-[0_8px_24px_rgba(0,0,0,0.75)]"
            role="img"
            aria-label="賤修 遊戲標題徽章"
          >
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff3c4" />
                <stop offset="45%" stopColor="#e5be5c" />
                <stop offset="100%" stopColor="#9e7220" />
              </linearGradient>
              <linearGradient id="foxGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f5d0fe" />
                <stop offset="100%" stopColor="#fde68a" />
              </linearGradient>
            </defs>

            {/* Ten-Rank Formation Compass Ring behind emblem */}
            <circle
              cx="86"
              cy="82"
              r="62"
              fill="rgba(42, 20, 64, 0.55)"
              stroke="url(#goldGrad)"
              strokeWidth="1.75"
              strokeDasharray="6 4"
            />
            <circle
              cx="86"
              cy="82"
              r="50"
              fill="none"
              stroke="url(#goldGrad)"
              strokeWidth="1"
              opacity="0.65"
            />
            <polygon
              points="86,24 136,108 36,108"
              fill="none"
              stroke="url(#goldGrad)"
              strokeWidth="1"
              opacity="0.45"
            />
            <polygon
              points="86,140 136,56 36,56"
              fill="none"
              stroke="url(#goldGrad)"
              strokeWidth="1"
              opacity="0.45"
            />

            {/* Ornamental Fox Silhouette & Tail Swirl */}
            <path
              d="M275 118 C320 128, 365 104, 382 62 C390 42, 375 24, 358 34 C370 50, 355 86, 315 96 C295 101, 280 98, 266 90 Z"
              fill="url(#foxGrad)"
              opacity="0.88"
            />
            <path
              d="M342 42 L348 22 L358 35 L370 24 L368 44 C362 54, 348 52, 342 42 Z"
              fill="#fff3c4"
            />

            {/* Main Calligraphy Display Characters: 賤修 */}
            <text
              x="44"
              y="112"
              fill="url(#goldGrad)"
              fontFamily="'Noto Serif TC', serif"
              fontWeight="900"
              fontSize="92"
              letterSpacing="8"
            >
              賤修
            </text>

            {/* Underline Gold Filigree Flourish */}
            <path
              d="M36 134 L388 134"
              stroke="url(#goldGrad)"
              strokeWidth="2"
            />
            <circle cx="36" cy="134" r="4" fill="#e5be5c" />
            <polygon points="212,128 220,134 212,140 204,134" fill="#fff3c4" />
            <circle cx="388" cy="134" r="4" fill="#e5be5c" />

            <text
              x="48"
              y="156"
              fill="#f5e1be"
              fontFamily="'Noto Serif TC', serif"
              fontWeight="600"
              fontSize="14"
              letterSpacing="5"
            >
              太清陣奇 · 四水若言的修真海王錄
            </text>
          </svg>

          <p className="mb-7 max-w-[44ch] text-base leading-relaxed text-[#ece0d1]/90">
            「修仙嘛，當然是要玩得盡興！」——扮演築基期便能獨立布下十階大陣的太清宗奇才四水若言，在宗門門規、999+玉簡轟炸與四位男主的修羅場之間，揭開延續八千年的天道真相。
          </p>

          {/* Primary & Secondary Actions (<= 3 menu actions total) */}
          <div className="flex w-full max-w-[380px] flex-col gap-3.5">
            <button
              type="button"
              data-start="true"
              onClick={(e) => {
                e.currentTarget.blur();
                onStartGame('map');
              }}
              className="group relative flex w-full cursor-pointer items-center justify-between rounded-lg border-2 border-[#e5be5c] bg-[#4a2566] px-6 py-3.5 text-left text-lg font-bold text-[#fff4d6] shadow-[0_8px_24px_rgba(0,0,0,0.65)] transition-transform duration-150 hover:scale-[1.02] hover:bg-[#5c2f7e] focus-visible:ring-2 focus-visible:ring-[#fff3c4] focus-visible:outline-none"
            >
              <span className="whitespace-nowrap">開始修仙 · 踏入雲海地圖</span>
              <span className="text-sm font-normal text-[#e5be5c] transition-transform duration-150 group-hover:translate-x-1">
                Enter ↵
              </span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.currentTarget.blur();
                onStartGame('shura');
              }}
              className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-[#d4af37]/75 bg-[#261438]/90 px-5 py-2.5 text-left text-sm font-semibold text-[#f3e3c3] transition-colors duration-150 hover:border-[#fff3c4] hover:bg-[#381d52] focus-visible:ring-2 focus-visible:ring-[#fff3c4] focus-visible:outline-none"
            >
              <span className="whitespace-nowrap">直入第四章 · 秘境花月庭修羅場</span>
              <span className="text-xs text-[#d4af37]">經典劇情 →</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.currentTarget.blur();
                onStartGame('codex');
              }}
              className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-[#d4af37]/50 bg-[#1c0e2b]/85 px-5 py-2.5 text-left text-sm font-semibold text-[#dfd0b8] transition-colors duration-150 hover:border-[#d4af37] hover:bg-[#2c1742] focus-visible:ring-2 focus-visible:ring-[#fff3c4] focus-visible:outline-none"
            >
              <span className="whitespace-nowrap">角色設定圖集 · 七階段企劃總覽</span>
              <span className="text-xs text-[#d4af37]/90">原畫賞味 →</span>
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Hero Stand Showcase with Clean Portrait Cropping */}
        <div className="hidden lg:flex lg:items-end lg:gap-3.5">
          {heroList.map((char, i) => (
            <button
              key={char.id}
              type="button"
              aria-label={`開始遊戲並認識 ${char.name}`}
              onClick={() => onStartGame('map')}
              className="group relative h-[410px] w-[142px] cursor-pointer overflow-hidden rounded-xl border-2 border-[#d4af37]/85 bg-[#231234] text-left shadow-[0_12px_30px_rgba(0,0,0,0.75)] transition-transform duration-200 hover:-translate-y-2"
              style={{
                transform: i === 0 ? 'translateY(-10px)' : undefined,
              }}
            >
              <img
                src={char.sheetUrl}
                alt={char.name}
                referrerPolicy="no-referrer"
                className="pointer-events-none max-w-none transition-transform duration-300 group-hover:scale-105"
                style={{
                  width: '198%',
                  marginLeft: '-4%',
                  marginTop: '-88%',
                }}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#12081c] via-[#12081c]/90 to-transparent p-3 pt-12">
                <div className="text-xs font-semibold text-[#e5be5c]">
                  {char.faction}
                </div>
                <div className="text-base font-bold text-[#fff5e1]">
                  {char.name}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Safe Margin: Single flat, borderless inline control hint line */}
      <div className="relative z-20 flex items-center justify-between px-10 pb-5 text-xs text-[#d8c7b0]/75">
        <span>
          Enter / Space 開始遊戲與推進對話 · 1-3 選擇劇情分支 · R 呼喊「師姐救我！」 · M 靜音 · Esc / P 暫停
        </span>
        <span className="tabular-nums">太清宗陣法堂 · 築基後期 · 十階大陣</span>
      </div>
    </div>
  );
};
