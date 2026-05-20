# Atelier Charter v0.1 (draft)

> *부트스트래핑 마지막 단계에서 작성됨. 이 문서는 Atelier가 자기 자신을 갖기 전에, Atelier의 정체성을 선언하는 자료다.*
>
> 작성 시점: 2026-05-XX (사용자 확정 필요)
> Status: **v0.1 candidate**. v1 frozen은 사용자 검토 + 수정 + 박제 후.

---

## 0. 이 문서가 존재하는 이유 *(확정)*

Atelier는 지금 *아무것도 없다*. 폴더도, 도구도, agent도 없다.
이 문서는 Atelier의 *첫 산출물*이고, *Atelier가 어떻게 일하는 곳인지*를 박제하는 헌법이다.

Foundry는 *Factory*다. 이 둘이 짝을 이뤄야 1인 비전공자 CEO가 회사를 운영할 수 있다.
Atelier 없이 Factory만 있으면 *기획 없이 양산*하게 되고, 그 반대도 마찬가지다.

---

## 1. 정체성 *(확정)*

### 1.1 메타포

**Atelier = 공방**. 한 명의 장인이 수작업으로 시제품(prototype)까지 만드는 곳.
**Foundry = Factory = 공장**. 시제품을 받아 양산화하는 곳.

원형: Apple Cupertino (디자인 스튜디오) + Foxconn (제조 공장) 패턴.
사용자의 LG 기구개발 출신 정체성과 정합: *시제품 → 양산화의 인계점*이 정확히 atelier-factory 분리.

### 1.2 역할 분담

```
Atelier (Step A)              Foundry / Factory (Step B)
─────────────                ─────────────────────────
상품기획 ↔ MVP 제작           개발 ↔ 검증 ↔ 배포
1인 + 도구 몇 개              여러 agent fleet + 자동화
깊은 대화, 작은 시간,         자율 실행, 큰 시간,
큰 집중                       작은 집중
평일 저녁 / 주말             업무 시간 (CEO 부재 시에도)
동기적                        비동기적
대화 자체가 결과물            코드/문서가 결과물
```

### 1.3 두 시스템 사이의 인계점 *(확정)*

Handshake가 있다 — 그 사실만 명시.
**Handshake 산출물의 *구체 형식*은 첫 실작업에서 발견한다.** 미리 추정하지 않는다.

현재 가설(미확정): agent용 PRD + working MVP code prototype의 페어.

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

---

## 4. 작업 모드 *(확정)*

### 4.1 시간 분배

- **평일 저녁 / 주말** = Atelier 모드. CEO 깨어있을 때만 진행.
- **업무 시간** = Foundry 모드 (agent 자율 실행). Atelier는 idle.

### 4.2 동기/비동기

- Atelier = **100% 동기적 대화**. CEO 부재 시 작업 진행 0.
- *대화 자체가 결과물*. 코드/문서는 부산물.

### 4.3 묵힘 룰 *(확정)*

- Stage 2 후 → *24h 묵힘* → 박제. 즉시 박제 금지.
- 외부 자문(GPT cross-examine) 답 받은 후 → *24h 묵힘* → lesson 채택 결정.

---

## 5. 핵심 프로세스 — 2-Stage Funnel *(확정 — 두 번째 인수인계 자료 §5 base)*

### 5.1 Stage 1 — Pain Validation

- **빈도**: 월 N회, 10~15분
- **목적**: 통증이 진짜인가 확인. *Pass가 정상, Kill은 통증이 가짜일 때만*.

**3 질문**:

1. **[Pain Reality]** 이 통증이 *진짜 사람의 진짜 행동*에 흔적을 남기나? (검색량, 카페 글, 우회 행동, 불평/포기 패턴) → 흔적 0 = 상상의 통증. 흔적 有 = 진짜.
2. **[Pain Depth]** 얼마나 자주 / 얼마나 아프게? (매일/매주 vs 가끔 / 짜증 vs 차질 / 시간/감정/돈 손실) → 자주 + 아프게 = 강한 통증.
3. **[Pain Owner]** 누가 가장 강하게 느끼나? *1명을 머릿속에 그릴 수 있을 만큼* 좁혀야 진짜.

