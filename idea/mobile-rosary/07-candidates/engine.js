/* 묵주기도 공용 엔진 — 후보 열 개가 이 위에서 돈다.
   여기가 고정이고(77단계·상태 기계·자리 저장·음성·진동), 껍데기(구조·색·동작 감각)는 각 후보가 정한다.
   06-prd.md §1 · 06-screen-spec.md 비화면 채널 명세 · 06-screen-map.md 결함 2·5·7 처방을 담고 있다. */
(function(){
const P={
  sign:{a:"성부와 성자와 성령의 이름으로. 아멘.",b:""},
  creed:{a:"전능하신 천주 성부, 천지의 창조주를 저는 믿나이다.",b:""},
  our:{a:"하늘에 계신 우리 아버지, 아버지의 이름이 거룩히 빛나시며 아버지의 나라가 오시며 아버지의 뜻이 하늘에서와 같이 땅에서도 이루어지소서.",
       b:"오늘 저희에게 일용할 양식을 주시고 저희에게 잘못한 이를 저희가 용서하오니 저희 죄를 용서하시고 저희를 유혹에 빠지지 않게 하시고 악에서 구하소서. 아멘."},
  hail:{a:"은총이 가득하신 마리아님, 기뻐하소서! 주님께서 함께 계시니 여인 중에 복되시며 태중의 아들 예수님 또한 복되시나이다.",
        b:"천주의 성모 마리아님, 이제와 저희 죽을 때에 저희 죄인을 위하여 빌어주소서. 아멘."},
  glory:{a:"영광이 성부와 성자와 성령께,",b:"처음과 같이 이제와 항상 영원히. 아멘."},
  save:{a:"예수님, 저희 죄를 용서하시며 저희를 지옥 불에서 구하시고,",b:"연옥 영혼을 도우시며 가장 버림받은 영혼을 구원하소서."}
};
const MYST={
  joy:["환희의 신비",["마리아님께서 예수님을 잉태하심","마리아님께서 엘리사벳을 찾아보심","마리아님께서 예수님을 낳으심","마리아님께서 예수님을 성전에 바치심","마리아님께서 잃으셨던 예수님을 성전에서 찾으심"]],
  light:["빛의 신비",["예수님께서 요르단 강에서 세례 받으심","예수님께서 카나에서 첫 기적을 행하심","예수님께서 하느님 나라를 선포하심","예수님께서 거룩하게 변모하심","예수님께서 성체성사를 세우심"]],
  sorrow:["고통의 신비",["예수님께서 우리를 위하여 피땀 흘리심","예수님께서 우리를 위하여 매맞으심","예수님께서 우리를 위하여 가시관 쓰심","예수님께서 우리를 위하여 십자가 지심","예수님께서 우리를 위하여 십자가에 못박혀 돌아가심"]],
  glory:["영광의 신비",["예수님께서 부활하심","예수님께서 승천하심","성령께서 강림하심","성모님께서 하늘에 올림을 받으심","성모님께서 하늘의 여왕으로 관을 쓰심"]]
};
const DAYS=["glory","joy","sorrow","glory","light","sorrow","joy"];
const DAYNM=["일요일","월요일","화요일","수요일","목요일","금요일","토요일"];
const TOTAL=77;

function build(key){
  const [name,list]=MYST[key], q=[]; let n=0;
  const push=o=>{o.n=++n; o.total=TOTAL; q.push(o);};
  push({t:"sign",a:P.sign.a,b:"",label:"시작 기도",dec:0,bead:-1});
  push({t:"creed",a:P.creed.a,b:"",label:"시작 기도",dec:0,bead:-1});
  push({t:"our",a:P.our.a,b:P.our.b,label:"시작 기도",dec:0,bead:-1});
  for(let i=0;i<3;i++) push({t:"hail",a:P.hail.a,b:P.hail.b,label:"시작 기도",dec:0,bead:i,of:3});
  push({t:"glory",a:P.glory.a,b:P.glory.b,label:"시작 기도",dec:0,bead:-1});
  for(let d=1;d<=5;d++){
    const m=list[d-1];
    push({t:"decl",a:m+"을 묵상합시다.",b:"",label:`제${d}단`,dec:d,bead:-1,mystery:m});
    push({t:"our",a:P.our.a,b:P.our.b,label:`제${d}단`,dec:d,bead:-1,mystery:m});
    for(let i=0;i<10;i++) push({t:"hail",a:P.hail.a,b:P.hail.b,label:`제${d}단 · ${i+1}번째 알`,dec:d,bead:i,of:10,mystery:m});
    push({t:"glory",a:P.glory.a,b:P.glory.b,label:`제${d}단`,dec:d,bead:-1,mystery:m});
    push({t:"save",a:P.save.a,b:P.save.b,label:`제${d}단`,dec:d,bead:-1,mystery:m});
  }
  return q;
}
const today=()=>DAYS[new Date().getDay()];
function ago(ms){
  const m=Math.round((Date.now()-ms)/60000);
  if(m<1) return "방금"; if(m<60) return `${m}분 전`;
  const h=Math.round(m/60); if(h<24) return `${h}시간 전`; if(h<48) return "어제"; return `${Math.round(h/24)}일 전`;
}
function where(pos){ // 사람이 읽는 자리
  if(!pos) return "";
  const q=build(pos.k), s=q[Math.min(pos.i,TOTAL-1)];
  return s.dec===0 ? "시작 기도" : (s.bead>=0 ? `제${s.dec}단 ${s.bead+1}번째 알` : `제${s.dec}단`);
}

/* ── 저장: 지향별 자리 (결함 7 처방) ── */
const store={
  intents(){ try{ const v=JSON.parse(localStorage.getItem("mr2.intents")||"null"); if(Array.isArray(v)&&v.length) return v; }catch(e){} return ["오늘의 지향"]; },
  setIntents(a){ try{ localStorage.setItem("mr2.intents",JSON.stringify(a)); }catch(e){} },
  pos(intent){ try{ return JSON.parse(localStorage.getItem("mr2.pos."+intent)||"null"); }catch(e){ return null; } },
  save(intent,pos){ try{ localStorage.setItem("mr2.pos."+intent,JSON.stringify(pos)); }catch(e){} },
  clear(intent){ try{ localStorage.removeItem("mr2.pos."+intent); }catch(e){} },
  set(){ try{ return JSON.parse(localStorage.getItem("mr2.set")||"{}"); }catch(e){ return {}; } },
  setSet(o){ try{ localStorage.setItem("mr2.set",JSON.stringify(o)); }catch(e){} },
  count(){ try{ return +localStorage.getItem("mr2.count")||0; }catch(e){ return 0; } },
  bump(){ try{ localStorage.setItem("mr2.count",String(store.count()+1)); }catch(e){} },
};

/* ── 음성·진동 ── */
let voice=null, voiceChecked=false;
function pickVoice(){
  if(voiceChecked) return voice;
  try{ const v=(speechSynthesis.getVoices()||[]).find(x=>/^ko/i.test(x.lang)); voice=v||null; voiceChecked=(speechSynthesis.getVoices()||[]).length>0; }catch(e){ voice=null; voiceChecked=true; }
  return voice;
}
try{ speechSynthesis.onvoiceschanged=()=>{ voiceChecked=false; pickVoice(); }; }catch(e){}
const canSpeak=()=>{ try{ return !!pickVoice(); }catch(e){ return false; } };
function speak(text){
  return new Promise(res=>{
    if(!canSpeak()){ setTimeout(res, text.length*118); return; }
    try{ speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(text); u.voice=voice; u.lang="ko-KR"; u.rate=0.92; let done=false;
      const fin=()=>{ if(!done){ done=true; res(); } }; u.onend=fin; u.onerror=fin; speechSynthesis.speak(u); setTimeout(fin, text.length*200+3000);
    }catch(e){ setTimeout(res, text.length*118); }
  });
}
const VIB={bead:[18],decade:[28,60,28,60,28],silentOn:[20,50,20],done:[200]};
function buzz(k){ try{ navigator.vibrate&&navigator.vibrate(VIB[k]); }catch(e){} }

/* ── 세션 ── */
function create(opts){
  opts=opts||{};
  const set=store.set();
  const S={ key:today(), intent:store.intents()[0], q:[], i:0, phase:"idle", silent:!!set.silent, speed:set.speed||1,
            t0:0, elapsed:0, resumes:0, timer:null, gen:0 };
  const emit=()=>{ opts.onChange&&opts.onChange(snapshot()); };
  function snapshot(){
    const step=S.q[S.i]||null;
    return { phase:S.phase, i:S.i, total:TOTAL, step, key:S.key, mystName:MYST[S.key][0], mystList:MYST[S.key][1],
      intent:S.intent, intents:store.intents(), silent:S.silent, speed:S.speed, voice:canSpeak(),
      pos:store.pos(S.intent), posWhere:where(store.pos(S.intent)), posAgo:store.pos(S.intent)?ago(store.pos(S.intent).at):"",
      elapsedMin:Math.round((S.elapsed+(S.t0?Date.now()-S.t0:0))/60000), resumes:S.resumes, count:store.count(),
      todayName:DAYNM[new Date().getDay()], progress:S.i/TOTAL };
  }
  const clear=()=>{ if(S.timer){ clearTimeout(S.timer); S.timer=null; } try{ speechSynthesis.cancel(); }catch(e){} };
  const speedFactor=()=>({0.75:0.75,1:1,1.35:1.35})[S.speed]||1;
  function gapMs(step){
    if(step.t==="decl") return 2200;
    if(!step.b) return 1200;
    let g=(900+step.b.length*132)/speedFactor();
    if(S.silent||!canSpeak()) g+=step.a.length*118;   // 무음이면 앞 절 몫도 사용자가 읽는다
    return g;
  }
  function savePos(){ store.save(S.intent,{k:S.key,i:S.i,at:Date.now()}); }
  async function run(){
    const gen=++S.gen; const step=S.q[S.i]; if(!step) return;
    S.phase="reading"; emit();
    if(step.t==="decl"&&S.i>0) buzz("decade");
    if(S.silent) await new Promise(r=>setTimeout(r, Math.min(step.a.length*60,1800))); else await speak(step.a);
    if(gen!==S.gen) return;
    if(step.b){ S.phase="mine"; emit(); }
    S.timer=setTimeout(()=>{ if(gen!==S.gen) return; advance(); }, gapMs(step));
  }
  function advance(){
    S.i++; if(S.q[S.i]&&S.q[S.i].t==="hail") buzz("bead");
    if(S.i>=TOTAL){ finish(); return; }
    savePos(); run();
  }
  function finish(){
    clear(); S.elapsed+=S.t0?Date.now()-S.t0:0; S.t0=0; S.phase="done"; store.clear(S.intent); store.bump(); buzz("done"); emit(); opts.onDone&&opts.onDone(snapshot());
  }
  const api={
    snapshot, build:()=>build(S.key),
    home(){ clear(); S.phase="idle"; S.t0=0; emit(); },
    start({intent,fromSaved}={}){
      if(intent) S.intent=intent;
      const pos=fromSaved?store.pos(S.intent):null;
      if(pos){ S.key=pos.k; S.i=pos.i; S.resumes++; } else { S.key=today(); S.i=0; S.resumes=0; store.clear(S.intent); }
      S.q=build(S.key); S.t0=Date.now(); S.elapsed=0; savePos(); run();
    },
    pause(){ if(S.phase==="reading"||S.phase==="mine"){ clear(); S.elapsed+=Date.now()-S.t0; S.t0=0; savePos(); S.phase="paused"; emit(); } },
    resume(){ if(S.phase==="paused"){ S.t0=Date.now(); S.resumes++; run(); } },
    end(){ clear(); store.clear(S.intent); S.phase="idle"; S.t0=0; emit(); },
    next(){ if(S.phase==="reading"||S.phase==="mine"){ clear(); advance(); } },   // 손으로 넘기기 (장르 6)
    remainingMin(){ const left=TOTAL-S.i; return Math.max(1,Math.round(left*9.5/60)); },
    toggleSilent(){ S.silent=!S.silent; store.setSet({...store.set(),silent:S.silent}); if(S.silent) buzz("silentOn"); emit(); },
    setSpeed(v){ S.speed=v; store.setSet({...store.set(),speed:v}); emit(); },
    setIntent(name){ S.intent=name; emit(); },
    addIntent(name){ name=(name||"").trim().slice(0,24); if(!name) return; const a=store.intents(); if(!a.includes(name)){ a.push(name); store.setIntents(a); } S.intent=name; emit(); },
    removeIntent(name){ const a=store.intents(); if(a.length<=1) return; store.setIntents(a.filter(x=>x!==name)); store.clear(name); if(S.intent===name) S.intent=store.intents()[0]; emit(); },
    /* 스크린샷·시연용 — ?demo=open|pray|mine|resume|paused|done */
    demo(mode){
      clear();
      if(mode==="resume"||mode==="paused"){ S.key="sorrow"; S.q=build(S.key); S.i=7+14*2+2+3; store.save(S.intent,{k:S.key,i:S.i,at:Date.now()-26*3600e3}); }
      if(mode==="pray"||mode==="mine"){ S.key=today(); S.q=build(S.key); S.i=7+14*1+2+3; S.phase=mode==="pray"?"reading":"mine"; S.t0=Date.now()-6*60000; }
      else if(mode==="paused"){ S.phase="paused"; S.elapsed=6*60000; }
      else if(mode==="done"){ S.key=today(); S.q=build(S.key); S.i=TOTAL; S.phase="done"; S.elapsed=21*60000; S.resumes=1; }
      else { S.phase="idle"; }
      emit();
    },
    demoFromURL(){ const m=new URLSearchParams(location.search).get("demo"); if(m) api.demo(m); else emit(); return !!m; },
  };
  document.addEventListener("visibilitychange",()=>{ if(document.hidden) api.pause(); });
  return api;
}
window.Rosary={create,build,MYST,DAYS,DAYNM,P,TOTAL,today,ago,where,store};
})();
