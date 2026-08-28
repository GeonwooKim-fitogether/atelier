# Atelier

회사의 상품기획을 담당하는 시스템. **단계적으로 개방된다** — 1단계 공방(CEO 1인의 대화 도구, **현재**) → 2단계 사내 상품기획 시스템(애플리케이션) → 3단계 외부 제품(SaaS 자회사). 상품기획 ↔ HTML 프로토타입까지 만들고, 프로토타입은 Foundry(공장)로 인계되어 실 코드 MVP가 된다.

- 헌법: [`charter.md`](./charter.md) — 정체성·프로세스·척추·거부 목록. v0.3부터 단계적 개방(§1.4)과 척추(§3.4)가 명시돼 있다.
- 진행 계획: [`plan.md`](./plan.md) — 헌장 발효부터 SaaS 게이트까지 6개 국면. **현재 승인 범위는 Phase 1까지**다.
- 발전 리뷰: [`architecture-review.md`](./architecture-review.md) — Hardware Team System과의 격차 실측과 2단계 시스템의 설계 출발점.
- **단계별 도구의 정본**: [`docs/book-tool-map.md`](./docs/book-tool-map.md) — 9단계 각각에서 무엇을 어떤 서식으로 만드는지는 Agent가 정하지 않는다. 『프로덕트 기획』(`Reference/`)의 어느 절이 정본인지를 이 표가 못 박는다. **새 단계에 들어가기 전에 그 단계의 행을 읽는다.**
- 작업 중 발견한 체계의 결함: [`docs/lessons.md`](./docs/lessons.md) — 창고로 올릴 후보 누적소.

새 idea가 떠올랐다면 [`idea-inbox.md`](./idea-inbox.md)에 한 줄 메모. 정식 진입은 CEO가 **"Atelier 시작"** 한 마디 → `atelier-npi` Skill 자동 fire → 9-stage workflow를 대화로 리드한다.

폴더 (모든 md/HTML은 *세션 안 Agent가 작성*. CEO는 대화만):

- `idea-inbox.md` 떠오른 idea 한 줄 누적 — CEO가 말로 던지면 Agent가 박음
- `idea-funnel.md` 9 단계 진행 history + 대기 상태 — Agent 자동 갱신
- `decisions.md` Atelier 운영 결정 박제 — Agent가 대화 발견에서 박음
- `lessons-learned.md` cycle 종료 후 정제 교훈 — Agent가 정제, CEO 확인
- `idea/<name>/` idea 단위 산출물 — Skill 자동 생성. stage = 한 파일 원칙
  - `_meta.md` 현재 단계·판정·상태 (dashboard 입력)
  - `01-intake.md` ~ `06-service-planning.md` 각 단계 산출
  - `07-prototype/` HTML 프로토 (유일하게 폴더)
  - `08-validation.md` 검증 결과
  - `09-handoff.md` PRD 박제 + 자동 취합 인덱스
- `workflows/` 대시보드 등 시각화 HTML — Agent 작성. **`type1-external-service.html` 이 정본 현황판이고, 판단은 이 화면에서 내린다**
- `.integration/` 통합 현황판의 사실 (config + data). 화면은 엔진이 매번 만든다
- `archive/` 폐기 보관 — 되짚을 때만 연다
- `Reference/` 『프로덕트 기획』 5개 장 PDF와 페이지 이미지 — **단계별 도구의 정본**. 대응은 `docs/book-tool-map.md`
- `docs/` 이 저장소의 절차·기준 문서
  - `book-tool-map.md` 책 ↔ 9단계 도구 대응표 — **새 단계 전에 그 행을 읽는다**
  - `standards/` 아틀리에 운영 기준 (시각화 의무·포지셔닝 맵 정본·3 카테고리 시간축 분리)
  - `lessons.md` 체계의 결함 기록 — 창고 승격 후보 누적소
- `.claude/skills/atelier-npi/SKILL.md` Skill 본체 (이 저장소 고유)
- `.claude/` 아래 공용 규칙·스킬·훅 — 창고(Template-repository)에서 동기화 봇(`.github/workflows/sync-skills.yml`)이 내려 줌. 공용 파일은 여기서 고치지 않고 창고에서 고친다(원본 우선 규칙)

세션 밖 떠오른 idea는 *Atelier에 직접 박지 않고* 핸드폰 메모 등에 두었다가, 다음 세션에서 말로 전달.

용어는 charter §5.3에 박혀 있다. 한 줄로 — Mockup은 정적 시각, Prototype은 HTML 클릭 가능 사용 시뮬레이션, MVP는 실 코드 + 시장 배포. 경계는 시장 노출 여부.
