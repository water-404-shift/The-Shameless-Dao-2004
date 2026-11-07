import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  GameShellState,
  GameProgressState,
  HeroId,
  LocationId,
  TIME_PERIODS,
  executeDailyAction,
  updateHeroAffection,
  getRealmForExp,
  resolveSpecialRescue,
  hasJadeSlipSignal,
} from './game/rules';
import {
  MAP_LOCATIONS,
  STORY_SCRIPTS,
  INITIAL_JADE_CONTACTS,
  SECT_FORUM_POSTS,
  DialogueChoice,
  JadeContact,
  ForumPost,
} from './game/data';
import { sound } from './game/sound';
import { PetalCanvas, CanvasJuiceHandle } from './components/PetalCanvas';
import { TitleScreen } from './components/TitleScreen';
import { MapScreen } from './components/MapScreen';
import { VnScreen } from './components/VnScreen';
import { Modals, ActiveModalType } from './components/Modals';

const STORAGE_KEY = 'jianxiu_save_v1';

const INITIAL_PROGRESS: GameProgressState = {
  day: 31,
  timeIndex: 1, // 午時
  ap: 3,
  maxAp: 5,
  stones: 8520,
  cultivationExp: 160, // 二境·築基後期
  daysWithoutMajorEvent: 1,
  ruleViolations: 400,
  affection: {
    rong: 62,
    lu: 58,
    su: 56,
    ye: 47,
  },
  cluesFound: ['clue_1'],
  currentLocation: 'taiqing',
};

