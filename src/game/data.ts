import { HeroId, LocationId } from './rules';

export const ASSETS = {
  luSheet:
    '/assets/aistudio/_E8_B3_A4_E4_BF_AE__E9_99_B8_E9_95_B7_E5_AE_89__E5_85_A8_E8_BA_AB_E7_AB_99_E5_A7_BF_E8_A8_AD_E5_AE_9A_E5_9C_96_d25ce33f.png',
  suSheet: '/assets/aistudio/IMG_20261102_140618_4bd1c921.png',
  ruoyanSheet: '/assets/aistudio/IMG_20261102_140556_d9da228c.png',
  rongSheet: '/assets/aistudio/IMG_20261102_140540_7b8db584.png',
  yeSheet: '/assets/aistudio/file_000000001824820badbc18908a5a105c_b48438ba.png',
  worldOverview:
    '/assets/aistudio/file_00000000d8bc820b88b989a74d2eb6da_09b77ad0.png',
  mapSceneRef:
    '/assets/aistudio/file_000000001d9881fa93f6d3e49309c684_87406cd8.png',
  vnTaiqingScene:
    '/assets/aistudio/file_000000007634820b88cea0093e48fe63_e9b4168c.png',
  vnShuraScene:
    '/assets/aistudio/file_000000000ed8820b8d2ed94d28e5b390_b755b7a2.png',
};

export interface CharacterProfile {
  id: string;
  heroId?: HeroId;
  name: string;
  title: string;
  faction: string;
  difficulty?: string;
  firstMeet: string;
  quote: string;
  ageInfo?: string;
  realmInfo: string;
  sheetUrl: string;
  /** CSS background-position and background-size to crop the full-body figure */
  standCrop: {
    bgSize: string;
    bgPosition: string;
  };
  /** CSS background-position and background-size to crop the face avatar */
  avatarCrop: {
    bgSize: string;
    bgPosition: string;
  };
  accentColor: string;
  traits: string[];
  romanceArc: string[];
  signatureItem: {
    name: string;
    subtitle: string;
    desc: string;
  };
}

export const CHARACTERS: Record<string, CharacterProfile> = {
  四水若言: {
    id: 'ruoyan',
    name: '四水若言',
    title: '太清宗弟子 · 女主角',
    faction: '太清宗',
    firstMeet: '玩家扮演主角',
    quote: '「修仙嘛，當然是要玩得盡興！」',
    ageInfo: '40歲（外貌約18歲）',
    realmInfo: '築基後期（可獨立布十階大陣）',
    sheetUrl: ASSETS.ruoyanSheet,
    standCrop: {
      bgSize: '220% auto',
      bgPosition: '10% 66%',
    },
    avatarCrop: {
      bgSize: '470% auto',
      bgPosition: '89% 25%',
    },
    accentColor: '#9b6dff',
    traits: [
      '天賦極高的陣法專家，築基期即可布下十階大陣',
      '自由奔放、愛惹事、擅長以智慧與符籙逃跑取勝',
      '因調戲丹頂鶴禿頭被從空中丟下，遭禁飛所有交通工具',
      '對感情保持開放態度，可同時與多人曖昧或專心搞事業',
    ],
    romanceArc: [
      '師父沈清玉極度寵愛，師姐莫溫雨是最強後盾',
      '體內藏有養父四水方渝留下的九尾狐丹，牽動妖境與天道之謎',
    ],
    signatureItem: {
      name: '十階陣盤 & 儲物袋',
      subtitle: '隨身本命法寶',
      desc: '若言最珍惜的紫金陣盤與塞滿二手佛經、爆破符的儲物袋。',
    },
  },
  容九淵: {
    id: 'rong',
    heroId: 'rong',
    name: '容九淵',
    title: '魔域少主',
    faction: '魔域',
    difficulty: '★☆☆☆（相對最容易）',
    firstMeet: '黑水黑市',
    quote: '「困住本少三個時辰……你很有膽量。」',
    realmInfo: '元嬰圓滿 · 魔域少主',
    sheetUrl: ASSETS.rongSheet,
    standCrop: {
      bgSize: '215% auto',
      bgPosition: '12% 68%',
    },
    avatarCrop: {
      bgSize: '470% auto',
      bgPosition: '89% 25%',
    },
    accentColor: '#d9383a',
    traits: [
      '顏控、嘴硬傲嬌，初見若言便因外貌迅速心動',
      '在黑水黑市被若言釣魚釣起，困在十階大陣整整三個時辰',
      '脫困後透過玉簡連發超過 999 則未讀訊息轟炸',
      '具備魔域少主的政治判斷力，需面對長老奪權危機',
    ],
    romanceArc: [
      '初期因顏控一見傾心，嘴上喊打喊殺卻隨傳隨到',
      '在魔域政務與長老逼宮危機中與若言並肩作戰，交付真心',
    ],
    signatureItem: {
      name: '赤金魔龍飾',
      subtitle: '魔域少主信物',
      desc: '蘊含魔域少主本源龍氣的赤金紋飾，可震懾宵小並定位持有人。',
    },
  },
  陸長安: {
    id: 'lu',
    heroId: 'lu',
    name: '陸長安',
    title: '太清宗大師兄',
    faction: '太清宗',
    difficulty: '★★☆☆（外冷內熱）',
    firstMeet: '太清宗（初始已認識）',
    quote: '「門規之內，我會護你。門規之外……也一樣。」',
    realmInfo: '金丹圓滿 · 首席劍修',
    sheetUrl: ASSETS.luSheet,
    standCrop: {
      bgSize: '225% auto',
      bgPosition: '12% 66%',
    },
    avatarCrop: {
      bgSize: '470% auto',
      bgPosition: '88% 25%',
    },
    accentColor: '#4a78c2',
    traits: [
      '冷靜寡言、情緒穩定、嚴守門規的傳統劍修',
      '師從凌雲真人，佩劍「無妄」，從不以武力恐嚇同門',
      '定期提交若言的門規破壞紀錄，卻總在背後默默替她收拾殘局',
      '熟悉劍道卻不諳男女情愛，總是替她分擔一半罰抄',
    ],
    romanceArc: [
      '早已對若言心動，卻尚未釐清這份情感與同門情誼的不同',
      '從長久相處、責任與護短習慣中，逐漸覺醒深沉而堅定的愛意',
    ],
    signatureItem: {
      name: '無妄劍穗',
      subtitle: '太清宗首席佩劍信物',
      desc: '無妄劍柄垂落的冰藍劍穗，蘊含大師兄溫潤而凌厲的護身劍意。',
    },
  },
  蘇知弦: {
    id: 'su',
    heroId: 'su',
    name: '蘇知弦',
    title: '合歡宗醫修',
    faction: '合歡宗 · 醫仙谷',
    difficulty: '★★★☆（曖昧高手）',
    firstMeet: '秘境大比',
    quote: '「先治好你，再來談診金……如何？」',
    realmInfo: '金丹後期 · 醫丹雙絕',
    sheetUrl: ASSETS.suSheet,
    standCrop: {
      bgSize: '215% auto',
      bgPosition: '12% 66%',
    },
    avatarCrop: {
      bgSize: '470% auto',
      bgPosition: '89% 25%',
    },
    accentColor: '#e87fa0',
    traits: [
      '父親出身醫仙谷、母親為合歡宗聖女，兼具醫術與社交手腕',
      '常著綠粉色衣袍，風雅溫柔，擅長觀察人心與掌握曖昧節奏',
      '行醫原則：先救治病患再談診金，絕不以拒絕急救作為要脅',
      '診金極為高昂，常對心儀對象提出雙方自願的親密抵償方案',
    ],
    romanceArc: [
      '初期受若言吸引、享受曖昧拉扯，是唯一能讓若言難以掌握節奏的對手',
      '隨著相處深入產生真正的心理依戀，從游刃有餘走向願意交付真心',
    ],
    signatureItem: {
      name: '春風百花丹葫',
      subtitle: '合歡醫仙秘寶',
      desc: '繪有桃花紋樣的琉璃金丹葫，內藏千金難求的續命靈丹與甜香。',
    },
  },
  葉聽禪: {
    id: 'ye',
    heroId: 'ye',
    name: '葉聽禪',
    title: '梵音谷佛修（法號：淨琉璃）',
    faction: '梵音谷',
    difficulty: '★★★★（最難攻略）',
    firstMeet: '梵音谷藏經閣',
    quote: '「第四十七個問題……你可曾想過，執著的真正意義？」',
    realmInfo: '元嬰後期 · 淨琉璃佛子',
    sheetUrl: ASSETS.yeSheet,
    standCrop: {
      bgSize: '215% auto',
      bgPosition: '13% 66%',
    },
    avatarCrop: {
      bgSize: '470% auto',
      bgPosition: '89% 25%',
    },
    accentColor: '#d9a441',
    traits: [
      '心懷眾生、慈悲克制，四位男主中最不容易產生世俗戀情之人',
      '於藏經閣與若言因「第四十七個問題」結下不解因果',
      '深入研究佛門古籍與八千年前的天道異常，追尋飛升真相',
      '對若言與旁人有截然不同的包容與破例',
    ],
    romanceArc: [
      '先是習慣若言頻繁又跳脫的出現，在她久未現身時才驚覺內心波瀾',
      '逐漸產生未察覺的保護慾與佔有意識，在佛法、蒼生與私情間尋得共生之道',
    ],
    signatureItem: {
      name: '菩提琉璃念珠 & 藏經閣古本',
      subtitle: '梵音谷佛門聖物',
      desc: '浸染檀香與佛力的百八菩提念珠，夾著記載八千年前天道異變的殘頁。',
    },
  },
};

