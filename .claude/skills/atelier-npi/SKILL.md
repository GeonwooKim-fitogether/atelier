---
name: atelier-npi
description: Atelier NPI 9-stage workflow. Pain Point raw → Foundry 인계 패키지까지. CEO와 대화로 진행. trigger - CEO가 "Atelier 시작" 발화 시 atelier-npi Skill 자동 fire (단일 trigger). 현재 Stage 01·02 1차 구축, 03~09 미구축 (Phased Build-and-Test로 순차 진화).
---

# atelier-npi Skill v0.3

Atelier 9-stage workflow의 *실행 가이드*. Skill fire 시 Agent가 Stage 01부터 step-by-step 진행. CEO는 말·답변·판정만.

## Skill fire 시 첫 행위

trigger 발화(= Step 1.1 Skill 호출) → Agent가 즉시 다음 응답 던진다 (Skill 식별 표시 포함):

```
[atelier-npi Skill v0.2 fired — Stage 01 Intake 진입]

Step 1.2 — idea 작성

어떤 게 마음에 걸렸어요? 한 줄로 들려주세요.
정리 안 해도, 흐릿해도 OK — 흐릿하면 같이 풀어볼게요.
```

CEO가 한 줄 들려주면 → Agent가 정리·확정 → Step 1.3으로.
CEO가 "잘 모르겠다" 신호 주면 → 1.2 보조 prompt 던짐:

```
최근에 "아 짜증나" / "이거 누가 좀 어떻게 해줬으면" / "이거 왜 이래" 한 순간 있었어요?
직접 겪으셨든, 누가 그러는 걸 보셨든.
```

(불편함 직설 X — *구체 순간 묻기*가 default)

---

## CEO 대화 룰 (모든 stage 공통·매 응답 의무 — [[human-tone-reporting]])

⚠ 매 응답 박기 전 self-check 5문항:

1. 사람에게 *보고하는 식* 자연 문장인가? Agent가 정리해서 던지는 식 X.
2. 표·헤더가 *진짜 필요한가*? 비교·매핑이 진짜 필요한 자리만. 자연 문장으로 박을 수 있으면 자연 문장.
3. 작업 jargon ("L1·L2·박음·frame·layer·commit·lock-in") 박혀 있나? → 제거 또는 평이한 단어로 교체.
4. CEO가 *한 번 읽고 맥락 이해 + 결정 가능*한가?
5. 파일·자료 만들었거나 CEO가 보길 원하면 *PowerShell `Start-Process`로 직접 띄움*. markdown 링크는 환경에 따라 click 안 통하므로 의존 X. CEO 응답 받자마자 Chrome에 자료 이미 떠 있어야 함.

**보고 3 요소** (매 응답에 박혀야):
- **맥락** — 지금 무슨 자리·왜 이 이야기
- **핵심** — 박은 결과 또는 점검 결과
- **결정 게이트** — CEO가 무엇을 결정해야 하나 (한 줄)

**Agent 어투 (금지)**: 헤더 과다·표 위주·짧은 bullet 나열·"→" 화살표 결론·추상 명사 + "박음".
**사람 어투 (default)**: 자연 문장 위주·핵심+근거 자연 설명·표는 진짜 필요할 때만·평이한 한국어.

→ Agent 어투면 응답 다시 박음.

이 룰 위반은 [[correction-as-pattern]] 위반이며 CEO 본질 분노 source. 변경 금지.

---

## 큰 원칙

**0. 본질 우선순위 — 최상위 메타** (decisions.md *본질 우선순위 원칙*)
시스템 정의 (Skill·decisions·Dashboard) = **메인** (TDD test 역할).
예시 cycle (mobile-rosary 등 산출물) = **부차** (시스템 검증 input).
*예시 산출물의 외관·풍부함에 attention 집중 금지*. memory: [[essence-over-shell]].

**0.1 작업 단위 + input handling** (decisions.md *작업 단위 원칙*)
매 작업을 *시작·종료·산출 명시한 한 덩어리*로 commit. 매 응답 상단에 *현재 작업·진행도·layer* 명시. 새 input 즉시 흡수 X — (a) 정정 (b) 큐 (c) 교체 중 분류 후 행동. memory: [[work-unit-discipline]] · [[no-eager-input]].

**0.2 commit 표현** — *박힘* 한국어 X. 영어 default — *commit (to)* · *anchor (in)* · *render (in)* · *draft* · *lock in*. *어디에·어떤 의미* 명확. memory: [[commit-vocabulary]].

1. **작성 주체** — 모든 md/HTML은 세션 안 Agent가 작성. CEO 직접 손대지 않음.
2. **AI 시대 속도** — 한번에 잘하기 < 실행 검증을 빨리. 시간 게이트 없음. (charter §3.3)
3. **SSOT + 폴더 평면화** — 산출물은 `idea/<name>/` 단일 폴더 안 stage 한 파일 원칙.
4. **Stage 09 = 자동 취합** — Handoff Packaging은 새 작업 아니라 01~08 누적 산출물의 묶음.
5. **Phased Build-and-Test** — 한 stage 시스템 구축 → 실 idea로 cycle 1회 → 막힌 부분 반영 → 다음 stage 구축. 다음 stage로 미리 안 감.
6. **3 Layer 소통 채널** (decisions.md *3 Layer 소통 채널 원칙*) — L1 CEO↔Agent (대화+Dashboard) · L2 Agent↔실무자 (md) · L3 Atelier→Foundry (package). 청중·형식 다름. md는 *agent 자료*, CEO는 *Dashboard*에서 봄.
7. **Dashboard 갱신 의무** (decisions.md *Dashboard 갱신 의무 원칙*) — 시스템·산출물 변경 시 Dashboard 갱신 동반. *Dashboard 갱신 없는 변경 = CEO에 보이지 않는 변경*. 매 stage 종료 step에 anchor.
8. **세션 인계 의무** (decisions.md *세션 인계 의무 원칙*) — Skill fire 시 의무 read + 세션 종료 시 의무 commit. SESSION-HANDOFF.md + Dashboard 인계 패널 메커니즘.