**Kill 직전 2초 자문 (안전장치)**:
> *"내가 이 niche의 흔적을 진짜로 찾아봤나, 아니면 모른다는 이유로 단정했나?"*

### 5.2 Stage 2 — Business Development

- **빈도**: 분기 1~2회, 1~2시간
- **목적**: 진짜 통증을 *비즈니스로 develop*. *너의 성장 궤적*까지 정의.

**5 질문**:

1. **[Pain → Promise]** 이 통증을 풀면 사용자가 어떤 미래를 얻나? 한 문장으로 비포→애프터.
2. **[Promise → Wedge]** 그 미래 중 가장 작고 날카로운 *첫 진입점*은? 풀고 싶은 거 다 풀지 말고 1개만.
3. **[Wedge → Growth Path]** Wedge 성공 시 그 다음 어디로 확장? 2~3 step 미래까지.
4. **[Moat & Wall]** Growth Path의 *시간 양면*. (a) **Moat** — 시간이 너의 편이 되는 *누적 자산*? (b) **Wall** — 시간이 가도 너가 통제 못하는 *외벽*? → 판정: Moat 누적 속도 > Wall 무게 → 진행. Wall > Moat → 질문 2(Wedge) 회귀 재설계.
5. **[Kill Signal]** 언제 폐기할 것인가의 *정량 신호 1개*. 시간/금액/사용자 반응 중 하나.

**회귀 노드**: 4번에서 Wall > Moat → 2번 wedge 재설계.

---

## 6. 흐름 *(부분 확정)*

```
[아이디어 떠오름]
  ↓
[idea-inbox.md에 1줄 메모]                              (확정)
  ↓
[트리거] (수동 + 외부 신호 N개 누적 시 정식 Stage 1)     (제안 — 사용자 확정 필요)
  ↓
[Stage 1: 3 질문] → Kill / Hold / Pass
  ↓
[Pass 시 1주 유예]                                       (제안 — 사용자 확정 필요)
  ↓
[유예 후 여전히 끌리면 Stage 2]
  ↓
[Stage 2: 5 질문]
  ↓
[24h 묵힘]                                               (확정)
  ↓
[NPI_Brief prose draft 생성]
  ↓
[Foundry 인계점]                                         (제안 — 24h 묵힘 후 박제 직전 폴더 생성)
  ↓
[agent용 PRD + working prototype → Foundry 진입]
```

미결정 4건 (두 번째 인수인계 §9 그대로 옮김, 사용자 확정 필요):
- §9-1 트리거 방식
- §9-2 Stage 1 → Stage 2 유예 기간
- §9-3 Foundry 입구 연결 시점
- §9-4 idea-funnel 누적 검토 방식

---

## 7. Atelier 내부 구조 — 최소만 *(제안)*

폴더 구조 후보 (Foundry의 4-Layer 같은 거 *안 박음*):

```
atelier/                          ← 별도 GitHub repo (private)
├── charter.md                    ← 이 문서
├── idea-inbox.md                 ← 떠오를 때 1줄 메모 (수동)
├── idea-funnel.md                ← 누적 history (Kill/Hold/Pass 기록)
├── stage-1/                      ← Stage 1 산출물 (per idea)
├── stage-2/                      ← Stage 2 산출물 (per passed idea)
├── briefs/                       ← 최종 NPI_Brief draft
└── meta/
    ├── decisions.md              ← Atelier 내부 결정 박제
    └── lessons-learned.md        ← cycle 종료 후 정제된 교훈
```

이 구조도 *최소만*. 운영하면서 *필요한 게 발견되면 추가*. 추정으로 폴더 미리 안 만듦.

---

## 8. CEO ↔ Atelier Agent 관계 *(확정)*

- **상품기획 Agent** = Atelier 안의 *유일한 agent*. CEO 직속.
- *기술 도메인 agent 아님* — Foundry 영역.
- 대화 모드만. 자율 실행 없음.
- CEO와 *깊은 대화*로 Stage 1/2 함께 진행.
- *Cross-examine* (반대 의견, 검증) 역할 명시.

---

## 9. Foundry와의 관계 *(부분 확정)*

### 9.1 Step 분리 *(확정)*

- Atelier = Step A (상품기획 ↔ MVP 제작)
- Foundry = Step B (개발 ↔ 검증 ↔ 배포)
- 두 시스템이 *각자 자율*. 단 *handshake로만 연결*.

