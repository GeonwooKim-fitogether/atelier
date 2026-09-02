// 07-c-design-prompts.md 를 읽어, 복사 단추가 달린 프롬프트 페이지를 만든다 (v2 — 프롬프트 하나).
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path"; import { fileURLToPath } from "node:url";
const here = dirname(fileURLToPath(import.meta.url));
const md = readFileSync(join(here, "07-c-design-prompts.md"), "utf8");
const prompt = md.match(/```text\n([\s\S]*?)\n```/)[1];
const U = JSON.parse(readFileSync(join(here, "07-candidates", "urls.json"), "utf8"));
const esc = s => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");

const FAULTS = [
 ["색 여섯·서체 둘·레이아웃·시그니처를 <b>정답으로</b> 줬다","받는 쪽이 렌더링 기계가 됐다. 프롬프트를 쓴 사람의 취향이 결과의 상한이 됐다"],
 ["“자개” “조각보”처럼 <b>말로만</b> 재료를 줬다","볼 수 있는 참조가 없으니 도구가 자기가 아는 평균값으로 돌아갔다"],
 ["절대 규칙 일곱을 <b>체크리스트</b>로 줬다","준수 과제가 됐다. 준수는 좋은 디자인을 만들지 않는다"],
 ["<b>10방향 × 4장 = 40장</b>을 한 번에 요구했다","넓이를 요구하면 깊이가 사라진다. 마흔 장이 다 얕았다"],
 ["<b>한 번에 끝내라</b>고 했다","좋은 디자인은 비평 왕복에서 나오는데 왕복이 없었다"]];
const CHANGES = [
 ["화면 하나로 좁힌다","“바치는 동안 — 내 차례” 한 장만 받는다. 이 화면이 사용 시간의 90%다"],
 ["색과 서체를 정해 주지 않는다","금지만 준다. 고르는 일이 남아 있어야 디자인이 된다"],
 ["체크리스트 대신 긴장 셋을 준다","규칙은 답을 닫고 긴장은 답을 연다"],
 ["볼 수 있는 참조를 붙인다","버린 실물과 경쟁 앱의 장치·실수를 링크로 함께 준다"],
 ["중간에 멈추게 한다","방향 셋을 세 문장씩 받고 하나를 고른 뒤에 그리게 한다"]];