9. **Project Card 포맷 — 통합 트리** (decisions.md *Project Card 포맷 원칙*) — Dashboard Project card 글은 *통합 트리 포맷* (`.o-tree` CSS class) commit. *목차/본문 분리 X*. monospace · H1 bold · H2 `└ ` indent + tier 색상 (`tier-strong` 녹색 · `tier-warn` 노란 · `tier-info` 파란) · 본문 muted indent. 강조·색상은 H1·H2 위계에만, 본문 plain. *시각화 form (Persona·BMC·포지셔닝·경쟁사 표)은 별도*. 모든 stage 산출에 default 적용.

---

## 세션 시작 의무 (Skill fire 직후 1번 — 0순위)

trigger 발화 "Atelier 시작" → Skill fire → **즉시 다음 read·view 의무 수행** (Step 1.1 진입 전):

1. `SESSION-HANDOFF.md` read — 지난 세션 인계 자료 흡수
2. `workflows/type1-external-service.html` view — Dashboard 현재 상태 확인 (Work Status + Workflow Map + Session Handoff 패널)
3. `decisions.md` 최근 commit skim — 본질 우선순위·작업 단위·세션 인계·시각화 표준·BMC·3 Layer·Dashboard 갱신 의무
4. (진행 중 idea 있으면) `idea/<slug>/_meta.md` + `idea-funnel.md` read
5. MEMORY 자동 로드 확인 (essence-over-shell·work-unit-discipline·no-eager-input·commit-vocabulary 등)

→ 컨텍스트 회복 후 *다음 세션 첫 행위* 진입 (SESSION-HANDOFF.md에 anchor된 자리).

**거부 패턴**:
- ❌ Skill fire 직후 의무 read 생략하고 새 작업 진입
- ❌ "이번 세션은 다른 작업이라" 같은 이유로 인계 자료 skip

---

## 세션 종료 의무 (세션 종료 직전)

세션 종료 신호 (CEO 발화·세션 종료 알림 등) → **즉시 다음 commit 의무 수행**:

1. `SESSION-HANDOFF.md` 갱신 — 5 섹션 (현재 작업 단위·진행 상태·대기 input·다음 세션 첫 행위·핵심 lesson + 변경 시스템 자료 list)
2. Dashboard *Session Handoff 패널* 갱신 (sidebar 하단) + *Work Status* 패널 갱신 (Layer 진행도·현재 작업 단위)
3. (변경 있었으면) MEMORY commit/갱신 — 이번 세션 발견 함정·통찰
4. 마지막 응답에 *세션 종료 박음* 명시 — "세션 종료 commit 완료. 다음 세션 SESSION-HANDOFF.md 의무 read부터."

**거부 패턴**:
- ❌ 작업 진행 중 세션 종료 신호 무시
- ❌ 인계 commit 없이 종료 (다음 세션 lesson 손실)

---

## 9-stage = 5 묶음 구조

**핵심 원칙** (MEMORY: `bundle-convergence-gate` · `hill-climbing-not-spiral` · `slot-without-frame` · `pain-point-as-clue`):

- 9 stage는 *시간 순서*가 아니라 *영역 분류* (Stage 01만 시작점 특수)
- 5 묶음 = 자주 왔다갔다 작업 단위 + 묶음 사이 수렴 게이트
- 진행 = hill climbing (빈 칸 발견 → 점프 → 채움 → 다시 스캔)
- 27 slot 미리 정의 (9 stage × 3 카테고리: 사업·상품·서비스), 내용 frame은 박지 않음

| 묶음 | Stage | 역할 | 구축 상태 |
|---|---|---|---|
| **1** | 01 Intake | Pain Point clue 인터뷰 (CEO 발화 + 3 축 정리) | **v2 (2026-05-29 재정의)** |
| **2** | 02 Research / 03 Analysis | 발산 + 정제 — 빈 영역 발견·정의 | v0.3 (정비 필요) |
| **3** | 04 Ideation / 05 Prioritization | 해결책 발산 + 수렴 | 잠정 |
| **4** | 06 Planning / 07 Prototyping / 08 Validation | 완성본 만들기 | 미구축 |
| **5** | 09 Handoff Packaging | 3 완료 문서 → Foundry | 미구축 |

각 stage 시각 reference: `workflows/type1-external-service.html` · `workflows/node-graph.html` (Dashboard).

## 3 카테고리 (사업·상품·서비스)

매 stage에 3 카테고리 셀 박힘 (27 slot). 매 프로젝트 동일.

| 카테고리 | 핵심 질문 |
|---|---|
| **사업 (Business)** | 어느 시장에 진입하나? 어떻게 돈 버나? |
| **상품 (Product)** | 어떤 결과물인가? 어떻게 다른가? |
| **서비스 (Service)** | 어떻게 사용자에게 전달되나? |

Stage 09 완료 산출물:
- `business-plan.md` (사업)
- `product-requirements.md` (PRD, 상품)
- `service-design.md` (서비스)

## 묶음 수렴 게이트 아이템 (잠정 — 별도 정의 작업)

| 게이트 | 다음 묶음 진입 조건 |
|---|---|
| 1 → 2 | Pain Point + 5 Whys + 근본 원인 + 5축 (3 축 정리 완료) |
| 2 → 3 | 검증된 Pain · Persona · 시장 분해 · Wedge 선정 · 차별 자리 · 솔루션 톤 |
| 3 → 4 | 해결책 lock-in · 기능 우선순위 · V1/V1.5/V2 로드맵 · BMC 정제 |
| 4 → 5 | PRD · Prototype · Validation 결과 (시장 노출 검증 통과) |
| 5 (완료) | 3 완료 문서 |

## 진행 원칙