### 9.2 Handshake *(발견 예정)*

- *Handshake가 있다는 사실*만 명시.
- *구체 형식*은 첫 실작업에서 발견.
- 가설 산출물: agent용 PRD + working MVP code prototype.
- 첫 실작업 = 부트스트래핑 종료 후 첫 사업 프로젝트.

### 9.3 시드 시스템 — 두 시스템의 *복제 모델 비대칭* *(확정)*

새 프로젝트가 시작될 때 두 시스템은 *근본적으로 다르게* 사용된다:

| | Atelier | Foundry |
|---|---|---|
| 복제 | **0** (영구 단일 repo) | **매번** (프로젝트마다 1개) |
| 누적 | *모든 프로젝트의 상품기획 산출물 통합* (idea-funnel / briefs / lessons) | 프로젝트별 *자기 코드 + 자기 메타* |
| GitHub | `Atelier` (영구) | `foundry` Template repo → "Use this template" 1클릭 |
| 진화 | charter v0.x.y 점진 진화 | seed v0.x.y, 새 프로젝트는 *복제 시점 freeze* |

이유 — *Atelier는 공방장 1명의 경험 축적*이라 복제 = 매 프로젝트 새 머리 시작 = 어색. *Foundry는 방법론 + 도구*라 복제 = 자연스러움.

### 9.4 Sync 모델 *(확정)*

**Model A — Freeze at Clone**. 새 프로젝트는 복제 시점의 Foundry seed로 freeze. 진행 중 seed 변경 자동 반영 0. 프로젝트 종료 후 *Flywheel로 seed에 역반영* (§11).

Live Sync 모델은 *Flywheel 원칙 위반* + *진행 중 프로젝트 흔들림 위험*으로 **금지**.

### 9.5 새 프로젝트 시작 워크플로우 *(부트스트래핑 종료 + Foundry v1 freeze + Template 표시 후)*

```
1. GitHub.com → foundry repo → "Use this template" 1클릭
2. 새 repo 생성 (예: GeonwooKim-fitogether/13.next-project)
3. Local: cd C:\Users\rlaaj\Dev\ && git clone <new-repo>
4. Atelier (Dev/atelier/) 에서 Stage 1+2 진행 → brief 생성
5. brief를 새 프로젝트로 인계 (구체 인계 형식 = handshake §9.2, 발견 예정)
6. 새 프로젝트 안에서 개발 시작
```

상세는 *Foundry charter*에서 박을 사항. 본 charter는 *Atelier 측 관계*만 명시.

---

## 10. 런타임 환경 *(확정)*

### 10.1 도구 일관성 — Claude Code 단일

**Atelier도 Foundry도 모두 Local Claude Code에서 작업**.
Claude.ai Project / Web 인터페이스 / 기타 plane은 *사용하지 않음* (현재 default).
이유: 도구 일관성 + 컨텍스트 매개 마찰 제거 + 익숙함.

### 10.2 Atelier 런타임

- **Local Claude Code (메인 컴퓨터)** = 주요 작업 환경
- **`atelier/` repo (private GitHub)** = 산출물 영구 저장 + 백업 + 다른 컴퓨터 fallback
- 작업 흐름: 세션 시작 → `cd atelier` → Local Claude Code 대화 → 산출물 git commit/push
- charter / idea-funnel 등 문서는 *파일로 컨텍스트에 자동 진입* — sync 마찰 0
- Repo가 *유일한 source of truth*

### 10.3 다른 컴퓨터 접근 — 제한적

- GitHub Web (또는 mobile) → 문서 *읽기* + 가벼운 텍스트 편집 (1줄 메모, 오타 수정) 가능
- 본격 대화/작업은 *메인 컴퓨터에서만*
- *Web only 강제 아님* — 다른 컴퓨터는 보조 접근만

### 10.4 Foundry 런타임

- 동일 — Local Claude Code (메인 컴퓨터)
- 향후: cloud sandbox (Vercel Sandbox / Codespaces 등) 전환 검토 — 부트스트래핑 종료 후

### 10.5 두 시스템의 차이는 *runtime이 아니라 mode*