export interface SupportingCharacter {
  name: string;
  role: string;
  desc: string;
  cropPosition: string;
}

export const SUPPORTING_CHARACTERS: SupportingCharacter[] = [
  {
    name: '莫溫雨',
    role: '若言的師姐 · 最強救援後盾',
    desc: '太清宗內門精英，極度護短。若言在外闖禍失聯三個月後親自將她拎回宗門；只要若言大喊「師姐」，必會提劍趕來救援。',
    cropPosition: '76% 62%',
  },
  {
    name: '沈清玉（玄清仙子）',
    role: '若言的師父',
    desc: '富有、驕傲且極度寵愛若言的太清宗長老。常塞給若言一堆高級護身法寶，讓她在修仙界橫著走。',
    cropPosition: '75% 25%',
  },
  {
    name: '蒼松真人',
    role: '太清宗掌門',
    desc: '輩分最高、白髮蒼蒼的太清宗掌門。每次看到若言的門規處分卷宗都會扶額嘆氣。',
    cropPosition: '85% 25%',
  },
  {
    name: '凌雲真人',
    role: '陸長安的師父',
    desc: '太清宗劍峰首座，38年前曾與沈清玉爭搶收陸長安為徒，對劍道要求極為嚴苛。',
    cropPosition: '95% 25%',
  },
  {
    name: '四水方渝',
    role: '若言的狐妖養父',
    desc: '撫養若言至12歲的九尾狐妖，將自己的本源狐丹交給她。雖肉身已亡，但確定會在妖境篇章中復活。',
    cropPosition: '89% 62%',
  },
];

export interface MapLocation {
  id: LocationId;
  name: string;
  shortName: string;
  subtitle: string;
  desc: string;
  /** Pin coordinates in % matching Reference Image 7 */
  pinX: number;
  pinY: number;
  hasSignal: boolean;
  defaultScriptId: string;
  guardianHero: string;
  chapterTag: string;
}

export const MAP_LOCATIONS: Record<LocationId, MapLocation> = {
  taiqing: {
    id: 'taiqing',
    name: '太清宗',
    shortName: '太清宗',
    subtitle: '名門正宗 · 碧雲主峰',
    desc: '以陣法、符籙與綜合修行見長的名門大宗。門內學風自由，天才眾多；亦不乏麻煩製造者——而你，正是其中最具代表性的一位。',
    pinX: 47.3,
    pinY: 23.8,
    hasSignal: true,
    defaultScriptId: 'stage_4_taiqing',
    guardianHero: '陸長安',
    chapterTag: '第四階段 · 太清宗日常',
  },
  fanyin: {
    id: 'fanyin',
    name: '梵音谷',
    shortName: '梵音谷',
    subtitle: '佛門聖地 · 藏經古閣',
    desc: '梵唄常鳴、古佛矗立的清修淨土。藏經閣內珍藏著八千年前未曾被篡改的孤本殘卷，葉聽禪（淨琉璃）常在此靜思第四十七問。',
    pinX: 25.0,
    pinY: 29.8,
    hasSignal: true,
    defaultScriptId: 'stage_1_fanyin',
    guardianHero: '葉聽禪',
    chapterTag: '第一階段 · 藏經閣初遇',
  },
  hehuan: {
    id: 'hehuan',
    name: '合歡宗',
    shortName: '合歡宗',
    subtitle: '春風十里 · 桃花畫舫',
    desc: '位於春風谷一帶的風雅宗門，漫山桃花盛放。蘇知弦承襲合歡宗聖女之脈，於曖昧言笑間洞察人心。',
    pinX: 33.8,
    pinY: 46.5,
    hasSignal: true,
    defaultScriptId: 'loc_hehuan_su',
    guardianHero: '蘇知弦',
    chapterTag: '角色支線 · 春風問診',
  },
  yixian: {
    id: 'yixian',
    name: '醫仙谷',
    shortName: '醫仙谷',
    subtitle: '懸壺濟世 · 百草靈泉',
    desc: '與合歡宗比鄰的醫道聖地，雲瀑飛流、靈草遍地。蘇知弦在此設下丹房，診金雖高卻從不見死不救。',
    pinX: 66.8,
    pinY: 39.5,
    hasSignal: true,
    defaultScriptId: 'loc_yixian_alchemy',
    guardianHero: '蘇知弦',
    chapterTag: '日常探索 · 煉丹抵債',
  },
  blackmarket: {
    id: 'blackmarket',
    name: '黑水黑市',
    shortName: '黑水黑市',
    subtitle: '無訊號區 · 奇物暗流',
    desc: '三教九流與走私法寶匯聚的水上暗市（無玉簡訊號）。你曾在此釣魚意外釣起魔域少主容九淵，並用十階大陣困住他整整三個時辰。',
    pinX: 50.8,
    pinY: 56.5,
    hasSignal: false,
    defaultScriptId: 'stage_2_blackmarket',
    guardianHero: '容九淵',
    chapterTag: '第二階段 · 十階困陣',
  },
  moyu: {
    id: 'moyu',
    name: '魔域',
    shortName: '魔域',
    subtitle: '無訊號區 · 赤炎魔宮',
    desc: '赤焰繚繞、權力暗潮洶湧的魔修領地（無玉簡訊號）。容九淵在此獨力應對長老奪權危機，卻仍在玉簡裡給妳發了 999 條訊息。',
    pinX: 23.0,
    pinY: 68.0,
    hasSignal: false,
    defaultScriptId: 'loc_moyu_politics',
    guardianHero: '容九淵',
    chapterTag: '個人劇情 · 魔域奪權危機',
  },
  mijing: {
    id: 'mijing',
    name: '秘境',
    shortName: '秘境',
    subtitle: '花月庭大比 · 遠古遺跡',
    desc: '宗門秘境大比與遠古天道遺跡交疊之地！不僅是與蘇知弦初遇的舞台，更是四位男主正面交鋒的修羅場高發區！',
    pinX: 61.0,
    pinY: 69.2,
    hasSignal: true,
    defaultScriptId: 'stage_5_shura',
    guardianHero: '眾男主齊聚',
    chapterTag: '第五階段 · 秘境大比修羅場',
  },
};