- **묶음 안 자주 왔다갔다** (예: 02 ↔ 03 자유)
- **묶음 사이 수렴 게이트** (수렴 아이템 채워져야 진입)
- **묶음 밖 점프 가능** (예: 07 작업 중 02 raw 부족 발견 → 02로). 빈도 아주 적음.
- **27 slot 미리 정의 + 내용 frame 박지 않음** — 답 없는 자리에 답 강제 X. 비어있을 권리 보장.
- **Stage 01만 시간적 시작점** (clue 없으면 진행 불가). 나머지 영역은 자유 이동.

---

## Stage 01 — Intake (v2 — 2026-05-29 재정의)

**목적**: Pain Point = clue (작은 시작점) 수집. CEO 발화 + Agent 추가 질문 인터뷰 + 3 축 정리.

**원칙** ([[pain-point-as-clue]]):
- Pain Point는 *답*이 아니라 *다음 질문 만드는 단서*
- Agent가 답·frame 미리 박지 않음
- Stage 01 = CEO 발화 자리. Agent 분석 자리 아님.
- 답 없는 자리에 답 강제 = 추측을 정직성으로 위장 (안티패턴)

**Stage 01 동작 흐름**:
1. CEO 첫 Pain Point 발화 (한 줄~몇 문장)
2. Agent가 추가 질문 던짐 → CEO가 *멈출 때까지* ideation 자유
3. CEO 정리 신호 ("이제 됐어" 등)
4. Agent가 *3 축*으로 정리:
   - 사업 — 대화 중 자연 박힌 시장·기회·비즈니스 직관 (없으면 빈 칸 정직 표시)
   - 상품 — Pain Point + 5 Whys + 근본 원인 + 5축 (핵심)
   - 서비스 — 현재 사용 환경·우회·마찰 (있으면 박음)
5. 빈 칸은 빈 칸 그대로 — Stage 02·03 발산·정제로 채워짐

### Step 1.1 — Skill 호출 [CEO]

**목적**: workflow 정식 진입 신호.
**행위**: CEO가 *"Atelier 시작"* 발화. atelier-npi Skill 자동 fire.
**출력**: Skill 진입 (이 시점에 이미 진입한 상태).

### Step 1.2 — idea 작성 [CEO + Agent]

**목적**: Pain Point 정체성 *한 줄 박힘*. 1.3 풍부 대화의 출발점.
**행위**:
1. Agent가 prompt 던짐 — "어떤 게 마음에 걸렸어요? 한 줄로 들려주세요. 정리 안 해도, 흐릿해도 OK — 흐릿하면 같이 풀어볼게요."
2. CEO 자유 답 (한 줄~몇 문장).
3. CEO가 "잘 모르겠다" 신호 주면 Agent 보조 prompt: "최근에 '아 짜증나' / '이거 누가 좀' / '이거 왜 이래' 한 순간 있었어요?"
4. Agent가 *idea slug*(짧은 영문 식별자) 제안 + 한 줄 정리.
5. CEO confirm.
**출력**: idea slug + 한 줄 정리.

### Step 1.3 — Pain Point 근본 이해 (배경 조사 + Pain Point 재정의 + 5 Whys) [Agent + CEO]

**목적**: CEO Pain Point을 *근본까지* 파악. 단순 상태 묘사 X, 원인 깊이.

**원칙**:
- *질문 던지기 전 배경 지식 1차 조사* — 진짜 필요한 질문만 던지기.
- **무지성 질문 금지** — Agent가 추론 가능한 것은 *먼저 충분히 추론* → 한 문장으로 박음 → confirm 요청. CEO는 검증자.
- 추론 불가(개인 경험·머릿속 상태)도 *추론 시도 후 묻기*.
- **질문은 객관식 + Other** — `AskUserQuestion` 도구로 던짐. 답이 여러 갈래일 수 있는 질문은 객관식 2~4개 + Other 자유 입력. 단순 confirm도 객관식(맞음/정정/보완)이 명확. memory: [[question-as-multiple-choice]].
- 완전 open이 필요한 경우만(Pain raw 발화 등) 일반 텍스트 prompt.
- 5축(context/behavior/needs/attitude/motivation)은 *Agent backend organizer*. 표 형식 노출 X — 대화에서 자연 추출.
- 막힘 자체가 *Stage 02 Research 신호* — 모르는 영역 표시.

**대화 흐름**:

**(0) 배경 지식 조사** [Agent backend, 요약 공유]
- 1.2 idea 받자마자 Agent가 *도메인 기본 이해* 자가 점검.
- 모르는 단어·개념·구조가 있으면 즉시 WebSearch로 조사.
- CEO에게 *핵심 요약 + sources* 한 번 공유 → "이 맥락 위에서 진행하겠다" 식 명시.
- 산출 — 도메인 이해 (Agent 머릿속, 01-intake.md에 backend로 포함 가능).
- *목적*: 1차원 질문("대안 뭐가 있어요?" 같은) 차단. 맥락 기반 정밀 질문 가능.

**(1) Pain Point 재정의** [Agent 추론 → CEO confirm]
- Agent가 idea raw + 배경 지식으로 *한 문장 문제 정의* 추론.
- 형식: "<주체>가 <상황>에서 <행동>할 때 <어떤 마찰>이 있다."
- CEO에 "이렇게 생각하는데 맞나요? 보완할 것?" → confirm 또는 정정.

**(2) 5 Whys 전개** [Pain 진실성 검증 패턴]

> **이 도구의 목적**: *가짜 Pain vs 진짜 Pain 식별*. 제품 솔루션 도출 X. Why를 파는 *행위 자체*가 검증 도구. (memory: [[tool-purpose-awareness]])

**진짜 Pain 신호 (Agent가 매 Why마다 자가 점검)**:
- 반복 패턴 (1회성 X)
- 우회 행동 흔적 (지금도 어떻게든 다루고 있음)
- 시간·돈·정서적 비용 지불