| | Atelier | Foundry |
|---|---|---|
| Runtime | Local Claude Code | Local Claude Code |
| Repo | `atelier/` (private) | 별도 (12 / 다음 사업 프로젝트마다) |
| 작업 모드 | 동기 대화 (CEO 깨어있을 때) | 비동기 자율 실행 (CEO 부재 시에도) |
| 다른 컴퓨터 접근 | GitHub Web 읽기/소량 편집 | 동일 |

### 10.6 향후 검토 (발견 예정)

- claude.ai/code (Claude Code의 web 버전) capability가 *Local과 동등*해지면 부분 도입 검토
- 단 *현재 default = Local Claude Code 일관성*. Web only 강제 아님.

---

## 11. Flywheel 원칙 *(확정)*

### 11.1 부트스트래핑 종료

- *현재* = 부트스트래핑 내부 (12 cycle 진행 + Atelier charter v0.1 박제).
- *v1 완성 시점* = 부트스트래핑 종료. Atelier + Foundry 모두 v1.
- *이후* = 진짜 사업 프로젝트 진입. Atelier/Foundry는 *그 프로젝트를 떠받침*. 보완점만 meta에 기록.
- *프로젝트 종료 후* = Atelier + Foundry 개선 (Flywheel 1회전).

### 11.2 변경 크기 룰

- **상한 미리 박지 않음.** 변경 크기는 *문제 크기에 비례*.
- 1회전 = *큼 허용*. 시행착오 중 *철학*도 바뀔 수 있음.
- N회전 = *decay 곡선이 자연 관찰됨* (룰 아님).

### 11.3 경고 신호 *(발견 예정)*

- 작은 문제에 큰 변경 = *Foundry/Atelier 자기 self-tuning에 빠짐*. 점검 필요.
- 큰 문제에 작은 변경 = *발견을 외면하고 안정성에 매달림*. 점검 필요.
- 측정 방식은 *지금 정의하지 않음*. 첫 회전 직후 발견.

---

## 12. CEO-CTO-Atelier Architecture *(확정)*

| Role | 자리 | 도메인 | 모드 |
|---|---|---|---|
| **CEO** | 사용자 본인 | 비즈니스, 사용자, 방향성, 리소스, HCP | 동기/비동기 |
| **상품기획 Agent** | Atelier | 상품기획 cross-examine, Pain Validation | 동기 (대화) |
| **CTO Agent** | Foundry | 기술 트레이드오프, 구현 선택, 품질 게이트, HCP 번역 | 비동기 |
| **개발 Agent fleet** | Foundry | 코드/test/문서 자율 실행 | 비동기 |
| **Dashboard** | Foundry oversight | 전체 fleet + 시간축 가시화 | 비동기 |

HCP 진짜 정의: *"CEO 도메인 vs CTO 도메인"*. irreversibility/security 아님.

---

## 13. 거부 목록 (Anti-patterns) *(확정)*

다음은 *Atelier 내부에서 금지*:

1. **GPT를 시스템 안에 통합.** 외부 자문만 허용 — 분기 0~2회, 3 질문 템플릿. ChatGPT 앱 직접 열어 묻고 닫음.
2. **추정으로 agent fleet 만들기.** 7-agent 사례 재발 금지. *replacement only* — 새 agent 추가 = 기존 agent 폐기 짝.
3. **Over-engineering.** 질문 수 늘리지 마 (Stage 1 = 3개, Stage 2 = 5개. replacement only). 새 layer / 폴더 자유 추가 금지.
4. **자기참조 self-test에 매몰.** *외부 가치 (실제 프로젝트에 도움이 됐는가) 가 진짜 검증*. self-test는 보조 도구.
5. **Director를 operator로 만드는 모든 요청.** 파일 확인 / 로그 검증 / 테스트 수동 확인 / 구현 세부 판단 요청 = 금지.
6. **Premature optimization.** 측정 layer / 지표 / metric을 *큰 그림 확정 전에* 깎지 않음.
7. **Frame 표준화로 사고 깊이 회피.** AI 응답이 *옵션 A/B/C 메뉴* 패턴을 반복하면 그건 *frame이 답을 대신*하는 상태. 깊이 토론 모드로 전환.

---

## 14. 외부 자문 — GPT *(확정)*

### 14.1 위치

