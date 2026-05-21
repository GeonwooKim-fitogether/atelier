# Atelier Charter v0.2

> *부트스트래핑 마지막 단계에서 작성됨. 이 문서는 Atelier의 헌법이다.*
>
> 작성 시점: 2026-05-21
> Status: **v0.2 frozen**. v1 frozen은 §16 미해결 잔여 해소 + 사용자 ACCEPT 후.

---

## 0. 이 문서가 존재하는 이유 *(확정)*

Atelier는 *공방*이고, 한 명의 장인이 *프로토타입까지* 만드는 곳이다. Foundry는 *공장*이고, 시장 배포용 MVP를 양산한다. 이 둘이 짝을 이뤄야 1인 비전공자 CEO가 회사를 운영할 수 있다.

이 charter는 *원칙*만 박는다. 실제 NPI workflow는 `atelier-npi` Skill로 외부화된다 — CEO가 매번 문서를 기억해서 진행하지 않는다.

---

## 1. 정체성 *(확정)*

### 1.1 메타포

**Atelier = 공방**. 한 명의 장인이 수작업으로 *프로토타입까지* 만드는 곳.
**Foundry = Factory = 공장**. 프로토타입을 받아 *MVP로 양산화*하는 곳.

원형: Apple Cupertino (디자인 스튜디오) + Foxconn (제조 공장) 패턴.
사용자의 LG 기구개발 출신 정체성과 정합: *시제품 → 양산화의 인계점*이 정확히 atelier-factory 분리.

### 1.2 역할 분담

```
Atelier (Step A)                  Foundry / Factory (Step B)
─────────────                    ─────────────────────────
상품기획 ↔ 프로토타입 제작        개발 ↔ 검증 ↔ 배포 (MVP 제작)
1인 + 도구 몇 개                  여러 agent fleet + 자동화
깊은 대화, 작은 시간,             자율 실행, 큰 시간,
큰 집중                           작은 집중
평일 저녁 / 주말                  업무 시간 (CEO 부재 시에도)
동기적                            비동기적
대화 + HTML 프로토가 결과물       실 코드 + 배포가 결과물
```

### 1.3 두 시스템 사이의 인계점 *(확정)*

Handshake = **PRD 패키지**. 구성:
- `PRD.md` (글자 — 방향성·As is/To be·유저 스토리·Acceptance Criteria·Moat&Wall·Kill Signal)
- `mockups/` (정적 시각 — 와이어·디자인 stills)
- `prototype/` (HTML 클릭 가능 사용 시뮬레이션)

이 패키지는 §5 Stage 2에서 확정. 첫 실작업에서 형식 정밀화 진화 (§16).

---

## 2. Atelier의 사용자 *(확정)*

- **이름**: 김건우 (Director / CEO / 공방장 / Factory Owner)
- **배경**: LG전자 기구 개발 출신. 산업공학 비전공.
- **상황**: 회사 다님. 업무 시간엔 개발 못함. 평일 저녁 / 주말 작업.
- **목표**: 필드 통증 발견 → 사업화 → *실제로 돈을 벌어주는 제품*.
- **운영 원칙**: User = 판단 / AI = 조작. *Minimal first → Kaizen 진화*.
- **위험 패턴**: 과거 7-agent over-engineering 경험. 재발 방지 박혀 있음.

---

## 3. 핵심 미션 *(확정)*

### 3.1 새 패러다임

**AI 시대 상품기획 = Pain Point가 진짜면 *그걸 비즈니스로 develop하는 것* 이 상품기획의 역할.**

옛 패러다임 (*"지금 할 수 있어 없어"*)으로 가지 않는다. *지금 자원 부족*은 kill 사유가 **아님**.

### 3.2 Kill의 정의

Kill = *통증이 가짜일 때만*. *시간/자원 부족*은 Hold 사유지 Kill 사유가 아니다.

### 3.3 AI 시대 속도 원칙 *(신설 v0.2)*

