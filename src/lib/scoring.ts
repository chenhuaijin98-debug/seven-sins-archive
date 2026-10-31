import { questions } from "@/data/questions";
import { sins, type SinId } from "@/data/sins";
export type Result={scores:Record<SinId,number>;distribution:Record<SinId,number>;dominant:SinId;secondary:SinId};
export function scoreAnswers(answers:Record<number,number>):Result {
 const scores=Object.fromEntries(sins.map(s=>[s.id,0])) as Record<SinId,number>;
 const counts=Object.fromEntries(sins.map(s=>[s.id,0])) as Record<SinId,number>;
 for(const q of questions){const choice=answers[q.id];if(Number.isInteger(choice)&&choice>=0&&choice<4)for(const [id,value] of Object.entries(q.options[choice].weights)){if(Number.isFinite(value)&&value!>0){scores[id as SinId]+=value!;counts[id as SinId]++;}}}
 const distribution=Object.fromEntries(sins.map(s=>[s.id,Math.round(Math.min(100,scores[s.id]/Math.max(1,counts[s.id]*2.5)*100))])) as Record<SinId,number>;
 const ranked=[...sins].sort((a,b)=>distribution[b.id]-distribution[a.id]||sins.indexOf(a)-sins.indexOf(b));
 const dominant=ranked[0].id;const secondary=ranked[1].id;
 return {scores,distribution,dominant,secondary};
}
