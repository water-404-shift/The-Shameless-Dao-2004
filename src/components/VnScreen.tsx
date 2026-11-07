import React, { useEffect } from 'react';
import {
  ASSETS,
  CHARACTERS,
  DialogueChoice,
  StoryScript,
} from '../game/data';

interface VnScreenProps {
  script: StoryScript;
  lineIndex: number;
  autoPlay: boolean;
  onAdvance: () => void;
  onSelectChoice: (choice: DialogueChoice) => void;
  onToggleAuto: () => void;
  onSkipToChoiceOrEnd: () => void;
  onOpenLog: () => void;
  onSaveGame: () => void;
  onLoadGame: () => void;
  onOpenConfig: () => void;
  onReturnToMap: () => void;
  onTriggerRescue: () => void;
  onInspectCharacter: (charName: string) => void;
}

export const VnScreen: React.FC<VnScreenProps> = ({
  script,
  lineIndex,
  autoPlay,
  onAdvance,
  onSelectChoice,
  onToggleAuto,
  onSkipToChoiceOrEnd,
  onOpenLog,
  onSaveGame,
  onLoadGame,
  onOpenConfig,
  onReturnToMap,
  onTriggerRescue,
  onInspectCharacter,
}) => {
  const currentLine = script.lines[lineIndex] || script.lines[0];
  const hasChoices = Boolean(currentLine?.choices && currentLine.choices.length > 0);

  // Auto-play timer
  useEffect(() => {
    if (!autoPlay || hasChoices) return;
    const timer = window.setTimeout(() => {
      onAdvance();
    }, 2600);
    return () => window.clearTimeout(timer);
  }, [autoPlay, hasChoices, lineIndex, onAdvance]);

  if (!currentLine) return null;

  return (
    <div
      data-testid="vn-screen"
      className="relative flex h-full w-full flex-col justify-between overflow-hidden select-none"
    >
      {/* Clean Scenic Xianxia Architecture & Blossom Backdrop (free of baked-in UI text) */}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          backgroundImage: `url(${ASSETS.mapSceneRef})`,
          backgroundSize: '180% auto',
          backgroundPosition:
            currentLine.backdrop === 'shura' ? '34% 38%' : '48% 24%',
          filter: 'brightness(0.88) saturate(1.12)',
        }}
      />

      {/* Measured atmospheric scrim for crisp character & dialogue legibility */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(30,14,48,0.65) 0%, rgba(36,16,56,0.28) 45%, rgba(20,9,32,0.92) 85%, #140920 100%)',
        }}
      />

      {/* Top Sub-bar: Chapter Title Banner + Quick Rescue & Return Controls */}
      <div className="relative z-20 flex items-center justify-between px-6 pt-3">
        <div className="flex items-center gap-3 rounded-full border-2 border-[#d4af37] bg-[#fcf6eb]/95 px-5 py-1.5 shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
          <span className="text-sm text-[#b83749]" aria-hidden="true">
            ❖
          </span>
          <span className="text-sm font-extrabold tracking-wide text-[#3d1e54]">
            {script.chapterTitle}
          </span>
          <span className="text-xs text-[#7d5a96]">· {script.locationLabel}</span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onTriggerRescue}
            className="cursor-pointer rounded-full border border-[#ff9b9b] bg-[#8f2424]/95 px-4 py-1.5 text-xs font-bold text-[#fff2e6] shadow-md transition-transform hover:scale-105 hover:bg-[#ad2b2b] whitespace-nowrap"
          >
            🚨 喊「師姐救我！」
          </button>
          <button
            type="button"
            onClick={onReturnToMap}
            className="cursor-pointer rounded-full border border-[#d4af37] bg-[#2a153d]/90 px-4 py-1.5 text-xs font-bold text-[#ffefd0] shadow-md transition-colors hover:bg-[#41215e] whitespace-nowrap"
          >
            🗺️ 返回雲海地圖
          </button>
        </div>
      </div>

      {/* Stage Characters Layer (Cropped from the 5 Official Character Sheets with faces centered) */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1220px] flex-1 items-end justify-center gap-7 px-8 pb-6">
        {currentLine.stageChars.map((charName) => {
          const profile = CHARACTERS[charName];
          if (!profile) return null;
          const isSpeaking =
            currentLine.activeChar === charName ||
            currentLine.speaker === charName;

          return (
            <button
              key={charName}
              type="button"
              aria-label={`查看 ${charName} 完整角色設定圖`}
              onClick={() => onInspectCharacter(charName)}
              title={`點擊查看 ${charName} 完整角色設定圖`}
              className={`group relative flex cursor-pointer flex-col items-center text-left transition-all duration-300 ${
                isSpeaking
                  ? 'z-20 -translate-y-2 scale-105 opacity-100'
                  : 'z-10 scale-95 opacity-80 hover:opacity-95'
              }`}
            >
              {/* Ornate Portrait Stand Frame */}
              <div
                className={`relative h-[370px] w-[245px] overflow-hidden rounded-2xl border-2 transition-shadow duration-300 ${
                  isSpeaking
                    ? 'border-[#ffea9f] bg-[#241236] shadow-[0_0_32px_rgba(255,215,102,0.6)]'
                    : 'border-[#d4af37]/75 bg-[#1b0d29] shadow-[0_10px_25px_rgba(0,0,0,0.7)]'
                }`}
              >
                {/* Character Full-Body Crop from Official Sheet (Crops out top 18% header & right 42% text) */}
                <img
                  src={profile.sheetUrl}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="pointer-events-none max-w-none transition-transform duration-300 group-hover:scale-105"
                  style={{
                    width: '192%',
                    marginLeft: '-3%',
                    marginTop: '-86%',
                  }}
                />

                {/* Top-Right Expression Close-up Inset */}
                <div
                  className="pointer-events-none absolute top-2.5 right-2.5 h-14 w-14 overflow-hidden rounded-xl border-2 border-[#d4af37] bg-[#2a153d] shadow-md"
                  style={{
                    backgroundImage: `url(${profile.sheetUrl})`,
                    backgroundSize: profile.avatarCrop.bgSize,
                    backgroundPosition: profile.avatarCrop.bgPosition,
                  }}
                />

                {/* Bottom Character Nameplate inside Stand */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#140921] via-[#140921]/90 to-transparent px-4 pt-10 pb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-black text-[#fff5df]">
                      {profile.name}
                    </span>
                    <span className="text-xs font-semibold text-[#e5be5c]">
                      {profile.faction}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Center Branching Choices Overlay (matching Reference Image 9 ornate parchment-gold bars) */}
      {hasChoices && currentLine.choices && (
        <div
          role="group"
          aria-label="劇情抉擇選項"
          className="absolute inset-x-0 bottom-[210px] z-30 flex flex-col items-center gap-3 px-6"
        >
          {currentLine.choices.map((choice, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectChoice(choice)}
              className="group flex w-full max-w-[640px] cursor-pointer items-center justify-between rounded-full border-2 border-[#d4af37] bg-gradient-to-r from-[#fcf7ef] via-[#fff9f0] to-[#f7ead6] px-7 py-3 text-left text-base font-extrabold text-[#381a4c] shadow-[0_8px_28px_rgba(0,0,0,0.85)] transition-all duration-150 hover:scale-[1.02] hover:border-[#fff3c4] hover:from-[#ffeaa7] hover:to-[#fff6d6]"
            >
              <span className="flex items-center gap-3">
                <span className="text-[#c93b3b]" aria-hidden="true">
                  ❖
                </span>
                <span>{choice.text}</span>
              </span>
              <span className="ml-3 shrink-0 text-xs font-semibold text-[#8c6218] group-hover:text-[#381a4c]">
                快捷鍵 [{idx + 1}]
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Bottom Dialogue Box & VN Controls (matching Reference Images 8 & 9) */}
      <div className="relative z-30 mx-auto w-full max-w-[1220px] px-6 pb-3">
        {/* Ornate Lavender-Parchment Dialogue Frame */}
        <div
          role="button"
          tabIndex={0}
          aria-label="推進劇情對話"
          onClick={() => {
            if (!hasChoices) onAdvance();
          }}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && !hasChoices) {
              e.preventDefault();
              onAdvance();
            }
          }}
          className={`relative min-h-[138px] w-full rounded-2xl border-2 border-[#d4af37] bg-gradient-to-b from-[#fcf8f3]/96 via-[#f8eff9]/96 to-[#efe1f5]/96 px-9 pt-7 pb-5 shadow-[0_10px_35px_rgba(0,0,0,0.78)] ${
            hasChoices ? 'cursor-default' : 'cursor-pointer'
          }`}
        >
          {/* Speaker Nameplate Ribbon */}
          <div className="absolute -top-4 left-8 flex items-center gap-2 rounded-full border-2 border-[#d4af37] bg-gradient-to-r from-[#4b2569] via-[#68378f] to-[#4b2569] px-6 py-1 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            <span className="text-xs text-[#ffd166]" aria-hidden="true">
              ❖
            </span>
            <span className="text-base font-black tracking-wider text-[#fff5df]">
              {currentLine.speaker}
            </span>
            {currentLine.speakerTitle && (
              <span className="text-xs font-normal text-[#e6c994]">
                · {currentLine.speakerTitle}
              </span>
            )}
          </div>

          {/* Dialogue Text Content */}
          <p className="mt-1 text-xl font-bold leading-relaxed tracking-wide text-[#2d143d]">
            {currentLine.text}
          </p>

          {/* Bottom-Right Continue Indicator & Step Counter */}
          <div className="mt-3 flex items-center justify-between text-xs font-semibold text-[#7b5891]">
            <span>
              段落 {lineIndex + 1} / {script.lines.length}
            </span>
            {!hasChoices && (
              <span className="flex items-center gap-1.5 text-[#592b78]">
                <span>點擊或按 Space / Enter 繼續</span>
                <span className="inline-block text-sm">▼</span>
              </span>
            )}
          </div>
        </div>

        {/* Bottom VN Control Strip (matching Reference Image 9 capsules) */}
        <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2.5">
          <button
            type="button"
            onClick={onToggleAuto}
            className={`cursor-pointer rounded-full border px-4 py-1 text-xs font-bold shadow-sm transition-colors whitespace-nowrap ${
              autoPlay
                ? 'border-[#fff2be] bg-[#d4af37] text-[#2b143d]'
                : 'border-[#d4af37]/80 bg-[#fcf6eb]/90 text-[#421f5c] hover:bg-[#fff2d6]'
            }`}
          >
            ▶ 自動 (Auto){autoPlay ? ' · 開啟中' : ''}
          </button>

          <button
            type="button"
            onClick={onSkipToChoiceOrEnd}
            className="cursor-pointer rounded-full border border-[#d4af37]/80 bg-[#fcf6eb]/90 px-4 py-1 text-xs font-bold text-[#421f5c] shadow-sm transition-colors hover:bg-[#fff2d6] whitespace-nowrap"
          >
            ⏩ 快轉 (Skip)
          </button>

          <button
            type="button"
            onClick={onOpenLog}
            className="cursor-pointer rounded-full border border-[#d4af37]/80 bg-[#fcf6eb]/90 px-4 py-1 text-xs font-bold text-[#421f5c] shadow-sm transition-colors hover:bg-[#fff2d6] whitespace-nowrap"
          >
            📖 履歷 (Log)
          </button>

          <button
            type="button"
            onClick={onSaveGame}
            className="cursor-pointer rounded-full border border-[#d4af37]/80 bg-[#fcf6eb]/90 px-4 py-1 text-xs font-bold text-[#421f5c] shadow-sm transition-colors hover:bg-[#fff2d6] whitespace-nowrap"
          >
            ⬇ 存檔 (Save)
          </button>

          <button
            type="button"
            onClick={onLoadGame}
            className="cursor-pointer rounded-full border border-[#d4af37]/80 bg-[#fcf6eb]/90 px-4 py-1 text-xs font-bold text-[#421f5c] shadow-sm transition-colors hover:bg-[#fff2d6] whitespace-nowrap"
          >
            ⬆ 讀檔 (Load)
          </button>

          <button
            type="button"
            onClick={onOpenConfig}
            className="cursor-pointer rounded-full border border-[#d4af37]/80 bg-[#fcf6eb]/90 px-4 py-1 text-xs font-bold text-[#421f5c] shadow-sm transition-colors hover:bg-[#fff2d6] whitespace-nowrap"
          >
            ⚙ 設定 (Config)
          </button>
        </div>
      </div>
    </div>
  );
};
