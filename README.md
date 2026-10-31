# 七罪人格档案馆

娱乐性中文人格探索体验，使用 Next.js App Router、TypeScript、Tailwind CSS。首版无需数据库或登录。

## 本地运行

需要 Node.js 20 或更新版本。

```bash
npm install
npm run dev
```

访问 http://localhost:3000。生产构建使用 `npm run build`，启动使用 `npm run start`。检查命令：`npm run lint`、`npm run typecheck`、`npm test`。

## 结构

- `src/data/questions.ts`：情境题、选项与七维权重
- `src/data/sins.ts`：人格描述、色彩与符号
- `src/data/reports.ts`：完整报告内容
- `src/lib/scoring.ts`：汇总、归一化与固定顺序平分处理
- `src/app/page.tsx`：首页、逐题测试、结果卡与报告展开

答题及结果写入浏览器 localStorage。开发演示解锁只控制本地报告展开，不是订单或付款记录。尚未接入真实支付、服务端权限控制、后台、来源追踪和事件统计；上线付费前必须由服务端验证订单并控制报告内容访问。

题目权重是可调整的探索性原型规则，不是经过临床验证的心理量表；结果只用于娱乐和自我探索。