리소스(돈, 시간, 인력)가 0에 수렴해가는 시대에는 **한번에 잘하는 것 < 실행 검증을 빨리 하는 것**. 항상 후자가 유리.

Atelier는 이 패러다임 위에서 작동한다:
- 의사결정 잉여(cooling·묵힘·유예 기간)를 *시간 강제로* 박지 않음. *정성적 충동을 정량 시간으로 막는 건 불일치*.
- 의심스러우면 *묵히지 말고 다음 단계로 보내라*. 잘못된 진입은 실행이 빠르게 kill한다.
- "한번에 잘 만들기" 전통 PM 패턴 = 옛 패러다임. **거부**.

---

## 4. 작업 모드 *(확정)*

### 4.1 시간 분배

- **평일 저녁 / 주말** = Atelier 모드. CEO 깨어있을 때만 진행.
- **업무 시간** = Foundry 모드 (agent 자율 실행). Atelier는 idle.

### 4.2 동기/비동기

- Atelier = **100% 동기적 대화**. CEO 부재 시 작업 진행 0.
- *대화 + HTML 프로토 = 결과물*. 글자 PRD는 부산물.

### 4.3 묵힘 룰 — *제거 v0.2*

시간 강제 묵힘 룰 *모두 제거*. (이전 v0.1 § 4.3의 24h 묵힘 두 항목 폐기.) 근거: §3.3 AI 시대 속도 원칙 — 정성을 정량 시간으로 막지 않음. 충동 방지는 *실행/방법론이 자연 필터*로 작동.

---

## 5. 핵심 프로세스 — Stage 1/2 *(원칙)*

> **실제 진행은 `atelier-npi` Skill로 외부화**. CEO는 `/atelier-npi` 한 줄 호출 + 질문 답변·확인만. 매번 문서 기억하지 않는다.

### 5.1 Stage 1 — Ideation (가벼움)

**목적**: 상세 상품기획(=Stage 2)을 진행할지 여부 판정.

**작성 권한**: **CEO 작성** + Agent 리뷰.

**흐름**:
1. CEO 초안 작성 (Pain 3축 — Reality / Depth / Owner)
2. Agent의 **구조·논리·본질** cross-examine + 외부 흔적 자동 수집 보조
3. CEO 재리뷰 → **Pass / Hold / Kill** 판정

**Pain 3축**:
- **Pain Reality**: 진짜 사람의 진짜 행동에 흔적이 있는가? (검색량·카페 글·우회 행동·불평·포기 패턴) 흔적 0 = 상상의 통증.
- **Pain Depth**: 얼마나 자주 / 얼마나 아프게? (매일 vs 가끔 / 짜증 vs 차질 / 시간·감정·돈 손실)
- **Pain Owner**: 누가 가장 강하게 느끼는가? *1명을 머릿속에 그릴 수 있을 만큼* 좁혀야 진짜.

**Kill 안전장치**: *"내가 이 niche의 흔적을 진짜로 찾아봤나, 아니면 모른다는 이유로 단정했나?"*

Pass → Stage 2 즉시 진입 (시간 유예 없음 — §3.3).

### 5.2 Stage 2 — PRD 확정 (무거움)

**목적**: MVP 1사이클을 돌릴 수 있을 만큼 명확한 PRD 패키지 freeze.

**작성 권한**: **Agent 작성** + CEO 확인·논의.

**흐름**:
1. Agent가 이번 프로젝트 도구 권장 → CEO confirm
2. 데이터 모델링 (어피니티 등) — 인사이트 정리
3. Mockup 생성 (와이어 + 디자인 stills)
4. **HTML Prototype 생성** ⭐ — 디테일 살리는 핵심
5. PRD.md draft 작성
6. CEO 프로토 직접 사용 + 논의 → PRD 디테일 보완 (반복)
7. **양쪽 OK** (프로토 사용 시 이상한 흐름·디테일 누락 없음 + PRD.md 디테일 완비) → freeze

