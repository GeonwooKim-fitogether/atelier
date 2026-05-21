# Atelier

1인 비전공자 CEO의 공방. 상품기획 ↔ HTML 프로토타입까지 만드는 곳. 프로토타입은 Foundry(공장)로 인계되어 실 코드 MVP가 된다.

헌법은 [`charter.md`](./charter.md)에 있다.

새 idea가 떠올랐다면 [`idea-inbox.md`](./idea-inbox.md)에 한 줄 메모하고, 정식 진입 결정 시 Claude Code에서 `/atelier-npi`를 호출한다. Skill이 Stage 1 Ideation → Stage 2 PRD 패키지 확정까지 대화로 리드한다.

폴더 (모든 md/HTML은 *세션 안 Agent가 작성*. CEO는 대화만):

- `idea-inbox.md` 떠오른 idea 한 줄 누적 — CEO가 말로 던지면 Agent가 박음
- `idea-funnel.md` Stage 1/2 history + Phase 2 대기 상태 — Agent 자동 갱신
- `decisions.md` Atelier 운영 결정 박제 — Agent가 대화 발견에서 박음
- `lessons-learned.md` cycle 종료 후 정제 교훈 — Agent가 정제, CEO 확인
- `stage-1/<idea>/` Stage 1 산출물 — Skill 자동 생성
- `stage-2/<idea>/` Stage 2 PRD 패키지 — Skill 자동 생성
- `workflows/` workflow 시각화 HTML — Agent 작성
- `Reference/` 외부 자료 — Agent 자율 참고
- `.claude/skills/atelier-npi/SKILL.md` Skill 본체

세션 밖 떠오른 idea는 *Atelier에 직접 박지 않고* 핸드폰 메모 등에 두었다가, 다음 세션에서 말로 전달.

용어는 charter §5.3에 박혀 있다. 한 줄로 — Mockup은 정적 시각, Prototype은 HTML 클릭 가능 사용 시뮬레이션, MVP는 실 코드 + 시장 배포. 경계는 시장 노출 여부.
