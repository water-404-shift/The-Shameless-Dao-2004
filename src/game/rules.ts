export type GameShellState = 'title' | 'playing' | 'paused' | 'gameover';

export type TimePeriod = '辰時' | '午時' | '申時' | '戌時' | '子時';

export const TIME_PERIODS: TimePeriod[] = ['辰時', '午時', '申時', '戌時', '子時'];

export interface CultivationRealm {
  index: number;
  name: string;
  subStage: string;
  minExp: number;
  lifespan: string;
  description: string;
}

export const CULTIVATION_REALMS: CultivationRealm[] = [
  { index: 1, name: '煉氣', subStage: '一境·煉氣圓滿', minExp: 0, lifespan: '120載', description: '引氣入體，初窺修真門徑。' },
  { index: 2, name: '築基', subStage: '二境·築基後期', minExp: 100, lifespan: '240載', description: '鑄就道基，四水若言憑此境界即可獨立布下十階大陣。' },
  { index: 3, name: '金丹', subStage: '三境·金丹初期', minExp: 300, lifespan: '500載', description: '金丹大道，靈力生生不息，足以催動上古奇陣。' },
  { index: 4, name: '元嬰', subStage: '四境·元嬰破繭', minExp: 600, lifespan: '1000載', description: '碎丹成嬰，神識可外放百里，窺探秘境法則。' },
  { index: 5, name: '化神', subStage: '五境·化神通玄', minExp: 1000, lifespan: '2000載', description: '元神化形，初步觸及八千年前被篡改的天道規則。' },
  { index: 6, name: '煉虛', subStage: '六境·煉虛返真', minExp: 1500, lifespan: '3500載', description: '融身太虛，可橫渡妖境與魔域裂隙。' },
  { index: 7, name: '合體', subStage: '七境·合體萬象', minExp: 2200, lifespan: '5000載', description: '天人交感，舉手投足皆成天地陣勢。' },
  { index: 8, name: '大乘', subStage: '八境·大乘無暇', minExp: 3000, lifespan: '8000載', description: '立於修真界頂峰，直面八千年飛升斷絕之謎。' },
  { index: 9, name: '渡劫', subStage: '九境·渡劫問道', minExp: 4000, lifespan: '與天同壽', description: '引九重天雷淬體，叩問天門之後的真實因果。' },
];

export type HeroId = 'rong' | 'lu' | 'su' | 'ye';

export type LocationId =
  | 'taiqing'
  | 'fanyin'
  | 'hehuan'
  | 'yixian'
  | 'blackmarket'
  | 'moyu'
  | 'mijing';

export interface DailyActionResult {
  day: number;
  timeIndex: number;
  timePeriod: TimePeriod;
  ap: number;
  maxAp: number;
  stones: number;
  cultivationExp: number;
  daysWithoutMajorEvent: number;
  ruoyanLawTriggered: boolean;
  ruleViolations: number;
  summaryText: string;
}

export interface GameProgressState {
  day: number;
  timeIndex: number;
  ap: number;
  maxAp: number;
  stones: number;
  cultivationExp: number;
  daysWithoutMajorEvent: number;
  ruleViolations: number;
  affection: Record<HeroId, number>;
  cluesFound: string[];
  currentLocation: LocationId;
}

/**
 * Clamp affection between 0 and 100.
 */
