import reset from 'styled-reset'
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  ${reset}
  
  a {
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color:rgba(255,255,255,0);
    -webkit-touch-callout:none;
    user-select:none;
    font-family: "Pretendard", -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 1rem; // 기본 폰트 크기
  }

  :root {
    --vh: 100%;
  }

  html, body {
    font-size: 100%;
    -webkit-text-size-adjust: 100%; /* 텍스트 크기 조정 비활성화 (iOS 대응) */
    font-family: "Pretendard";
  }

  ::-webkit-scrollbar {
    display: none;
  } //스크롤바 여부

  #root, body, html {
    margin: 0 auto;
    padding: 0;
    //width:1440px;
  }
    
  input {
    -webkit-appearance: none; /* iOS 기본 스타일 제거 */
    -moz-appearance: none; /* Firefox 기본 스타일 제거 */
    appearance: none;
    border-radius: 0;
    box-shadow: none;
  }

  button {
    cursor: pointer;
    padding: 0;
    margin: 0;
    background: none;
    border: none;

    &:hover {
      border: none;
      outline: none;
    }

    &:focus {
      border: none;
      outline: none;
    }
  }

  @font-face {
    font-family: "Pretendard";
    src: url("https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff")
        format("woff");
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: "Pretendard";
    src: url("https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Medium.woff")
      format("woff");
    font-weight: 500;
    font-style: normal;
    }
  @font-face {
    font-family: "Pretendard";
    src: url("https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-SemiBold.woff")
      format("woff");
    font-weight: 600;
    font-style: normal;
    }
  @font-face {
    font-family: "Pretendard";
    src: url("https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Bold.woff")
        format("woff");
    font-weight: 700;
    font-style: normal;
    }

  @font-face {
    font-family: 'Pretendard';
    src: url('../../node_modules/pretendard/dist/web/variable/PretendardVariable.woff2')
        format('woff2-variations');
    font-weight: 100 900;
  } //npm 설치로 받은 Pretendard
`;

export default GlobalStyle;