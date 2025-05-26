export const fontFamily = {
    pretendard: "Pretendard",
};

export const fontSize = {
    xs: "8px",
    s: "10px",
    sm: "12px",
    smMd: "14px",
    md: "16px",
    lgMd: "18px",
    lg: "20px",
    xl: "24px",
    title: "40px",
};

export const fontWeight = {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
};

/*export const fontSize = {
    xsmall: "0.8rem",
    small: "1.2rem",
    smallMedium: "1.4rem",
    medium: "1.6rem",
    large: "2rem",
    xlarge: "2.4rem",
    title: "4rem",
};*/ //반응형 기준

//상황에 따라 아래의 방식을 활용할 수 있음 -> 현재는 theme 파일에 직접 폰트 파일 받아 사용
/*const createFontStyle = (family: string, weight: number, size: number, lineHeight: number) => `
  font-family: "${family}";
  font-weight: ${weight};
  font-size: ${size}px;
  line-height: ${lineHeight}px;
  letter-spacing: 0%;
`;
export const fonts: FontsTypes = {
  heading_bold_24px: createFontStyle('Pretendard', 700, 24, 34),
  heading_medium_20px: createFontStyle('Pretendard', 500, 20, 34),
  body_bold_16px: createFontStyle('Pretendard', 700, 16, 24),
};*/
