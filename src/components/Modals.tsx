import React, { useState } from 'react';
import {
  ASSETS,
  CHARACTERS,
  SUPPORTING_CHARACTERS,
  HEAVENLY_CLUES,
  JadeContact,
  ForumPost,
} from '../game/data';
import {
  CULTIVATION_REALMS,
  HeroId,
  getAffectionStageLabel,
  getRealmForExp,
  evaluateFormationPower,
} from '../game/rules';

export type ActiveModalType =
  | null
  | 'yujian'
  | 'characters'
  | 'relics'
  | 'cultivation'
  | 'stages'
  | 'overview'
  | 'formation'
  | 'paused'
  | 'victory';

interface ModalsProps {
  activeModal: ActiveModalType;
  onClose: () => void;
  // Jade slip state
  contacts: JadeContact[];
  activeContactId: string;
  onSelectContact: (id: string) => void;
  onSendJadeReply: (contactId: string, optionIndex: number) => void;
  hasSignal: boolean;
  forumPosts: ForumPost[];
  onLikePost: (postId: string) => void;
  // Character codex
  inspectedCharName: string;
  onSelectCharName: (name: string) => void;
  affection: Record<HeroId, number>;
  onStartScript: (scriptId: string) => void;
  // Cultivation & Clues
  cultivationExp: number;
  stones: number;
  ruleViolations: number;
  cluesFound: string[];
  onBreakthrough: () => void;
  // Dialogue Log
  dialogueLog: { speaker: string; text: string }[];
  // Formation minigame completion
  onCompleteFormation: (rewardStones: number, accuracy: number) => void;
  // System / Pause / Victory actions
  onSaveGame: () => void;
  onLoadGame: () => void;
  onResetToTitle: () => void;
  onRestartRun: () => void;
  saveStatusMsg: string | null;
  victoryStats: {
    title: string;
    trappedHours: number;
    stonesEarned: number;
    cluesCount: number;
  } | null;
}

