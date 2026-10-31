import type { SinId } from "./sins";

export type VirtueId = "humility" | "kindness" | "patience" | "temperance" | "diligence" | "generosity" | "chastity";

export type Virtue = {
  id: VirtueId;
  name: string;
  pairedSin: SinId;
  portraitPath: string;
  title: string;
  shortDescription: string;
  /** 罪与美德的并置解读，不代表美德被测试或计分。 */
  dualReading: string;
  growthDirection: string;
  dailyPractice: string;
  reflectionQuestion: string;
  emblem: string;
};

export const virtues: readonly Virtue[] = [
  {
    id: "humility", name: "谦逊", pairedSin: "pride", portraitPath: "/virtues/humility.png", title: "谦逊守望者", emblem: "✧",
    shortDescription: "让自信与倾听并肩。",
    dualReading: "追求卓越的心与谦逊并不冲突。你可以珍视自己的能力，同时承认仍有未知，也让他人的经验进入视野。",
    growthDirection: "把证明自己的力气，分一些给好奇：先听完不同意见，再决定哪些值得采纳。",
    dailyPractice: "今天遇到分歧时，先复述一次对方的观点，再补充自己的判断。",
    reflectionQuestion: "当我不急着证明自己时，我还能从这段对话里发现什么？",
  },
  {
    id: "kindness", name: "仁慈", pairedSin: "envy", portraitPath: "/virtues/kindness.png", title: "仁慈守望者", emblem: "❋",
    shortDescription: "把比较转译成理解与祝愿。",
    dualReading: "敏锐地看见差异，也说明你能注意到他人的光亮。仁慈不是否认自己的愿望，而是在欣赏别人时，也不撤回对自己的善意。",
    growthDirection: "让比较成为线索：辨认自己真正向往的品质，再用适合自己的方式靠近它。",
    dailyPractice: "欣赏一个人的长处时，具体说出你欣赏什么；再写下一件自己正在培育的能力。",
    reflectionQuestion: "我羡慕的背后，藏着哪一个尚未被认真对待的愿望？",
  },
  {
    id: "patience", name: "忍耐", pairedSin: "wrath", portraitPath: "/virtues/patience.png", title: "静默守望者", emblem: "⌁",
    shortDescription: "让坚定多一个选择时机。",
    dualReading: "愤怒常提示边界或公平受到触动。忍耐不是吞下不公，而是先稳住自己，选择更能保护边界、推动改变的表达方式。",
    growthDirection: "在行动前留出一点间隙，让情绪提供信息，而不是替你决定全部回应。",
    dailyPractice: "感到火气上来时，先暂停三次缓慢呼吸，再用一句具体事实说明你的界限。",
    reflectionQuestion: "此刻我最想保护的是什么？怎样表达能让它真正得到保护？",
  },
  {
    id: "temperance", name: "节制", pairedSin: "gluttony", portraitPath: "/virtues/temperance.png", title: "平衡守护者", emblem: "☼",
    shortDescription: "在享受与满足之间找到余裕。",
    dualReading: "你对感官与体验的热情，是感受生活的一种能力。节制并非拒绝快乐，而是让快乐有边界、有回味，也给真正的需要留出位置。",
    growthDirection: "从自动加码转向有意识地选择：什么会滋养我，什么只是短暂填满空隙？",
    dailyPractice: "享受一件喜欢的事时，放慢一点，并在结束后留意自己是否已经满足。",
    reflectionQuestion: "如果我不需要更多来证明此刻很好，什么已经足够？",
  },
  {
    id: "diligence", name: "勤勉", pairedSin: "sloth", portraitPath: "/virtues/diligence.png", title: "持续前行者", emblem: "✦",
    shortDescription: "把想做的事变成轻盈的一小步。",
    dualReading: "懂得退后和保护精力，是你对消耗的敏感。勤勉不是不停工作，而是辨认真正重要的事，并以可持续的节奏持续靠近。",
    growthDirection: "不必等到状态完美才开始；给重要目标一个小到容易启动的入口。",
    dailyPractice: "为一件重要但拖延的事设定十分钟，只完成下一步，不要求一次做完。",
    reflectionQuestion: "我需要的是更多休息，还是一个更容易开始的方式？",
  },
  {
    id: "generosity", name: "慷慨", pairedSin: "greed", portraitPath: "/virtues/generosity.png", title: "慷慨赠予者", emblem: "◇",
    shortDescription: "让安全感也拥有流动的空间。",
    dualReading: "重视资源与保障，是你对现实负责的一面。慷慨不等于耗尽自己；它是在照顾好边界之后，选择分享时间、知识或机会。",
    growthDirection: "在稳妥与开放之间找到余地，让积累支持生活，也让关系有往来的空间。",
    dailyPractice: "选择一件无需损害自身需要的小事，与他人分享经验、时间或一个机会。",
    reflectionQuestion: "什么资源在被妥善保护后，也可以安心地流向别人？",
  },
  {
    id: "chastity", name: "贞洁", pairedSin: "lust", portraitPath: "/virtues/chastity.png", title: "边界守护者", emblem: "❦",
    shortDescription: "让吸引、亲密与尊重彼此相容。",
    dualReading: "对吸引力、恋爱与亲密的渴望本身并无错。这里的贞洁指向自愿、诚实、尊重与清晰边界，让每个人都能自由表达同意或拒绝，并共同承担关系中的责任。",
    growthDirection: "在靠近他人时，也持续确认彼此的意愿、边界和期待；亲密可以热烈，也可以从容。",
    dailyPractice: "在重要的亲密互动中，主动确认双方是否自在，并坦诚表达自己的期待与界限。",
    reflectionQuestion: "怎样的亲密让彼此都能保持选择、尊严与真实？",
  },
] as const;

const virtueBySin: Partial<Record<SinId, Virtue>> = Object.fromEntries(virtues.map(virtue => [virtue.pairedSin, virtue]));

/** Legacy results and incomplete configuration are handled without unsafe indexing. */
export function getVirtueForSin(sinId: SinId | null | undefined): Virtue | null {
  if (!sinId) return null;
  return virtueBySin[sinId] ?? null;
}
