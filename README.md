# Concept

유형 성취도 분석

## 🚀 기술 스택

- **프레임워크**: React 19.2.0
- **빌드 도구**: Vite 7.2.4
- **언어**: TypeScript 5.9.3
- **스타일링**: Emotion
- **상태 관리**: Zustand
- **데이터 페칭**: TanStack Query (React Query)
- **라우팅**: React Router 7
- **UI 컴포넌트**: Radix UI
- **HTTP 클라이언트**: Axios
- **패키지 매니저**: pnpm

## 📁 프로젝트 구조

이 프로젝트는 Feature-Sliced Design 아키텍처를 따릅니다.

```text
src/
├── app/              # 애플리케이션 초기화 및 라우팅
├── entities/         # 비즈니스 엔티티 (achievement, grade, student, typeChip)
├── pages/            # 페이지 컴포넌트
│   └── Achievement/  # 성취도 페이지
├── shared/           # 공유 모듈 (UI, 스타일, 유틸리티)
└── widgets/          # 복합 UI 컴포넌트
```

### 아키텍처 다이어그램

#### Achievement 페이지 구조 (서비스, 쿼리, 컴포넌트 중심)

```mermaid
graph TB
    subgraph "컴포넌트 레이어"
        A[AchievementPage] --> B[AchievementProvider]
        B --> C[Filter]
        B --> D[AchievementContent]
        B --> E[Footer]

        C --> F[Select - 학년]
        C --> G[Switch - 추천유형]
        C --> H[Chip - 성취도 필터]

        D --> I[MiddleChapterAccordion]
        I --> J[LittleChapterSection]
        J --> K[DifficultyGroup]
        K --> L[AchievementChip]
        D --> M[EmptyCase]
    end

    subgraph "훅 레이어"
        D --> N[useStudentAchievement]
        C --> N
    end

    subgraph "쿼리 레이어"
        N --> O[achievementQueries.achievement]
        N --> P[typeChipQueries.typeChip]
        O --> Q[useQueries]
        P --> Q
    end

    subgraph "서비스/API 레이어"
        O --> R[achievementApi.getAchievements]
        R --> S[http.get]
        S --> T[Backend API]
    end

    subgraph "상태 관리 레이어"
        B --> U[filterStore]
        B --> V[contentStore]
        C --> U
        D --> U
        D --> V
        N --> U
    end

    subgraph "데이터 변환"
        N --> W[chipMap 생성]
        N --> X[filteredStudentAchievementChipMap]
        N --> Y[structuredData 변환]
        W --> Y
        X --> Y
    end

    style A fill:#fff4e1
    style N fill:#e1f5ff
    style O fill:#ffe1f5
    style R fill:#e1ffe1
    style U fill:#f5e1ff
    style V fill:#f5e1ff
```

#### Achievement 페이지 데이터 흐름