**가짜 Pain 신호**:
- 1회성 경험
- 추측·기대 ("이러면 좋을 것 같아")
- "다들 그러겠지" 식 일반화 단정

**Why 깊이**:
- 고정 5단 X. *진짜 Pain 본질에 도달*하면 멈춤 (보통 2~3 Why).
- 막히면 *모르는 영역* = Stage 02 Research 신호로 마무리.
- 5단 강제 진행 = 함정 (형식만 따르기, 목적 잃음).

각 Why 사이클 — *Agent 추론 우선*:
1. Agent가 지금까지 정보 + 배경 지식으로 Why N 원인 추론.
2. 한 문장으로 박음 — `Why N (추론): <원인>`.
3. CEO에 "이렇게 생각하는데 맞나요? 보완할 것?" 요청.
4. CEO 답 — confirm 또는 정정·보완.
5. *진짜 Pain 신호*가 충분히 잡혔다고 판단되면 Why 끝. 아니면 다음 Why.

질문은 *추론 막힐 때만*. 가능한 영역은 Agent 책임으로 추론.

**(3) 근본 원인 도출** [Agent 추론 → CEO confirm]
- Agent가 5 Whys 종합 + 배경 지식으로 *근본 원인 한 문장* 추론.
- CEO에 "이게 근본 원인이라고 생각하는데 맞나요?" → confirm.

**Backend 자동 (산출물 박는 행위, step 분리 X)**:
- 대화 전체에서 5축(context/behavior/needs/attitude/motivation) 자동 추출.
- `idea/<slug>/` 폴더 + `_meta.md` 생성·갱신.
- `idea/<slug>/01-intake.md` 생성 (3 축 구조):
  ```markdown
  # Intake — <slug>

  ## Pain raw (CEO 발화 원문)
  <대화 전체 또는 핵심 발화>

  ---

  ## 사업 (Business) 셀
  <대화 중 자연 박힌 시장·기회·비즈니스 직관>
  <없으면: "Stage 02·03에서 채워질 빈 칸">

  ## 상품 (Product) 셀

  ### Pain Point 재정의 (한 문장)
  <주체>가 <상황>에서 <행동>할 때 <어떤 마찰>이 있다

  ### 5 Whys
  - Why 1: <원인>
  - Why 2: <원인>
  - ...

  ### 근본 원인 (한 문장)
  <한 문장>

  ### 5축 (backend organizer)
  - context: ...
  - behavior: ...
  - needs: ...
  - attitude: ...
  - motivation: ...

  ## 서비스 (Service) 셀
  <현재 사용 환경·우회·마찰 — 대화 중 박힌 것>
  <없으면: "Stage 02·03에서 채워질 빈 칸">
  ```
- `idea-funnel.md`에 진입 기록.

**출력**: `01-intake.md` (3 축 구조, 사업·상품·서비스 셀).

**예외 — Stage 02~09 진행 중 CEO 추가 발화 시**:
- CEO 본인이 추가 ideation 발화하면 → Agent가 `01-intake.md`에 추가 박음 OK
- 단 Agent 분석 결과로 01 칸을 *역방향 정정*하는 것은 금지 ([[pain-point-as-clue]] 정합)

### Intake 종료 — 다음 stage 안내

```
01 Intake 완료. 산출: idea/<slug>/01-intake.md

다음:
- Stage 02 Research는 미구축 상태입니다.
- 지금 1차 검증 결과로 Intake 시스템 다듬을지, 그대로 Stage 02 시스템 구축으로 갈지 정해주세요.
```

(Stage 02 자동 진입 X — Phased Build-and-Test 원칙)

---

## Stage 02 — Research (발산) v0.3 1차 구축

**목적**: Stage 01 Pain 가설을 외부 현실과 마주치게 함. *발산만, raw 수집*. 수렴·분석·판정은 Stage 03 책임.

### 본질
- **시장조사** = *내 머릿속 가설을 외부 현실과 마주치게 해, 살아남은 가설만 다음 단계로 보내는 행위*.
- **UX 리서치** = *시장 풍경 위에 자리잡은 실제 사용자의 행동·맥락·동기를 발견해, 내 머릿속 사용자상과 마주치게 하는 행위*.
- *마주침* = 변형·검증·발견의 만남 (충돌 X).

### Step

#### 2.1 — 시장조사 (Desk Research) [Agent + WebSearch/WebFetch]

**6 마주침 질문** raw 수집:
1. **시장 응답 강도** — 시장이 이 Pain에 응답하고 있는가?
2. **솔루션 풍경** — 누가 어떻게 풀고 있나? gap 있는가?
3. **경쟁자·플레이어** — 누구와 부딪치나? 들어갈 자리?
4. **시장 규모·트렌드** — 사업 가치? 방향 정합?
5. **인접 도메인** — 같은 Pain pattern 다른 곳? (Stage 04 발산 input)
6. **비즈니스 모델·가격 구조** — 각 경쟁자가 *어떻게 수익을 내는가*? 가격대·과금 방식·페이월·트라이얼·B2B/B2C·광고·프리미엄·구독·일회성. (decisions.md *비즈니스 메타 원칙* 정합)

- 도구: WebSearch + WebFetch. *5축 → 검색 angle backend 추출* (CEO에 표 노출 X. 짧게 angle만 공유).
- Source 패턴: 공급자 페이지 (앱스토어·웹사이트·산업 리포트) + 분석 글 (G2·Capterra·Product Hunt·Statista·Grand View 등).
- raw 형식: *URL + 인용*. 해석·표·gap 가설 X.

#### 2.2 — 사용자조사 (UX Research, proxy default) [Agent + WebSearch/WebFetch]

