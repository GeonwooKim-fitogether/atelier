---
name: atelier-npi
description: Atelier NPI(New Product Introduction) workflow. Stage 1 Ideation → Stage 2 PRD 패키지 확정까지 agent가 리드. CEO는 질문 답변·확인만. trigger - idea-inbox.md의 idea를 정식 진입시킬 때, 또는 사용자가 명시적으로 `/atelier-npi` 호출 또는 "NPI 시작/진행" 류 발화.
---

# atelier-npi Skill v0.1

Atelier charter v0.2 §5 핵심 프로세스의 *실행 자동화*. 이 Skill이 invoke되면 agent가 Phase 1 → 2 → 3 순차 진행. CEO는 매번 절차 기억할 필요 없음.

## 큰 원칙

1. **작성 권한 대칭** — Stage 1은 CEO 작성, Stage 2는 Agent 작성. 단계 본질에 정렬.
2. **Cross-examine = 구조·논리·본질** 3축. 표면 검토 X.
3. **시간 강제 묵힘 없음** — Pass 즉시 다음 단계로 (charter §3.3).
4. **도구는 동적 권장** — 미리 고정 list 박지 않음. 프로젝트마다 agent가 권장 + CEO confirm.
5. **PRD freeze 조건 = "프로토 사용 시 이상 없음 + PRD.md 디테일 완비"**. perfect 아님. Foundry MVP 사이클이 정정.
6. **`Reference/` 폴더 책 PDF는 agent 자율 참고**. charter 안에 도구 list 박혀 있지 않음.

---

## Phase 1 — Stage 1 Ideation

**목적**: Stage 2 진입 판정. *가벼움*. CEO 인식 중심.

**Step 1.1 — idea 입력**

agent: "어떤 idea를 진입시키시겠습니까? `atelier/idea-inbox.md`에서 가져오시거나 새로 말씀해 주세요."

CEO 응답 → idea 한 문장 확정.

**Step 1.2 — CEO 초안 작성 유도**

agent가 CEO에게 Pain 3축 초안을 *작성하도록 prompt*:

```
Pain Reality — 이 통증이 진짜 사람의 진짜 행동에 흔적을 남기나?
              (검색량 / 카페 글 / 우회 행동 / 불평·포기 패턴)
Pain Depth   — 얼마나 자주 / 얼마나 아프게? (매일 vs 가끔, 짜증 vs 차질)
Pain Owner   — 누가 가장 강하게 느끼나? 1명을 머릿속에 그릴 수 있을 만큼 좁혀라.
```

CEO 답변 → agent가 받아서 정리.

**Step 1.3 — Agent의 구조·논리·본질 cross-examine + 외부 흔적 보조**

agent는 다음 3축으로 CEO 초안 검토:
- **구조**: 3축이 모두 채워졌는가? 빠진 항목 짚기.
- **논리**: 흐름이 자기참조적이지 않은가? "당연하다"고 깔린 가정 짚기.
- **본질**: 진짜 통증인가 vs 모른다는 이유로 단정한 niche인가? (charter §5.1 Kill 안전장치)

**병행**: 외부 흔적 자동 수집 보조 — 검색·카페·SNS·Reddit·커뮤니티 등 *현장 흔적*을 agent가 WebFetch / WebSearch로 수집해서 Pain Reality 보강.

검토 결과를 CEO에게 보고.

**Step 1.4 — CEO 재리뷰 → 판정**

CEO가 agent 검토에 답변·반박·보완.
판정: **Pass / Hold / Kill**.

- Pass → Step 1.5
- Hold → idea-funnel.md에 Hold 기록 + Skill 종료
- Kill → idea-funnel.md에 Kill 사유 기록 + Skill 종료 (Kill = 통증이 가짜일 때만)

**Step 1.5 — 산출물 생성**

agent가 자동 작성:
- `atelier/stage-1/<idea-slug>/ideation.md` — Pain 3축 + cross-examine 결과 + 외부 흔적 요약 + CEO 판정
- `atelier/idea-funnel.md`에 Pass 기록 추가

Pass → **Phase 2 즉시 진입** (시간 유예 없음).

---

## Phase 2 — Stage 2 PRD 확정

**목적**: MVP 1사이클을 돌릴 수 있을 만큼 명확한 PRD 패키지 freeze. *무거움*. 깊은 협업.

**Step 2.1 — 도구 권장 + CEO confirm**

agent가 이번 프로젝트의 특성을 보고 *어떤 도구를 사용할지 권장*. 예시:

```
agent: "이번 프로젝트는 [B2C 콘텐츠 서비스]로 보입니다. 권장 도구:
  - 퍼소나 (Pain Owner 구체화)
  - 골든 서클 (Why → How → What)
  - HMW (Pain → Wedge 변환)
  - 어피니티 다이어그램 (외부 흔적 데이터 정리)
  - As is / To be 표
  - 유저 스토리 + Acceptance Criteria
  - Moat & Wall (Atelier 고유, 시간 양면 검증)
  - Kill Signal (정량 1개)
이대로 진행할까요? 추가/제외할 도구 있나요?"
```

도구 상세는 `atelier/Reference/` 책 PDF를 agent가 자율 참고.

CEO confirm/조정 → 도구 set 확정.

**Step 2.2 — 데이터 모델링 (어피니티 등)**

Phase 1에서 수집된 외부 흔적 + CEO 추가 input을 *어피니티 다이어그램 방식*으로 그룹화 → 인사이트 추출.

