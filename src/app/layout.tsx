import type { Metadata } from "next";
import "./globals.css";
export const metadata:Metadata={title:"七罪人格档案馆",description:"一场关于内在倾向的娱乐性自我探索。"};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="zh-CN"><body>{children}</body></html>}