**5 마주침 질문** raw 수집 (시장 raw 위에서 정밀):
1. **시장 안 위치** — 시장 user base 안 어느 세그먼트? 얼마나 좁나?
2. **솔루션 환경** — 기존 솔루션 채택·비채택·반쪽 사용 어느 상태?
3. **현재 행동** — 시장 솔루션 사용 / 우회 / 포기? 디테일?
4. **선택·기피·우회 동기** — 왜 그렇게 다루나?
5. **Pain·우회 행동·시장 솔루션에 대한 표현** — 후기·평점·비판·요청·은어 어떻게 말하나? *3 대상 모두* (시장 솔루션 없을 때도 Pain·우회 표현은 잡힘).

- 도구: WebSearch + WebFetch. *Source 패턴*: 발화 페이지 (Reddit·카페·블로그·앱스토어 후기·유튜브 댓글·SNS).
- **1인 CEO 제약** (charter §3.3·§13.5): 본격 인터뷰·설문·관찰 비현실 → **proxy default**. 가능 시 CEO 주변 1~2명 짧은 대화 (세션 밖, 메모 → 다음 세션에 발화로 박음. CEO 자율).
- **Cross-reference**: 앱스토어 후기 = *공급자 site, 사용자 발화 추출*. 두 섹션 cross-reference 가능.

### 분류 기준 — 짬뽕 방지
*Source 위치 X, 추출물 의미 O*. 한 source에서 시장 정보 + 사용자 발화 둘 다 추출 가능 → 각자 섹션으로.

### Pain 3축 → 5 마주침 질문 매핑 (backend, Stage 03 판정 input 정합)

charter §5.1 Pain 3축이 사용자 5 마주침 질문에 어떻게 매핑되는지:

| Pain 3축 | 사용자 마주침 질문 |
|---|---|
| **Reality** (진짜 흔적) | 3번 현재 행동 (우회·포기 흔적이 Pain 실재 증거) |
| **Depth** (얼마나 자주·아프게) | 3번 디테일 + 4번 동기 |
| **Owner** (1명 narrow) | 1번 시장 안 위치 + 5번 표현 |

→ Stage 03이 *이 매핑 위*에서 Pain 3축 검증 판정. Stage 02 raw가 *직접 3축 input*으로 사용됨.

### 발산/수렴 mode 경계 (중요)
- Stage 02 = *발산 only*. **수렴 작업 절대 X**:
  - 포지셔닝 맵·경쟁사 분석표·Persona 작성 X (Stage 03)
  - Pain 검증 판정·Owner 확정 X (Stage 03)
  - 1차 종합·해석 X (Stage 03)
- 단 *raw 수집 중 자연 메타*는 OK (예: "이 raw는 마주침 질문 N에 답함"). 판정·평가는 X.

### Backend 자동 박음 (Stage 01 패턴 대칭)
- 2.1·2.2 진행 중 `idea/<slug>/02-research.md` 박음. (L2 — agent 자료)
- `_meta.md` current-stage·status 갱신.
- `idea-funnel.md` 진입·완료 기록.
- **Dashboard 갱신 의무** (decisions.md 정합) — `workflows/type1-external-service.html` 의 *sidebar dot* (02 in-progress→done) + *Project 02 card* (raw 본질 박음, 시각 위계 박음) 갱신. CEO 청중 정제 형식. **md 내용 dump X**.

### 산출물 형식
```markdown
# Research — <slug>

> Stage 02 발산 raw 수집. *해석·판정 X (Stage 03 책임)*.

## 시장 (Desk Research) — 발산

### 1. 시장 응답 강도
**질문**: 시장이 이 Pain에 응답하고 있는가?
- "<raw 인용>" ([source](URL))
- ...

### 2~5
... (각 마주침 질문에 URL + 인용 raw)

## 사용자 (UX Research, proxy) — 발산

### 1. 시장 안 위치
**질문**: 시장 user base 안 어느 세그먼트?
- "<raw 인용>" ([source](URL))
- ...

### 2~5
...

## Raw 부족 영역 (Stage 03 입력 명시)
- 영역 1
- 영역 2
```

### CEO 게이트 — Stage 02 종료
훑음 — *raw 부족 영역 있나? 더 파야 할 곳?*. 부족 시 회귀(추가 검색). OK 시 Stage 03 시스템 구축으로 진입.

```
02 Research 완료. 산출: idea/<slug>/02-research.md

다음:
- Stage 03 Analysis는 잠정 박음 상태입니다.
- 지금 1차 검증 결과로 Research 시스템 다듬을지, 그대로 Stage 03 시스템 본격 구축으로 갈지 정해주세요.
```

(Stage 03 자동 진입 X — Phased Build-and-Test)

### 회귀 trigger

검증 중·이후 단계에서 *Stage 02 정의 자체의 짬뽕·구멍 발견* 시:
- decisions.md *정의 확정 게이트* 메타 원칙 따름
- Agent 정정안 박음 → CEO 명시 confirm → Skill 본문 갱신 → 같은 idea로 재검증
- 회귀를 *시스템 진화의 정상 신호*로 봄 (Phased Build-and-Test)

---

## Stage 03 — Analysis (수렴 + 판정 1) v0.3 본격

**목적**: Stage 02 raw 위 수렴·해석. Pain·Owner·들어갈 자리 좁힘 + Pass/Hold/Kill 판정 1차.

### develop 흐름 (Stage 01 → 02 → 03)

매 stage = *이전 stage 산출의 발산·수렴 진화*. 단순 step 박음 아닌 **흐름과 연결 속 develop**.

| Stage | 입력 (이전 산출) | 작업 mode | 출력 |
|---|---|---|---|
| **01 Intake** | (idea raw) | 박음 | Pain 정체성 — 5 Whys · 근본 원인 · **5축**(context·behavior·needs·attitude·motivation) |
| **02 Research** | Stage 01 5축 + Pain 3축 매핑(charter §5.1) | **발산** | 시장 6 마주침 + 사용자 5 마주침 raw |
| **03 Analysis** ← *지금* | Stage 02 raw + Pain 3축 매핑 | **수렴** | 검증 Pain · Persona · gap · BMC 1차 · 판정 |
| 04 Ideation | 03 산출 (검증 Pain · 솔루션 톤) | 발산 | Wedge 후보 + 수익 메커니즘 후보 |
| 05 Prioritization | 04 산출 | 수렴 | 방향성 + As is-To Be + BMC 완성 + 판정 |

