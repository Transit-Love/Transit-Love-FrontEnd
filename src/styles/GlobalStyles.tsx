import { Global, css } from "@emotion/react";

/**
 * 전역 스타일 컴포넌트
 * - 폰트는 index.html에서 import 권장
 * - 모바일/웹 환경 대응
 * - 접근성 및 유지보수성 강화
 */
export const GlobalStyles = () => (
  <Global
    styles={css`
      /* Reset & Box Model */
      *,
      *::before,
      *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      html {
        width: 100vw;
        height: 100vh;
        font-size: 16px;
        scroll-behavior: smooth;
        -webkit-tap-highlight-color: transparent;
      }

      body {
        width: 100vw;
        height: 100vh;
        font-family: "Ownglyph PDH", -apple-system, BlinkMacSystemFont,
          "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif;
        background: #fff;
        color: #222;
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        overflow: hidden;
        touch-action: manipulation;
      }

      #root {
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        background: #fff;
        overflow: hidden;
      }

      /* 모바일: 배경 이미지 적용 */
      @media (max-width: 390px) {
        #root {
          background-image: url("/background.svg");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
      }

      /* 웹: 흰색 배경 유지 */
      @media (min-width: 391px) {
        #root {
          background: #fff;
        }
      }

      /* 버튼, 인풋 등 기본 스타일 개선 */
      button,
      input,
      textarea,
      select {
        font-family: inherit;
        font-size: inherit;
        background: none;
        border: none;
        outline: none;
      }
      button {
        cursor: pointer;
      }
      a {
        color: inherit;
        text-decoration: none;
      }
    `}
  />
);