```mermaid
sequenceDiagram
    participant User
    participant AchievementPage
    participant Filter
    participant AchievementContent
    participant useStudentAchievement
    participant achievementQueries
    participant achievementApi
    participant filterStore
    participant contentStore
    participant Backend

    User->>AchievementPage: 페이지 접근
    AchievementPage->>AchievementPage: loader 실행 (grade 데이터 로드)
    AchievementPage->>AchievementProvider: 초기화 (filterStore, contentStore 생성)

    AchievementPage->>Filter: 렌더링
    AchievementPage->>AchievementContent: 렌더링

    AchievementContent->>useStudentAchievement: 훅 호출
    useStudentAchievement->>filterStore: gradeKey, isRecommendOnly, achievementGrades 조회
    useStudentAchievement->>achievementQueries: achievement 쿼리 생성
    useStudentAchievement->>achievementQueries: typeChip 쿼리 생성
    achievementQueries->>achievementApi: getAchievements 호출
    achievementApi->>Backend: HTTP GET /achievement
    Backend-->>achievementApi: Achievement[] 응답
    achievementApi-->>achievementQueries: 데이터 반환
    achievementQueries-->>useStudentAchievement: 쿼리 결과 반환

    useStudentAchievement->>useStudentAchievement: chipMap 생성 (추천 필터링)
    useStudentAchievement->>useStudentAchievement: filteredStudentAchievementChipMap 생성 (성취도 필터링)
    useStudentAchievement->>useStudentAchievement: structuredData 변환 (중단원/소단원 구조화)
    useStudentAchievement-->>AchievementContent: structuredData 반환

    AchievementContent->>contentStore: selectedChipIds 조회
    AchievementContent->>AchievementContent: UI 렌더링

    User->>Filter: 필터 변경 (학년/추천/성취도)
    Filter->>filterStore: setFilter / toggleAchievementGrade
    filterStore-->>Filter: 상태 업데이트
    Filter->>useStudentAchievement: 필터 변경 감지 (재실행)
    useStudentAchievement->>achievementQueries: 새로운 쿼리 실행
    achievementQueries->>Backend: HTTP 요청
    Backend-->>useStudentAchievement: 필터링된 데이터
    useStudentAchievement-->>AchievementContent: 업데이트된 structuredData
    AchievementContent->>contentStore: syncWithFilteredChips (선택 상태 동기화)
    AchievementContent-->>User: UI 업데이트

    User->>AchievementContent: 칩/챕터 선택
    AchievementContent->>contentStore: toggleChip / toggleChapter
    contentStore-->>AchievementContent: selectedChipIds 업데이트
    AchievementContent-->>User: 선택 상태 UI 업데이트
```

## 🛠️ 설치 및 실행

### 필수 요구사항

- Node.js (권장: 18.x 이상)
- pnpm

### 설치

```bash
pnpm install
```

### 개발 서버 실행

```bash
pnpm dev
```

개발 서버는 `http://localhost:5000`에서 실행됩니다.

### 빌드

```bash
pnpm build
```

### 빌드 미리보기

```bash
pnpm preview
```

### 린트

```bash
pnpm lint
```

### 코드 포맷팅

```bash
pnpm format
```

## 📦 주요 기능

- **학생 유형 성취도 조회**: 학생별 성취도 데이터를 조회하고 표시
- **필터링**: 학년, 난이도, 챕터 등 다양한 조건으로 필터링
- **트리 구조 표시**: 중간 챕터와 소단원을 아코디언 형태로 표시
- **체크박스 트리**: 계층적 구조의 체크박스 트리 UI

## 🎨 스타일링

- Emotion을 사용한 CSS-in-JS 스타일링
- Pretendard 폰트 사용
- 반응형 디자인 지원

## 🔧 환경 설정

프로젝트는 다음 경로 별칭을 사용합니다:

- `@/` → `src/`

## 기타 프로젝트를 진행하며 느낀점

### API 응답 관련

- API 응답에서 중단원이 여러개였으면 좋겠습니다
- API 응답에서 `conceptChipId`와 `conceptId`의 차이에 대한 명확한 설명이 필요합니다
- 노션 문서의 API 응답 예시가 업데이트되면 좋겠습니다

### 디자인 관련

- 피그마에서 성취도 칩을 선택했을 때, 추천유형만 보기 했을 때, 한 컬럼이 없을 때 등 예시 디자인 케이스가 있으면 좋겠습니다
- 피그마에서 디자인 파일 수치가 잘 안 잡힙니다

### 문서 관련

- 노션 문서에서 구현 요구사항에서 필터 구현 내용 설명이 유형칩 리스트보다 순서가 더 먼저였으면 좋겠습니다

### 임의로 구현한 부분

- **아코디언**: 멀티인지 싱글인지 명시가 없어서 멀티 & 디폴트 열림으로 임의 구현했습니다
- **체크박스, 드롭다운**: 디자인이 없어서 임의로 구현했습니다