### Pain 3축의 develop 경로

charter §5.1 **Pain 3축**(Reality·Depth·Owner)이 NPI 전체에 흐름:

```
Stage 01           Stage 02                        Stage 03
─────────          ──────────────────              ──────────────
Pain 정체성   →    Pain 3축 → 5 마주침 매핑    →   Pain 3축 검증
(5 Whys·5축)       (backend organizer)             (raw 위 수렴)
                       │
                       ├─ Reality  → 사용자 3 + 시장 1
                       ├─ Depth    → 사용자 3·4 + 시장 2
                       └─ Owner    → 사용자 1·5
                                    (Stage 02 발산 raw)
```

→ Pain 3축은 *Stage 01에 내포*, *Stage 02에서 발산*(매핑 backend), *Stage 03에서 검증*(수렴).

### 본질 질문 frame (Step이 답하는 자리)

| # | 본질 질문 | Step |
|---|---|---|
| ① | Pain이 진짜인가? | 3.1 Pain validation |
| ② | 누가 가장 강하게 느끼는가? | 3.2 Persona |
| ③ | 어떤 풍경 안에 들어가나? gap 있나? 어떤 톤으로? | **3.3 Positioning Map · 3.4 Competitor Landscape Table · 3.5 Feature Matrix · 3.6 우회 4유형** (4 sub-step) |
| ④ | 사업화 가능한가? | 3.7 BMC 1차 |
| ⑤ | 진행할 가치 있는가? | 3.8 cross-examine + 판정 |

### 경계·원칙

- **Stage 02 경계**: 02 = 발산 raw / 03 = 수렴·판정. *raw 박는 작업 X* → Stage 02 회귀 시그널.
- **Stage 04 경계**: 03 = Pain·Owner·자리 확정 / 04 = 솔루션 발산. ***솔루션 안 박는 작업 X***.
- **raw 근거 강제**: Pain·Persona·gap·BMC 모두 *Stage 02 raw 인용·근거 명시*. **추측·상상 X** (직전 cycle 상상 함정 lesson).

### Step

#### 3.1 — Pain validation [본질 질문 ①]
- **흐름**: Stage 01 5 Whys·근본 원인 → Stage 02 Pain 3축 매핑 발산 → **Stage 03 발산 raw 위 Pain 3축 검증** (수렴)
- **Input**: Stage 02 사용자 마주침 3·4·5 + 시장 1·2번 raw (Pain 3축 매핑 backend 정합 — Reality→사용자3·시장1 / Depth→사용자3·4·시장2 / Owner→사용자1·5)
- **행위**: Pain 3축(Reality·Depth·Owner) 검증 → Pain 한 문장 좁힘. raw 인용 강제. 추측·1회성 제거.
- **출력**: 검증 Pain 한 문장 → 3.2 Persona의 input (Owner narrow base)

#### 3.2 — Persona 작성 [본질 질문 ②]
- **Input**: Stage 02 사용자 마주침 1·5번 + 3.1 검증 Pain
- Owner 1명 구체화. 시장 세그먼트 안 1명. **raw 위 실 인물 속성만 — 상상 X**.
- **BMC Customer Segments 첫 박음**.
- 시각화: Persona profile card + Empathy Map 4분면 (Says·Thinks·Does·Feels)
- L2 (md): markdown 표·ASCII 4분면 / L1 (Dashboard): 정제 HTML 카드

#### 3.3 — Positioning Map [본질 질문 ③-a]
- **Input**: Stage 02 시장 마주침 2·3·6번 + 사용자 3번 (우회 행동)
- **책 form 출처**: 『프로덕트 기획』 2장 p56 (시장의 성장 방향성을 보는 포지셔닝 맵)
- **MEMORY 정합**: `positioning-matrix-principles` (축·통제·5 layer·강조 절제·SSOT)

##### 3.3 sub-step (4 step + CEO 게이트 2개)

| Step | 작업 | Layer | 게이트 |
|---|---|---|---|
| **3.3.A** | *비교 기준 통제* 박음 — 어느 카테고리 비교? (디지털 앱 / 물리 도구 / 우회 행동) + *축 후보 박음* — 보편 index 4~6개에서 X·Y축 후보 박음 (정의·raw 근거·4사분면 의미·차별점 드러남 정도 명시) | L1 대화 | — |
| **3.3.B** | **CEO 축 lock-in 게이트** — 객관식 박음. *중요도(어느 차원이 사용자 의사결정에 가장 결정적인가)는 서비스마다 다름* → CEO가 박음. | L1 대화 | ✓ CEO 컨펌 |
| **3.3.C** | 포지셔닝 맵 박음 — lock-in 축으로 dot 배치 + 시각 분류 5 layer (색=카테고리·크기=시장 강도·suffix=[국가·규모]·면적 음영=후보 자리·범례) | L2 + L1 | — |
| **3.3.D** | **CEO 매트릭스 검토 게이트** — dot 위치·축·시각 분류 정정 받음 또는 lock-in | L1 대화 | ✓ CEO 컨펌 |

##### 보편 index default 후보 (사용자 의사결정 차원, 카테고리 무관)
*어느 서비스에도 적용 가능. 서비스마다 중요도 다름 → 3.3.A에서 후보 박고 3.3.B에서 CEO lock-in*.
- 사용 빈도 (저 ↔ 고) · 세션 깊이 (가벼움 ↔ 몰입) · 개인화 정도 (표준 ↔ 1:1 맞춤) · 콘텐츠 깊이 (단순 도구 ↔ 풍부 콘텐츠) · 자율성 (가이드 ↔ 자기 주도) · 사회성 (개인 ↔ 소셜) · 가격 모델 (무료 ↔ 유료/구독) · 제품 범위 (단일 목적 ↔ 멀티 목적/all-in-one) · 목적성 (도구 ↔ 경험) · 연속성 (단발 ↔ 지속 흐름) · 언어·문화 정합