**Freeze 조건**:
- HTML 프로토를 직접 사용해도 이상한 흐름·디테일 누락 없음
- PRD.md가 그 모든 디테일을 글자로 담고 있음

이 조건이 *Foundry CEO 개입 최소화*의 전제. 사용자 dashboard 경험에서 학습 — *프로토가 명확하지 않으면 개발도 결국 이상하게 된다*.

**PRD 패키지 구성** (잠정, 첫 실작업에서 검증):

```
stage-2/<idea>/
  PRD.md                  (글자)
    - 방향성 한 문장: "사용자[퍼소나]가 [맥락]에서 [통증]을 겪기에 [기능]이 필요"
    - As is / To be 표
    - 피처별 유저 스토리 (AS / I WANT / SO THAT) + Acceptance Criteria 핵심 (Given/When/Then)
    - Moat & Wall (시간 양면 검증)
    - Kill Signal (정량 1개)
  mockups/                (정적 시각)
    01-wireframe-*.png
    02-design-*.png
  prototype/              (HTML 인터랙티브)
    index.html, style.css, script.js
    (or v0/Lovable 등 외부 도구 링크 + 코드)
```

### 5.3 용어 정의 (프로젝트 표준)

| 용어 | 본질 | 코드 | 청중 | 자리 |
|---|---|---|---|---|
| **Mockup** | 정적 시각 디자인 | 없음 | CEO 자기 검토 | Stage 2 |
| **Prototype** | HTML 클릭 가능 사용 시뮬레이션 | HTML/CSS/JS 프론트만 (백엔드·DB·인증·결제 없음) | CEO + 소수 테스터 | Stage 2 |
| **MVP** | 진짜 작동 제품 | 백엔드+DB+인증+배포 | 실 시장 사용자 | Foundry |

경계 = **시장 노출 여부**. 노출 전 = Atelier. 노출 = Foundry.

---

## 6. Flywheel 흐름 *(확정 v0.2)*

```
[새 idea 떠오름]
  ↓
[idea-inbox.md 1줄 메모]
  ↓
[CEO 수동 트리거]
  ↓
[/atelier-npi 호출]
  ↓
[Stage 1 Ideation: CEO 초안 → Agent cross-examine → CEO 재리뷰]
  ↓
[Pass / Hold / Kill]
  ↓ Pass
[Stage 2 PRD 확정: Agent 도구 활용 작성 → CEO 확인·논의·프로토 사용 → freeze]
  ↓
[PRD 패키지 (PRD.md + mockups/ + prototype/) freeze]
  ↓
[새 Foundry repo 생성 (Template 1클릭)]
  ↓
[PRD 패키지 인계 (foundry/<project>/01-product/ 복사)]
  ↓
[Foundry 개발 사이클 — 실 코드 MVP 제작 (Foundry 영역)]
  ↓
[MVP 시장 배포 → 실제 통증 검증]
  ↓
[프로젝트 진행 (사업화) 또는 Hold·Kill]
  ↓ 종료 후
[Flywheel 1회전 완료 → Atelier + Foundry seed 개선]
```

---

## 7. Atelier 내부 구조 — 최소만 *(확정 v0.2)*

```
atelier/                          ← 별도 GitHub repo (private)
├── charter.md                    ← 이 문서
├── README.md                     ← 사용법 한 화면
├── idea-inbox.md                 ← 떠오를 때 1줄 메모 (수동)
├── idea-funnel.md                ← 누적 history (Kill/Hold/Pass + freeze 기록)
├── decisions.md                  ← Atelier 운영 결정 박제 (charter 변경 외)
├── lessons-learned.md            ← cycle 종료 후 정제된 교훈
├── stage-1/                      ← Stage 1 산출물 (per idea, Skill이 자동 생성)
├── stage-2/                      ← Stage 2 PRD 패키지 (per passed idea, Skill이 자동 생성)
├── workflows/                    ← workflow 시각화 산출물 (type1·type2 등 HTML)
├── Reference/                    ← 책 PDF 등 외부 자료 (agent 자율 참고)
└── .claude/
    └── skills/
        └── atelier-npi/
            └── SKILL.md          ← Stage 1/2 자동 진행 Skill
```

