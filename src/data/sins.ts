export const sins = [
 {id:"pride",name:"傲慢",latin:"SUPERBIA",symbol:"♜",color:"#d0b174",desire:"渴望被看见，也渴望证明自己值得站在高处。",strength:"有担当、目标感强，能在混乱中建立方向。",blind:"容易把求助理解为示弱，也可能忽略他人的节奏。",summary:"你习惯以清醒和标准为自己筑起高塔。真正的力量，不只在于登高，也在于允许自己被理解。"},
 {id:"envy",name:"嫉妒",latin:"INVIDIA",symbol:"◈",color:"#7d9b78",desire:"渴望拥有那种仿佛只属于别人的可能性。",strength:"敏锐、善于观察，能察觉差距背后的机会。",blind:"比较容易偷走满足感，让欣赏变成自我苛责。",summary:"你对差异格外敏感，那份注视也藏着尚未命名的愿望。把羡慕译成方向，目光便会重新回到自己身上。"},
 {id:"wrath",name:"愤怒",latin:"IRA",symbol:"✶",color:"#b45b4d",desire:"渴望边界被尊重，失衡之处得到回应。",strength:"勇于行动，保护重要的人与原则。",blind:"情绪升温时容易让锋芒先于真正的需要。",summary:"你的火焰常从在意之处燃起。辨认它想保护什么，能让力量落在改变上，而非只留下余烬。"},
 {id:"gluttony",name:"暴食",latin:"GULA",symbol:"☾",color:"#c37d56",desire:"渴望更饱满的体验，以及持续不断的滋养。",strength:"热情、感受力强，能为日常注入丰盛。",blind:"用更多填满空隙时，可能错过真正的饥渴。",summary:"你愿意拥抱生活的浓度。偶尔停下来问问自己需要什么，丰盛便不再只是不断加码。"},
 {id:"sloth",name:"懒惰",latin:"ACEDIA",symbol:"⌁",color:"#8292a0",desire:"渴望从过度消耗中退后，找到可持续的步调。",strength:"擅长沉淀、观察，懂得识别无意义的忙碌。",blind:"休息与回避有时会披着相似的外衣。",summary:"你在意能量该流向何处。给重要的事一个小小入口，常比等待完美状态更能带来真正的安宁。"},
 {id:"greed",name:"贪婪",latin:"AVARITIA",symbol:"♢",color:"#a28b54",desire:"渴望稳固的掌控感，确保珍贵之物不会轻易失去。",strength:"规划周密、善于积累，能把愿景变成资源。",blind:"抓得太紧时，安全感可能反而越来越窄。",summary:"你认真对待有限的资源，也知道失去的重量。留出分享和试错的余地，积累才会成为通往自由的工具。"},
 {id:"lust",name:"色欲",latin:"LUXURIA",symbol:"❧",color:"#b8758c",desire:"渴望亲密、吸引与鲜活的感官连接。",strength:"表达力强，善于建立关系与点亮氛围。",blind:"强烈的回应感有时会盖过长期的真实需求。",summary:"你能感知人与人之间流动的温度。让吸引力与真诚并行，关系便能从瞬间的火花走向更深的连接。"}
] as const;
export type SinId = typeof sins[number]["id"];