##### 산출
- ① Positioning Map (2축 × 4사분면, 시각 5 layer)
- **출력 → 3.4 Landscape Table input** (포지셔닝 인접 경쟁자 풍경 자료 필요)

#### 3.4 — Competitor Landscape Table [본질 질문 ③-b]
- **Input**: 3.3 포지셔닝 dot 박힌 경쟁자 list + Stage 02 시장 마주침 2·3·6번
- **frame**: atelier 보완 (책 form 외) — 질적 풍경 정보 박음
- **표 열**: 경쟁자 · 강점 · 약점 · 타깃 · 기능 · **BM·가격 (필수)** · 차별점
- **포괄적 경쟁자 정의** — 경쟁 제품 없으면 *사용자 우회 행동*이 경쟁자 (포괄 행 박음)
- **출력 → 3.5 Feature Matrix input** (핵심 경쟁자 3~5 선정 근거)
- 시각화: markdown 표 (L2) / HTML 표 (L1)

#### 3.5 — Feature Matrix [본질 질문 ③-c]
- **Input**: 3.3 포지셔닝 + 3.4 풍경 표에서 *3~5 핵심 경쟁자* 선정
- **책 form 출처**: 『프로덕트 기획』 2장 p57 (경쟁 분석 competitive analysis · 피처 ●○ 매트릭스)
- **행** = 피처 (사용자 의사결정 차원 + 잠재 차별 피처) · **열** = 경쟁자 3~5개
- **셀 시각**: 청록 ● 완전 · 황 ● 부분 · 흐림 ● 미지원 (크기 통일, 가운데 정렬, 색상 구분)
- **노란 배경 행** = *모든 경쟁자 흐림(미지원)인 피처* = **gap 피처 확정** (시장 빈 자리)
- **정직성 강제** — *self-fulfilling 방지*: 경쟁자 강점 피처도 박음. gap 부각 위한 cherry-picking X.
- **출력 → 3.6 우회 4유형 input · 3.7 BMC Value Propositions input**

#### 3.6 — 우회 행동 4유형 진단 [본질 질문 ③-d]
- **frame**: atelier 자체 frame (책 form 없음). Stage 02 사용자 우회 raw 정합.
- **목적**: 사용자가 *Pain을 현재 어떻게 우회*하고 있는지 4유형 분류 → *솔루션 톤(얼마나 급진/점진)* 결정 근거.
- **왜 필요**: 사용자가 *이미 우회 중*이면 점진 박는 게 학습 비용 적음. *우회 없으면* 새 카테고리 박아야 (채택 부담 큼). *우회 완전 무* = Kill 신호 (Pain 진짜 아니거나 사용자 의지 없음).
- **Input**: 3.5 gap 피처 + Stage 02 사용자 3번 (우회 행동 raw)

##### 4유형 정의 + 솔루션 톤

| 유형 | 정의 (사용자 상태) | 솔루션 톤 |
|---|---|---|
| ① **직접** | 기존 흐름 그대로 + 도구·환경만 바꿈 | *점진* — 기존 흐름 + 가벼운 디지털 보조 |
| ② **인접** | 다른 영역(명상·sleep·운동) mechanic 가져와 적용 | *영역 이식* — 다른 영역 mechanic 박음 |
| ③ **무관심** | 새 카테고리 자체 발명 | *부분 적용* — 새 카테고리 채택 부담 큼 |
| ④ **완전 무** | 우회 자체 없음 | **Kill 신호** — 시장 진입 가치 X |

- **출력 → 3.7 BMC Value Propositions input · Stage 04 Ideation 솔루션 발산 톤 input**

#### 3.7 — BMC 1차 박음 (가설) [본질 질문 ④]
- **Input**: 3.1·3.2·3.3·3.4·3.5·3.6 + Stage 02 시장 6번 (비즈니스 모델·가격)
- *decisions.md BMC 횡단 산출물 원칙 정합*. Stage 02 raw로 박힐 수 있는 4 블록:
  - **Customer Segments** (3.2 Persona)
  - **Value Propositions** (Pain → 가치 가설, *3.5 gap 피처 + 솔루션 톤* 정합)
  - **Channels** (시장 raw 위 — 앱스토어·웹사이트·인스타 등)
  - **Revenue Streams** (시장 가격 raw 위 후보 — freemium·구독·일회성·광고)
- 나머지 5 블록 → Stage 05
- 시각화: BMC 표준 9 블록 canvas
- L2: ASCII canvas + 블록 본문 / L1: 정제 HTML 9 블록 grid

#### 3.8 — cross-examine + Pass/Hold/Kill 판정 [본질 질문 ⑤]
- **Input**: 3.1~3.7
- Agent 자유 사고로 약점·맹점·반증 짚기 → CEO 답 → 판정.
- **판정 기준** (charter §3.2·§5.1):
  - **Pass** — Pain 3축 충족 + Owner narrow + gap + 솔루션 톤 + BMC 1차
  - **Hold** — Pain 3축 일부 미충족 → Stage 02 회귀 (raw 보강)
  - **Kill** — Pain Reality 흔적 0 / 우회 행동 완전 무

### Planning Phase (Skill 본문 anchor)

| Phase | 작업 | Layer |
|---|---|---|
| **1** | Read Stage 02 raw → Agent backend 1차 분석 → draft commit | L2 |
| **2** | CEO 섹션별 게이트 (3.1·3.2·3.3·3.4·3.5) | L1 대화 |
| **3** | cross-examine (약점·맹점·반증) | L1 대화 |
| **4** | Pass/Hold/Kill 판정 | L1 대화 |
| **5** | **Dashboard render** (Project 03 card + Process & Policy s3 갱신) | **L1 시각화 (의무)** |
| **6** | `_meta`·`funnel` 갱신 | L2 |

