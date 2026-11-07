import React from 'react';
import { ASSETS, MAP_LOCATIONS, CHARACTERS } from '../game/data';
import { LocationId } from '../game/rules';

interface MapScreenProps {
  selectedLocation: LocationId;
  onSelectLocation: (loc: LocationId) => void;
  onPerformDailyAction: (action: '修煉' | '上課' | '接取任務' | '閒逛' | '休息') => void;
  onEnterLocationStory: (loc: LocationId) => void;
  onOpenModal: (modal: 'yujian' | 'characters' | 'relics' | 'cultivation' | 'stages' | 'formation' | 'overview') => void;
  onTriggerRescue: () => void;
  onPause: () => void;
  unreadCount: number;
  actionFeedback: string | null;
  daysWithoutMajorEvent: number;
  currentStageTitle: string;
}

export const MapScreen: React.FC<MapScreenProps> = ({
  selectedLocation,
  onSelectLocation,
  onPerformDailyAction,
  onEnterLocationStory,
  onOpenModal,
  onTriggerRescue,
  onPause,
  unreadCount,
  actionFeedback,
  daysWithoutMajorEvent,
  currentStageTitle,
}) => {
  const loc = MAP_LOCATIONS[selectedLocation];
  const guardian = CHARACTERS[loc.guardianHero] || CHARACTERS['四水若言'];

  const dailyActions: {
    id: '修煉' | '上課' | '接取任務' | '閒逛' | '休息';
    label: string;
    sub: string;
    iconPath: string;
  }[] = [
    {
      id: '修煉',
      label: '修煉',
      sub: '（提升修為）',
      iconPath: 'M12 3a3 3 0 100 6 3 3 0 000-6zm-5 9a5 5 0 0110 0v2h2a1 1 0 110 2H5a1 1 0 110-2h2v-2zm-2 6h14v2H5v-2z',
    },
    {
      id: '上課',
      label: '上課',
      sub: '（宗門課程）',
      iconPath: 'M4 5a2 2 0 012-2h12a2 2 0 012 2v14a1 1 0 01-1.447.894L12 16.618l-6.553 3.276A1 1 0 014 19V5z',
    },
    {
      id: '接取任務',
      label: '接取任務',
      sub: '（門派、委託）',
      iconPath: 'M9 2a1 1 0 000 2h6a1 1 0 100-2H9z M4 5a2 2 0 012-2 3 3 0 003 3h6a3 3 0 003-3 2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5z',
    },
    {
      id: '閒逛',
      label: '閒逛',
      sub: '（與同門互動）',
      iconPath: 'M18 8h1a4 4 0 010 8h-1v1a3 3 0 01-3 3H7a3 3 0 01-3-3V8h14zm0 2v4h1a2 2 0 100-4h-1z',
    },
    {
      id: '休息',
      label: '休息',
      sub: '（推進時間）',
      iconPath: 'M3 13V7a1 1 0 012 0v4h14V9a2 2 0 00-2-2h-6V5h6a4 4 0 014 4v9a1 1 0 01-2 0v-2H5v2a1 1 0 01-2 0v-5z',
    },
  ];

  return (
    <div
      data-testid="map-screen"
      className="relative h-full w-full overflow-hidden select-none"
    >
      {/* Panoramic Xianxia Cloud-Sea World Backdrop aligned 1:1 with Reference Image 7 */}
      <div
        className="absolute inset-0 transition-transform duration-500"
        style={{
          backgroundImage: `url(${ASSETS.mapSceneRef})`,
          backgroundSize: '100% 108%',
          backgroundPosition: 'center 95%',
        }}
      />
      {/* Subtle atmospheric vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 44% 48%, rgba(35,16,58,0.04) 0%, rgba(22,11,36,0.35) 85%, rgba(16,8,28,0.65) 100%)',
        }}
      />

      {/* Left Vertical Navigation Dock covering the left dock region of Reference Image 7 */}
      <nav
        aria-label="主功能選單"
        className="absolute top-[10.5%] left-2 z-30 flex w-[136px] flex-col rounded-2xl border-2 border-[#d4af37] bg-[#241336]/98 p-2 shadow-[0_10px_30px_rgba(0,0,0,0.85)]"
      >
        <button
          type="button"
          onClick={() => {}}
          className="mb-1.5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#fff2be] bg-gradient-to-r from-[#f7e4b5] via-[#fff5d6] to-[#e6c473] px-3 py-2.5 text-base font-bold text-[#381a4c] shadow-sm"
        >
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
          </svg>
          <span className="whitespace-nowrap">地圖</span>
        </button>

        <button
          type="button"
          onClick={() => onOpenModal('yujian')}
          className="relative flex w-full cursor-pointer items-center justify-between border-b border-[#d4af37]/25 px-3 py-3.5 text-left text-sm font-semibold text-[#f7e7c8] transition-colors hover:bg-[#3d2259]"
        >
          <span className="flex items-center gap-2 whitespace-nowrap">
            <svg className="h-4 w-4 fill-[#e5be5c]" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            玉簡
          </span>
          {unreadCount > 0 && (
            <span className="rounded-md bg-[#c93b3b] px-1.5 py-0.5 text-[11px] font-bold text-white tabular-nums">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => onOpenModal('characters')}
          className="flex w-full cursor-pointer items-center gap-2 border-b border-[#d4af37]/25 px-3 py-3.5 text-left text-sm font-semibold text-[#f7e7c8] transition-colors hover:bg-[#3d2259]"
        >
          <svg className="h-4 w-4 fill-[#e5be5c]" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
          </svg>
          <span className="whitespace-nowrap">人物</span>
        </button>

        <button
          type="button"
          onClick={() => onOpenModal('relics')}
          className="flex w-full cursor-pointer items-center gap-2 border-b border-[#d4af37]/25 px-3 py-3.5 text-left text-sm font-semibold text-[#f7e7c8] transition-colors hover:bg-[#3d2259]"
        >
          <svg className="h-4 w-4 fill-[#e5be5c]" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2L9 7h6l-3-5zm-6 7c-1.66 0-3 1.34-3 3v7c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3v-7c0-1.66-1.34-3-3-3H6z" />
          </svg>
          <span className="whitespace-nowrap">信物</span>
        </button>

        <button
          type="button"
          onClick={() => onOpenModal('cultivation')}
          className="flex w-full cursor-pointer items-center gap-2 border-b border-[#d4af37]/25 px-3 py-3.5 text-left text-sm font-semibold text-[#f7e7c8] transition-colors hover:bg-[#3d2259]"
        >
          <svg className="h-4 w-4 fill-[#e5be5c]" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3c-2.5 3.5-4 6.5-4 9a4 4 0 008 0c0-3-2.5-5.5-4-9zm-7 9c0 4 3.5 7 7 7s7-3 7-7c0-1-.3-2-.8-3-.7 2.5-2.5 4.5-6.2 4.5S6.5 11.5 5.8 9c-.5 1-.8 2-.8 3z" />
          </svg>
          <span className="whitespace-nowrap">修行</span>
        </button>

        <button
          type="button"
          onClick={() => onOpenModal('stages')}
          className="flex w-full cursor-pointer items-center gap-2 border-b border-[#d4af37]/25 px-3 py-3.5 text-left text-sm font-semibold text-[#f7e7c8] transition-colors hover:bg-[#3d2259]"
        >
          <svg className="h-4 w-4 fill-[#e5be5c]" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
          </svg>
          <span className="whitespace-nowrap">紀錄</span>
        </button>

        <button
          type="button"
          onClick={() => onOpenModal('overview')}
          className="flex w-full cursor-pointer items-center gap-2 border-b border-[#d4af37]/25 px-3 py-3.5 text-left text-sm font-semibold text-[#f7e7c8] transition-colors hover:bg-[#3d2259]"
        >
          <svg className="h-4 w-4 fill-[#e5be5c]" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2zm16 14H5V5h14v14zm-8-2h6v-2h-6v2zm0-4h6v-2h-6v2zm0-4h6V7h-6v2zM7 17h2v-2H7v2zm0-4h2v-2H7v2zm0-4h2V7H7v2z" />
          </svg>
          <span className="whitespace-nowrap">企劃</span>
        </button>

        <button
          type="button"
          onClick={onPause}
          className="flex w-full cursor-pointer items-center gap-2 px-3 py-3.5 text-left text-sm font-semibold text-[#f7e7c8] transition-colors hover:bg-[#3d2259]"
        >
          <svg className="h-4 w-4 fill-[#e5be5c]" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
          </svg>
          <span className="whitespace-nowrap">系統</span>
        </button>
      </nav>

      {/* Center Interactive Vertical Map Pins aligned 1:1 over the 7 plaques */}
      <div className="absolute inset-0 z-20">
        {(Object.keys(MAP_LOCATIONS) as LocationId[]).map((locKey) => {
          const item = MAP_LOCATIONS[locKey];
          const isSelected = selectedLocation === locKey;
          return (
            <button
              key={item.id}
              type="button"
              aria-label={`選擇地點 ${item.name}`}
              onClick={() => onSelectLocation(item.id)}
              style={{
                left: `${item.pinX}%`,
                top: `${item.pinY}%`,
              }}
              className={`group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-200 ${
                isSelected ? 'z-30 scale-110' : 'hover:-translate-y-[52%] hover:scale-105'
              }`}
            >
              {/* Ornate Vertical Plaque Pin */}
              <div
                className={`relative flex min-h-[168px] w-[58px] flex-col items-center justify-between rounded-xl border-2 px-3 py-3 shadow-[0_8px_22px_rgba(0,0,0,0.8)] transition-colors ${
                  isSelected
                    ? 'border-[#ffea9f] bg-gradient-to-b from-[#fff8e6] via-[#fcecc2] to-[#e9c87b] text-[#3b1c52] ring-4 ring-[#ffd166]/60'
                    : 'border-[#d4af37] bg-[#fcf6ea] text-[#381d4f] hover:border-[#fff3c4] hover:bg-[#fff9ef]'
                }`}
              >
                {/* Top Diamond Crest */}
                <span
                  aria-hidden="true"
                  className={`mb-1.5 flex h-5 w-5 rotate-45 items-center justify-center border border-[#d4af37] text-[10px] ${
                    isSelected ? 'bg-[#4a2566] text-[#ffd166]' : 'bg-[#5c327c] text-[#fff2be]'
                  }`}
                >
                  <span className="-rotate-45">❖</span>
                </span>

                {/* Vertical CJK Characters */}
                <span
                  className="text-xl font-black tracking-widest"
                  style={{
                    writingMode: 'vertical-rl',
                    textOrientation: 'upright',
                    letterSpacing: '0.18em',
                  }}
                >
                  {item.shortName}
                </span>

                {/* Bottom Diamond Pointer */}
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-3 w-3 rotate-45 border border-[#b58922] bg-[#d4af37]"
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Right Location Detail Card covering the right card region of Reference Image 7 */}
      <aside
        aria-label="地點詳情與活動面板"
        className="absolute top-2.5 right-2.5 bottom-2.5 z-30 flex w-[372px] flex-col justify-between rounded-2xl border-2 border-[#d4af37] bg-[#fdf8f0] p-6 text-[#331a47] shadow-[0_12px_36px_rgba(0,0,0,0.85)]"
      >
        <div>
          {/* Location Title Header */}
          <div className="mb-3.5 flex items-center justify-between border-b-2 border-[#d4af37]/70 pb-3">
            <div className="flex items-center gap-2.5">
              <svg className="h-7 w-7 fill-[#592b78]" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C9.5 6 7 9 7 12a5 5 0 0010 0c0-3-2.5-6-5-10zm-8 9c0 5 4 9 8 9s8-4 8-9c0-1.2-.4-2.4-1-3.5-.9 3-3.2 5.5-7 5.5s-6.1-2.5-7-5.5C4.4 8.6 4 9.8 4 11z" />
              </svg>
              <div>
                <h2 className="text-2xl font-black tracking-wide text-[#421f5c]">
                  {loc.name}
                </h2>
                <p className="text-xs font-semibold text-[#7d5a96]">
                  {loc.subtitle} · 駐守：{loc.guardianHero}
                </p>
              </div>
            </div>

            {/* Guardian Character Mini Avatar */}
            <button
              type="button"
              aria-label={`查看 ${guardian.name} 角色設定`}
              onClick={() => onOpenModal('characters')}
              title={`查看 ${guardian.name} 角色設定`}
              className="h-12 w-12 shrink-0 cursor-pointer overflow-hidden rounded-full border-2 border-[#d4af37] shadow-sm transition-transform hover:scale-105"
              style={{
                backgroundImage: `url(${guardian.sheetUrl})`,
                backgroundSize: guardian.avatarCrop.bgSize,
                backgroundPosition: guardian.avatarCrop.bgPosition,
              }}
            />
          </div>

          {/* Section Ribbon: 宗門簡介 */}
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-md bg-[#592b78] px-2.5 py-0.5 text-xs font-bold text-[#ffefd0]">
              宗門簡介
            </span>
            <span className="text-xs text-[#6e5082]">
              {loc.hasSignal ? '靈訊暢通' : '無訊號區 · 訊息累積中'}
            </span>
          </div>

          <p className="mb-4 text-sm leading-relaxed text-[#463157]">
            {loc.desc}
          </p>

          {/* Action Feedback Banner if an action was just performed */}
          {actionFeedback && (
            <div
              role="status"
              className="mb-3.5 rounded-lg border border-[#d4af37] bg-[#fff4d4] px-3 py-2 text-xs font-semibold leading-snug text-[#4a2263]"
            >
              {actionFeedback}
            </div>
          )}

          {/* Section Ribbon: 可進行活動 */}
          <div className="mb-2.5 flex items-center justify-between">
            <span className="rounded-md bg-[#592b78] px-2.5 py-0.5 text-xs font-bold text-[#ffefd0]">
              可進行活動
            </span>
            <span className="text-[11px] text-[#7b5d8f]">消耗 1 行動點</span>
          </div>

          {/* 5 Daily Action Buttons */}
          <div className="flex flex-col gap-2">
            {dailyActions.map((act) => (
              <button
                key={act.id}
                type="button"
                onClick={() => onPerformDailyAction(act.id)}
                className="group flex w-full cursor-pointer items-center justify-between rounded-xl border border-[#dccbb1] bg-white px-4 py-2.5 text-left text-sm font-bold text-[#381d4f] transition-all duration-150 hover:border-[#d4af37] hover:bg-[#fff6e3] hover:pl-5"
              >
                <span className="flex items-center gap-2.5 whitespace-nowrap">
                  <svg className="h-4 w-4 fill-[#592b78]" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={act.iconPath} />
                  </svg>
                  <span>{act.label}</span>
                  <span className="text-xs font-normal text-[#6f5682]">
                    {act.sub}
                  </span>
                </span>
                <span className="text-xs font-semibold text-[#a67c1e] opacity-80 group-hover:opacity-100">
                  {act.id === '休息' ? '+5 AP' : '-1 AP'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Primary CTA: → 前往此處 */}
        <button
          type="button"
          onClick={() => onEnterLocationStory(selectedLocation)}
          className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-[#d4af37] bg-gradient-to-r from-[#4b2569] via-[#68378f] to-[#4b2569] px-5 py-3.5 text-base font-extrabold text-[#fff4d6] shadow-[0_6px_18px_rgba(75,37,105,0.5)] transition-transform duration-150 hover:scale-[1.02] hover:brightness-110"
        >
          <span className="whitespace-nowrap">→ 前往此處 · {loc.chapterTag}</span>
        </button>
      </aside>

      {/* Bottom Current Objective & Emergency Rescue Bar */}
      <div className="absolute right-[388px] bottom-2.5 left-[235px] z-30 flex items-center justify-between gap-3 rounded-xl border-2 border-[#d4af37] bg-[#fcf6eb] px-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.85)]">
        <div className="flex min-w-0 items-center gap-3">
          <span className="shrink-0 rounded-md bg-[#592b78] px-2.5 py-1 text-xs font-bold text-[#ffefd0]">
            當前目標
          </span>
          <span className="truncate text-sm font-bold text-[#381d4f]">
            {currentStageTitle}（點擊右側「前往此處」或地標觸發劇情）
          </span>
          <span className="hidden shrink-0 text-xs text-[#7d5a96] xl:inline">
            · 若言定律：{daysWithoutMajorEvent}/3 日平靜
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => onOpenModal('formation')}
            className="cursor-pointer rounded-lg border border-[#d4af37] bg-[#f7e7c4] px-3 py-1 text-xs font-bold text-[#421f5c] transition-colors hover:bg-[#edd298] whitespace-nowrap"
          >
            ☸ 十階困陣演練
          </button>
          <button
            type="button"
            onClick={onTriggerRescue}
            className="cursor-pointer rounded-lg border border-[#c93b3b] bg-[#8f2424] px-3 py-1 text-xs font-bold text-[#fff2e6] shadow-sm transition-transform hover:scale-105 hover:bg-[#a82b2b] whitespace-nowrap"
          >
            🚨 喊「師姐救我！」
          </button>
        </div>
      </div>
    </div>
  );
};
