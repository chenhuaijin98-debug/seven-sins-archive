import type { SinId } from "./sins";
type Pair={title:string;reading:string;balance:string};
const archetype:Record<SinId,string>={pride:"目标与自我标准",envy:"观察与比较",wrath:"边界与行动",gluttony:"体验与滋养",sloth:"节奏与恢复",greed:"安全与掌控",lust:"亲密与吸引"};
const verbs:Record<SinId,string>={pride:"把愿望变成明确的方向",envy:"从他人的选择中辨认自己的心愿",wrath:"为在意之事建立清晰边界",gluttony:"以丰富体验确认生活的质地",sloth:"保护精力并寻找适合自己的步速",greed:"为重要资源建立稳固安排",lust:"通过真诚连接感受关系活力"};
const tensions:Record<SinId,string>={pride:"留意高标准是否挤压了求助空间",envy:"留意比较是否让自己的进展变得不可见",wrath:"留意迅速回应是否盖过真正需要",gluttony:"留意追求更多是否遮住了满足感",sloth:"留意休息是否悄悄变成无限延期",greed:"留意保护资源是否减少了尝试余地",lust:"留意即时回应是否替代了长期亲密"};
export function explainPair(primary:SinId,secondary:SinId):Pair{
 if(primary===secondary)return {title:"同向增强",reading:`${archetype[primary]}在这次回答中同时居于前列。你可能会用相近的方式处理不同场景：${verbs[primary]}。`,balance:tensions[primary]+"。"};
 return {title:`${archetype[primary]} × ${archetype[secondary]}`,reading:`主导倾向让你更容易${verbs[primary]}；次级倾向则为它补上${archetype[secondary]}的视角。这种组合既可能形成互补，也可能在压力下让两种需要彼此拉扯。`,balance:`可以先辨认当下更需要哪一边，再留意：${tensions[primary]}；同时${tensions[secondary]}。`};
}
