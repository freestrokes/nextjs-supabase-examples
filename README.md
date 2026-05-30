# Linear Style Board App with Supabase

Linear 디자인 시스템의 정밀함과 Supabase의 강력한 기능을 결합한 현대적인 풀스택 웹 애플리케이션 보일러플레이트입니다.

## 🚀 Project Overview

본 프로젝트는 고해상도 다크 모드 UI와 실시간 데이터 처리를 목표로 구축되었습니다. Notion 스타일의 사이드바 레이아웃과 Linear 스타일의 이슈 트래커 UI를 제공하며, 모든 화면은 모바일 반응형으로 최적화되어 있습니다.

### 핵심 기술 스택
- **Frontend**: Next.js (Pages Router), TypeScript, Tailwind CSS
- **State Management**: Zustand (Functional Pattern)
- **Backend/Auth**: Supabase (Auth, PostgreSQL, RLS)
- **Editor**: Custom Quill Editor (React 19 Compatible)
- **Infrastructure**: Vercel, Google Cloud Platform (OAuth 2.0)

---

## 🛠 Setup & Environment Guide

향후 유사한 프로젝트를 처음부터 구성할 때 참고할 수 있는 가이드입니다.

### 1. Next.js & Frontend Environment
- **Package Manager**: 의존성 관리 및 속도를 위해 `pnpm`을 사용합니다.
- **Design System**: 
  - `tailwind.config.ts`에 Linear 전용 디자인 토큰(Indigo/Violet 색상, Inter 폰트 피처 등)을 정의합니다.
  - `globals.css`에서 Inter 폰트의 `cv01`, `ss03` 피처를 활성화하여 Linear 특유의 룩앤필을 구현합니다.
- **React 19 Compatibility**:
  - `react-quill`은 React 19의 `findDOMNode` 제거 이슈로 호환되지 않습니다.
  - `quill` 코어 패키지를 직접 제어하는 커스텀 컴포넌트(`src/components/board/Editor.tsx`)를 통해 이 문제를 해결합니다.
- **Auth Guard**:
  - `middleware.ts`를 사용하여 서버 사이드에서 JWT 토큰을 검증하고, 비로그인 시 `/auth/login`으로 자동 리디렉션합니다.
  - 하이드레이션 오류 방지를 위해 `mounted` 상태 체크 패턴을 레이아웃에 적용합니다.

### 2. Supabase Configuration
- **Authentication**:
  - **Google OAuth**: GCP(Google Cloud Console)의 'Google Auth platform'에서 OAuth 클라이언트 ID를 생성하고 Supabase Providers에 등록합니다.
  - **Cookie-based Auth**: 미들웨어와 세션을 공유하기 위해 `@supabase/ssr`의 `createBrowserClient`를 사용하여 세션을 쿠키에 저장합니다.
- **Database Security (RLS)**:
  - `posts` 테이블에 Row Level Security를 적용하여 본인이 작성한 글만 수정/삭제할 수 있도록 보호합니다.
  - `auth.uid() = user_id` 정책을 통해 데이터베이스 레벨에서 강력한 보안을 보장합니다.

### 3. Vercel Deployment
- **Configuration**: `vercel.json`을 사용하여 `pnpm build` 명령어를 명시적으로 지정하고 프레임워크 설정을 최적화합니다.
- **CI/CD**: `main` 브랜치 푸시 시 자동 배포되도록 설정합니다.
- **Environment Variables**:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Redirects**: 배포된 URL을 Supabase 사이트 URL 및 구글 OAuth 승인 리디렉션 URI에 반드시 등록해야 합니다.

---

## 📂 Project Structure
```text
src/
├── components/     # UI 컴포넌트 (사이드바, 버튼, 카드, 에디터)
├── hooks/          # 커스텀 훅 (비즈니스 로직)
├── lib/            # 외부 라이브러리 설정 (Supabase, Axios)
├── pages/          # Next.js 라우팅 (Auth, Dashboard, Board)
├── store/          # Zustand 상태 관리 (Auth, Board)
├── styles/         # 전역 스타일 및 디자인 토큰
└── utils/          # 유틸리티 (클래스 병합 등)
```

---

## 📝 Milestone Records
상세 작업 내역은 [.gemini/memories/](./.gemini/memories/) 폴더에서 날짜별로 확인할 수 있습니다.
- **2026-05-30**: Notion 스타일 사이드바 및 실시간 모니터링 대시보드 구축
- **2026-05-21**: React 19 호환성 이슈 해결 및 커스텀 에디터 도입
- **2026-05-14**: Linear 스타일 게시판 핵심 CRUD 구현 및 Supabase 연동
