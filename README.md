# Atelier

> 1인 비전공자 CEO의 *공방*. 상품기획 ↔ HTML 프로토타입까지 만드는 곳.
> 시제품(prototype)을 Foundry(공장)로 넘기면 실 코드 MVP가 양산된다.
> 헌법: [`charter.md`](./charter.md) (v0.2 frozen, 2026-05-21)

---

## 시작

새 idea가 떠올랐다면 [`idea-inbox.md`](./idea-inbox.md)에 1줄 메모. 정식 진입 결정 시:

```
/atelier-npi
```

`atelier-npi` Skill이 Stage 1 Ideation → Stage 2 PRD 확정까지 리드한다. CEO는 질문 답변·확인만. 매번 절차 기억할 필요 없음.

---

## 폴더 구조

```
atelier/
├── charter.md            ← 헌법 (v0.2)
├── README.md             ← 이 파일
├── idea-inbox.md         ← 떠오를 때 1줄 메모
├── idea-funnel.md        ← Stage 1/2 진행 history
├── stage-1/              ← Stage 1 Ideation 산출물 (Skill이 자동 생성)
├── stage-2/              ← Stage 2 PRD 패키지 (Skill이 자동 생성)
│   └── <idea>/
│       ├── PRD.md        ← 글자 (방향성·As is/To be·유저 스토리·Moat&Wall·Kill Signal)
│       ├── mockups/      ← 정적 시각
│       └── prototype/    ← HTML 인터랙티브
├── meta/
│   ├── decisions.md      ← Atelier 내부 결정 박제
│   └── lessons-learned.md← Flywheel 종료 후 정제 교훈
├── Reference/            ← 책 PDF 등 외부 자료 (Skill 내부 agent 자율 참고)
└── .claude/skills/atelier-npi/SKILL.md
```

---

## 용어 한 줄

- **Mockup** = 정적 시각 디자인 (Stage 2)
- **Prototype** = HTML 클릭 가능 사용 시뮬레이션 (Stage 2) — 디테일 살리는 핵심
- **MVP** = 실 코드 + 시장 배포 (Foundry)

경계 = *시장 노출 여부*.

---

## Atelier가 *아닌* 것

- 개발 환경 X (코드 안 씀. HTML 프로토는 agent가 작성.)
- 외부 platform X (1인용)
- Foundry 안 폴더 X (별도 시스템)
- 자동화 X (대화 자체가 본질. Skill은 *절차* 자동화이지 *대화* 자동화 아님.)

---

## 다음 단계 (v1 freeze 직전)

charter [`§16 미해결`](./charter.md#16-미해결-사항--첫-실작업-또는-v1-freeze-직전에-발견-갱신-v02) 잔여 해소 → 사용자 ACCEPT → v1 freeze → 부트스트래핑 종료 → 첫 사업 프로젝트 진입.