export interface DialogueChoice {
  text: string;
  targetScript: string;
  affectionDelta?: Partial<Record<HeroId, number>>;
  stonesDelta?: number;
  clueUnlocked?: string;
}

export interface DialogueLine {
  speaker: string;
  speakerTitle?: string;
  text: string;
  /** Characters shown on stage */
  stageChars: string[];
  /** Character currently highlighted */
  activeChar?: string;
  backdrop?: 'taiqing' | 'shura' | 'map';
  choices?: DialogueChoice[];
}

export interface StoryScript {
  id: string;
  chapterTitle: string;
  locationLabel: string;
  stageNumber?: number;
  lines: DialogueLine[];
}

export const STORY_SCRIPTS: Record<string, StoryScript> = {
  stage_1_fanyin: {
    id: 'stage_1_fanyin',
    chapterTitle: '第一章 梵音谷 · 第四十七個問題',
    locationLabel: '辰時 · 梵音谷藏經閣',
    stageNumber: 1,
    lines: [
      {
        speaker: '旁白',
        text: '檀香裊裊的梵音谷藏經閣內，陽光透過雕花木窗灑在泛黃的古籍上。你（四水若言）正蹲在書架頂端翻找上古陣圖，卻不小心掉下一卷殘破佛經，正好落在白衣佛修懷中。',
        stageChars: ['四水若言', '葉聽禪'],
        activeChar: '四水若言',
        backdrop: 'taiqing',
      },
      {
        speaker: '葉聽禪',
        speakerTitle: '梵音谷佛修 · 淨琉璃',
        text: '「阿彌陀佛。四水施主，這已是你今日從書架上掉下來的第三次，也是你向貧僧提出的第四十六個問題。」',
        stageChars: ['四水若言', '葉聽禪'],
        activeChar: '葉聽禪',
        backdrop: 'taiqing',
      },
      {
        speaker: '四水若言',
        speakerTitle: '太清宗陣法奇才',
        text: '「淨琉璃大師別這麼小氣嘛！這卷古經上寫著『八千年前天門重開，飛升者神魂俱寂』，跟太清宗教科書寫的完全不一樣耶！」',
        stageChars: ['四水若言', '葉聽禪'],
        activeChar: '四水若言',
        backdrop: 'taiqing',
      },
      {
        speaker: '葉聽禪',
        speakerTitle: '梵音谷佛修 · 淨琉璃',
        text: '「第四十七個問題……你可曾想過，執著的真正意義？世人皆求飛升長生，若天門之後並非極樂，施主又當如何？」',
        stageChars: ['四水若言', '葉聽禪'],
        activeChar: '葉聽禪',
        backdrop: 'taiqing',
        choices: [
          {
            text: '1. 「管他天門後面是什麼，不如大師現在陪我下山吃糖葫蘆？」',
            targetScript: 'stage_1_ye_tease',
            affectionDelta: { ye: 8 },
            clueUnlocked: 'clue_fanyin',
          },
          {
            text: '2. 「若天道有假，我就布一座十階逆天大陣，把天門拆開來看看！」',
            targetScript: 'stage_1_ye_serious',
            affectionDelta: { ye: 12 },
            clueUnlocked: 'clue_fanyin',
          },
        ],
      },
    ],
  },
  stage_1_ye_tease: {
    id: 'stage_1_ye_tease',
    chapterTitle: '第一章 梵音谷 · 琉璃微瀾',
    locationLabel: '辰時 · 梵音谷藏經閣',
    lines: [
      {
        speaker: '葉聽禪',
        text: '「……施主總是這般跳脫。佛門清規不許貪戀口腹之慾，但若施主願將那卷上古殘頁歸還，貧僧可送施主至山門。」',
        stageChars: ['四水若言', '葉聽禪'],
        activeChar: '葉聽禪',
        backdrop: 'taiqing',
      },
      {
        speaker: '旁白',
        text: '葉聽禪垂眸撥動菩提念珠，耳尖卻在晨光中掠過一絲極難察覺的微紅。【解鎖天道線索：藏經閣的矛盾古籍】',
        stageChars: ['四水若言', '葉聽禪'],
        activeChar: '葉聽禪',
        backdrop: 'taiqing',
      },
    ],
  },
  stage_1_ye_serious: {
    id: 'stage_1_ye_serious',
    chapterTitle: '第一章 梵音谷 · 因果初結',
    locationLabel: '辰時 · 梵音谷藏經閣',
    lines: [
      {
        speaker: '葉聽禪',
        text: '「拆開天門麼……施主雖僅築基後期，心念卻比渡劫大能更為無畏。這枚菩提子贈予施主，日後若遇天道反噬，或可護你心脈。」',
        stageChars: ['四水若言', '葉聽禪'],
        activeChar: '葉聽禪',
        backdrop: 'taiqing',
      },
      {
        speaker: '旁白',
        text: '你笑嘻嘻地收下菩提子，順手還塞了一本二手話本進他袖子裡。【解鎖天道線索：藏經閣的矛盾古籍】',
        stageChars: ['四水若言', '葉聽禪'],
        activeChar: '四水若言',
        backdrop: 'taiqing',
      },
    ],
  },

  stage_2_blackmarket: {
    id: 'stage_2_blackmarket',
    chapterTitle: '第二章 黑水黑市 · 十階大陣困少主',
    locationLabel: '戌時 · 黑水黑市暗河',
    stageNumber: 2,
    lines: [
      {
        speaker: '旁白',
        text: '黑水黑市靈氣混雜、完全屏蔽玉簡訊號。你原本在暗河邊悠哉釣靈魚，魚鉤卻勾住了一襲華貴的黑紅魔紋錦袍——魔域少主容九淵正重傷潛行至此！',
        stageChars: ['四水若言', '容九淵'],
        activeChar: '四水若言',
        backdrop: 'shura',
      },
      {
        speaker: '容九淵',
        speakerTitle: '魔域少主',
        text: '「放肆！哪來的不長眼小修士，竟敢用破魚鉤勾本少的衣領……等等，你手裡拿著幾個陣盤在做什麼？！」',
        stageChars: ['四水若言', '容九淵'],
        activeChar: '容九淵',
        backdrop: 'shura',
      },
      {
        speaker: '四水若言',
        speakerTitle: '太清宗陣法奇才',
        text: '「哇，釣到一條長得超好看的大魔頭！但看起來脾氣很差會咬人，還是先用我剛改良的『十階九曲困龍大陣』把你關起來吧！」',
        stageChars: ['四水若言', '容九淵'],
        activeChar: '四水若言',
        backdrop: 'shura',
      },
      {
        speaker: '容九淵',
        speakerTitle: '魔域少主',
        text: '「困住本少三個時辰……你居然還在陣外一邊嗑瓜子、一邊看二手佛經？！四水若言，你很有膽量！」',
        stageChars: ['四水若言', '容九淵'],
        activeChar: '容九淵',
        backdrop: 'shura',
        choices: [
          {
            text: '1. 「少主別生氣嘛，我是看你長得太俊，才捨不得走開足足看了三個時辰！」',
            targetScript: 'stage_2_rong_flirt',
            affectionDelta: { rong: 15 },
            stonesDelta: 300,
          },
          {
            text: '2. 「誰讓你一上來就要拔刀？這張止血靈符給你，我先溜啦！」',
            targetScript: 'stage_2_rong_escape',
            affectionDelta: { rong: 10 },
            stonesDelta: 200,
          },
        ],
      },
    ],
  },
  stage_2_rong_flirt: {
    id: 'stage_2_rong_flirt',
    chapterTitle: '第二章 黑水黑市 · 顏控少主的心跳',
    locationLabel: '戌時 · 黑水黑市暗河',
    lines: [
      {
        speaker: '容九淵',
        text: '「哼……算你有眼光！看在你生得尚可、陣法也有些門道的份上，把你的傳訊玉簡頻段交出來！下次見面，本少定要親手破你的陣！」',
        stageChars: ['四水若言', '容九淵'],
        activeChar: '容九淵',
        backdrop: 'shura',
      },
      {
        speaker: '旁白',
        text: '容九淵強撐著傲慢神色甩袖離去，卻不知接下來三個月你在無訊號區失聯，他足足發了 999 條玉簡訊息！',
        stageChars: ['四水若言', '容九淵'],
        activeChar: '四水若言',
        backdrop: 'shura',
      },
    ],
  },
  stage_2_rong_escape: {
    id: 'stage_2_rong_escape',
    chapterTitle: '第二章 黑水黑市 · 陣成身退',
    locationLabel: '戌時 · 黑水黑市暗河',
    lines: [
      {
        speaker: '容九淵',
        text: '「喂！四水若言！丟一張皺巴巴的符籙就想跑？！給本少站住——！」',
        stageChars: ['四水若言', '容九淵'],
        activeChar: '容九淵',
        backdrop: 'shura',
      },
      {
        speaker: '旁白',
        text: '你早已捏碎縮地符溜之大吉，只留下魔域少主握著那張畫著狐狸鬼臉的止血符咬牙切齒。',
        stageChars: ['四水若言', '容九淵'],
        activeChar: '四水若言',
        backdrop: 'shura',
      },
    ],
  },

  stage_3_sister: {
    id: 'stage_3_sister',
    chapterTitle: '第三章 師姐尋人 · 玉簡999+靈訊炸裂',
    locationLabel: '午時 · 太清宗山門界碑',
    stageNumber: 3,
    lines: [
      {
        speaker: '旁白',
        text: '在外浪跡三個月後，師姐莫溫雨終於在黑市外圍把你拎回了太清宗地界。剛踏入宗門護山大陣範圍，你腰間的通訊玉簡突然瘋狂震動、紅光爆閃！',
        stageChars: ['四水若言', '陸長安'],
        activeChar: '四水若言',
        backdrop: 'taiqing',
      },
      {
        speaker: '四水若言',
        text: '「哇啊啊！玉簡要炸了！『未讀靈訊 999+』？！容九淵這傢伙是把玉簡當成飛劍在連發嗎？！」',
        stageChars: ['四水若言', '陸長安'],
        activeChar: '四水若言',
        backdrop: 'taiqing',
      },
      {
        speaker: '陸長安',
        speakerTitle: '太清宗大師兄',
        text: '「若言，溫雨師妹終於把你找回來了。這三個月你在外觸犯門規共計三十七條，掌門命我在此候你。」',
        stageChars: ['四水若言', '陸長安'],
        activeChar: '陸長安',
        backdrop: 'taiqing',
      },
    ],
  },

  stage_4_taiqing: {
    id: 'stage_4_taiqing',
    chapterTitle: '第四章 太清宗日常 · 門規之內與門規之外',
    locationLabel: '午時 · 太清宗碧雲殿',
    stageNumber: 4,
    lines: [
      {
        speaker: '陸長安',
        speakerTitle: '太清宗大師兄',
        text: '「若言，後山靈獸園長老回報，你又把丹頂鶴的頂羽拔了拿去當十階聚靈陣的陣眼？」',
        stageChars: ['四水若言', '陸長安'],
        activeChar: '陸長安',
        backdrop: 'taiqing',
      },
      {
        speaker: '四水若言',
        speakerTitle: '太清宗陣法奇才',
        text: '「大師兄冤枉啊！那隻丹頂鶴本來就有禿頂危機，我是在幫它布置『十階生髮煥春陣』！誰知道它不領情，還從半空中把我丟下來！」',
        stageChars: ['四水若言', '陸長安'],
        activeChar: '四水若言',
        backdrop: 'taiqing',
      },
      {
        speaker: '陸長安',
        speakerTitle: '太清宗大師兄',
        text: '「……正因如此，掌門才明令禁止你使用任何交通工具，包括御劍與乘鶴。手伸出來，我看看摔傷沒有。」',
        stageChars: ['四水若言', '陸長安'],
        activeChar: '陸長安',
        backdrop: 'taiqing',
      },
      {
        speaker: '陸長安',
        speakerTitle: '太清宗大師兄',
        text: '「門規之內，我會護你。門規之外……也一樣。」',
        stageChars: ['四水若言', '陸長安'],
        activeChar: '陸長安',
        backdrop: 'taiqing',
        choices: [
          {
            text: '1. 「我就知道大師兄最好了！那這次罰抄門規一百遍，大師兄幫我抄九十遍？」',
            targetScript: 'stage_4_lu_warm',
            affectionDelta: { lu: 12 },
          },
          {
            text: '2. 「大師兄，你的心跳好像比平時練劍時快了半拍喔？」',
            targetScript: 'stage_4_lu_blush',
            affectionDelta: { lu: 15 },
          },
        ],
      },
    ],
  },
  stage_4_lu_warm: {
    id: 'stage_4_lu_warm',
    chapterTitle: '第四章 太清宗日常 · 無妄劍意',
    locationLabel: '午時 · 太清宗碧雲殿',
    lines: [
      {
        speaker: '陸長安',
        text: '「胡鬧。最多替你抄五十遍……下不為例。今晚來劍閣，我教你如何以劍氣穩固陣盤，免得你靈力不足又被反噬。」',
        stageChars: ['四水若言', '陸長安'],
        activeChar: '陸長安',
        backdrop: 'taiqing',
      },
    ],
  },
  stage_4_lu_blush: {
    id: 'stage_4_lu_blush',
    chapterTitle: '第四章 太清宗日常 · 不自知的深情',
    locationLabel: '午時 · 太清宗碧雲殿',
    lines: [
      {
        speaker: '陸長安',
        text: '「……許是方才御劍過急，氣息未平。你莫要胡思亂想，先把這瓶護脈丹服下。」',
        stageChars: ['四水若言', '陸長安'],
        activeChar: '陸長安',
        backdrop: 'taiqing',
      },
      {
        speaker: '旁白',
        text: '向來冷靜自持的大師兄握緊了佩劍「無妄」，目光卻始終落在你衣袖的破口上。',
        stageChars: ['四水若言', '陸長安'],
        activeChar: '陸長安',
        backdrop: 'taiqing',
      },
    ],
  },

  stage_5_shura: {
    id: 'stage_5_shura',
    chapterTitle: '第四章 秘境大比 · 風起',
    locationLabel: '子時 · 花月庭',
    stageNumber: 5,
    lines: [
      {
        speaker: '旁白',
        text: '秘境大比之夜，花月庭桃花如雨。你原本只是來找合歡宗醫修蘇知弦包紮破陣時擦傷的手指，不料容九淵與葉聽禪竟在同一時刻踏入亭中！',
        stageChars: ['容九淵', '蘇知弦', '葉聽禪'],
        activeChar: '蘇知弦',
        backdrop: 'shura',
      },
      {
        speaker: '容九淵',
        speakerTitle: '魔域少主',
        text: '「四水若言！在黑市困了本少三個時辰、玉簡九百條不回，現在卻在秘境與合歡宗的人賞花？你很有膽量！」',
        stageChars: ['容九淵', '蘇知弦', '葉聽禪'],
        activeChar: '容九淵',
        backdrop: 'shura',
      },
      {
        speaker: '葉聽禪',
        speakerTitle: '梵音谷佛修',
        text: '「阿彌陀佛。魔域少主殺氣過重，若言施主手腕經脈受損，貧僧特攜梵音靈泉前來為她淨化暗傷。」',
        stageChars: ['容九淵', '蘇知弦', '葉聽禪'],
        activeChar: '葉聽禪',
        backdrop: 'shura',
      },
      {
        speaker: '蘇知弦',
        speakerTitle: '合歡宗醫修',
        text: '「先別急著動氣。若言方才明明是對著我們三個笑，不是嗎？」',
        stageChars: ['容九淵', '蘇知弦', '葉聽禪'],
        activeChar: '蘇知弦',
        backdrop: 'shura',
        choices: [
          {
            text: '1. 先勸容九淵冷靜。',
            targetScript: 'shura_choice_rong',
            affectionDelta: { rong: 14, su: 4 },
          },
          {
            text: '2. 轉頭向葉聽禪求助。',
            targetScript: 'shura_choice_ye',
            affectionDelta: { ye: 14, rong: 2 },
          },
          {
            text: '3. 順著蘇知弦的話承認：「對呀，好看的人我全都喜歡！」',
            targetScript: 'shura_choice_su',
            affectionDelta: { su: 15, rong: 5, ye: 5 },
          },
        ],
      },
    ],
  },
  shura_choice_rong: {
    id: 'shura_choice_rong',
    chapterTitle: '秘境大比 · 順毛魔域少主',
    locationLabel: '子時 · 花月庭',
    lines: [
      {
        speaker: '四水若言',
        text: '「九淵少主息怒！黑水黑市根本沒有訊號嘛，我一踏進太清宗收到你的 999 條靈訊，心裡可感動了！」',
        stageChars: ['容九淵', '蘇知弦', '葉聽禪'],
        activeChar: '容九淵',
        backdrop: 'shura',
      },
      {
        speaker: '容九淵',
        text: '「哼……算你識相！既如此，這合歡宗小子的診金本少替你付了，把手伸過來，本少親自帶你去魔域休養！」',
        stageChars: ['容九淵', '蘇知弦', '葉聽禪'],
        activeChar: '容九淵',
        backdrop: 'shura',
      },
      {
        speaker: '蘇知弦',
        text: '「那可不行呢，九淵少主。在下的診金，向來只收病患本人『自願』的抵償方案。」',
        stageChars: ['容九淵', '蘇知弦', '葉聽禪'],
        activeChar: '蘇知弦',
        backdrop: 'shura',
      },
    ],
  },
  shura_choice_ye: {
    id: 'shura_choice_ye',
    chapterTitle: '秘境大比 · 佛門擋箭牌',
    locationLabel: '子時 · 花月庭',
    lines: [
      {
        speaker: '四水若言',
        text: '「淨琉璃大師救命！這兩位施主一個要抓我去魔域、一個要收天價診金，快唸段靜心咒超度一下！」',
        stageChars: ['容九淵', '蘇知弦', '葉聽禪'],
        activeChar: '葉聽禪',
        backdrop: 'shura',
      },
      {
        speaker: '葉聽禪',
        text: '「若言施主莫慌。貧僧既在此處，自不會讓旁人強迫於你……哪怕是魔域少主與合歡高徒，亦需講究因果自願。」',
        stageChars: ['容九淵', '蘇知弦', '葉聽禪'],
        activeChar: '葉聽禪',
        backdrop: 'shura',
      },
    ],
  },
  shura_choice_su: {
    id: 'shura_choice_su',
    chapterTitle: '秘境大比 · 海王本色',
    locationLabel: '子時 · 花月庭',
    lines: [
      {
        speaker: '四水若言',
        text: '「蘇醫修說得沒錯！三位各有千秋，少看哪一個都是修仙界的巨大損失嘛！」',
        stageChars: ['容九淵', '蘇知弦', '葉聽禪'],
        activeChar: '蘇知弦',
        backdrop: 'shura',
      },
      {
        speaker: '蘇知弦',
        text: '「呵呵，若言這份坦率，倒讓在下愈發捨不得只做你的醫修了。看來這場秘境大比，比想像中更有趣。」',
        stageChars: ['容九淵', '蘇知弦', '葉聽禪'],
        activeChar: '蘇知弦',
        backdrop: 'shura',
      },
    ],
  },

  stage_6_ancient: {
    id: 'stage_6_ancient',
    chapterTitle: '第六章 古秘境異動 · 八千年天道裂隙',
    locationLabel: '申時 · 遠古飛升台遺跡',
    stageNumber: 6,
    lines: [
      {
        speaker: '旁白',
        text: '隨著秘境深處的遠古陣紋甦醒，一座斷裂了八千年的白玉飛升台浮現在眾人眼前。碑文上的古篆與現今流傳的《天道通鑑》截然相反！',
        stageChars: ['陸長安', '葉聽禪', '四水若言'],
        activeChar: '葉聽禪',
        backdrop: 'shura',
      },
      {
        speaker: '葉聽禪',
        text: '「碑文記載：『太古曆八千年前，天門傾覆，飛升之路遭人以無上大陣篡改。凡踏入天門者，一身修為盡化作維繫偽天道的養料。』」',
        stageChars: ['陸長安', '葉聽禪', '四水若言'],
        activeChar: '葉聽禪',
        backdrop: 'shura',
      },
      {
        speaker: '陸長安',
        text: '「若言，退後。這座古陣的陣眼竟與你的本命陣法同源……無論八千年前發生了什麼，我絕不會讓你成為天道的祭品。」',
        stageChars: ['陸長安', '葉聽禪', '四水若言'],
        activeChar: '陸長安',
        backdrop: 'shura',
        choices: [
          {
            text: '1. 拓印古碑陣紋，深入追查八千年天道真相',
            targetScript: 'stage_7_yaojing',
            affectionDelta: { ye: 10, lu: 10 },
            clueUnlocked: 'clue_ancient_stele',
          },
          {
            text: '2. 「救世太累了，我只想先把古碑上的極品靈石摳下來帶走！」',
            targetScript: 'stage_7_yaojing',
            affectionDelta: { rong: 10, su: 10 },
            stonesDelta: 800,
            clueUnlocked: 'clue_ancient_stele',
          },
        ],
      },
    ],
  },

  stage_7_yaojing: {
    id: 'stage_7_yaojing',
    chapterTitle: '第七章 妖境開啟 · 狐丹共鳴與養父之謎',
    locationLabel: '子時 · 萬妖境裂隙',
    stageNumber: 7,
    lines: [
      {
        speaker: '旁白',
        text: '古碑靈光衝天而起，你丹田內沉寂多年的「九尾狐丹」驟然發燙！虛空裂開一道通往萬妖境的月華門戶，一道熟悉的白狐虛影在門後浮現——正是撫養你長大的養父四水方渝！',
        stageChars: ['四水若言', '蘇知弦', '容九淵'],
        activeChar: '四水若言',
        backdrop: 'shura',
      },
      {
        speaker: '蘇知弦',
        text: '「這股妖丹本源……難怪你以築基之軀便能洞悉十階天道陣圖。若言，你的脈象正在與妖境共鳴，握緊我的手，莫讓靈力暴走。」',
        stageChars: ['四水若言', '蘇知弦', '容九淵'],
        activeChar: '蘇知弦',
        backdrop: 'shura',
      },
      {
        speaker: '容九淵',
        text: '「管他是妖境還是八千年天門，本少陪你闖到底便是！誰敢攔路，魔域大軍與你的十階大陣一併踏平！」',
        stageChars: ['四水若言', '蘇知弦', '容九淵'],
        activeChar: '容九淵',
        backdrop: 'shura',
      },
      {
        speaker: '四水若言',
        text: '「養父還活著，天道秘密也才剛揭開一角——但不管這修仙界怎麼變，我四水若言的人生，永遠由我自己說了算！」',
        stageChars: ['四水若言', '蘇知弦', '容九淵'],
        activeChar: '四水若言',
        backdrop: 'shura',
      },
    ],
  },

  loc_hehuan_su: {
    id: 'loc_hehuan_su',
    chapterTitle: '春風谷支線 · 先治病，再談自願診金',
    locationLabel: '午時 · 合歡宗桃花舫',
    lines: [
      {
        speaker: '蘇知弦',
        speakerTitle: '合歡宗醫修',
        text: '「先治好你，再來談診金……如何？畢竟面對若言這樣特別的病患，黃金萬兩可抵不上你陪在下一盞茶的時間。」',
        stageChars: ['四水若言', '蘇知弦'],
        activeChar: '蘇知弦',
        backdrop: 'shura',
      },
      {
        speaker: '四水若言',
        text: '「蘇醫修這算盤打得連太清宗都聽見啦！說吧，這次又是什麼『雙方自願的特殊抵償方案』？」',
        stageChars: ['四水若言', '蘇知弦'],
        activeChar: '四水若言',
        backdrop: 'shura',
        choices: [
          {
            text: '1. 主動湊近一步反撩：「那蘇醫修敢不敢收下我這個債主？」',
            targetScript: 'loc_hehuan_su_end',
            affectionDelta: { su: 15 },
          },
          {
            text: '2. 掏出剛畫好的十階護身陣盤抵帳',
            targetScript: 'loc_hehuan_su_end',
            affectionDelta: { su: 10 },
          },
        ],
      },
    ],
  },
  loc_hehuan_su_end: {
    id: 'loc_hehuan_su_end',
    chapterTitle: '春風谷支線 · 醫者動心',
    locationLabel: '午時 · 合歡宗桃花舫',
    lines: [
      {
        speaker: '蘇知弦',
        text: '「平日總是看旁人栽在你手裡，如今看來……在下怕是也要把自己的真心一併賠進去了。」',
        stageChars: ['四水若言', '蘇知弦'],
        activeChar: '蘇知弦',
        backdrop: 'shura',
      },
    ],
  },

  loc_yixian_alchemy: {
    id: 'loc_yixian_alchemy',
    chapterTitle: '醫仙谷支線 · 陸長安與蘇知弦的理念交鋒',
    locationLabel: '申時 · 醫仙谷百草堂',
    lines: [
      {
        speaker: '陸長安',
        text: '「蘇道友，若言所需靈藥，太清宗自會以靈石結清，不勞蘇道友提出什麼私下抵償。」',
        stageChars: ['陸長安', '蘇知弦'],
        activeChar: '陸長安',
        backdrop: 'taiqing',
      },
      {
        speaker: '蘇知弦',
        text: '「陸大師兄何必如此緊繃？醫患之間講究你情我願，若言自己都還沒拒絕，大師兄是以何種身分替她回絕呢？」',
        stageChars: ['陸長安', '蘇知弦'],
        activeChar: '蘇知弦',
        backdrop: 'taiqing',
      },
    ],
  },

  loc_moyu_politics: {
    id: 'loc_moyu_politics',
    chapterTitle: '魔域支線 · 長老逼宮與十階殺陣',
    locationLabel: '戌時 · 魔域議事大殿',
    lines: [
      {
        speaker: '容九淵',
        text: '「那群老頑固以為趁本少舊傷未癒就能奪權？呵，他們絕想不到，本少身邊有全修真界最囂張的陣法師。」',
        stageChars: ['四水若言', '容九淵'],
        activeChar: '容九淵',
        backdrop: 'shura',
      },
      {
        speaker: '四水若言',
        text: '「包在我身上！只要少主借我魔域靈脈當陣眼，保證把那幾個叛亂長老困在陣裡聽三天三夜的往生咒！」',
        stageChars: ['四水若言', '容九淵'],
        activeChar: '四水若言',
        backdrop: 'shura',
      },
    ],
  },

  rescue_taiqing: {
    id: 'rescue_taiqing',
    chapterTitle: '【特殊救援】師姐與大師兄雙劍齊至',
    locationLabel: '緊急救援 · 太清劍域',
    lines: [
      {
        speaker: '四水若言',
        text: '「打不過啦！對面人多欺負人少——師姐救我！！！」',
        stageChars: ['四水若言', '陸長安'],
        activeChar: '四水若言',
        backdrop: 'taiqing',
      },
      {
        speaker: '陸長安',
        text: '「無妄劍下，誰敢傷我太清宗之人！溫雨師妹已封住退路，若言，站到我身後。」',
        stageChars: ['四水若言', '陸長安'],
        activeChar: '陸長安',
        backdrop: 'taiqing',
      },
    ],
  },
  rescue_rong: {
    id: 'rescue_rong',
    chapterTitle: '【特殊救援】魔域少主踏空護短',
    locationLabel: '緊急救援 · 黑炎降臨',
    lines: [
      {
        speaker: '四水若言',
        text: '「陣盤靈力不夠啦——師姐救命啊！」',
        stageChars: ['四水若言', '容九淵'],
        activeChar: '四水若言',
        backdrop: 'shura',
      },
      {
        speaker: '容九淵',
        text: '「喊什麼師姐！這一片都是本少的地盤！誰給你們的膽子動四水若言？除了本少，沒人能欺負她！」',
        stageChars: ['四水若言', '容九淵'],
        activeChar: '容九淵',
        backdrop: 'shura',
      },
    ],
  },
  rescue_su: {
    id: 'rescue_su',
    chapterTitle: '【特殊救援】春風百花瞬息迷陣',
    locationLabel: '緊急救援 · 春風谷界',
    lines: [
      {
        speaker: '蘇知弦',
        text: '「莫怕，為夫……咳，在下這不是比莫師姐更快趕到了嗎？這幾位不速之客，正好拿來試試新煉的醉夢散。」',
        stageChars: ['四水若言', '蘇知弦'],
        activeChar: '蘇知弦',
        backdrop: 'shura',
      },
    ],
  },
  rescue_ye: {
    id: 'rescue_ye',
    chapterTitle: '【特殊救援】梵音琉璃不動金鐘',
    locationLabel: '緊急救援 · 梵音佛域',
    lines: [
      {
        speaker: '葉聽禪',
        text: '「阿彌陀佛。苦海無邊，諸位施主若執意傷她，貧僧今日便破例動一次降魔杵。」',
        stageChars: ['四水若言', '葉聽禪'],
        activeChar: '葉聽禪',
        backdrop: 'taiqing',
      },
    ],
  },
  rescue_shura: {
    id: 'rescue_shura',
    chapterTitle: '【特殊救援·終極修羅場】一聲師姐，五方降臨！',
    locationLabel: '緊急救援 · 修羅場中心',
    lines: [
      {
        speaker: '旁白',
        text: '你才剛喊出一聲「師姐救我！」，天空中瞬間劈開四道恐怖絕倫的氣息——無妄劍光、魔域黑炎、漫天桃花瘴與梵音金蓮同時轟在敵人頭上！強敵當場嚇暈過去！',
        stageChars: ['容九淵', '陸長安', '蘇知弦', '葉聽禪'],
        activeChar: '容九淵',
        backdrop: 'shura',
      },
      {
        speaker: '容九淵',
        text: '「她明明是在本少地盤附近喊的救援，你們三個跑來湊什麼熱鬧？！」',
        stageChars: ['容九淵', '陸長安', '蘇知弦', '葉聽禪'],
        activeChar: '容九淵',
        backdrop: 'shura',
      },
      {
        speaker: '陸長安',
        text: '「若言喊的是太清宗師姐，我身為太清宗大師兄，理應第一時間抵達。」',
        stageChars: ['容九淵', '陸長安', '蘇知弦', '葉聽禪'],
        activeChar: '陸長安',
        backdrop: 'shura',
      },
      {
        speaker: '蘇知弦',
        text: '「呵呵，醫者仁心，若言受了驚嚇，自然該由在下替她診脈安神。」',
        stageChars: ['容九淵', '陸長安', '蘇知弦', '葉聽禪'],
        activeChar: '蘇知弦',
        backdrop: 'shura',
      },
      {
        speaker: '葉聽禪',
        text: '「貧僧與若言施主尚有第四十七問未解，自當護她周全。」',
        stageChars: ['容九淵', '陸長安', '蘇知弦', '葉聽禪'],
        activeChar: '葉聽禪',
        backdrop: 'shura',
      },
    ],
  },
};

