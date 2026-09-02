// 07-c-design-prompts.md 를 읽어, 복사 단추가 달린 프롬프트 페이지를 만든다.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path"; import { fileURLToPath } from "node:url";
const here = dirname(fileURLToPath(import.meta.url));
const md = readFileSync(join(here, "07-c-design-prompts.md"), "utf8");
const fences = [...md.matchAll(/```text\n([\s\S]*?)\n```/g)].map(m => m[1]);
const brief = fences[0];
const dirs = fences[1].split(/\n(?=방향 \d+ — )/).map(t => t.trim()).filter(Boolean);
const esc = s => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const title = d => d.split("\n")[0].replace(/^방향 \d+ — /,"");
const num = d => d.match(/^방향 (\d+)/)[1];
const first = d => (d.split("\n").find((l,i)=>i>0&&l.trim()) || "").trim();
const sig = d => { const l = d.split("\n").find(x => x.startsWith("- **시그니처**")); return l ? l.replace(/^- \*\*시그니처\*\*: /,"").replace(/\*\*/g,"") : ""; };
const URLS = JSON.parse(readFileSync(join(here, "07-candidates", "urls.json"), "utf8"));

const html = `<title>묵주기도 시안 프롬프트</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@500;700&family=Noto+Sans+KR:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap">
<style>
:root{--bg:#F4F5F2;--surface:#fff;--ink:#23282B;--soft:#4A5256;--muted:#7A8388;--line:#DDDFD8;--accent:#0E9F6E;--accent-soft:#E6F5EE;--accent-ink:#0A7A55;--warn:#B7791F;--warn-soft:#FBF3E4}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#171B1D;--surface:#22282B;--ink:#E8EAE6;--soft:#C3C8C4;--muted:#8F989C;--line:#343B3F;--accent:#34D399;--accent-soft:#173B2E;--accent-ink:#8FE6C4;--warn:#E0A94E;--warn-soft:#3A2E17}}
:root[data-theme="dark"]{--bg:#171B1D;--surface:#22282B;--ink:#E8EAE6;--soft:#C3C8C4;--muted:#8F989C;--line:#343B3F;--accent:#34D399;--accent-soft:#173B2E;--accent-ink:#8FE6C4;--warn:#E0A94E;--warn-soft:#3A2E17}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.62 "Noto Sans KR",system-ui,sans-serif}
.w{max-width:860px;margin:0 auto;padding:20px 14px 70px}
h1{font:700 25px/1.3 "IBM Plex Sans KR",sans-serif;margin:0}h2{font:700 19px/1.35 "IBM Plex Sans KR",sans-serif;margin:26px 0 0}
.eyebrow{font:500 11px/1 "JetBrains Mono",monospace;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin-bottom:8px}
.lead{color:var(--soft);margin:8px 0 0}
.card{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:16px;margin-top:14px}
ol.how{margin:10px 0 0;padding-left:20px;color:var(--soft)}ol.how li{margin:5px 0}
pre{font:12.5px/1.62 "JetBrains Mono",monospace;background:var(--bg);border:1px solid var(--line);border-radius:10px;padding:12px;white-space:pre-wrap;word-break:break-word;max-height:340px;overflow:auto;margin:10px 0 0}
.row{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;align-items:center}
.btn{border:1px solid var(--line);background:var(--surface);border-radius:10px;padding:10px 14px;font:500 14px "Noto Sans KR";color:var(--ink);cursor:pointer;min-height:44px}
.btn.p{background:var(--accent);border-color:var(--accent);color:#fff;font-weight:700}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:12px;margin-top:14px}
.d{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:14px;display:flex;flex-direction:column;gap:8px}
.d .n{font:500 11px "JetBrains Mono";color:var(--muted)}
.d b{font:700 17px "IBM Plex Sans KR"}
.d .sig{font-size:13px;color:var(--soft);flex:1}
.d .lk{font-size:12.5px;color:var(--accent-ink)}
.warn{background:var(--warn-soft);border-color:var(--warn);color:var(--ink)}
details summary{cursor:pointer;font:500 13px "Noto Sans KR";color:var(--accent-ink);margin-top:10px}
a{color:var(--accent-ink)}
[hidden]{display:none!important}
</style>
<div class="w">
<div class="eyebrow">Atelier · mobile-rosary · 07-c · 2026-09-02</div>
<h1>묵주기도 시안 프롬프트</h1>
<p class="lead">같은 열 방향을 <b>다른 도구</b>(Claude Design · Google Stitch · 다른 AI)에도 시키기 위한 프롬프트입니다. <b>공통 브리프 하나</b>에 <b>방향 하나</b>를 이어 붙이면 프롬프트가 완성됩니다. 아래 방향 카드의 단추를 누르면 그 둘이 합쳐진 채로 복사됩니다.</p>

<div class="card">
<h2 style="margin-top:0">쓰는 법</h2>
<ol class="how">
<li>원하는 방향 카드에서 <b>프롬프트 복사</b>를 누른다 (공통 브리프 + 그 방향이 함께 복사된다).</li>
<li>Claude Design이나 Stitch에 붙여 넣는다.</li>
<li><b>방향마다 다른 도구</b>에 넣는 편이 낫다 — 한 도구에 열 개를 다 넣으면 그 도구의 취향이 열 개에 그대로 남는다.</li>
<li>돌아온 화면은 채점하지 않고 <b>월드컵 후보</b>로 넣는다.</li>
</ol>
</div>

<div class="card warn">
<b>이미 만들어 둔 것이 있습니다.</b> 같은 열 방향을 이 세션이 <b>돌아가는 시제품</b>으로도 만들어 두었습니다(공용 엔진 위의 껍데기 열 개). 밖에서 받은 시안은 그림이고 우리 것은 동작하지만, 월드컵에서는 같은 후보입니다.
<div class="row"><a class="btn" href="${URLS.worldcup}" target="_blank" rel="noopener">월드컵 열기 ↗</a></div>
</div>

<h2>공통 브리프 — 모든 프롬프트의 앞부분</h2>
<p class="lead">방향마다 이 글이 앞에 붙습니다. 따로 쓸 일이 있으면 여기서 복사하십시오.</p>
<div class="card">
<details><summary>펼쳐 보기 (${brief.length.toLocaleString()}자)</summary><pre id="brief">${esc(brief)}</pre></details>
<div class="row"><button class="btn" data-copy="brief">공통 브리프만 복사</button></div>
</div>

<h2>방향 열 개</h2>
<p class="lead">각 카드의 <b>프롬프트 복사</b>는 공통 브리프와 그 방향을 합쳐서 복사합니다. <b>시제품 보기</b>는 우리가 만든 돌아가는 화면입니다.</p>
<div class="grid">
${dirs.map((d,i)=>`<div class="d"><span class="n">방향 ${num(d)}</span><b>${title(d)}</b><span class="sig">${sig(d)}</span>
<button class="btn p" data-copy="d${i}">프롬프트 복사</button>
<a class="lk" href="${URLS.candidates[i]}" target="_blank" rel="noopener">우리가 만든 시제품 보기 ↗</a>
<details><summary>방향 원문</summary><pre>${esc(d)}</pre></details></div>`).join("\n")}
</div>

<h2>서체에 관한 정직한 한계</h2>
<div class="card"><p style="margin:0;color:var(--soft)">이 검증 환경은 외부 웹폰트를 받지 못합니다. 그래서 <b>제가 찍은 스크린샷에는 위에 적은 서체가 나오지 않고 대체 서체가 나옵니다.</b> 색·배치·시그니처는 그대로 보이지만, <b>조판의 인상은 공방장님 기기에서만 확인됩니다.</b> 시제품 링크를 폰에서 열면 지정한 서체로 뜹니다.</p></div>
</div>
<script>
const BRIEF=${JSON.stringify(brief)}; const DIRS=${JSON.stringify(dirs)};
document.addEventListener("click", async e=>{
  const b=e.target.closest("[data-copy]"); if(!b) return;
  const k=b.dataset.copy; const t = k==="brief" ? BRIEF : BRIEF+"\\n\\n"+DIRS[+k.slice(1)];
  const old=b.textContent;
  try{ await navigator.clipboard.writeText(t); b.textContent="복사됨"; }
  catch(x){ b.textContent="복사 실패 — 원문을 펼쳐 길게 누르세요"; }
  setTimeout(()=>{b.textContent=old;},1800);
});
</script>`;
writeFileSync(join(here, "07-c-prompts.html"), html);
console.log(`[prompts] 07-c-prompts.html ${(html.length/1024).toFixed(0)}KB · 방향 ${dirs.length}`);