폴더 평면화 — *애매한 meta/ 카테고리 없음*. 모든 파일이 루트에서 즉시 보임. 일원화 원칙.

추정으로 폴더 미리 만들지 않음. 운영하면서 *필요한 게 발견되면 추가*.

---

## 8. CEO ↔ Atelier Agent 관계 *(확정)*

- **상품기획 Agent** = Atelier 안의 *유일한 agent*. CEO 직속.
- *기술 도메인 agent 아님* — Foundry 영역.
- 대화 모드만. 자율 실행 없음.
- CEO와 *깊은 대화*로 Stage 1/2 함께 진행.
- *Cross-examine* (구조·논리·본질 검증) 역할.
- 실제 작동은 `atelier-npi` Skill 안에서 호출됨.

---

## 9. Foundry와의 관계 *(부분 확정)*

### 9.1 Step 분리 *(확정)*

- Atelier = Step A (상품기획 ↔ 프로토타입 제작)
- Foundry = Step B (개발 ↔ 검증 ↔ 배포 = MVP 제작)
- 두 시스템이 *각자 자율*. 단 *handshake로만 연결*.

### 9.2 Handshake = PRD 패키지 *(잠정 확정 v0.2)*

§1.3에서 정의된 PRD 패키지가 handshake 산출물.
구체 형식 정밀화는 첫 실작업에서 발견 (§16).

### 9.3 시드 시스템 — 두 시스템의 *복제 모델 비대칭* *(확정)*

| | Atelier | Foundry |
|---|---|---|
| 복제 | **0** (영구 단일 repo) | **매번** (프로젝트마다 1개) |
| 누적 | 모든 프로젝트의 상품기획 산출물 통합 | 프로젝트별 자기 코드 + 자기 메타 |
| GitHub | `Atelier` (영구) | `foundry` Template repo → "Use this template" 1클릭 |
| 진화 | charter v0.x.y 점진 진화 | seed v0.x.y, 새 프로젝트는 복제 시점 freeze |

이유 — Atelier는 *공방장 1명의 경험 축적*이라 복제 = 매 프로젝트 새 머리 시작 = 어색. Foundry는 *방법론 + 도구*라 복제 = 자연스러움.

### 9.4 Sync 모델 *(확정)*

**Model A — Freeze at Clone**. 새 프로젝트는 복제 시점의 Foundry seed로 freeze. 진행 중 seed 변경 자동 반영 0. 프로젝트 종료 후 *Flywheel로 seed에 역반영* (§11).

### 9.5 새 프로젝트 시작 워크플로우 *(확정 v0.2, 순서 정정)*

```
1. Atelier에서 Stage 1 + Stage 2 진행 → PRD 패키지 freeze
2. GitHub.com → foundry repo → "Use this template" 1클릭
3. 새 repo 생성 (예: GeonwooKim-fitogether/13.next-project)
4. Local: cd C:\Users\rlaaj\Dev\ && git clone <new-repo>
5. PRD 패키지 복사: atelier/stage-2/<idea>/* → <new-repo>/01-product/
6. 새 프로젝트 안에서 Foundry 개발 사이클 시작
```

이전 v0.1.1 §9.5의 순서 ("Foundry repo 먼저 → Atelier 진행")는 *프로젝트 정체 모르는 상태에서 repo 생성*이라 부자연 → 정정.

### 9.6 idea-funnel 누적 검토 *(확정 v0.2)*

시간 강제 ("분기 1회") **제거**. 대신 *마일스톤 trigger*:
- 프로젝트 종료 시
- Flywheel 1회전 종료 시
- 외부 자문 분기 동시

---