export interface JadeMessage {
  sender: 'npc' | 'player';
  text: string;
  time: string;
}

export interface JadeContact {
  id: string;
  name: string;
  role: string;
  unread: number;
  messages: JadeMessage[];
  replyOptions: {
    label: string;
    playerText: string;
    npcResponse: string;
    affectionHero?: HeroId;
    affectionDelta?: number;
  }[];
}

export const INITIAL_JADE_CONTACTS: JadeContact[] = [
  {
    id: 'rong',
    name: '容九淵',
    role: '魔域少主',
    unread: 999,
    messages: [
      { sender: 'npc', text: '喂！四水若言！', time: '三日前' },
      { sender: 'npc', text: '你竟然敢把本少一個人丟在十階大陣裡整整三個時辰？！', time: '三日前' },
      { sender: 'npc', text: '你坐在陣外看二手佛經是什麼意思？本少還不如那本破書好看？！', time: '兩日前' },
      { sender: 'npc', text: '為什麼不回玉簡？？黑水黑市沒訊號，你不會出來回信嗎？！', time: '昨日' },
      { sender: 'npc', text: '【系統提示：累積未接通靈訊 × 995 則】', time: '方才' },
      { sender: 'npc', text: '你再不回信，本少現在就點齊魔域三千精兵踏平太清宗山門抓你！', time: '剛剛' },
    ],
    replyOptions: [
      {
        label: '誇他長得俊（順毛）',
        playerText: '少主別氣！黑市沒訊號嘛，我那三個時辰明明都在偷看少主的盛世美顏！',
        npcResponse: '哼……算你說了句實話！本少大人有大量，這次便饒過你，明日申時來黑市見我！',
        affectionHero: 'rong',
        affectionDelta: 10,
      },
      {
        label: '挑釁他的破陣速度',
        playerText: '略略略，誰讓少主破一個十階困陣要花三個時辰，我佛經都看完兩卷啦！',
        npcResponse: '四！水！若！言！你給本少等著，下次見面本少一息之內必破你的陣！',
        affectionHero: 'rong',
        affectionDelta: 6,
      },
    ],
  },
  {
    id: 'lu',
    name: '陸長安',
    role: '太清宗大師兄',
    unread: 3,
    messages: [
      { sender: 'npc', text: '若言，後山靈獸園回報丹頂鶴再次被你布置的陣法剃度。', time: '辰時' },
      { sender: 'npc', text: '《太清門規》第一百零二條：不可無故驚擾靈獸。掌門罰你抄寫門規二十遍。', time: '巳時' },
      { sender: 'npc', text: '……我已替你抄完十遍。傍晚來劍閣領剩下一半，順便把昨日落在演武場的陣盤帶走，我替你保養過了。', time: '午時' },
    ],
    replyOptions: [
      {
        label: '撒嬌感謝大師兄',
        playerText: '大師兄最好了！門規之內有大師兄，門規之外也有大師兄護著我！',
        npcResponse: '……莫要貧嘴。傍晚早些過來，膳堂今日有你愛吃的桂花靈糕，我留了一份。',
        affectionHero: 'lu',
        affectionDelta: 10,
      },
      {
        label: '約他夜探藏經閣',
        playerText: '大師兄，我發現一卷八千年前的古陣圖，今晚子時陪我一起研究好不好？',
        npcResponse: '子時已過門禁……罷了，我會在藏經閣外替你巡守，莫要驚動長老。',
        affectionHero: 'lu',
        affectionDelta: 8,
      },
    ],
  },
  {
    id: 'su',
    name: '蘇知弦',
    role: '合歡宗醫修',
    unread: 2,
    messages: [
      { sender: 'npc', text: '若言姑娘，今日催動十階大陣時，指尖經脈可還有些微刺痛？', time: '巳時' },
      { sender: 'npc', text: '上次在秘境替你調理靈力的診金，折算下來約莫三萬上品靈石……或者，若言願意考慮一下我們雙方自願的『春風谷月下抵償方案』？', time: '午時' },
    ],
    replyOptions: [
      {
        label: '反問抵償細節（高手過招）',
        playerText: '三萬靈石我是沒有啦，不過蘇醫修想怎麼抵償？要是太普通我可不答應喔～',
        npcResponse: '呵呵，那便罰若言今夜來桃花舫，親手替在下試一味『合歡同心丹』如何？',
        affectionHero: 'su',
        affectionDelta: 10,
      },
      {
        label: '裝病討要免費靈丹',
        playerText: '哎呀蘇醫修，看到這筆帳單我心口突然好痛，需要一顆極品駐顏丹急救！',
        npcResponse: '真是拿你沒辦法。駐顏丹與安神香已託靈鴿送去，至於診金……便記在你的心上吧。',
        affectionHero: 'su',
        affectionDelta: 8,
      },
    ],
  },
  {
    id: 'ye',
    name: '葉聽禪',
    role: '梵音谷佛修 · 淨琉璃',
    unread: 1,
    messages: [
      { sender: 'npc', text: '若言施主，日前你遺落在藏經閣的二手佛經中，夾有一頁太古妖文殘片。貧僧參詳三日，發現其與八千年前天門異變有關，施主若有暇，可來梵音谷一敘。', time: '辰時' },
    ],
    replyOptions: [
      {
        label: '立刻答應前往梵音谷',
        playerText: '大師居然連我夾在二手書裡的書籤都研究出來了！我馬上帶著第四十八個問題過去找你！',
        npcResponse: '阿彌陀佛。藏經閣已備好清茶，貧僧靜候施主光臨。',
        affectionHero: 'ye',
        affectionDelta: 10,
      },
      {
        label: '追問他有沒有想念自己',
        playerText: '大師老實說，我這幾天沒去藏經閣吵你，你是不是覺得經書都變無聊了？',
        npcResponse: '……佛門講究心如止水。只是風吹竹葉之聲，確曾讓貧僧誤以為是施主踏頂而來。',
        affectionHero: 'ye',
        affectionDelta: 12,
      },
    ],
  },
  {
    id: 'mowen',
    name: '莫溫雨',
    role: '太清宗師姐 · 最強救援',
    unread: 1,
    messages: [
      { sender: 'npc', text: '小師妹，師父又塞了三件天階護身法寶讓我轉交給你。記住，在外若是遇到打不過的老怪或修羅場，直接大喊一聲「師姐」，我三息之內必到！', time: '辰時' },
    ],
    replyOptions: [
      {
        label: '抱緊師姐大腿',
        playerText: '師姐威武！！有師姐在，我明天就去把魔域和秘境的陣眼全拆了！',
        npcResponse: '拆可以，別忘了留條退路！誰敢欺負我們太清宗小師妹，師姐一劍斬之！',
      },
    ],
  },
];

