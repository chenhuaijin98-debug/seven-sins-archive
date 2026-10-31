import type { SinId } from "./sins";
export const reports: Record<SinId,{formation:string;pressure:string;relationships:string;questions:string[];action:string}> = {
pride:{formation:"你可能很早就学会靠可靠与出色赢得认可。",pressure:"倾向于接管局面、提高标准，独自承担。",relationships:"欣赏坦诚与能力，也需要练习表达脆弱。",questions:["我希望被谁看见？","如果不必证明，我会怎么选择？"],action:"本周把一件可以求助的小事交给信任的人。"},
envy:{formation:"你常通过观察他人的生活，校准自己的愿望。",pressure:"容易反复比较，或把注意力放在已经错过的机会。",relationships:"细腻体察他人，也需要照看自己的满足感。",questions:["我羡慕的具体是什么？","它对应我哪一个愿望？"],action:"把羡慕写成一条自己可执行的小目标。"},
wrath:{formation:"你重视公平与边界，曾经的忽视可能让你更快警觉。",pressure:"反应迅速而强烈，之后才意识到更深的感受。",relationships:"忠诚直接，清楚表达界限会让关系更安全。",questions:["这份愤怒在保护什么？","我真正希望发生什么改变？"],action:"回应前停十秒，用一句话说出需要。"},
gluttony:{formation:"你珍视鲜活体验，常用丰富感受确认自己正在生活。",pressure:"容易用新的刺激覆盖疲惫或空虚。",relationships:"热情慷慨，稳定的日常也值得投入。",questions:["我现在真正渴望的滋养是什么？","什么已经足够？"],action:"挑选一种让你满足的体验，慢慢享受而不分心。"},
sloth:{formation:"你对消耗敏感，可能经历过努力却看不到回报的阶段。",pressure:"先撤离任务，等待动力自行出现。",relationships:"平和包容，需要主动告知他人自己的节奏。",questions:["这是需要休息，还是害怕开始？","最小的一步是什么？"],action:"为重要事项设定一个只做五分钟的起点。"},
greed:{formation:"你重视安全和选择权，储备让你感到踏实。",pressure:"增加控制与准备，难以判断何时已足够。",relationships:"可靠有规划，开放资源和信任能拉近彼此。",questions:["我担心失去什么？","多少准备已经足够？"],action:"选一件低风险的小事，练习留出弹性。"},
lust:{formation:"你通过连接和感官回应感受关系的活力。",pressure:"追逐即时反馈，忽略自身的长期需要。",relationships:"温暖有魅力，清楚表达期待能带来深度。",questions:["吸引之外，我需要怎样的相处？","我能否直接说出期待？"],action:"和重要的人分享一个真实而具体的需要。"}
};
