import styled from "styled-components";
import theme from "../../styles/theme";

// headings -------------------------------------------------------------------/
export const HeadingOne = styled.p<{
  color?: keyof typeof theme.colors;
}>`
  font-family: "ForrestBold", serif;
  font-size: ${({ theme }) => theme.fontsizes.xl};
  line-height: 1;
  margin: 0;
  margin-bottom: 7px;
  color: ${({ theme, color }) => (!!color ? theme.colors[color] : "inherit")};
`;

export const HeadingTwo = styled.p<{
  color?: keyof typeof theme.colors;
}>`
  font-family: "ForrestBold", serif;
  font-size: ${({ theme }) => theme.fontsizes.l};
  line-height: 1.4;
  margin: 0;
  color: ${({ theme, color }) => (!!color ? theme.colors[color] : "inherit")};
`;

export const HeadingThree = styled.p<{
  color?: keyof typeof theme.colors;
}>`
  font-family: "Rubik", sans-serif;
  font-size: ${({ theme }) => theme.fontsizes.l};
  font-weight: 200;
  line-height: 1.4;
  margin: 0;
  color: ${({ theme, color }) => (!!color ? theme.colors[color] : "inherit")};
`;

// text serif -----------------------------------------------------------------/
const TextSerif = styled.p`
  line-height: 1.4;
  margin: 0;
`;

export const TextSerifRegular = styled(TextSerif)`
  font-family: "ForrestRegular", serif;
  font-size: ${({ theme }) => theme.fontsizes.m};
  line-height: 1.4;
  margin: 0;
`;

export const TextSerifRegularItalic = styled(TextSerif)`
  font-family: "ForrestRegularItalic", serif;
  font-size: ${({ theme }) => theme.fontsizes.m};
  line-height: 1.4;
  margin: 0;
`;

export const TextSerifBold = styled(TextSerif)`
  font-family: "ForrestBold", serif;
  font-size: ${({ theme }) => theme.fontsizes.m};
  line-height: 1.4;
  margin: 0;
`;

export const TextSerifBoldItalic = styled(TextSerif)`
  font-family: "ForrestBoldItalic", serif;
  font-size: ${({ theme }) => theme.fontsizes.m};
  line-height: 1.4;
  margin: 0;
`;

// text sans ------------------------------------------------------------------/
const TextSans = styled.p<{
  size?: "standard" | "mini" | "micro";
  color?: keyof typeof theme.colors;
  align?: "left" | "center" | "right";
}>`
  color: ${({ theme, color }) => (!!color ? theme.colors[color] : "inherit")};
  font-family: "Rubik", sans-serif;
  font-size: ${({ theme, size }) => {
    switch (size) {
      case "micro":
        return theme.fontsizes.xs;
      case "mini":
        return theme.fontsizes.s;
      case "standard":
      default:
        return theme.fontsizes.m;
    }
  }};
  line-height: 1.4;
  text-align: ${({ align }) => align || "left"};
  margin: 0;
`;

export const TextSansRegular = styled(TextSans)``;

export const TextSansRegularItalic = styled(TextSans)`
  font-style: italic;
`;

export const TextSansBold = styled(TextSans)`
  font-weight: 600;
`;

export const TextSansBoldItalic = styled(TextSans)`
  font-style: italic;
  font-weight: 700;
`;

// text mono ------------------------------------------------------------------/
const TextMono = styled.p<{
  size?: "standard" | "mini" | "micro";
  color?: keyof typeof theme.colors;
  align?: "left" | "center" | "right";
}>`
  color: ${({ theme, color }) => (!!color ? theme.colors[color] : "inherit")};
  font-family: "IBM Plex Mono", serif;
  font-size: ${({ theme, size }) => {
    switch (size) {
      case "micro":
        return theme.fontsizes.xs;
      case "mini":
        return theme.fontsizes.s;
      case "standard":
      default:
        return theme.fontsizes.m;
    }
  }};
  line-height: 1.4;
  text-align: ${({ align }) => align || "left"};
  margin: 0;
`;

export const TextMonoRegular = styled(TextMono)``;

export const TextMonoRegularItalic = styled(TextMono)`
  font-style: italic;
`;

export const TextMonoBold = styled(TextMono)`
  font-weight: 700;
`;

export const TextMonoBoldItalic = styled(TextMono)`
  font-style: italic;
  font-weight: 700;
`;