const html = `<title>묵주기도 시안 프롬프트 v2</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@500;700&family=Noto+Sans+KR:wght@400;500;700&family=JetBrains+Mono:wght@400&display=swap">
<style>
:root{--bg:#F4F5F2;--surface:#fff;--ink:#23282B;--soft:#4A5256;--muted:#7A8388;--line:#DDDFD8;--accent:#0E9F6E;--accent-soft:#E6F5EE;--accent-ink:#0A7A55;--warn:#B7791F;--warn-soft:#FBF3E4}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#171B1D;--surface:#22282B;--ink:#E8EAE6;--soft:#C3C8C4;--muted:#8F989C;--line:#343B3F;--accent:#34D399;--accent-soft:#173B2E;--accent-ink:#8FE6C4;--warn:#E0A94E;--warn-soft:#3A2E17}}
:root[data-theme="dark"]{--bg:#171B1D;--surface:#22282B;--ink:#E8EAE6;--soft:#C3C8C4;--muted:#8F989C;--line:#343B3F;--accent:#34D399;--accent-soft:#173B2E;--accent-ink:#8FE6C4;--warn:#E0A94E;--warn-soft:#3A2E17}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.64 "Noto Sans KR",system-ui,sans-serif}
.w{max-width:820px;margin:0 auto;padding:22px 14px 70px}
h1{font:700 25px/1.28 "IBM Plex Sans KR",sans-serif;margin:0}
h2{font:700 19px/1.35 "IBM Plex Sans KR",sans-serif;margin:30px 0 0}
.eyebrow{font:400 11px/1 "JetBrains Mono",monospace;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin-bottom:8px}
.lead{color:var(--soft);margin:9px 0 0}
.card{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:16px;margin-top:14px}
table{width:100%;border-collapse:collapse;margin-top:12px;font-size:13.5px}
th,td{border:1px solid var(--line);padding:9px 11px;text-align:left;vertical-align:top}
th{background:var(--accent-soft);color:var(--accent-ink);font-weight:700;font-size:12.5px}
td.n{width:34px;text-align:center;font:400 13px "JetBrains Mono",monospace;color:var(--muted)}
pre{font:12.5px/1.66 "JetBrains Mono",monospace;background:var(--bg);border:1px solid var(--line);border-radius:10px;padding:14px;white-space:pre-wrap;word-break:break-word;max-height:420px;overflow:auto;margin:12px 0 0}
.row{display:flex;gap:9px;flex-wrap:wrap;margin-top:13px;align-items:center}
.btn{border:1px solid var(--line);background:var(--surface);border-radius:10px;padding:11px 15px;font:500 14px "Noto Sans KR";color:var(--ink);cursor:pointer;min-height:46px}
.btn.p{background:var(--accent);border-color:var(--accent);color:#fff;font-weight:700;font-size:16px;padding:14px 22px;min-height:54px}
.warn{background:var(--warn-soft);border-color:var(--warn)}
details summary{cursor:pointer;font:500 13.5px "Noto Sans KR";color:var(--accent-ink);margin-top:6px}
a{color:var(--accent-ink)}
.refs{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:9px;margin-top:12px}
.refs a{display:block;border:1px solid var(--line);border-radius:10px;padding:11px 13px;background:var(--surface);text-decoration:none;color:inherit}
.refs b{display:block;font:700 14px "IBM Plex Sans KR";margin-bottom:3px}
.refs span{font-size:12px;color:var(--muted)}
</style>
<div class="w">
<div class="eyebrow">Atelier · mobile-rosary · 07-c · v2 · 2026-09-02</div>
<h1>묵주기도 시안 프롬프트 v2</h1>
<p class="lead">앞 프롬프트로 좋은 시안이 나오지 않은 원인은 <b>문구가 아니라 구조</b>였습니다. v1은 색·서체·레이아웃·시그니처를 이미 정해서 넘겼고, 그래서 받는 도구에게 남은 일이 디자인이 아니라 <b>정해진 것을 그리기</b>였습니다. v2는 정답 대신 <b>풀어야 할 긴장</b>과 <b>넘지 말아야 할 선</b>만 넘기고, 화면 하나를 깊게 받습니다.</p>

<div class="card" style="border-color:var(--accent);background:var(--accent-soft)">
<b style="font:700 17px 'IBM Plex Sans KR'">프롬프트 하나뿐입니다.</b>
<p style="margin:7px 0 0;color:var(--soft)">v1처럼 방향마다 다른 프롬프트를 쓰지 않습니다. 방향을 정하는 일이 곧 디자인이므로 그 일을 받는 쪽에 넘깁니다.</p>
<div class="row"><button class="btn p" data-copy="1">프롬프트 복사</button><span style="font-size:12.5px;color:var(--soft)">Claude Design · Google Stitch · 다른 AI 어디에나 그대로 붙입니다</span></div>
</div>

<h2>v1은 왜 실패했나</h2>
<table><thead><tr><th></th><th>v1이 한 것</th><th>그래서 벌어진 일</th></tr></thead><tbody>
${FAULTS.map((f,i)=>`<tr><td class="n">${i+1}</td><td>${f[0]}</td><td>${f[1]}</td></tr>`).join("")}
</tbody></table>
<p class="lead">특히 4번이 큽니다. 지금까지 세 판(장르 열 · 재료 열 · 장치 열)에서 <b>서른 개</b>를 만들었고 전부 얕았습니다. “괜찮은 게 하나도 없다”는 것은 서른 개가 각각 실패했다기보다, <b>열 개씩 만드는 구조가 각각을 얕게 만든다</b>는 뜻에 가깝습니다.</p>

<h2>v2에서 바꾼 다섯 가지</h2>
<table><thead><tr><th></th><th>바꾼 것</th><th>왜</th></tr></thead><tbody>
${CHANGES.map((c,i)=>`<tr><td class="n">${i+1}</td><td><b>${c[0]}</b></td><td>${c[1]}</td></tr>`).join("")}
</tbody></table>

<h2>프롬프트 전문</h2>
<div class="card">
<details open><summary>접기 / 펴기 (${prompt.length.toLocaleString()}자)</summary><pre id="p">${esc(prompt)}</pre></details>
<div class="row"><button class="btn p" data-copy="1">프롬프트 복사</button></div>
</div>

<h2>함께 붙이면 결과가 달라지는 것</h2>
<p class="lead">프롬프트만 붙이는 것보다 아래를 <b>링크나 스크린샷으로 함께</b> 주면 결과가 크게 달라집니다. 말로 “이렇게 하지 마”라고 하는 것보다 <b>버린 실물을 보여 주는 쪽</b>이 훨씬 강하게 작용하기 때문입니다.</p>
<div class="refs">
<a href="${U.candidates[0]}" target="_blank" rel="noopener"><b>버린 시안 — 묵주 전체</b><span>“이 정도는 이미 나왔고 부족했다”는 바닥을 정해 준다 ↗</span></a>
<a href="${U.candidates[4]}" target="_blank" rel="noopener"><b>버린 시안 — 밤</b><span>어두운 화면 계열이 어디까지 갔었는지 ↗</span></a>
<a href="${U.candidates[9]}" target="_blank" rel="noopener"><b>버린 시안 — 큰 글자</b><span>장식 없이 크기만으로 간 판 ↗</span></a>
<a href="${U.worldcup}" target="_blank" rel="noopener"><b>지난 판 열 개 전부</b><span>월드컵 화면 아래 갤러리에서 한눈에 ↗</span></a>
</div>
<div class="card warn" style="margin-top:12px">
<b>경쟁 앱에서 가져올 것과 피할 것도 함께 적어 주십시오.</b>
<p style="margin:7px 0 0;color:var(--soft)"><b>가져올 장치:</b> 묵주 자체가 진행 표시가 되는 것(지금 알이 빛나고 지나간 알은 색이 바뀐다), 배경이 단마다 바뀌어 글을 읽지 않아도 위치를 아는 것.<br>
<b>피할 실수:</b> 재생 단추나 알이 사람의 얼굴을 덮는 것, 기도문 띠의 높이가 글 길이에 따라 늘어나 화면이 출렁이는 것.</p>
</div>

<h2>왜 화면을 하나만 받나</h2>
<div class="card"><p style="margin:0;color:var(--soft)">넓이와 깊이는 같은 회차에 함께 얻어지지 않습니다. <b>후보 수를 줄이는 것이 품질을 올리는 유일한 손잡이</b>이고, 화면 하나가 좋으면 나머지 화면은 거기서 파생됩니다. 반대로 화면 넷을 얕게 받으면 파생시킬 것이 없습니다.</p></div>

<h2>서체에 관한 정직한 한계</h2>
<div class="card"><p style="margin:0;color:var(--soft)">이 저장소의 검증 환경은 외부 웹폰트를 받지 못합니다. 세션이 찍은 스크린샷에는 지정한 한글 서체가 아니라 대체 서체가 나오므로, 밖에서 받은 시안은 <b>실제 기기에서 열어</b> 조판을 보셔야 합니다.</p></div>
</div>
<script>
const P=${JSON.stringify(prompt)};
document.addEventListener("click", async e=>{
  const b=e.target.closest("[data-copy]"); if(!b) return;
  const old=b.textContent;
  try{ await navigator.clipboard.writeText(P); b.textContent="복사됐습니다"; }
  catch(x){ b.textContent="복사 실패 — 아래 전문을 길게 눌러 복사하세요"; }
  setTimeout(()=>{b.textContent=old;},1900);
});
</script>`;
writeFileSync(join(here, "07-c-prompts.html"), html);
console.log(`[prompts] 07-c-prompts.html ${(html.length/1024).toFixed(0)}KB · 프롬프트 ${prompt.length}자`);