export function clampAffection(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

/**
 * Update a specific hero's hidden affection score.
 */
export function updateHeroAffection(
  current: Record<HeroId, number>,
  heroId: HeroId,
  delta: number
): Record<HeroId, number> {
  return {
    ...current,
    [heroId]: clampAffection((current[heroId] ?? 0) + delta),
  };
}

/**
 * Hidden affection stage description (since GDD 4.3 notes raw numbers are backend-driven,
 * while giving poetic attitude stages & heart resonance).
 */
export function getAffectionStageLabel(heroId: HeroId, score: number): string {
  const s = clampAffection(score);
  if (heroId === 'rong') {
    if (s < 25) return '咬牙切齒 · 顏控初動';
    if (s < 55) return '口是心非 · 玉簡轟炸';
    if (s < 80) return '魔域並肩 · 傲嬌傾心';
    return '傾盡魔域 · 唯你一人';
  }
  if (heroId === 'lu') {
    if (s < 25) return '同門關照 · 依規辦事';
    if (s < 55) return '默然護短 · 代抄門規';
    if (s < 80) return '劍心微瀾 · 情意暗生';
    return '門規之外 · 畢生相護';
  }
  if (heroId === 'su') {
    if (s < 25) return '風雅試探 · 高額診金';
    if (s < 55) return '曖昧交鋒 · 步步引誘';
    if (s < 80) return '假戲真做 · 醫者動心';
    return '卸下防線 · 真心交付';
  }
  // ye
  if (s < 25) return '慈悲眾生 · 靜心論道';
  if (s < 55) return '第四十七問 · 破例駐足';
  if (s < 80) return '琉璃微瑕 · 難辨私情';
  return '因果同擔 · 不負蒼生不負卿';
}

/**
 * Determine current cultivation realm from exp.
 */
export function getRealmForExp(exp: number): CultivationRealm {
  let matched = CULTIVATION_REALMS[0];
  for (const realm of CULTIVATION_REALMS) {
    if (exp >= realm.minExp) {
      matched = realm;
    } else {
      break;
    }
  }
  return matched;
}

/**
 * Check if Ruoyan's Law ("若言定律") triggers:
 * When the player goes more than 3 game days without a major event,
 * the game guarantees a major event.
 */
export function shouldTriggerRuoyanLaw(daysWithoutMajorEvent: number): boolean {
  return daysWithoutMajorEvent >= 3;
}

/**
 * Execute a daily action on the map and return the updated state + narrative feedback.
 */
export function executeDailyAction(
  state: GameProgressState,
  actionType: '修煉' | '上課' | '接取任務' | '閒逛' | '休息'
): DailyActionResult {
  if (actionType === '休息') {
    const nextDay = state.day + 1;
    const nextDaysWithoutMajor = state.daysWithoutMajorEvent + 1;
    const ruoyanLawTriggered = shouldTriggerRuoyanLaw(nextDaysWithoutMajor);
    return {
      day: nextDay,
      timeIndex: 0,
      timePeriod: TIME_PERIODS[0],
      ap: state.maxAp,
      maxAp: state.maxAp,
      stones: state.stones,
      cultivationExp: state.cultivationExp + 5,
      daysWithoutMajorEvent: ruoyanLawTriggered ? 0 : nextDaysWithoutMajor,
      ruoyanLawTriggered,
      ruleViolations: state.ruleViolations,
      summaryText: ruoyanLawTriggered
        ? `第 ${nextDay} 日破曉！你連續三日安分守己，觸發【若言定律】——麻煩主動找上門了！`
        : `你在洞府美美睡了一覺，迎來第 ${nextDay} 日（${TIME_PERIODS[0]}），行動點數已全數恢復！`,
    };
  }

  if (state.ap <= 0) {
    return {
      day: state.day,
      timeIndex: state.timeIndex,
      timePeriod: TIME_PERIODS[state.timeIndex] || '午時',
      ap: state.ap,
      maxAp: state.maxAp,
      stones: state.stones,
      cultivationExp: state.cultivationExp,
      daysWithoutMajorEvent: state.daysWithoutMajorEvent,
      ruoyanLawTriggered: false,
      ruleViolations: state.ruleViolations,
      summaryText: '今日行動點數（AP）已耗盡，請選擇「休息」推進至下一日！',
    };
  }

  const nextAp = state.ap - 1;
  const nextTimeIndex = (state.timeIndex + 1) % TIME_PERIODS.length;
  const wrappedDay = state.timeIndex + 1 >= TIME_PERIODS.length;
  const nextDay = wrappedDay ? state.day + 1 : state.day;
  const nextDaysWithoutMajor = wrappedDay
    ? state.daysWithoutMajorEvent + 1
    : state.daysWithoutMajorEvent;
  const ruoyanLawTriggered = shouldTriggerRuoyanLaw(nextDaysWithoutMajor);

  let stonesDelta = 0;
  let expDelta = 0;
  let violationsDelta = 0;
  let summaryText = '';

  switch (actionType) {
    case '修煉':
      expDelta = 28;
      summaryText =
        '你在聚靈陣中演化十階陣紋，天地靈氣鯨吞入體，修為精進（+28 修為）！';
      break;
    case '上課':
      expDelta = 18;
      stonesDelta = 60;
      violationsDelta = 1;
      summaryText =
        '你在宗門陣法課上隨手改寫了長老的護堂陣，全場震驚！獲賞 60 靈石、+18 修為（門規紀錄 +1）。';
      break;
    case '接取任務':
      stonesDelta = 320;
      expDelta = 12;
      summaryText =
        '你接下除祟委託，用三張連環困陣符輕鬆打包妖獸換取賞金（+320 靈石、+12 修為）！';
      break;
    case '閒逛':
      stonesDelta = 80;
      expDelta = 10;
      violationsDelta = 1;
      summaryText =
        '你在山門四處溜達，順手幫丹頂鶴畫了個聚靈生髮陣，惹得大師兄提劍趕來（+80 靈石、門規紀錄 +1）！';
      break;
  }

  return {
    day: nextDay,
    timeIndex: nextTimeIndex,
    timePeriod: TIME_PERIODS[nextTimeIndex],
    ap: nextAp,
    maxAp: state.maxAp,
    stones: state.stones + stonesDelta,
    cultivationExp: state.cultivationExp + expDelta,
    daysWithoutMajorEvent: ruoyanLawTriggered ? 0 : nextDaysWithoutMajor,
    ruoyanLawTriggered,
    ruleViolations: state.ruleViolations + violationsDelta,
    summaryText,
  };
}

/**
 * Special Rescue System ("特殊救援系統"):
 * When Ruoyan shouts "師姐！", resolves who arrives based on location distance & bond.
 */
export interface RescueOutcome {
  primaryRescuer: string;
  secondaryRescuer?: string;
  isShuraRescue: boolean;
  title: string;
  scriptKey: string;
  summary: string;
}

export function resolveSpecialRescue(
  location: LocationId,
  affection: Record<HeroId, number>
): RescueOutcome {
  // Check if multiple heroes have high affection (>= 60) at secret realm or black market -> Shura Rescue!
  const highHeroes = (Object.keys(affection) as HeroId[]).filter(
    (k) => affection[k] >= 60
  );

  if (location === 'mijing' || highHeroes.length >= 2) {
    return {
      primaryRescuer: '莫溫雨 & 眾男主',
      secondaryRescuer: '陸長安 · 容九淵 · 蘇知弦 · 葉聽禪',
      isShuraRescue: true,
      title: '【特殊救援·修羅場降臨】一聲「師姐」引來四方大佬！',
      scriptKey: 'rescue_shura',
      summary:
        '你仰天大喊「師姐救我！」，結果不僅莫溫雨破空而至，連附近的容九淵、陸長安、蘇知弦與葉聽禪也同時殺到現場！',
    };
  }

  switch (location) {
    case 'taiqing':
      return {
        primaryRescuer: '陸長安 & 莫溫雨',
        isShuraRescue: false,
        title: '【太清劍陣救援】無妄劍光破空而至',
        scriptKey: 'rescue_taiqing',
        summary:
          '你剛喊出「師姐」，莫溫雨的劍氣與陸長安的「無妄劍」已同時封鎖全場！',
      };
    case 'blackmarket':
    case 'moyu':
      return {
        primaryRescuer: '容九淵',
        secondaryRescuer: '莫溫雨',
        isShuraRescue: false,
        title: '【魔域少主救援】黑炎龍氣震碎敵陣',
        scriptKey: 'rescue_rong',
        summary:
          '莫溫雨尚在趕來途中，容九淵已冷笑著踏碎虛空降臨：「本少困了三個時辰的女人，誰敢動？」',
      };
    case 'hehuan':
    case 'yixian':
      return {
        primaryRescuer: '蘇知弦',
        secondaryRescuer: '莫溫雨',
        isShuraRescue: false,
        title: '【春風谷醫毒雙絕】漫天花雨迷魂陣',
        scriptKey: 'rescue_su',
        summary:
          '蘇知弦輕搖折扇自桃花障中現身，彈指間敵人盡數軟倒：「救命之恩，診金可要翻倍了。」',
      };
    case 'fanyin':
    default:
      return {
        primaryRescuer: '葉聽禪',
        secondaryRescuer: '莫溫雨',
        isShuraRescue: false,
        title: '【梵音琉璃金鐘】萬字佛印護佑周全',
        scriptKey: 'rescue_ye',
        summary:
          '梵音鐘聲徹響，葉聽禪手持念珠擋在你身前，金光化作蓮台將強敵盡數震退。',
      };
  }
}

/**
 * Check if a location has Jade Slip signal ("玉簡訊號").
 * Black Market, Demon Realm, and Deep Secret Realm cause offline message accumulation.
 */
export function hasJadeSlipSignal(location: LocationId): boolean {
  return location !== 'blackmarket' && location !== 'moyu';
}

/**
 * Evaluate Ten-Rank Formation Array ("十階大陣") node activation minigame.
 */
export function evaluateFormationPower(
  activatedNodes: number[],
  targetPattern: number[]
): {
  success: boolean;
  accuracy: number;
  trappedHours: number;
  rewardStones: number;
} {
  if (targetPattern.length === 0) {
    return { success: true, accuracy: 100, trappedHours: 3, rewardStones: 500 };
  }
  let matches = 0;
  for (let i = 0; i < targetPattern.length; i++) {
    if (activatedNodes[i] === targetPattern[i]) {
      matches++;
    }
  }
  const accuracy = Math.round((matches / targetPattern.length) * 100);
  const success = accuracy >= 66;
  return {
    success,
    accuracy,
    trappedHours: success ? 3 : 1,
    rewardStones: success ? 600 : 150,
  };
}