export default function App() {
  // Check ?autostart=1 on mount
  const isAutostart =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('autostart') === '1';

  const [shellState, setShellState] = useState<GameShellState>(
    isAutostart ? 'playing' : 'title'
  );
  const [playView, setPlayView] = useState<'map' | 'vn'>('map');
  const [progress, setProgress] = useState<GameProgressState>(INITIAL_PROGRESS);

  // VN Script state
  const [activeScriptId, setActiveScriptId] = useState<string>('stage_4_taiqing');
  const [scriptLineIndex, setScriptLineIndex] = useState<number>(0);
  const [autoPlay, setAutoPlay] = useState<boolean>(false);
  const [dialogueLog, setDialogueLog] = useState<
    { speaker: string; text: string }[]
  >([
    {
      speaker: '陸長安',
      text: '「門規之內，我會護你。門規之外……也一樣。」',
    },
  ]);

  // Modals & UI feedback
  const [activeModal, setActiveModal] = useState<ActiveModalType>(null);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const [saveStatusMsg, setSaveStatusMsg] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [cameraShake, setCameraShake] = useState<boolean>(false);

  // Jade Slip state
  const [contacts, setContacts] = useState<JadeContact[]>(INITIAL_JADE_CONTACTS);
  const [activeContactId, setActiveContactId] = useState<string>('rong');
  const [forumPosts, setForumPosts] = useState<ForumPost[]>(SECT_FORUM_POSTS);

  // Character Codex state
  const [inspectedCharName, setInspectedCharName] = useState<string>('四水若言');

  // Victory / Stage Clear snapshot
  const [victoryStats, setVictoryStats] = useState<{
    title: string;
    trappedHours: number;
    stonesEarned: number;
    cluesCount: number;
  } | null>(null);

  const juiceRef = useRef<CanvasJuiceHandle | null>(null);

  // Sync shell state to document.body.dataset.state
  useEffect(() => {
    document.body.dataset.state = shellState;
  }, [shellState]);

  const triggerShake = useCallback(() => {
    setCameraShake(true);
    window.setTimeout(() => setCameraShake(false), 380);
  }, []);

  // Start a specific story script
  const startStoryScript = useCallback((scriptKey: string) => {
    const target = STORY_SCRIPTS[scriptKey] || STORY_SCRIPTS['stage_4_taiqing'];
    setActiveScriptId(target.id);
    setScriptLineIndex(0);
    setAutoPlay(false);
    setPlayView('vn');
    if (target.lines[0]) {
      setDialogueLog((prev) => [
        ...prev.slice(-29),
        { speaker: target.lines[0].speaker, text: target.lines[0].text },
      ]);
    }
    sound.playPluck(1.08);
    juiceRef.current?.triggerBurst(0.5, 0.55, '#ffd166', false);
  }, []);

  // Start Game from Title Screen
  const handleStartGame = useCallback(
    (initialMode: 'map' | 'shura' | 'codex' = 'map') => {
      sound.playJadeChime();
      setShellState('playing');
      setActiveModal(null);
      if (initialMode === 'shura') {
        startStoryScript('stage_5_shura');
      } else if (initialMode === 'codex') {
        setPlayView('map');
        setActiveModal('characters');
      } else {
        setPlayView('map');
      }
      juiceRef.current?.triggerBurst(0.5, 0.5, '#ffd166', true);
    },
    [startStoryScript]
  );

  // Advance VN Dialogue
  const handleAdvanceDialogue = useCallback(() => {
    const currentScript =
      STORY_SCRIPTS[activeScriptId] || STORY_SCRIPTS['stage_4_taiqing'];
    const currentLine = currentScript.lines[scriptLineIndex];
    if (!currentLine) {
      setPlayView('map');
      return;
    }
    if (currentLine.choices && currentLine.choices.length > 0) {
      return;
    }

    const nextIdx = scriptLineIndex + 1;
    if (nextIdx < currentScript.lines.length) {
      setScriptLineIndex(nextIdx);
      const nextLine = currentScript.lines[nextIdx];
      setDialogueLog((prev) => [
        ...prev.slice(-29),
        { speaker: nextLine.speaker, text: nextLine.text },
      ]);
      sound.playPluck(1 + (nextIdx % 4) * 0.05);
    } else {
      // End of script -> return to map with reward
      sound.playJadeChime();
      setPlayView('map');
      setActionFeedback(`已完成劇情【${currentScript.chapterTitle}】，獲得 120 靈石與 20 修為！`);
      setProgress((prev) => ({
        ...prev,
        stones: prev.stones + 120,
        cultivationExp: prev.cultivationExp + 20,
        daysWithoutMajorEvent: 0,
      }));
    }
  }, [activeScriptId, scriptLineIndex]);

  // Select Choice in VN
  const handleSelectChoice = useCallback(
    (choice: DialogueChoice) => {
      sound.playJadeChime();
      juiceRef.current?.triggerBurst(0.5, 0.42, '#ffb7d5', true);

      setProgress((prev) => {
        let nextAff = { ...prev.affection };
        if (choice.affectionDelta) {
          for (const [k, delta] of Object.entries(choice.affectionDelta)) {
            if (delta) {
              nextAff = updateHeroAffection(nextAff, k as HeroId, delta);
            }
          }
        }
        const nextClues =
          choice.clueUnlocked && !prev.cluesFound.includes(choice.clueUnlocked)
            ? [...prev.cluesFound, choice.clueUnlocked]
            : prev.cluesFound;

        return {
          ...prev,
          affection: nextAff,
          stones: prev.stones + (choice.stonesDelta || 0),
          cluesFound: nextClues,
          daysWithoutMajorEvent: 0,
        };
      });

      startStoryScript(choice.targetScript);
    },
    [startStoryScript]
  );

  // Trigger Special Rescue ("喊「師姐救我！」")
  const handleTriggerRescue = useCallback(() => {
    sound.playRescueBell();
    triggerShake();
    juiceRef.current?.triggerBurst(0.5, 0.45, '#ff6b6b', true);
    const outcome = resolveSpecialRescue(
      progress.currentLocation,
      progress.affection
    );
    setActionFeedback(outcome.summary);
    setActiveModal(null);
    startStoryScript(outcome.scriptKey);
  }, [progress.currentLocation, progress.affection, startStoryScript, triggerShake]);

  // Perform Daily Action on Map
  const handlePerformDailyAction = useCallback(
    (action: '修煉' | '上課' | '接取任務' | '閒逛' | '休息') => {
      sound.playPluck(action === '休息' ? 0.88 : 1.12);
      const res = executeDailyAction(progress, action);
      setProgress((prev) => ({
        ...prev,
        day: res.day,
        timeIndex: res.timeIndex,
        ap: res.ap,
        stones: res.stones,
        cultivationExp: res.cultivationExp,
        daysWithoutMajorEvent: res.daysWithoutMajorEvent,
        ruleViolations: res.ruleViolations,
      }));
      setActionFeedback(res.summaryText);
      juiceRef.current?.triggerBurst(0.75, 0.5, '#ffd166', res.ruoyanLawTriggered);

      // If Ruoyan's Law triggered (>3 days without major event), launch the Shura-field major event!
      if (res.ruoyanLawTriggered) {
        sound.playRescueBell();
        triggerShake();
        startStoryScript('stage_5_shura');
      }
    },
    [progress, startStoryScript, triggerShake]
  );

  // Select Map Location
  const handleSelectLocation = useCallback((loc: LocationId) => {
    sound.playPluck(1.05);
    const prevSignal = hasJadeSlipSignal(progress.currentLocation);
    const nextSignal = hasJadeSlipSignal(loc);

    setProgress((prev) => ({
      ...prev,
      currentLocation: loc,
    }));

    if (!prevSignal && nextSignal) {
      sound.playJadeChime();
      setActionFeedback(
        `已離開無訊號區返回【${MAP_LOCATIONS[loc].name}】，玉簡瞬間湧入容九淵與同門的未讀靈訊！`
      );
    } else {
      setActionFeedback(null);
    }
  }, [progress.currentLocation]);

  // Jade Slip Reply
  const handleSendJadeReply = useCallback(
    (contactId: string, optionIndex: number) => {
      sound.playJadeChime();
      const target = contacts.find((c) => c.id === contactId);
      if (!target) return;
      const opt = target.replyOptions[optionIndex];
      if (!opt) return;

      setContacts((prev) =>
        prev.map((c) => {
          if (c.id !== contactId) return c;
          return {
            ...c,
            unread: 0,
            messages: [
              ...c.messages,
              { sender: 'player', text: opt.playerText, time: '剛剛' },
              { sender: 'npc', text: opt.npcResponse, time: '剛剛' },
            ],
          };
        })
      );

      if (opt.affectionHero && opt.affectionDelta) {
        setProgress((prev) => ({
          ...prev,
          affection: updateHeroAffection(
            prev.affection,
            opt.affectionHero!,
            opt.affectionDelta!
          ),
        }));
      }
    },
    [contacts]
  );

  // Save / Load Game
  const handleSaveGame = useCallback(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          progress,
          activeScriptId,
          scriptLineIndex,
          playView,
        })
      );
      sound.playJadeChime();
      setSaveStatusMsg('✓ 已將修仙進度銘刻至命魂玉簡（存檔成功）！');
      setActionFeedback('✓ 存檔成功！');
    } catch {
      setSaveStatusMsg('存檔失敗');
    }
  }, [progress, activeScriptId, scriptLineIndex, playView]);

  const handleLoadGame = useCallback(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setSaveStatusMsg('尚無存檔紀錄，已為您保持當前進度。');
        return;
      }
      const parsed = JSON.parse(raw);
      if (parsed.progress) setProgress(parsed.progress);
      if (parsed.activeScriptId) setActiveScriptId(parsed.activeScriptId);
      if (typeof parsed.scriptLineIndex === 'number') {
        setScriptLineIndex(parsed.scriptLineIndex);
      }
      if (parsed.playView) setPlayView(parsed.playView);
      sound.playJadeChime();
      setSaveStatusMsg('✓ 已成功讀取命魂玉簡進度！');
      setActiveModal(null);
      setShellState('playing');
    } catch {
      setSaveStatusMsg('讀取存檔失敗');
    }
  }, []);

  // Breakthrough Realm
  const handleBreakthrough = useCallback(() => {
    if (progress.stones < 500) {
      sound.playPluck(0.75);
      setActionFeedback('靈石不足 500，可先透過「接取任務」或「十階困陣」賺取靈石！');
      return;
    }
    sound.playFanfare();
    juiceRef.current?.triggerBurst(0.5, 0.5, '#ffd166', true);
    setProgress((prev) => ({
      ...prev,
      stones: prev.stones - 500,
      cultivationExp: prev.cultivationExp + 180,
    }));
  }, [progress.stones]);

  // Complete Ten-Rank Formation Minigame -> Triggers Victory State ('gameover')
  const handleCompleteFormation = useCallback(
    (rewardStones: number, accuracy: number) => {
      sound.playFanfare();
      triggerShake();
      juiceRef.current?.triggerBurst(0.5, 0.5, '#ffd166', true);

      const nextClues = progress.cluesFound.includes('clue_foxdan')
        ? progress.cluesFound
        : [...progress.cluesFound, 'clue_foxdan'];

      setProgress((prev) => ({
        ...prev,
        stones: prev.stones + rewardStones,
        cultivationExp: prev.cultivationExp + 45,
        cluesFound: nextClues,
      }));

      setVictoryStats({
        title: `十階九曲困龍大陣（陣紋契合度 ${accuracy}%）`,
        trappedHours: 3,
        stonesEarned: rewardStones,
        cluesCount: nextClues.length,
      });
      setActiveModal('victory');
      setShellState('gameover');
    },
    [progress.cluesFound, triggerShake]
  );

  // Global Keyboard Shortcuts (Enter/Space to start or advance, 1-3 for choices, R for rescue, M for mute, Esc/P for pause)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (shellState === 'title') {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleStartGame('map');
        }
        return;
      }

      if (e.key === 'Escape' || e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        if (shellState === 'paused') {
          setActiveModal(null);
          setShellState('playing');
        } else if (shellState === 'playing') {
          setSaveStatusMsg(null);
          setActiveModal('paused');
          setShellState('paused');
        }
        return;
      }

      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        const muted = sound.toggleMute();
        setIsMuted(muted);
        return;
      }

      if (shellState !== 'playing' || activeModal !== null) return;

      if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handleTriggerRescue();
        return;
      }

      if (playView === 'vn') {
        const script =
          STORY_SCRIPTS[activeScriptId] || STORY_SCRIPTS['stage_4_taiqing'];
        const line = script.lines[scriptLineIndex];
        if (line?.choices && line.choices.length > 0) {
          if (e.key === '1' && line.choices[0]) {
            e.preventDefault();
            handleSelectChoice(line.choices[0]);
          } else if (e.key === '2' && line.choices[1]) {
            e.preventDefault();
            handleSelectChoice(line.choices[1]);
          } else if (e.key === '3' && line.choices[2]) {
            e.preventDefault();
            handleSelectChoice(line.choices[2]);
          }
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleAdvanceDialogue();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [
    shellState,
    activeModal,
    playView,
    activeScriptId,
    scriptLineIndex,
    handleStartGame,
    handleTriggerRescue,
    handleSelectChoice,
    handleAdvanceDialogue,
  ]);

  const currentRealm = getRealmForExp(progress.cultivationExp);
  const totalUnread = contacts.reduce((acc, c) => acc + c.unread, 0);
  const maxAffection = Math.max(
    progress.affection.rong,
    progress.affection.lu,
    progress.affection.su,
    progress.affection.ye
  );
  const currentScript =
    STORY_SCRIPTS[activeScriptId] || STORY_SCRIPTS['stage_4_taiqing'];

  return (
    <main className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-[#12081c]">
      {/* 16:9 Full-Viewport Game Shell Container */}
      <div
        className={`relative flex h-full w-full max-w-[1600px] flex-col overflow-hidden bg-[#1e0f2e] shadow-[0_0_60px_rgba(0,0,0,0.9)] ${
          cameraShake ? 'animate-camera-shake' : ''
        }`}
      >
        {/* Isolated 60fps Canvas Layer for Peach Blossoms & Formation Sparks */}
        <PetalCanvas
          juiceRef={juiceRef}
          paused={shellState === 'paused'}
        />

        {shellState === 'title' ? (
          <TitleScreen onStartGame={handleStartGame} />
        ) : (
          <>
            {/* Top World-Matched Xianxia HUD Bar (matching Reference Images 7 & 9) */}
            <header className="relative z-30 flex h-[56px] shrink-0 items-center justify-between border-b-2 border-[#d4af37] bg-gradient-to-r from-[#211033] via-[#381d54] to-[#211033] px-5 text-[#f7e7c4] shadow-[0_4px_20px_rgba(0,0,0,0.65)]">
              {/* Left: 賤修 Logo & Active Mode Switch */}
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setPlayView('map')}
                  title="返回雲海地圖"
                  className="flex cursor-pointer items-center gap-2 text-2xl font-black tracking-widest text-[#ffe49e] drop-shadow-[0_2px_8px_rgba(255,215,0,0.45)]"
                >
                  <span>賤修</span>
                  <svg
                    className="h-6 w-6 fill-[#ffd166]"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.85 0 3.58-.5 5.06-1.38-.7-.92-1.06-2.08-1.06-3.32 0-3.04 2.46-5.5 5.5-5.5.17 0 .33.01.5.03C21.99 6.32 17.52 2 12 2z" />
                  </svg>
                </button>

                <div className="hidden items-center gap-2 text-xs text-[#e6c994] sm:flex">
                  <span>四水若言</span>
                  <span aria-hidden="true">·</span>
                  <span>{currentRealm.subStage}</span>
                </div>
              </div>

              {/* Center-Right Live Mechanics Readouts (Matching Reference Image 7 & 9 HUD) */}
              <div className="flex items-center gap-2.5 text-xs font-bold">
                {/* Date & Time */}
                <div
                  data-testid="hud-date"
                  className="flex items-center gap-1.5 rounded-full border border-[#d4af37] bg-[#2a153d]/90 px-3.5 py-1 text-[#fff4d6] tabular-nums"
                >
                  <span className="text-[#ffd166]" aria-hidden="true">
                    ☼
                  </span>
                  <span>
                    第{progress.day}日 · {TIME_PERIODS[progress.timeIndex]}
                  </span>
                </div>

                {/* Action Points (AP) */}
                <div
                  data-testid="hud-ap"
                  className="flex items-center gap-1.5 rounded-full border border-[#d4af37] bg-[#2a153d]/90 px-3.5 py-1 text-[#fff4d6] tabular-nums"
                >
                  <span className="text-[#ffd166]" aria-hidden="true">
                    ⚡
                  </span>
                  <span>
                    行動 {progress.ap}/{progress.maxAp}
                  </span>
                </div>

                {/* Spirit Stones */}
                <div
                  data-testid="hud-stones"
                  className="flex items-center gap-1.5 rounded-full border border-[#d4af37] bg-[#2a153d]/90 px-3.5 py-1 text-[#fff4d6] tabular-nums"
                >
                  <span className="text-[#9be7ff]" aria-hidden="true">
                    ❖
                  </span>
                  <span>靈石 {progress.stones.toLocaleString()}</span>
                </div>

                {/* Heart Resonance Button (Opens Character Codex) */}
                <button
                  type="button"
                  onClick={() => setActiveModal('characters')}
                  className="flex cursor-pointer items-center gap-1.5 rounded-full border border-[#d4af37] bg-[#43205e] px-3.5 py-1 text-[#fff4d6] transition-colors hover:bg-[#592b78] tabular-nums"
                >
                  <span className="text-[#ff85a2]" aria-hidden="true">
                    ♥
                  </span>
                  <span>好感 {maxAffection}</span>
                </button>

                {/* Top-Right Compact Utility Controls: Log [L], Mute [M], Pause [P] */}
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label="開啟主線章節與紀錄"
                  onClick={(e) => {
                    e.currentTarget.blur();
                    setActiveModal('stages');
                  }}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[#d4af37] bg-[#2a153d] text-[#ffefd0] transition-colors hover:bg-[#4b2569]"
                  title="主線章節與對話紀錄"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
                  </svg>
                </button>

                <button
                  type="button"
                  tabIndex={-1}
                  aria-label={isMuted ? '取消靜音' : '靜音切換'}
                  onClick={(e) => {
                    e.currentTarget.blur();
                    const muted = sound.toggleMute();
                    setIsMuted(muted);
                  }}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[#d4af37] bg-[#2a153d] text-[#ffefd0] transition-colors hover:bg-[#4b2569]"
                  title="音效開關 [M]"
                >
                  {isMuted ? '🔇' : '🔊'}
                </button>

                <button
                  type="button"
                  tabIndex={-1}
                  aria-label="系統暫停與存讀檔"
                  onClick={(e) => {
                    e.currentTarget.blur();
                    setSaveStatusMsg(null);
                    setActiveModal('paused');
                    setShellState('paused');
                  }}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[#d4af37] bg-[#2a153d] text-[#ffefd0] transition-colors hover:bg-[#4b2569]"
                  title="系統設定與暫停 [Esc / P]"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
                  </svg>
                </button>
              </div>
            </header>

            {/* Main Scene Container: Map View or Visual Novel View */}
            <div className="relative flex-1 overflow-hidden">
              {playView === 'map' ? (
                <MapScreen
                  selectedLocation={progress.currentLocation}
                  onSelectLocation={handleSelectLocation}
                  onPerformDailyAction={handlePerformDailyAction}
                  onEnterLocationStory={(loc) => {
                    const scriptId = MAP_LOCATIONS[loc].defaultScriptId;
                    startStoryScript(scriptId);
                  }}
                  onOpenModal={(m) => {
                    sound.playPluck(1.1);
                    setActiveModal(m);
                  }}
                  onTriggerRescue={handleTriggerRescue}
                  onPause={() => {
                    setSaveStatusMsg(null);
                    setActiveModal('paused');
                    setShellState('paused');
                  }}
                  unreadCount={totalUnread}
                  actionFeedback={actionFeedback}
                  daysWithoutMajorEvent={progress.daysWithoutMajorEvent}
                  currentStageTitle={currentScript.chapterTitle}
                />
              ) : (
                <VnScreen
                  script={currentScript}
                  lineIndex={scriptLineIndex}
                  autoPlay={autoPlay}
                  onAdvance={handleAdvanceDialogue}
                  onSelectChoice={handleSelectChoice}
                  onToggleAuto={() => setAutoPlay((prev) => !prev)}
                  onSkipToChoiceOrEnd={() => {
                    // Jump to choice line if present, else last line
                    const choiceIdx = currentScript.lines.findIndex(
                      (l, idx) => idx >= scriptLineIndex && l.choices && l.choices.length > 0
                    );
                    if (choiceIdx !== -1) {
                      setScriptLineIndex(choiceIdx);
                    } else {
                      setScriptLineIndex(currentScript.lines.length - 1);
                    }
                  }}
                  onOpenLog={() => setActiveModal('stages')}
                  onSaveGame={handleSaveGame}
                  onLoadGame={handleLoadGame}
                  onOpenConfig={() => {
                    setSaveStatusMsg(null);
                    setActiveModal('paused');
                    setShellState('paused');
                  }}
                  onReturnToMap={() => setPlayView('map')}
                  onTriggerRescue={handleTriggerRescue}
                  onInspectCharacter={(charName) => {
                    setInspectedCharName(charName);
                    setActiveModal('characters');
                  }}
                />
              )}
            </div>
          </>
        )}

        {/* Unified Modals Layer */}
        <Modals
          activeModal={activeModal}
          onClose={() => {
            setActiveModal(null);
            if (shellState === 'paused' || shellState === 'gameover') {
              setShellState('playing');
            }
          }}
          contacts={contacts}
          activeContactId={activeContactId}
          onSelectContact={(id) => {
            setActiveContactId(id);
            setContacts((prev) =>
              prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c))
            );
          }}
          onSendJadeReply={handleSendJadeReply}
          hasSignal={hasJadeSlipSignal(progress.currentLocation)}
          forumPosts={forumPosts}
          onLikePost={(postId) => {
            sound.playPluck(1.2);
            setForumPosts((prev) =>
              prev.map((p) =>
                p.id === postId ? { ...p, likes: p.likes + 1 } : p
              )
            );
          }}
          inspectedCharName={inspectedCharName}
          onSelectCharName={setInspectedCharName}
          affection={progress.affection}
          onStartScript={startStoryScript}
          cultivationExp={progress.cultivationExp}
          stones={progress.stones}
          ruleViolations={progress.ruleViolations}
          cluesFound={progress.cluesFound}
          onBreakthrough={handleBreakthrough}
          dialogueLog={dialogueLog}
          onCompleteFormation={handleCompleteFormation}
          onSaveGame={handleSaveGame}
          onLoadGame={handleLoadGame}
          onResetToTitle={() => {
            setActiveModal(null);
            setShellState('title');
          }}
          onRestartRun={() => {
            setProgress(INITIAL_PROGRESS);
            setContacts(INITIAL_JADE_CONTACTS);
            setActiveModal(null);
            setPlayView('map');
            setShellState('playing');
            setActionFeedback('已重置修仙日程至第 31 日初始狀態！');
          }}
          saveStatusMsg={saveStatusMsg}
          victoryStats={victoryStats}
        />
      </div>
    </main>
  );
}