agent가 grouping 작성. CEO 확인·논의.

**Step 2.3 — Mockup 생성 (와이어 + 디자인 stills)**

agent가 화면 구조 wireframe 생성 → 시각 디자인 high-fi mockup 생성.

저장: `atelier/stage-2/<idea-slug>/mockups/`

CEO 확인·논의. 수정 반복.

**Step 2.4 — HTML Prototype 생성 ⭐**

agent가 클릭 가능한 HTML/CSS/JS 프로토 작성. 백엔드·DB·인증 없음. 가짜 데이터로 동작.

저장: `atelier/stage-2/<idea-slug>/prototype/`

또는 v0/Lovable 등 외부 도구 사용 시 링크 + 코드 백업.

**Step 2.5 — PRD.md draft 작성**

agent가 PRD.md draft 작성. 구성:

```markdown
# PRD: <idea>

## 1. 방향성 한 문장
사용자 [퍼소나]가 [맥락]에서 [통증]을 겪고 있기에 [기능]이 필요하다.

## 2. As is / To be
| 사용자 | 맥락 | 불편 사항/니즈 (As is) | 피처 (To be) |
|---|---|---|---|
| ... | ... | ... | ... |

## 3. 피처별 유저 스토리
### 피처 1: <이름>
- **AS** [퍼소나]
- **I WANT** [기능]
- **SO THAT** [목적]

#### Acceptance Criteria
- Given [상황]
- When [트리거]
- Then [결과]

## 4. Moat & Wall
- **Moat (시간이 너의 편이 되는 누적 자산)**: ...
- **Wall (시간이 가도 너가 통제 못하는 외벽)**: ...
- 판정: Moat 누적 속도 vs Wall 무게

## 5. Kill Signal
정량 1개: 시간 / 금액 / 사용자 반응 중 하나.
예: "출시 3개월 안에 유료 전환 < 5% → Kill"
```

**Step 2.6 — CEO 프로토 사용 + 논의 → PRD calibrate (반복)**

CEO가 *HTML 프로토를 직접 열고 사용*. 사용 중 발견 사항:
- 이상한 흐름
- 누락된 디테일
- 어색한 인터랙션
- PRD.md에 빠진 시나리오

agent ↔ CEO 양방향 논의:
- 발견 사항 → PRD.md 디테일 추가
- PRD 업데이트 → 프로토 재생성
- 다시 사용 → 다시 발견 → 반복

**이 반복이 PRD freeze의 진짜 메커니즘**.

**Step 2.7 — Freeze 판정**

양쪽 OK:
- agent: "마지막 라운드에서 새 발견 없음"
- CEO: "프로토 사용해도 이상 없음 + PRD.md 디테일 완비"

→ Freeze 선언.

산출물 최종 형태:
```
atelier/stage-2/<idea-slug>/
  PRD.md
  mockups/
  prototype/
```

---

## Phase 3 — Foundry 인계 안내

**Step 3.1 — 새 Foundry repo 생성 안내**

agent가 CEO에게 안내:

```
1. GitHub.com 접속 → foundry Template repo로 가서 "Use this template" 클릭
2. 새 repo 이름 결정 (예: <순번>.<프로젝트명>)
3. Local clone:
   cd C:\Users\rlaaj\Dev\ && git clone <new-repo-url>
```

(부트스트래핑 종료 + Foundry rename + Template 표시 완료 후 적용 — `~/.claude/plans/future-foundry-relocation.md`)

**Step 3.2 — PRD 패키지 복사 명령**

agent가 복사 명령 제공:

```powershell
$src = "c:\Users\rlaaj\Dev\atelier\stage-2\<idea-slug>"
$dst = "c:\Users\rlaaj\Dev\<new-repo>\01-product"
New-Item -ItemType Directory -Force -Path $dst | Out-Null
Copy-Item -Recurse "$src\*" $dst
```

**Step 3.3 — idea-funnel.md freeze 기록**

agent가 자동 추가:

```markdown
## <date> — <idea-slug> PRD freeze + Foundry 인계
- Stage 1 Pass: <date>
- Stage 2 freeze: <date>
- Foundry repo: <new-repo-url>
- Kill Signal: <PRD §5 내용>
```

**Step 3.4 — Skill 종료**

agent: "Atelier NPI workflow 완료. Foundry 사이클로 넘어가세요. (Foundry 안에서는 별도 charter + Skill 적용)"

---

## v0.1 → v0.x 진화 계획

이 Skill은 **첫 NPI 1사이클 돌릴 만큼만 minimal**. 첫 실작업에서 마찰 발견 시 즉시 정정 + v0.x bump. 진화 후보:

- 각 Step의 prompt 정확한 문구 미세조정
- 도구 권장 logic (프로젝트 특성 → 도구 자동 매핑)
- Phase 2 Step 2.4의 HTML 프로토 생성 방식 (v0 vs Lovable vs Claude Code 직접)
- Phase 3 Foundry 인계 자동화 정도

charter §16 미해결 항목.

---

## 거부 패턴 (charter §13 참조)

이 Skill 내부에서도 적용:
- ❌ 도구 list 미리 고정. 프로젝트마다 동적 권장.
- ❌ 시간 강제 묵힘. Pass → 즉시 Phase 2.
- ❌ FM 흡수. 책은 agent가 *필요 시* 자율 참고.
- ❌ 메뉴 식 응답. cross-examine은 *입장 던지기*.
- ❌ Director를 operator로. 파일 확인·테스트 수동 요청 X.