### 산출

- **L2 (agent 자료)** `03-analysis.md` — 검증 Pain · Persona · 포지셔닝·경쟁사 · 우회 진단 · BMC 1차 · 판정 (raw 인용 근거 명시)
- **L1 (CEO 시각화) Dashboard 갱신 의무**:
  - sidebar dot (03 in-progress→done)
  - Process & Policy s3 정합
  - **Project 03 card 본질 박음** — *통합 트리 포맷 (`.o-tree`)* default. 시각화 form (Persona·BMC·포지셔닝·경쟁사 표)은 별도.
- **Stage 09 chapter 정합** — 외부 청중 (Foundry CTO·개발 fleet) 이해 가능 형식. handoff 자동 취합 input.

⚠ 본격 구축은 Stage 02 cycle 완료 후 (Phased Build-and-Test).

---

## Stage 04 — Ideation (발산) — 잠정 박음

**목적**: 검증된 Pain → 솔루션 안 발산.

### Step (잠정)

#### 4.1 — HMW (How Might We)
Pain 한 문장 → "어떻게 하면 ~할 수 있을까?" 3~5개.

#### 4.2 — 크레이지 8 (Crazy 8s)
8분에 8개 아이디어 빠르게 발산. 형식 자유.

#### 4.3 — 수익 메커니즘 후보 함께 발산
*비즈니스 모델·가격 메타 원칙 정합* — 솔루션 발산과 함께 *수익 메커니즘 후보*도 발산 (구독·일회성·광고·프리미엄·B2B·번들 등).

#### 4.4 — 다른 발산 도구 (선택)
SCAMPER · 인접 영역 transfer 등 도메인 동적.

산출: `04-ideation.md` 발산 raw.
⚠ 본격 구축은 Stage 03 cycle 완료 후.

---

## Stage 05 — Prioritization (수렴 + 판정 2 + 완료) — 잠정 박음

**목적**: Wedge 후보 1개 수렴. 솔루션 방향 + As is-To Be 완료.

### Step (잠정)

#### 5.1 — 2x2 매트릭스
2축 선정. 도메인 동적 후보: 임팩트 × 실현 / 비용 × Moat / **시장 진입 비용 × 수익 가능성** / LTV × CAC 가설 등. *비즈니스 메타 원칙 정합 — 수익 관련 축 후보 필수 검토*. Wedge 후보 매핑.

#### 5.2 — 솔루션 방향 + 방향성 한 줄
"<누구>의 <상황>에서 <행동>을 <어떻게> 바꾼다" 형식. 이후 단계 *북극성*.

#### 5.3 — BMC 9 블록 완성 + As is-To Be
*decisions.md BMC 횡단 산출물 원칙 정합*. Stage 03에서 박힌 1차 4 블록 + 나머지 5 블록:
- **Customer Relationships** — 어떤 관계 (셀프 서비스·커뮤니티·구독 멤버십 등)
- **Key Resources** — 무엇이 필요 (콘텐츠·기술·브랜드·데이터)
- **Key Activities** — 무엇을 하는가 (개발·마케팅·콘텐츠 큐레이션·운영)
- **Key Partnerships** — 누구와 협력 (교구·도서 출판·플랫폼)
- **Cost Structure** — 비용 구조 (개발·인프라·마케팅·인건비)

**As is-To Be 표** — 현재 상태 vs 목표 상태. **수익 모델 변화 포함** (현재 시장 가격·과금 vs 우리 가격·과금). BMC 완성과 함께 *Foundry handoff 입력 핵심*.

#### 5.4 — Pass/Hold/Kill 판정 2차
Hold → 04 Ideation 회귀. Kill → funnel.

산출: `05-prioritization.md` (방향성 + As is-To Be + 판정).
⚠ 본격 구축은 Stage 04 cycle 완료 후.

---

## Stage 06~09 (미구축)

각 stage 잠정 구조는 `workflows/type1-external-service.html` 참고.
시스템은 *그 stage 시점에 구체화*. Phased Build-and-Test.

---

## 산출물 폴더 구조 — idea/<slug>/

```
_meta.md                  ← 현재 stage·판정·상태 (Dashboard 입력)
01-intake.md              ← Pain raw + 5축
02-research.md
03-analysis.md
04-ideation.md
05-prioritization.md
06-service-planning.md
07-prototype/             ← HTML 폴더 (유일하게 폴더)
08-validation.md
09-handoff.md             ← PRD 박제 + 자동 취합 인덱스
```

stage = 한 파일 원칙. 07-prototype/만 폴더 (HTML 다수 파일).

---

## 거부 패턴 (charter §13)

- ❌ md 파일 직접 작성 CEO에게 요청. Agent 작성.
- ❌ 시간 강제 묵힘. 시간 게이트 X.
- ❌ FM 책 흡수. 책은 `Reference/` Agent 자율 참고.
- ❌ 도구 list 미리 고정. 프로젝트별 동적 권장.
- ❌ 메뉴 식 응답. 입장 던지기.
- ❌ "불편함이 뭐에요?" 직설 prompt. *구체 순간 묻기* default.
- ❌ Stage n+1 미리 진입. Phased Build-and-Test.

---

## 진화 계획 (v0.3 → v0.x)

- **v0.3 (현재)** — Stage 02 Research 1차 구축 (발산 only) + Stage 03·04·05 잠정 박음
- v0.3.1 — mobile-rosary cycle 검증 결과 반영 (Stage 02 정정)
- v0.4 — Stage 03 Analysis 본격 구축 (mobile-rosary cycle 진행하며)
- v0.5 — Stage 04 Ideation 본격 구축
- v0.6 — Stage 05 Prioritization 본격 구축
- v0.7 ~ v0.9 — Stage 06~09 순차 구축
- charter v0.3 박힘 후 reference 갱신

charter §16 미해결 — Phased Build-and-Test로 진화.