## 10. 런타임 환경 *(확정)*

- **Local Claude Code (메인 컴퓨터)** = Atelier·Foundry 모두 주요 작업 환경
- **`atelier/` repo (private GitHub)** = 산출물 영구 저장 + 백업
- 작업 흐름: 세션 시작 → `cd atelier` → `/atelier-npi` 호출 → Skill 대화 → 산출물 git commit/push
- charter / idea-funnel 등 문서는 *파일로 컨텍스트에 자동 진입* — sync 마찰 0
- Repo가 *유일한 source of truth*

다른 컴퓨터 접근:
- GitHub Web (또는 mobile) → 문서 *읽기* + 가벼운 텍스트 편집 (1줄 메모, 오타 수정) 가능
- 본격 대화/작업은 *메인 컴퓨터에서만*

향후 검토 (§16):
- claude.ai/code (Claude Code의 web 버전) capability가 *Local과 동등*해지면 부분 도입 검토

---

## 11. Flywheel 원칙 *(확정)*

### 11.1 부트스트래핑 종료

- *현재* = 부트스트래핑 내부.
- *v1 완성 시점* = 부트스트래핑 종료. Atelier + Foundry 모두 v1.
- *이후* = 진짜 사업 프로젝트 진입.

### 11.2 변경 크기 룰

- **상한 미리 박지 않음.** 변경 크기는 *문제 크기에 비례*.
- 1회전 = *큼 허용*. 시행착오 중 *철학*도 바뀔 수 있음.
- N회전 = *decay 곡선이 자연 관찰됨* (룰 아님).

### 11.3 경고 신호 *(발견 예정)*

- 작은 문제에 큰 변경 = *self-tuning에 빠짐*. 점검 필요.
- 큰 문제에 작은 변경 = *발견을 외면*. 점검 필요.
- 측정 방식은 첫 회전 직후 발견 (§16).

---

## 12. CEO-CTO-Atelier Architecture *(확정)*

| Role | 자리 | 도메인 | 모드 |
|---|---|---|---|
| **CEO** | 사용자 본인 | 비즈니스, 사용자, 방향성, 리소스, HCP | 동기/비동기 |
| **상품기획 Agent** | Atelier (`atelier-npi` Skill 내부) | 상품기획 cross-examine, Pain Validation, PRD 작성 | 동기 (대화) |
| **CTO Agent** | Foundry | 기술 트레이드오프, 구현 선택, 품질 게이트, HCP 번역 | 비동기 |
| **개발 Agent fleet** | Foundry | 코드/test/문서 자율 실행 | 비동기 |
| **Dashboard** | Foundry oversight | 전체 fleet + 시간축 가시화 | 비동기 |

HCP 진짜 정의: *"CEO 도메인 vs CTO 도메인"*.

---

## 13. 거부 목록 (Anti-patterns) *(확정 v0.2)*

다음은 *Atelier 내부에서 금지*:

1. **GPT를 시스템 안에 통합.** 외부 자문만 허용 — 분기 0~2회, 3 질문 템플릿.
2. **추정으로 agent fleet 만들기.** 7-agent 사례 재발 금지. *replacement only*.
3. **Over-engineering.** 도구 list를 charter에 박지 않음. Skill 안 agent가 동적 선택.
4. **자기참조 self-test에 매몰.** 외부 가치 (실 프로젝트 도움) 가 진짜 검증.
5. **Director를 operator로 만드는 모든 요청.** 파일 확인 / 로그 검증 / 테스트 수동 확인 = 금지.
6. **Premature optimization.** 측정 layer / 지표를 *큰 그림 확정 전에* 깎지 않음.
7. **Frame 표준화로 사고 깊이 회피.** 옵션 A/B/C 메뉴 패턴 반복 = frame이 답 대신함. 깊이 토론으로 전환.
8. **시간 강제 묵힘**. 정성을 정량 시간으로 막지 않음 (§3.3).
9. **FM(조직 PM Field Manual) 흡수**. 책은 *agent가 자율 참고*하는 reference. charter에 list로 옮기지 않음.

