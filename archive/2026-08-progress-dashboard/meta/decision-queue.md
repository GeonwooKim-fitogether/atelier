# Decision Queue — Atelier

> 대표(공방장)의 판정을 기다리는 결정 누적소. 판정은 사람 전속이다(charter §1.4).
> 이 표가 대시보드 **Control 레인의 결정 큐**로 그대로 올라간다.

## 표준 컬럼

| ID | Date | Topic | Decision Needed | Default Action Taken | Reversibility | Risk | Review Timing |
|---|---|---|---|---|---|---|---|

## 누적

| **DQ-001** | 2026-08-26 | prototype-use | **프로토타입을 직접 써 보고 2D freeze 루프를 연다.** freeze 는 Agent 가 선언할 수 없다(charter §5.2 Step 7). 홈의 "이어서 바치기" → 탭존 → 나가기 → 9일기도 달력을 만져 보고 이상한 흐름·누락을 말해 주면 PRD 에 반영하고 프로토를 재생성한다. | 대기 — 프로토는 `stage-2/myrosary/prototype/index.html` 에 있고 F1·F2 수용 기준 재현은 클릭으로 실측 확인됨. | reversible | 높음 (이것이 Phase 1 완료를 막는다) | 즉시 |
| **DQ-002** | 2026-08-26 | june-artifacts | **2026-06월 MyRosary 기존 결과물의 위치.** 로컬 push · 아티팩트 링크 · "없음" 중 하나. | 대기 — 저장소 8곳과 아티팩트 조회창(8/11 이후)을 전수 조사했으나 미발견. MyRosary repo 는 커밋 1개(설정 파일)뿐. 이번 산출물은 대체가 아니라 "나타나면 대조·병합" 전제로 만듦. | reversible | 중간 (중복 작업 위험) | 즉시 |
| **DQ-003** | 2026-08-26 | moat-wall-stake | **이 제품의 판돈.** 개인·틈새 제품으로 확정하나, 수익 사업 판돈으로 재설계(HMW 회귀)하나. | 대기 — 잠정 "개인·틈새" 전제로 2A~2C 진행. 개인 판돈에서는 Moat(기도 이력 누적) ≥ Wall. 사업 판돈이면 Wall(무료 대체재·유료 반감) 우세로 HMW 회귀가 맞다. | reversible (지금은) | 높음 (제품 방향 전체) | DQ-001 직후 |
| **DQ-004** | 2026-08-26 | kill-signal | **Kill Signal 수치 확정.** 제안: 최초 2회 기간 기도에서 앱 경유 일별 완주율이 두 번 모두 60% 미만이면 Kill. | 대기 — 기간형 지표로 설계(Stage 1 제약 ①). 상시 사용률로 재면 이 제품은 부당하게 죽는다. | reversible | 중간 | freeze 전 |
| **DQ-005** | 2026-08-26 | stage2-toolset | **Stage 2 도구 세트 추인.** 정본 workflow Phase 2A~2C 구성 7종(퍼소나·경쟁 분석표·HMW·As is/To be·유저 스토리+AC·Moat&Wall·Kill Signal), 골든 서클 생략. | **잠정 채택하고 이미 진행함** (CEO 부재 중 자율 진행 지시에 따라 멈추지 않음). 되돌리려면 지금. | reversible | 낮음 | 즉시 |
| **DQ-006** | 2026-08-26 | mvp-build-location | **PRD freeze 이후 MVP 를 어디서 개발하나.** ① Foundry→창고 이관 완료를 기다린다 ② 기존 MyRosary repo 에서 바로 ③ 지금 Foundry 템플릿으로 새 repo. | 대기 — plan.md Phase 2 는 이관 완료까지 보류 상태인데 이 안건은 이미 자기 저장소를 갖고 있다. | reversible | 중간 | freeze 후 |

| **DQ-007** | 2026-08-26 | dashboard-actors | **대시보드 행위자(actors) 구성 추인.** GROUP:Agent 뷰의 스윔레인이 이 목록으로 갈린다. 현재: 공방장(대표) · Atelier Agent · System. | 잠정 채택 — 스킬 절차는 첫 실행 전 질문을 요구하나 대표 부재로 기본값을 넣고 렌더함. | reversible (config 한 줄) | 낮음 | 즉시 |
