import { Global, css } from '@emotion/react'

export const GlobalStyles = () => (
  <Global
    styles={css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: 'Ownglyph PDH', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      #root {
        width: 100vw;
        max-width: 100vw;
        height: 100vh;
        background: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        overflow: hidden;
      }

      /* 모바일에서만 배경 이미지 */
      @media (max-width: 390px) {
        #root {
          background-image: url('/background.svg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
      }

      /* 웹 크기에서 흰색 배경 */
      @media (min-width: 391px) {
        #root {
          background: #FFFFFF;
        }
      }


      @font-face {
        font-family: 'Ownglyph PDH';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: local('Ownglyph PDH'), 
             url('https://fonts.googleapis.com/css2?family=Ownglyph+PDH:wght@400&display=swap');
      }
    `}
  />
)