export interface ForumPost {
  id: string;
  author: string;
  tag: string;
  title: string;
  content: string;
  likes: number;
  replies: string[];
}

export const SECT_FORUM_POSTS: ForumPost[] = [
  {
    id: 'post_1',
    author: '靈獸園禿頭仙鶴守護者',
    tag: '【宗門懸賞】',
    title: '緊急通告！請全宗門盯緊四水若言手裡的陣盤！',
    content: '今天早上我們靈獸園最驕傲的丹頂鶴王，頭頂又被四水師妹畫了一個發光的十階生髮陣！現在鶴王頂著一頭七彩爆炸羽毛在主峰亂飛，掌門氣得鬍子都歪了！',
    likes: 842,
    replies: [
      '陸長安（實名）：門規罰抄已記下，靈獸園損失由我劍峰墊付。',
      '沈清玉（玄清仙子）：吾徒不過是鑽研陣道，七彩羽毛甚是喜慶，賠你們十顆上品靈石便是。',
    ],
  },
  {
    id: 'post_2',
    author: '黑水黑市吃瓜散修',
    tag: '【修真八卦】',
    title: '震驚！那個困住魔域少主三個時辰的十階大陣居然是築基期布的？！',
    content: '前幾天在黑水暗河親眼目睹，一個穿紫衣的小姑娘把魔域少主容九淵困在十階大陣裡整整三個時辰，自己坐在外頭啃靈果看二手佛經！更離譜的是，容少主破陣出來後居然沒殺她，還追著問玉簡號碼！',
    likes: 1999,
    replies: [
      '匿名魔修（IP屬地：魔域）：造謠者死！本少那是故意在陣中參悟陣理！立刻刪帖！',
      '春風谷花農：呵呵，那位姑娘的陣盤確實精妙，連少主也栽了跟頭呢。',
    ],
  },
  {
    id: 'post_3',
    author: '藏經閣掃地沙彌',
    tag: '【天道疑雲】',
    title: '有人注意到最近三百年飛升成功的修士，魂燈全都呈現詭異的空洞狀態嗎？',
    content: '淨琉璃師兄最近一直在翻閱八千年前的太古孤本。聽說天門之後的氣息與上古記載完全不符，有沒有懂古陣法的道友出來分析一下？',
    likes: 615,
    replies: [
      '四水若言：這題我會！那些古飛升台的陣眼根本不是傳送陣，是超大型抽靈陣喔！',
    ],
  },
];