- 시스템 *밖*. 통합 0.
- 마일스톤 또는 프로젝트 종료 시 *분기 0~2회* ChatGPT 앱 직접 열어 묻고 닫음.

### 14.2 3 질문 템플릿

**입력** (Claude.ai 또는 사용자가 1장 자동 생성):
```
프로젝트: [name]
목표: [한 단락]

진행 결과:
잘된 점 (3~5 bullets)
안 된 점 (3~5 bullets)
결정한 것 (3~5 bullets)
다음 프로젝트로 갖고 갈 lesson (내 가설):
...
```

**3 질문**:
1. **[Critique]** 이 프로젝트 결정들 중 *너무 매끄러워 보이는* 결정이 있나? 반대 의견 없이 진행됐는데 사실 위험할 수 있는 결정.
2. **[Stress-test]** 깔고 있던 *암묵적 가정* 중에 검증 안 된 것이 있나? "당연하다"고 여겼지만 사실 검증 필요한 가정.
3. **[Reframe]** 이 프로젝트가 푼 문제를 *완전히 다른 관점*에서 봤다면, 더 작은 / 다른 / 안 푸는 게 나았을 가능성이 있나?

### 14.3 처리

GPT 답 → 24h 묵힘 → 사용자 판단 → 채택할 lesson만 `meta/lessons-learned.md` 갱신.

---

## 15. 다른 시스템과의 관계 *(확정)*

| 시스템 | 관계 |
|---|---|
| **Foundry (Step B)** | Handshake로 연결. 두 시스템은 각자 자율. |
| **외부 자문 GPT** | 분기 0~2회 cross-examine만. 시스템 통합 0. |
| **12.subscription-payment-saas** | 부트스트래핑 *마지막 실습*. *데이터 소스*로 활용. ship 결과보다 학습 추출 우선. |
| **Claude.ai (chat)** | 시스템 *밖*. 외부 자문 후보 (GPT와 동일 위치)로만 사용 가능. 현재 default = 미사용. |

---

## 16. 미해결 사항 — 첫 실작업 또는 v1 freeze 직전에 발견 *(발견 예정)*

- Stage 1 트리거 구체화 (수동 + 외부 신호 N개)
- Stage 1 → Stage 2 유예 기간 (1주 default, 사용자 확정 필요)
- Stage 2 → Foundry 입구 연결 시점
- idea-funnel 누적 검토 빈도
- Atelier 내부 agent 수 (1개? 2개?)
- Foundry handshake 산출물의 구체 형식
- Flywheel 1회전 후 변경 크기 측정 방식
- claude.ai/code (Claude Code web 버전) capability 검증 (필요해질 때만)
- **Foundry charter v0.1 작성** — Atelier charter와 동일 패턴. §9 시드 시스템 결정의 Foundry 측 박제 포함.
- **Foundry rename + relocation + Template 표시** — 12 cycle 종료 후. 상세는 `~/.claude/plans/future-foundry-relocation.md` 참조.

---

## 17. v1 freeze 조건 *(제안)*

이 charter가 v1으로 freeze되려면:
- §16 미해결 사항 중 *프로세스 진입에 필수인 것*만 확정 (트리거, agent 수)
- 나머지는 *발견 예정*으로 v1에 *명시*된 채로 freeze
- 사용자가 *공식 ACCEPT* 메시지로 freeze 선언
- freeze 후 → Foundry charter도 같은 패턴으로 freeze → 첫 사업 프로젝트 진입

---

## 18. 이 문서의 *반대* — Atelier가 *아닌* 것 *(확정)*

명확화를 위해 *Atelier가 아닌 것* 박제:

- ❌ Atelier ≠ 개발 환경. *코드 안 씀*. 코드는 Foundry.
- ❌ Atelier ≠ project management tool. *작업 트래커 아님*. 그건 Foundry의 dashboard.
- ❌ Atelier ≠ 외부 platform. *당신 1인용 도구*. 다른 사람에게 안 팜.
- ❌ Atelier ≠ Foundry 안의 폴더. *별도 시스템*. Foundry와 handshake로만 연결.
- ❌ Atelier ≠ 자동화. *대화 자체가 본질*. 자동화하면 사라짐.

---

*— Atelier Charter v0.1 draft 끝 —*