---

## 14. 외부 자문 — GPT *(확정)*

### 14.1 위치

- 시스템 *밖*. 통합 0.
- 마일스톤 또는 프로젝트 종료 시 *분기 0~2회* ChatGPT 앱 직접 열어 묻고 닫음.

### 14.2 3 질문 템플릿

1. **[Critique]** 이 프로젝트 결정들 중 *너무 매끄러워 보이는* 결정이 있나?
2. **[Stress-test]** 깔고 있던 *암묵적 가정* 중에 검증 안 된 것이 있나?
3. **[Reframe]** 이 프로젝트가 푼 문제를 *완전히 다른 관점*에서 봤다면, 더 작은 / 다른 / 안 푸는 게 나았을 가능성이 있나?

### 14.3 처리 *(확정 v0.2)*

GPT 답 → *시간 강제 묵힘 없음* (§4.3 제거) → 사용자 판단 → 채택할 lesson만 `meta/lessons-learned.md` 갱신.

---

## 15. 다른 시스템과의 관계 *(확정)*

| 시스템 | 관계 |
|---|---|
| **Foundry (Step B)** | Handshake = PRD 패키지 (§1.3). 두 시스템은 각자 자율. |
| **외부 자문 GPT** | 분기 0~2회 cross-examine만. 시스템 통합 0. |
| **12.subscription-payment-saas** | 부트스트래핑 *마지막 실습*. 데이터 소스로 활용. |
| **Claude.ai (chat)** | 시스템 *밖*. 외부 자문 후보로만 (현재 default 미사용). |
| **`Reference/` 책 PDF** | Atelier 안 자료. Skill 내부 agent가 *필요 시 자율 참고*. charter에 list 흡수 안 함. |

---

## 16. 미해결 사항 — 첫 실작업 또는 v1 freeze 직전에 발견 *(갱신 v0.2)*

- `atelier-npi` Skill 세부 workflow (도구 활용 순서·prompt 정확 문구) → 첫 실작업에서 진화
- Foundry handshake (PRD 패키지) 구체 형식 정밀화 → 첫 실작업
- Flywheel 1회전 후 변경 크기 측정 방식 → 1회전 후
- claude.ai/code capability 검증 → 필요해질 때
- **Foundry charter v0.1 작성** — Atelier charter와 동일 패턴
- **Foundry rename + relocation + Template 표시** — 12 cycle 종료 후. 상세는 `~/.claude/plans/future-foundry-relocation.md`

---

## 17. v1 freeze 조건 *(제안)*

- §16 미해결 사항 중 *프로세스 진입에 필수인 것*만 확정
- 나머지는 *발견 예정*으로 v1에 *명시*된 채로 freeze
- 사용자가 *공식 ACCEPT* 메시지로 freeze 선언
- freeze 후 → Foundry charter도 같은 패턴으로 freeze → 첫 사업 프로젝트 진입

---

## 18. 이 문서의 *반대* — Atelier가 *아닌* 것 *(확정)*

- ❌ Atelier ≠ 개발 환경. *코드 안 씀*. (HTML 프로토는 *agent가 작성*, CEO가 코드 직접 만지지 않음.)
- ❌ Atelier ≠ project management tool. *작업 트래커 아님*.
- ❌ Atelier ≠ 외부 platform. *당신 1인용 도구*. 다른 사람에게 안 팜.
- ❌ Atelier ≠ Foundry 안의 폴더. *별도 시스템*.
- ❌ Atelier ≠ 자동화. *대화 자체가 본질*. 자동화하면 사라짐. (`atelier-npi` Skill은 *대화의 절차 자동화*이지 *대화의 자동화*가 아님.)

---

*— Atelier Charter v0.2 끝 —*

> 변경 history는 `git log charter.md`로 본다. 이 문서에 중복 박지 않음 (일원화).
