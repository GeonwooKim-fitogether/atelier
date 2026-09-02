// 이상형 월드컵 화면을 만든다 — 후보 열 개의 네 순간 스크린샷(shots/)을 한 페이지에 넣고,
// 1라운드(통째로, 둘씩) → 2라운드(네 순간별) → 조합 명세 를 낸다. 선택은 브라우저 안에만 저장된다.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path"; import { fileURLToPath } from "node:url";
const here = dirname(fileURLToPath(import.meta.url));
const C = [
 ["e01-rosary","1","묵주 전체","알 55개가 실제 묵주 형태로 다 보이고 지금 알만 놋빛으로 켜진다","https://claude.ai/code/artifact/3490fdbd-b189-42fc-a7c9-c4c443e1416a"],
 ["e02-field","2","색면","단이 넘어가면 화면 전체 색이 바뀐다. 색이 곧 위치다","https://claude.ai/code/artifact/fbe88b43-f2fa-4fd5-bb72-32ffe6bdc26b"],
 ["e03-onedecade","3","오늘의 한 단","5단이 아니라 한 단(약 5분)이 기본 분량이다","https://claude.ai/code/artifact/84605498-487b-4fef-be7d-71666d31f5ea"],
 ["e04-poster","4","벽보","지향이 개인 메모가 아니라 사람 수가 붙은 벽보다","https://claude.ai/code/artifact/17af82d7-fac8-4fe9-a878-f722feb7bbe4"],
 ["e05-night","5","밤","기본 상태에 글자가 없다. 등불의 숨결이 차례를 알린다","https://claude.ai/code/artifact/e39531cd-d952-4468-8a1d-48b6184971ee"],
 ["e06-wave","6","파형","앱의 절은 가는 직선, 내 절은 굵은 파형","https://claude.ai/code/artifact/c4bc24b5-3e8d-4829-9611-2c76a81d53c6"],
 ["e07-fold","7","접힌 종이","단을 마칠 때마다 종이가 한 겹 접힌다","https://claude.ai/code/artifact/121e9354-4898-4ba8-88b3-38d87f414c9b"],
 ["e08-cairn","8","돌탑","성모송 한 번에 돌 하나가 쌓인다","https://claude.ai/code/artifact/9551fb11-0695-4854-8eaa-b770716acf80"],
 ["e09-scroll","9","두루마리","77단계가 한 줄. 지나온 길이 왼쪽에 남는다","https://claude.ai/code/artifact/e361ed3e-6495-4b0c-ba84-46e70f0d2d22"],
 ["e10-largetype","10","큰 글자","그림이 하나도 없다. 크기와 대비만으로 위계를 만든다","https://claude.ai/code/artifact/5e625d9b-b5ec-403c-8551-ba78ab6355c5"],
];
const M = [["open","여는 순간"],["mine","바치는 동안 — 내 차례"],["resume","끊겼다 돌아오는 순간"],["done","마치는 순간"]];
const data = C.map(([id,n,name,desc,url]) => ({ id,n,name,desc,url, shots:Object.fromEntries(M.map(([m])=>[m,"data:image/jpeg;base64,"+readFileSync(join(here,"shots","thumbs",`${id}-${m}.jpg`)).toString("base64")])) }));
const html = `<title>묵주기도 시안 월드컵</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@500;700&family=Noto+Sans+KR:wght@400;500;700&family=JetBrains+Mono:wght@500&display=swap">
<style>
:root{--bg:#F4F5F2;--surface:#fff;--ink:#23282B;--soft:#4A5256;--muted:#7A8388;--line:#DDDFD8;--accent:#0E9F6E;--accent-soft:#E6F5EE;--accent-ink:#0A7A55;--warn:#B7791F;--warn-soft:#FBF3E4}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#171B1D;--surface:#22282B;--ink:#E8EAE6;--soft:#C3C8C4;--muted:#8F989C;--line:#343B3F;--accent:#34D399;--accent-soft:#173B2E;--accent-ink:#8FE6C4;--warn:#E0A94E;--warn-soft:#3A2E17}}
:root[data-theme="dark"]{--bg:#171B1D;--surface:#22282B;--ink:#E8EAE6;--soft:#C3C8C4;--muted:#8F989C;--line:#343B3F;--accent:#34D399;--accent-soft:#173B2E;--accent-ink:#8FE6C4;--warn:#E0A94E;--warn-soft:#3A2E17}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.55 "Noto Sans KR",system-ui,sans-serif}
.w{max-width:900px;margin:0 auto;padding:18px 14px 70px}
h1{font:700 24px/1.3 "IBM Plex Sans KR",sans-serif;margin:0}h2{font:700 19px/1.3 "IBM Plex Sans KR",sans-serif;margin:0}
.eyebrow{font:500 11px/1 "JetBrains Mono",monospace;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin-bottom:8px}
.lead{color:var(--soft);font-size:14px;margin:6px 0 0}
.step{display:flex;gap:6px;margin:16px 0}.step span{flex:1;height:5px;border-radius:3px;background:var(--line)}.step span.on{background:var(--accent)}
.card{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:14px;margin-top:14px}
.pair{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}
.cand{background:var(--surface);border:2px solid var(--line);border-radius:14px;padding:10px;cursor:pointer;display:grid;gap:8px}
.cand:hover{border-color:var(--accent)}.cand.win{border-color:var(--accent);background:var(--accent-soft)}
.cand .nm{display:flex;align-items:baseline;gap:8px}.cand .nm b{font:700 16px "IBM Plex Sans KR"}.cand .nm span{font:500 11px "JetBrains Mono";color:var(--muted)}
.cand .ds{font-size:12px;color:var(--muted)}
.grid4{display:grid;grid-template-columns:1fr 1fr;gap:6px}.grid4 figure{margin:0}.grid4 img{width:100%;aspect-ratio:390/844;object-fit:cover;object-position:top;border-radius:8px;border:1px solid var(--line);display:block}
.grid4 figcaption{font-size:10.5px;color:var(--muted);margin-top:3px;text-align:center}
.pick{margin-top:4px;border:0;border-radius:10px;padding:12px;font:700 15px "Noto Sans KR";background:var(--accent);color:#fff;cursor:pointer;min-height:46px}
.open{font-size:12px;color:var(--accent-ink);text-decoration:underline;text-align:center}
.why{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}.why button{border:1px solid var(--line);background:var(--surface);border-radius:999px;padding:7px 12px;font:500 12px "Noto Sans KR";color:var(--soft);cursor:pointer}.why button.on{background:var(--accent-soft);border-color:var(--accent);color:var(--accent-ink)}
.mgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px;margin-top:12px}
.mc{border:2px solid var(--line);border-radius:12px;padding:8px;background:var(--surface);cursor:pointer;display:grid;gap:6px}.mc:hover{border-color:var(--accent)}.mc.win{border-color:var(--accent);background:var(--accent-soft)}
.mc img{width:100%;aspect-ratio:390/844;object-fit:cover;object-position:top;border-radius:8px;border:1px solid var(--line)}.mc b{font:700 13px "IBM Plex Sans KR"}.mc span{font-size:11px;color:var(--muted)}
.spec{font:13px/1.7 "JetBrains Mono",monospace;background:var(--bg);border:1px solid var(--line);border-radius:8px;padding:12px;white-space:pre-wrap;margin-top:10px}
.row{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}.btn{border:1px solid var(--line);background:var(--surface);border-radius:10px;padding:10px 14px;font:500 14px "Noto Sans KR";color:var(--ink);cursor:pointer}.btn.p{background:var(--accent);border-color:var(--accent);color:#fff}
.gal{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;margin-top:12px}
.note{font-size:13px;color:var(--muted);margin-top:8px}
[hidden]{display:none!important}
@media (max-width:560px){.pair{grid-template-columns:1fr}.grid4{grid-template-columns:repeat(4,1fr)}}
</style>
<div class="w">
<div class="eyebrow">Atelier · mobile-rosary · 07-e · 2026-09-02</div>
<h1>묵주기도 시안 월드컵</h1>
<p class="lead">후보 열 개가 <b>같은 엔진</b>(77단계 · 자리 저장 · 침묵 모드) 위에서 돕니다. 이번 열은 <b>장치가 서로 다릅니다</b> — 화면이 "지금 어디인가"와 "누구 차례인가"를 알려 주는 방법 자체가 후보마다 다릅니다. Hallow · The Holy Rosary · Rosario 세 앱의 실제 화면에서 읽은 장치를 우리 엔진 위로 옮긴 것입니다. 두 라운드, 15분 안.</p>
<p class="lead" style="color:var(--warn)">아래 그림은 제 검증 환경에서 찍은 것이라 <b>본래 서체가 아닌 대체 서체</b>로 보입니다. 조판의 인상은 "열어서 눌러보기"로 실제 기기에서 봐 주십시오.</p>
<div class="step" id="step"></div>
<div id="stage"></div>
<div class="card"><div class="eyebrow">후보 전부 — 누르면 실제로 돌아가는 화면이 열립니다</div><div class="gal" id="gal"></div><p class="note">각 후보는 <b>같은 엔진</b> 위의 껍데기라, 이긴 부분끼리 갈아 끼워 하나로 합칠 수 있습니다. 밖에서 받은 그림 후보(Stitch · Claude Design 등)는 들어오는 대로 여기 추가됩니다.</p></div>
</div>
<script>
const C=${JSON.stringify(data)}; const M=${JSON.stringify(M)};
const PAIRS=[["e01-rosary","e06-wave"],["e02-field","e07-fold"],["e03-onedecade","e08-cairn"],["e04-poster","e09-scroll"],["e05-night","e10-largetype"]];
const WHY=["직관적이다","차분하다","읽기 쉽다","기도에 맞는다","시니어에게 맞다","재미있다","익숙하다"];
const byId=Object.fromEntries(C.map(c=>[c.id,c]));
let st={r1:{},r1why:{},r2:{},r2why:{}}; try{ st=Object.assign(st,JSON.parse(localStorage.getItem("wc.v1")||"{}")); }catch(e){}
const save=()=>{ try{ localStorage.setItem("wc.v1",JSON.stringify(st)); }catch(e){} };
const $=s=>document.querySelector(s);
function shots(c){ return '<div class="grid4">'+M.map(([m,n])=>'<figure><img src="'+c.shots[m]+'" alt=""><figcaption>'+n.split(" — ")[0]+'</figcaption></figure>').join("")+'</div>'; }
function whyRow(key,idx){ const cur=(key==="r1"?st.r1why:st.r2why)[idx]||""; return '<div class="why">'+WHY.map(w=>'<button data-why="'+w+'" data-key="'+key+'" data-idx="'+idx+'" class="'+(cur===w?"on":"")+'">'+w+'</button>').join("")+'</div>'; }
function render(){
  const r1done=PAIRS.every((_,i)=>st.r1[i]); const r2done=M.every(([m])=>st.r2[m]);
  const phase= !r1done? 1 : !r2done? 2 : 3;
  $("#step").innerHTML=[1,2,3].map(p=>'<span class="'+(p<=phase?"on":"")+'"></span>').join("");
  const s=$("#stage");
  if(phase===1){ const i=PAIRS.findIndex((_,k)=>!st.r1[k]); const [a,b]=PAIRS[i].map(id=>byId[id]);
    s.innerHTML='<div class="card"><div class="eyebrow">1라운드 · '+(i+1)+' / 5 · 통째로 고르기</div><h2>둘 중 어느 쪽이 더 "이 앱이다" 싶습니까?</h2><p class="lead">이유는 몰라도 됩니다. 직감으로. 눌러 보고 싶으면 "열어서 눌러보기".</p>'
      +'<div class="pair">'+[a,b].map(c=>'<div class="cand" data-pick="'+c.id+'" data-i="'+i+'"><div class="nm"><b>'+c.name+'</b><span>후보 '+c.n+'</span></div><div class="ds">'+c.desc+'</div>'+shots(c)+'<button class="pick">이쪽</button><a class="open" href="'+c.url+'" target="_blank" rel="noopener">열어서 눌러보기 ↗</a></div>').join("")+'</div>'
      +(i>0?'<p class="note">지금까지: '+PAIRS.slice(0,i).map((p,k)=>byId[st.r1[k]].name).join(" · ")+'</p>':'')+'</div>'; return; }
  if(phase===2){ const m=M.find(([k])=>!st.r2[k]); const idx=M.findIndex(([k])=>k===m[0]); const surv=PAIRS.map((_,k)=>byId[st.r1[k]]);
    s.innerHTML='<div class="card"><div class="eyebrow">2라운드 · '+(idx+1)+' / 4 · 순간별로 고르기</div><h2>'+m[1]+' — 이 순간은 어느 후보가 가장 좋습니까?</h2><p class="lead">1라운드에서 남은 다섯의 같은 순간입니다. 후보가 그 순간을 몇 페이지로 처리하는지는 후보 마음입니다.</p>'
      +'<div class="mgrid">'+surv.map(c=>'<div class="mc" data-pick2="'+c.id+'" data-m="'+m[0]+'"><img src="'+c.shots[m[0]]+'" alt=""><b>'+c.name+'</b><span>후보 '+c.n+'</span></div>').join("")+'</div>'
      +whyRow("r2",m[0])+'<div class="row"><button class="btn" data-back="1">1라운드 다시</button></div></div>'; return; }
  const surv=PAIRS.map((_,k)=>byId[st.r1[k]]); const lines=M.map(([m,n])=>'- '+n+': '+byId[st.r2[m]].name+' (후보 '+byId[st.r2[m]].n+')'+(st.r2why[m]?' — '+st.r2why[m]:''));
  const spec='## 조합 명세 — '+new Date().toISOString().slice(0,10)+'\\n\\n1라운드 생존: '+surv.map(c=>c.name).join(' · ')+'\\n\\n'+lines.join('\\n')+'\\n\\n다음: 이 조합으로 하나를 만들고, 06-e 시나리오 11개를 다시 걸어 대조한다.';
  s.innerHTML='<div class="card"><div class="eyebrow">결과 · 조합 명세</div><h2>이 조합으로 하나를 만듭니다.</h2><p class="lead">순간마다 이긴 후보를 이어 붙인 것이 명세입니다. 복사해서 대화에 붙이면 제가 그대로 만듭니다.</p>'
    +'<div class="mgrid">'+M.map(([m,n])=>'<div class="mc win"><img src="'+byId[st.r2[m]].shots[m]+'" alt=""><b>'+n.split(" — ")[0]+'</b><span>'+byId[st.r2[m]].name+'</span></div>').join("")+'</div>'
    +'<pre class="spec" id="spec">'+spec.replace(/</g,"&lt;")+'</pre><div class="row"><button class="btn p" data-copy="1">명세 복사</button><button class="btn" data-back="2">2라운드 다시</button><button class="btn" data-reset="1">처음부터</button></div></div>';
}
function gallery(){ $("#gal").innerHTML=C.map(c=>'<a class="mc" href="'+c.url+'" target="_blank" rel="noopener" style="text-decoration:none;color:inherit"><img src="'+c.shots.open+'" alt=""><b>'+c.n+'. '+c.name+'</b><span>'+c.desc+'</span></a>').join(""); }
document.addEventListener("click",async e=>{
  const p=e.target.closest("[data-pick]"); if(p&&!e.target.closest("a")){ st.r1[p.dataset.i]=p.dataset.pick; save(); render(); return; }
  const q=e.target.closest("[data-pick2]"); if(q){ st.r2[q.dataset.m]=q.dataset.pick2; save(); render(); return; }
  const w=e.target.closest("[data-why]"); if(w){ (w.dataset.key==="r1"?st.r1why:st.r2why)[w.dataset.idx]=w.dataset.why; save(); render(); return; }
  if(e.target.closest("[data-back]")){ const b=e.target.closest("[data-back]").dataset.back; if(b==="1") st.r1={}; st.r2={}; save(); render(); return; }
  if(e.target.closest("[data-reset]")){ st={r1:{},r1why:{},r2:{},r2why:{}}; save(); render(); return; }
  if(e.target.closest("[data-copy]")){ const t=$("#spec").textContent; try{ await navigator.clipboard.writeText(t); e.target.textContent="복사됨"; }catch(x){ e.target.textContent="길게 눌러 복사"; } }
});
render(); gallery();
</script>`;
writeFileSync(join(here,"worldcup.html"), html);
console.log("[worldcup] worldcup.html", (html.length/1024).toFixed(0), "KB · 후보", C.length);