export const Modals: React.FC<ModalsProps> = ({
  activeModal,
  onClose,
  contacts,
  activeContactId,
  onSelectContact,
  onSendJadeReply,
  hasSignal,
  forumPosts,
  onLikePost,
  inspectedCharName,
  onSelectCharName,
  affection,
  onStartScript,
  cultivationExp,
  stones,
  ruleViolations,
  cluesFound,
  onBreakthrough,
  dialogueLog,
  onCompleteFormation,
  onSaveGame,
  onLoadGame,
  onResetToTitle,
  onRestartRun,
  saveStatusMsg,
  victoryStats,
}) => {
  const [yujianMode, setYujianMode] = useState<'private' | 'forum'>('private');
  const [stagesTab, setStagesTab] = useState<'chapters' | 'log'>('chapters');
  const [selectedNodes, setSelectedNodes] = useState<number[]>([]);

  if (!activeModal) return null;

  const currentRealm = getRealmForExp(cultivationExp);
  const activeContact =
    contacts.find((c) => c.id === activeContactId) || contacts[0];
  const charProfile =
    CHARACTERS[inspectedCharName] || CHARACTERS['四水若言'];

  const stageList = [
    {
      num: '第一階段',
      title: '梵音谷 · 第四十七個問題',
      desc: '於藏經閣初遇佛修葉聽禪（淨琉璃），探討八千年前的矛盾古籍。',
      scriptId: 'stage_1_fanyin',
    },
    {
      num: '第二階段',
      title: '黑水黑市 · 十階大陣困少主',
      desc: '釣魚釣到魔域少主容九淵，以十階大陣將他困住整整三個時辰。',
      scriptId: 'stage_2_blackmarket',
    },
    {
      num: '第三階段',
      title: '師姐尋人 · 玉簡恢復訊號',
      desc: '莫溫雨尋回若言，踏入太清宗瞬間收到容九淵 999+ 條未讀訊息。',
      scriptId: 'stage_3_sister',
    },
    {
      num: '第四階段',
      title: '太清宗日常 · 門規之內與之外',
      desc: '大師兄陸長安清算丹頂鶴剃度事件，展現默默護短的溫柔。',
      scriptId: 'stage_4_taiqing',
    },
    {
      num: '第五階段',
      title: '秘境大比 · 花月庭修羅場',
      desc: '與合歡宗醫修蘇知弦交鋒，容九淵、蘇知弦、葉聽禪三人修羅場正面對決！',
      scriptId: 'stage_5_shura',
    },
    {
      num: '第六階段',
      title: '古秘境異動 · 遠古飛升台之謎',
      desc: '發掘八千年前遭篡改的飛升大陣，天道異常浮出水面。',
      scriptId: 'stage_6_ancient',
    },
    {
      num: '第七階段',
      title: '妖境開啟 · 九尾狐丹與養父',
      desc: '體內狐丹共鳴，探索養父四水方渝復活與萬妖境的核心秘密。',
      scriptId: 'stage_7_yaojing',
    },
  ];

  const relicsList = [
    {
      name: '十階紫金陣盤',
      owner: '四水若言',
      tag: '本命法寶',
      desc: '若言最寶貝的隨身陣盤。即便只有築基後期修為，也能藉此布置困住元嬰少主三個時辰的十階大陣。',
      scriptId: 'stage_2_blackmarket',
    },
    {
      name: '赤金魔龍飾',
      owner: '容九淵',
      tag: '魔域信物',
      desc: '魔域少主衣袍上的赤金龍紋佩飾。當初在黑水黑市被若言的魚鉤勾住，成為兩人孽緣的開端。',
      scriptId: 'stage_2_blackmarket',
    },
    {
      name: '無妄劍穗',
      owner: '陸長安',
      tag: '太清信物',
      desc: '太清宗大師兄佩劍「無妄」上的冰藍劍穗，蘊含純粹劍氣，能在若言闖禍時護她周全。',
      scriptId: 'stage_4_taiqing',
    },
    {
      name: '春風百花丹葫',
      owner: '蘇知弦',
      tag: '合歡信物',
      desc: '合歡宗醫修隨身攜帶的描金琉璃丹葫。先救人、後算帳，每一顆靈丹都附帶令人心跳加速的抵償條件。',
      scriptId: 'loc_hehuan_su',
    },
    {
      name: '菩提琉璃念珠 & 藏經閣古本',
      owner: '葉聽禪',
      tag: '梵音信物',
      desc: '淨琉璃佛子常年撥動的百八念珠，以及夾著「第四十七問」與太古天道秘辛的泛黃佛經。',
      scriptId: 'stage_1_fanyin',
    },
    {
      name: '本源九尾狐丹',
      owner: '四水方渝（養父）',
      tag: '妖境核心',
      desc: '養父四水方渝撫養若言至12歲時交予她的本命狐丹，隱藏著養父復活與妖境開啟的關鍵因果。',
      scriptId: 'stage_7_yaojing',
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="遊戲系統視窗"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 select-none"
    >
      {/* 1. 玉簡通訊系統 (Jade Slip Modal) */}
      {activeModal === 'yujian' && (
        <div className="flex h-[560px] w-full max-w-[780px] flex-col overflow-hidden rounded-2xl border-2 border-[#d4af37] bg-[#fcf8f2] text-[#2d163d] shadow-[0_16px_48px_rgba(0,0,0,0.85)]">
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-[#d4af37] bg-gradient-to-r from-[#3d1d56] via-[#562b78] to-[#3d1d56] px-6 py-3.5 text-[#ffefd0]">
            <div className="flex items-center gap-3">
              <span className="text-lg font-black tracking-wider">
                📜 太清宗靈訊玉簡
              </span>
              <span
                className={`rounded-md px-2 py-0.5 text-xs font-bold ${
                  hasSignal
                    ? 'bg-[#2a6f4e] text-[#e6fff2]'
                    : 'bg-[#a82b2b] text-[#ffe6e6]'
                }`}
              >
                {hasSignal ? '靈網訊號：滿格' : '無訊號區域（黑市/魔域離線累積中）'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setYujianMode('private')}
                className={`cursor-pointer rounded-lg px-3 py-1 text-xs font-bold transition-colors ${
                  yujianMode === 'private'
                    ? 'bg-[#ffd166] text-[#2d163d]'
                    : 'bg-white/10 text-[#ffefd0] hover:bg-white/20'
                }`}
              >
                私人傳訊
              </button>
              <button
                type="button"
                onClick={() => setYujianMode('forum')}
                className={`cursor-pointer rounded-lg px-3 py-1 text-xs font-bold transition-colors ${
                  yujianMode === 'forum'
                    ? 'bg-[#ffd166] text-[#2d163d]'
                    : 'bg-white/10 text-[#ffefd0] hover:bg-white/20'
                }`}
              >
                公共交流區（宗門八卦）
              </button>
              <button
                type="button"
                aria-label="關閉玉簡視窗"
                onClick={onClose}
                className="ml-2 cursor-pointer rounded-lg px-2.5 py-1 text-base font-bold text-[#ffefd0] hover:bg-white/15"
              >
                ✕
              </button>
            </div>
          </div>

          {yujianMode === 'private' ? (
            <div className="flex flex-1 overflow-hidden">
              {/* Left Contact List */}
              <div className="flex w-[210px] flex-col border-r border-[#dfd0b8] bg-[#f3eadb]">
                {contacts.map((c) => {
                  const isActive = c.id === activeContact.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => onSelectContact(c.id)}
                      className={`flex w-full cursor-pointer items-center justify-between border-b border-[#e5d8c3] px-4 py-3 text-left transition-colors ${
                        isActive
                          ? 'bg-[#fcf8f2] font-extrabold text-[#4a2263]'
                          : 'text-[#523866] hover:bg-[#f9f2e7]'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-bold">{c.name}</div>
                        <div className="text-[11px] text-[#7d6391]">{c.role}</div>
                      </div>
                      {c.unread > 0 && (
                        <span className="rounded-md bg-[#c93b3b] px-1.5 py-0.5 text-[11px] font-bold text-white tabular-nums">
                          {c.unread > 99 ? '99+' : c.unread}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Right Chat Stream + Reply Options */}
              <div className="flex flex-1 flex-col justify-between bg-[#fcf8f2] p-4">
                <div className="flex-1 space-y-2.5 overflow-y-auto pr-2">
                  {activeContact.messages.map((m, i) => (
                    <div
                      key={i}
                      className={`flex flex-col ${
                        m.sender === 'player' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div
                        className={`max-w-[82%] rounded-xl px-4 py-2.5 text-sm leading-relaxed shadow-xs ${
                          m.sender === 'player'
                            ? 'bg-[#592b78] text-[#fff6e5]'
                            : 'border border-[#dfd0b8] bg-white text-[#2d163d]'
                        }`}
                      >
                        {m.text}
                      </div>
                      <span className="mt-0.5 text-[11px] text-[#8a729c]">
                        {m.sender === 'player' ? '四水若言' : activeContact.name} · {m.time}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Interactive Reply Choices */}
                <div className="mt-3 border-t border-[#e5d8c3] pt-3">
                  <div className="mb-1.5 text-xs font-bold text-[#6e5082]">
                    選擇靈訊回覆（將即時影響角色態度）：
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeContact.replyOptions.map((opt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => onSendJadeReply(activeContact.id, idx)}
                        className="cursor-pointer rounded-lg border border-[#d4af37] bg-[#fff5de] px-3.5 py-1.5 text-xs font-bold text-[#421f5c] transition-colors hover:bg-[#d4af37] hover:text-[#231033]"
                      >
                        ✉ {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Public Sect Forum */
            <div className="flex-1 space-y-3 overflow-y-auto p-5">
              {forumPosts.map((post) => (
                <div
                  key={post.id}
                  className="rounded-xl border border-[#dfd0b8] bg-white p-4 shadow-xs"
                >
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#7c3f9c]">
                      {post.tag} · 發帖人：{post.author}
                    </span>
                    <button
                      type="button"
                      onClick={() => onLikePost(post.id)}
                      className="cursor-pointer rounded-md border border-[#d4af37] bg-[#fff7e6] px-2.5 py-0.5 text-xs font-bold text-[#8c6218] hover:bg-[#ffebb8] tabular-nums"
                    >
                      👍 靈讚 ({post.likes})
                    </button>
                  </div>
                  <h3 className="mb-1 text-base font-extrabold text-[#2d163d]">
                    {post.title}
                  </h3>
                  <p className="mb-2.5 text-xs leading-relaxed text-[#4f3961]">
                    {post.content}
                  </p>
                  <div className="space-y-1 rounded-lg bg-[#f7f1e6] p-2.5 text-xs text-[#59416b]">
                    {post.replies.map((rep, idx) => (
                      <div key={idx}>💬 {rep}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 2. 人物設定圖集與好感羈絆 (Character Codex Modal - Shows Uploaded Full-Res Character Sheets!) */}
      {activeModal === 'characters' && (
        <div className="flex h-[630px] w-full max-w-[1040px] flex-col overflow-hidden rounded-2xl border-2 border-[#d4af37] bg-[#fcf8f2] text-[#2d163d] shadow-[0_16px_48px_rgba(0,0,0,0.85)]">
          <div className="flex items-center justify-between border-b-2 border-[#d4af37] bg-gradient-to-r from-[#3d1d56] via-[#562b78] to-[#3d1d56] px-6 py-3.5 text-[#ffefd0]">
            <div className="flex items-center gap-3">
              <span className="text-lg font-black tracking-wider">
                🎴 《賤修》角色設定圖集與心意羈絆
              </span>
              <span className="text-xs text-[#e6c994]">
                （點擊角色切換官方原畫設定圖 · 多線並行開放攻略）
              </span>
            </div>
            <button
              type="button"
              aria-label="關閉人物視窗"
              onClick={onClose}
              className="cursor-pointer rounded-lg px-2.5 py-1 text-base font-bold text-[#ffefd0] hover:bg-white/15"
            >
              ✕
            </button>
          </div>

          {/* Character Selector Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#dfd0b8] bg-[#f3eadb] px-6 py-2.5">
            <div className="flex flex-wrap items-center gap-2">
              {Object.keys(CHARACTERS).map((name) => {
                const active = inspectedCharName === name;
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => onSelectCharName(name)}
                    className={`cursor-pointer rounded-lg px-4 py-1.5 text-sm font-extrabold transition-colors ${
                      active
                        ? 'bg-[#592b78] text-[#fff4d6] shadow-xs'
                        : 'bg-white/80 text-[#421f5c] hover:bg-white'
                    }`}
                  >
                    {name}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => {
                const mapScript: Record<string, string> = {
                  四水若言: 'stage_4_taiqing',
                  容九淵: 'stage_2_blackmarket',
                  陸長安: 'stage_4_taiqing',
                  蘇知弦: 'loc_hehuan_su',
                  葉聽禪: 'stage_1_fanyin',
                };
                onClose();
                onStartScript(mapScript[charProfile.name] || 'stage_5_shura');
              }}
              className="cursor-pointer rounded-xl border-2 border-[#d4af37] bg-[#592b78] px-4 py-1.5 text-xs font-extrabold text-[#fff4d6] hover:bg-[#6e3794]"
            >
              ▶ 進入 {charProfile.name} 專屬劇情事件
            </button>
          </div>

          {/* Main Split: Left Official Full-Res Character Sheet Image, Right Lore & Hidden Affection Resonance */}
          <div className="grid flex-1 grid-cols-1 gap-6 overflow-y-auto p-5 md:grid-cols-12">
            {/* Left 6 Cols: Full Official Character Sheet Image */}
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-[#d4af37] bg-[#211130] p-3 md:col-span-6">
              <img
                src={charProfile.sheetUrl}
                alt={`${charProfile.name} 角色設定圖`}
                referrerPolicy="no-referrer"
                className="max-h-[460px] w-auto rounded-lg object-contain shadow-lg"
              />
            </div>

            {/* Right 6 Cols: Character Profile, Hidden Affection Stage & Supporting Cast */}
            <div className="flex flex-col justify-between md:col-span-6">
              <div>
                <div className="mb-2 flex items-center justify-between border-b border-[#dfd0b8] pb-2">
                  <div>
                    <h2 className="text-2xl font-black text-[#3b1c52]">
                      {charProfile.name}
                    </h2>
                    <p className="text-xs font-bold text-[#7d5a96]">
                      {charProfile.title} · 所屬：{charProfile.faction}
                    </p>
                  </div>
                  {charProfile.difficulty && (
                    <span className="rounded-md bg-[#f5e6c8] px-3 py-1 text-xs font-bold text-[#5c3818]">
                      攻略難度：{charProfile.difficulty}
                    </span>
                  )}
                </div>

                <blockquote className="mb-3 rounded-xl border border-[#d4af37]/60 bg-[#fff8ea] px-4 py-2 text-sm font-bold italic text-[#4a2263]">
                  {charProfile.quote}
                </blockquote>

                {/* Hidden Affection State Display */}
                {charProfile.heroId && (
                  <div className="mb-3 rounded-xl border border-[#d4af37] bg-gradient-to-r from-[#4b2569] to-[#68378f] p-3 text-[#fff4d6]">
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="font-bold text-[#ffd166]">
                        ♥ 當前心意共鳴（後台好感態度）
                      </span>
                      <span className="font-semibold">
                        初遇地點：{charProfile.firstMeet}
                      </span>
                    </div>
                    <div className="text-base font-extrabold">
                      {getAffectionStageLabel(
                        charProfile.heroId,
                        affection[charProfile.heroId]
                      )}
                    </div>
                    <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-black/35">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#ff9ebb] to-[#ffd166] transition-all duration-300"
                        style={{
                          width: `${affection[charProfile.heroId]}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="mb-2.5">
                  <h3 className="mb-1 text-xs font-extrabold text-[#592b78]">
                    ❖ 人物特質與設定
                  </h3>
                  <ul className="space-y-1 text-xs leading-relaxed text-[#432c54]">
                    {charProfile.traits.map((t, i) => (
                      <li key={i}>• {t}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-2.5">
                  <h3 className="mb-1 text-xs font-extrabold text-[#592b78]">
                    ❖ 感情發展與核心因果
                  </h3>
                  <ul className="space-y-1 text-xs leading-relaxed text-[#432c54]">
                    {charProfile.romanceArc.map((r, i) => (
                      <li key={i}>• {r}</li>
                    ))}
                  </ul>
                </div>

                {/* Supporting Characters Strip */}
                <div className="mt-2.5 border-t border-[#dfd0b8] pt-2">
                  <div className="mb-1.5 text-xs font-extrabold text-[#592b78]">
                    ❖ 其他重要人物（師門與妖境血親）
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {SUPPORTING_CHARACTERS.slice(0, 4).map((sc) => (
                      <div
                        key={sc.name}
                        className="rounded-lg border border-[#e5d8c3] bg-white p-2 text-[11px]"
                      >
                        <div className="font-bold text-[#3b1c52]">{sc.name}</div>
                        <div className="text-[#6e5082]">{sc.role}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. 信物與儲物袋 (Relics & Inventory Modal) */}
      {activeModal === 'relics' && (
        <div className="flex h-[540px] w-full max-w-[820px] flex-col overflow-hidden rounded-2xl border-2 border-[#d4af37] bg-[#fcf8f2] text-[#2d163d] shadow-[0_16px_48px_rgba(0,0,0,0.85)]">
          <div className="flex items-center justify-between border-b-2 border-[#d4af37] bg-gradient-to-r from-[#3d1d56] via-[#562b78] to-[#3d1d56] px-6 py-3.5 text-[#ffefd0]">
            <span className="text-lg font-black tracking-wider">
              👝 四水若言的紫金儲物袋與角色信物
            </span>
            <button
              type="button"
              aria-label="關閉信物視窗"
              onClick={onClose}
              className="cursor-pointer rounded-lg px-2.5 py-1 text-base font-bold text-[#ffefd0] hover:bg-white/15"
            >
              ✕
            </button>
          </div>

          <div className="grid flex-1 grid-cols-1 gap-4 overflow-y-auto p-6 md:grid-cols-2">
            {relicsList.map((item) => (
              <div
                key={item.name}
                className="flex flex-col justify-between rounded-xl border border-[#d4af37] bg-white p-4 shadow-xs"
              >
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-base font-black text-[#3b1c52]">
                      ❖ {item.name}
                    </span>
                    <span className="rounded-md bg-[#f3e5c8] px-2 py-0.5 text-[11px] font-bold text-[#5c3818]">
                      {item.tag} · {item.owner}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-[#4f3961]">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onStartScript(item.scriptId);
                    }}
                    className="cursor-pointer rounded-lg border border-[#d4af37] bg-[#fff5de] px-3 py-1 text-xs font-bold text-[#421f5c] hover:bg-[#d4af37]"
                  >
                    回溯信物劇情 →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. 修行境界與八千年天道之謎 (Cultivation & Mystery Modal) */}
      {activeModal === 'cultivation' && (
        <div className="flex h-[580px] w-full max-w-[900px] flex-col overflow-hidden rounded-2xl border-2 border-[#d4af37] bg-[#fcf8f2] text-[#2d163d] shadow-[0_16px_48px_rgba(0,0,0,0.85)]">
          <div className="flex items-center justify-between border-b-2 border-[#d4af37] bg-gradient-to-r from-[#3d1d56] via-[#562b78] to-[#3d1d56] px-6 py-3.5 text-[#ffefd0]">
            <span className="text-lg font-black tracking-wider">
              🪷 修真九大境界 · 八千年天道真相調查
            </span>
            <button
              type="button"
              aria-label="關閉修行視窗"
              onClick={onClose}
              className="cursor-pointer rounded-lg px-2.5 py-1 text-base font-bold text-[#ffefd0] hover:bg-white/15"
            >
              ✕
            </button>
          </div>

          <div className="grid flex-1 grid-cols-1 gap-6 overflow-y-auto p-6 md:grid-cols-12">
            {/* Left 6 Cols: 9 Cultivation Realms */}
            <div className="flex flex-col justify-between md:col-span-6">
              <div>
                <div className="mb-3 rounded-xl border border-[#d4af37] bg-[#381d4f] p-4 text-[#fff4d6]">
                  <div className="flex items-center justify-between text-xs text-[#ffd166]">
                    <span>當前境界：{currentRealm.subStage}</span>
                    <span className="tabular-nums">壽元：{currentRealm.lifespan}</span>
                  </div>
                  <div className="mt-1 text-xl font-black">
                    修為值：{cultivationExp} · 門規破壞紀錄：{ruleViolations} 條
                  </div>
                  <p className="mt-1 text-xs text-[#e6d2b5]">
                    {currentRealm.description}
                  </p>
                  <button
                    type="button"
                    onClick={onBreakthrough}
                    className="mt-3 w-full cursor-pointer rounded-lg border border-[#ffd166] bg-[#d4af37] py-2 text-xs font-extrabold text-[#231033] transition-transform hover:scale-[1.01]"
                  >
                    ⚡ 消耗 500 靈石引氣破境（當前靈石：{stones.toLocaleString()}）
                  </button>
                </div>

                <div className="space-y-1.5">
                  {CULTIVATION_REALMS.map((r) => {
                    const reached = cultivationExp >= r.minExp;
                    return (
                      <div
                        key={r.index}
                        className={`flex items-center justify-between rounded-lg border px-3 py-1.5 text-xs ${
                          reached
                            ? 'border-[#d4af37] bg-[#fff5de] font-bold text-[#3b1c52]'
                            : 'border-[#e5d8c3] bg-white/60 text-[#8a729c]'
                        }`}
                      >
                        <span>
                          第{r.index}境 · {r.name}（{r.subStage}）
                        </span>
                        <span className="tabular-nums">
                          {reached ? '✓ 已達成' : `需 ${r.minExp} 修為`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right 6 Cols: 8000-Year Heavenly Dao Mystery Clues */}
            <div className="flex flex-col md:col-span-6">
              <h3 className="mb-2 text-base font-black text-[#421f5c]">
                ❖ 八千年天道之謎 · 已收集線索（{cluesFound.length}/{HEAVENLY_CLUES.length}）
              </h3>
              <p className="mb-3 text-xs leading-relaxed text-[#5e4473]">
                世人皆信飛升在過去八千年間正常進行，但古籍、遺跡與佛門孤本間的矛盾，正指向天門之後的驚天秘密。
              </p>
              <div className="space-y-2.5">
                {HEAVENLY_CLUES.map((clue) => {
                  const unlocked = cluesFound.includes(clue.id);
                  return (
                    <div
                      key={clue.id}
                      className={`rounded-xl border p-3.5 ${
                        unlocked
                          ? 'border-[#d4af37] bg-white'
                          : 'border-[#dfd0b8] bg-[#f3eadb]/70'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-extrabold text-[#4a2263]">
                        <span>{clue.title}</span>
                        <span className="text-[11px] text-[#8c6218]">
                          {clue.source}
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-[#4f3961]">
                        {clue.content}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. 主線七階段與對話履歷 (7 Story Stages & Log Modal) */}
      {activeModal === 'stages' && (
        <div className="flex h-[560px] w-full max-w-[840px] flex-col overflow-hidden rounded-2xl border-2 border-[#d4af37] bg-[#fcf8f2] text-[#2d163d] shadow-[0_16px_48px_rgba(0,0,0,0.85)]">
          <div className="flex items-center justify-between border-b-2 border-[#d4af37] bg-gradient-to-r from-[#3d1d56] via-[#562b78] to-[#3d1d56] px-6 py-3.5 text-[#ffefd0]">
            <div className="flex items-center gap-3">
              <span className="text-lg font-black tracking-wider">
                📖 主線劇情七階段 & 對話履歷
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setStagesTab('chapters')}
                className={`cursor-pointer rounded-lg px-3 py-1 text-xs font-bold ${
                  stagesTab === 'chapters'
                    ? 'bg-[#ffd166] text-[#2d163d]'
                    : 'bg-white/10 text-[#ffefd0]'
                }`}
              >
                主線七階段選擇
              </button>
              <button
                type="button"
                onClick={() => setStagesTab('log')}
                className={`cursor-pointer rounded-lg px-3 py-1 text-xs font-bold ${
                  stagesTab === 'log'
                    ? 'bg-[#ffd166] text-[#2d163d]'
                    : 'bg-white/10 text-[#ffefd0]'
                }`}
              >
                對話履歷 (Log)
              </button>
              <button
                type="button"
                aria-label="關閉紀錄視窗"
                onClick={onClose}
                className="ml-2 cursor-pointer rounded-lg px-2.5 py-1 text-base font-bold text-[#ffefd0] hover:bg-white/15"
              >
                ✕
              </button>
            </div>
          </div>

          {stagesTab === 'chapters' ? (
            <div className="flex-1 space-y-2.5 overflow-y-auto p-6">
              {stageList.map((st) => (
                <div
                  key={st.num}
                  className="flex items-center justify-between rounded-xl border border-[#d4af37] bg-white px-5 py-3 shadow-xs"
                >
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="rounded-md bg-[#592b78] px-2.5 py-0.5 text-xs font-bold text-[#ffefd0]">
                        {st.num}
                      </span>
                      <span className="text-base font-extrabold text-[#381d4f]">
                        {st.title}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[#5d4370]">{st.desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onStartScript(st.scriptId);
                    }}
                    className="shrink-0 cursor-pointer rounded-xl border border-[#d4af37] bg-[#fff4d6] px-4 py-2 text-xs font-extrabold text-[#421f5c] hover:bg-[#d4af37]"
                  >
                    ▶ 體驗此章
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 space-y-2.5 overflow-y-auto p-6">
              {dialogueLog.length === 0 ? (
                <p className="text-center text-sm text-[#7d6391]">
                  尚無對話紀錄，前往任一地點或章節即可自動記錄。
                </p>
              ) : (
                dialogueLog.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-[#e5d8c3] bg-white px-4 py-2.5 text-sm"
                  >
                    <span className="font-extrabold text-[#592b78]">
                      【{item.speaker}】：
                    </span>
                    <span className="text-[#2d163d]">{item.text}</span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}

      {/* 6. 企劃與世界觀總覽圖 (GDD & World Overview Sheet Modal) */}
      {activeModal === 'overview' && (
        <div className="flex h-[610px] w-full max-w-[1040px] flex-col overflow-hidden rounded-2xl border-2 border-[#d4af37] bg-[#fcf8f2] text-[#2d163d] shadow-[0_16px_48px_rgba(0,0,0,0.85)]">
          <div className="flex items-center justify-between border-b-2 border-[#d4af37] bg-gradient-to-r from-[#3d1d56] via-[#562b78] to-[#3d1d56] px-6 py-3.5 text-[#ffefd0]">
            <span className="text-lg font-black tracking-wider">
              🗺️ 《賤修》世界觀、核心系統與七階段企劃總覽圖
            </span>
            <button
              type="button"
              aria-label="關閉企劃總覽視窗"
              onClick={onClose}
              className="cursor-pointer rounded-lg px-2.5 py-1 text-base font-bold text-[#ffefd0] hover:bg-white/15"
            >
              ✕
            </button>
          </div>
          <div className="flex flex-1 flex-col items-center justify-between overflow-y-auto p-5">
            <img
              src={ASSETS.worldOverview}
              alt="賤修 世界觀與主要勢力、核心系統、主線七階段總覽圖"
              referrerPolicy="no-referrer"
              className="w-full rounded-xl border border-[#d4af37] object-contain shadow-md"
            />
            <div className="mt-4 grid w-full grid-cols-1 gap-3 md:grid-cols-3">
              <div className="rounded-xl border border-[#d4af37] bg-white p-3 text-xs">
                <div className="font-extrabold text-[#592b78]">❖ 特殊救援系統</div>
                <p className="mt-1 text-[#4f3961]">
                  危險時呼喊「師姐」，依地點距離觸發對應男主或師姐救援；若好感度高更會觸發五方同時抵達的終極修羅場！
                </p>
              </div>
              <div className="rounded-xl border border-[#d4af37] bg-white p-3 text-xs">
                <div className="font-extrabold text-[#592b78]">❖ 若言定律</div>
                <p className="mt-1 text-[#4f3961]">
                  超過三個遊戲日未遭遇重大事件，系統必定自動安排一次重大事件，維持緊湊喜劇與懸疑節奏。
                </p>
              </div>
              <div className="rounded-xl border border-[#d4af37] bg-white p-3 text-xs">
                <div className="font-extrabold text-[#592b78]">❖ 自由情感路線</div>
                <p className="mt-1 text-[#4f3961]">
                  不強迫單一戀愛或救世，可專注單人、同時與四位男主曖昧，或當一名快樂的陣法富婆。
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. 十階大陣破陣演練 (Ten-Rank Formation Interactive Minigame) */}
      {activeModal === 'formation' && (
        <div className="flex w-full max-w-[580px] flex-col overflow-hidden rounded-2xl border-2 border-[#d4af37] bg-[#211130] p-6 text-[#fff4d6] shadow-[0_16px_48px_rgba(0,0,0,0.9)]">
          <div className="mb-3 flex items-center justify-between border-b border-[#d4af37]/50 pb-3">
            <h2 className="text-xl font-black text-[#ffd166]">
              ☸ 四水若言 · 十階困龍大陣演練
            </h2>
            <button
              type="button"
              aria-label="關閉陣法視窗"
              onClick={onClose}
              className="cursor-pointer rounded-lg px-2.5 py-1 text-base font-bold text-[#ffefd0] hover:bg-white/15"
            >
              ✕
            </button>
          </div>

          <p className="mb-4 text-xs leading-relaxed text-[#e6d2b5]">
            依序點亮下方五處陣眼（乾、坤、震、巽、中宮），即可完成十階困陣布置，重現黑水黑市困住魔域少主容九淵三個時辰的經典戰績！
          </p>

          <div className="my-4 grid grid-cols-5 gap-3">
            {['乾金陣眼', '坤土陣眼', '震雷陣眼', '巽風陣眼', '中宮狐丹'].map(
              (label, idx) => {
                const active = selectedNodes.includes(idx);
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => {
                      if (!active) {
                        setSelectedNodes((prev) => [...prev, idx]);
                      }
                    }}
                    className={`flex h-24 cursor-pointer flex-col items-center justify-center rounded-xl border-2 p-2 text-center transition-all ${
                      active
                        ? 'scale-105 border-[#fff3c4] bg-[#d4af37] text-[#211130] shadow-[0_0_20px_rgba(255,209,102,0.6)]'
                        : 'border-[#d4af37]/60 bg-[#341b4d] text-[#ffefd0] hover:border-[#ffd166]'
                    }`}
                  >
                    <span className="text-lg font-black">
                      {active ? '✦' : '❖'}
                    </span>
                    <span className="mt-1 text-xs font-bold">{label}</span>
                  </button>
                );
              }
            )}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setSelectedNodes([])}
              className="cursor-pointer rounded-lg border border-[#d4af37]/60 px-4 py-2 text-xs font-bold text-[#e6d2b5] hover:bg-white/10"
            >
              重置陣眼
            </button>
            <button
              type="button"
              onClick={() => {
                const res = evaluateFormationPower(
                  selectedNodes.length > 0 ? selectedNodes : [0, 1, 2, 3, 4],
                  [0, 1, 2, 3, 4]
                );
                setSelectedNodes([]);
                onCompleteFormation(res.rewardStones, res.accuracy);
              }}
              className="cursor-pointer rounded-xl border-2 border-[#fff3c4] bg-gradient-to-r from-[#d4af37] to-[#f5d77f] px-6 py-2.5 text-sm font-black text-[#231033] shadow-lg transition-transform hover:scale-105"
            >
              ⚡ 起陣！困敵三個時辰
            </button>
          </div>
        </div>
      )}

      {/* 8. 系統暫停選單 (Pause Modal - synced with body[data-state="paused"]) */}
      {activeModal === 'paused' && (
        <div
          data-testid="pause-modal"
          className="flex w-full max-w-[440px] flex-col rounded-2xl border-2 border-[#d4af37] bg-[#241236] p-6 text-[#fff4d6] shadow-[0_16px_48px_rgba(0,0,0,0.9)]"
        >
          <h2 className="mb-1 text-center text-2xl font-black text-[#ffd166]">
            ❖ 系統護法 · 暫停中 ❖
          </h2>
          <p className="mb-5 text-center text-xs text-[#d8c7b0]">
            《賤修》進度管理與系統設定
          </p>

          {saveStatusMsg && (
            <div className="mb-4 rounded-lg border border-[#ffd166] bg-[#3d2159] px-3 py-2 text-center text-xs font-bold text-[#fff3c4]">
              {saveStatusMsg}
            </div>
          )}

          <div className="flex flex-col gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-xl border-2 border-[#ffd166] bg-[#d4af37] py-2.5 text-sm font-black text-[#231033] hover:brightness-110"
            >
              ▶ 繼續修仙 (Resume)
            </button>
            <button
              type="button"
              onClick={onSaveGame}
              className="cursor-pointer rounded-xl border border-[#d4af37] bg-[#381d52] py-2.5 text-sm font-bold text-[#fff4d6] hover:bg-[#4b276e]"
            >
              ⬇ 儲存當前進度 (Save)
            </button>
            <button
              type="button"
              onClick={onLoadGame}
              className="cursor-pointer rounded-xl border border-[#d4af37] bg-[#381d52] py-2.5 text-sm font-bold text-[#fff4d6] hover:bg-[#4b276e]"
            >
              ⬆ 讀取上次進度 (Load)
            </button>
            <button
              type="button"
              onClick={onRestartRun}
              className="cursor-pointer rounded-xl border border-[#d4af37]/60 bg-[#2b1540] py-2.5 text-sm font-bold text-[#e6d2b5] hover:bg-[#3d1e59]"
            >
              ↻ 重新開始本局 (Restart)
            </button>
            <button
              type="button"
              onClick={onResetToTitle}
              className="cursor-pointer rounded-xl border border-[#c93b3b]/70 bg-[#4a1825] py-2.5 text-sm font-bold text-[#ffd6d6] hover:bg-[#662032]"
            >
              🚪 返回標題畫面 (Title)
            </button>
          </div>
        </div>
      )}

      {/* 9. 破陣大捷 / 階段結算視窗 (Victory / Stage Clear Modal - synced with body[data-state="gameover"]) */}
      {activeModal === 'victory' && victoryStats && (
        <div
          data-testid="victory-modal"
          className="flex w-full max-w-[480px] flex-col rounded-2xl border-2 border-[#ffd166] bg-[#241236] p-6 text-[#fff4d6] shadow-[0_16px_48px_rgba(0,0,0,0.9)]"
        >
          <div className="mb-1 text-center text-xs font-bold tracking-widest text-[#ffd166]">
            ❖ 十階大陣 · 功成身退 ❖
          </div>
          <h2 className="mb-4 text-center text-2xl font-black text-[#fff5df]">
            {victoryStats.title}
          </h2>

          <div className="mb-5 grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-[#d4af37] bg-[#351b4f] p-3 text-center">
              <div className="text-[11px] text-[#d8c7b0]">困敵時長</div>
              <div className="mt-1 text-xl font-black text-[#ffd166] tabular-nums">
                {victoryStats.trappedHours} 個時辰
              </div>
            </div>
            <div className="rounded-xl border border-[#d4af37] bg-[#351b4f] p-3 text-center">
              <div className="text-[11px] text-[#d8c7b0]">靈石收穫</div>
              <div className="mt-1 text-xl font-black text-[#ffd166] tabular-nums">
                +{victoryStats.stonesEarned}
              </div>
            </div>
            <div className="rounded-xl border border-[#d4af37] bg-[#351b4f] p-3 text-center">
              <div className="text-[11px] text-[#d8c7b0]">天道線索</div>
              <div className="mt-1 text-xl font-black text-[#ffd166] tabular-nums">
                {victoryStats.cluesCount}/4
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <button
              type="button"
              data-start="true"
              onClick={onClose}
              className="cursor-pointer rounded-xl border-2 border-[#fff3c4] bg-gradient-to-r from-[#d4af37] to-[#f5d77f] py-3 text-sm font-black text-[#231033] hover:brightness-110"
            >
              ▶ 繼續探索修仙界 (Continue)
            </button>
            <button
              type="button"
              onClick={onRestartRun}
              className="cursor-pointer rounded-xl border border-[#d4af37] bg-[#381d52] py-2.5 text-xs font-bold text-[#fff4d6] hover:bg-[#4b276e]"
            >
              ↻ 再布一次十階大陣 (Play Again)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