export interface HeavenlyClue {
  id: string;
  title: string;
  source: string;
  content: string;
}

export const HEAVENLY_CLUES: HeavenlyClue[] = [
  {
    id: 'clue_1',
    title: '線索一：異常的十階陣道直覺',
    source: '初始記憶 · 太清宗',
    content: '四水若言雖僅有築基後期修為，卻能不靠圖紙獨立推演上古十階大陣，彷彿這套天地規則早已刻在她的靈魂深處。',
  },
  {
    id: 'clue_fanyin',
    title: '線索二：梵音谷藏經閣的矛盾古籍',
    source: '第一章 · 葉聽禪與第四十七問',
    content: '世傳八千年來飛升正常進行，但梵音谷未經篡改的太古佛經卻記載：八千年前天門曾遭巨變，此後飛升者再無任何因果回音。',
  },
  {
    id: 'clue_ancient_stele',
    title: '線索三：遠古飛升台的逆向抽靈陣',
    source: '第六章 · 古秘境異動',
    content: '古秘境中的白玉飛升台並非引渡成仙之陣，而是將渡劫修士的畢生修為抽乾、用以修補某種偽天道封印的十階絕陣。',
  },
  {
    id: 'clue_foxdan',
    title: '線索四：九尾狐丹與養父四水方渝',
    source: '第七章 · 妖境開啟',
    content: '養父四水方渝留給若言的本源狐丹，實為八千年前初代破天陣靈的鑰匙。隨著妖境開啟，養父即將復生並揭曉若言真正的身世。',
  },
];
