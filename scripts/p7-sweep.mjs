import { chromium } from "@playwright/test";
const b = await chromium.launch();
const shots = [["/pregnancy-care/","service"],["/book/","book"],["/doctors/","doctors"],["/about/","about"]];
for (const w of [390,1440]) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  for (const [u,n] of shots) {
    await p.goto("http://localhost:3500"+u,{waitUntil:"domcontentloaded"});
    await p.waitForTimeout(800);
    await p.getByRole("button",{name:"Accept"}).click().catch(()=>{});
    await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=500){scrollTo(0,y);await new Promise(r=>setTimeout(r,50))}scrollTo(0,0)});
    await p.waitForTimeout(300);
    await p.screenshot({path:`review/p7-${n}-${w}.png`,fullPage:true});
  }
  await p.close();
}
await b.close();
