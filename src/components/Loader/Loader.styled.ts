// https://cssloaders.github.io/ and converted to styled-components with Copilot.
import styled, { keyframes } from "styled-components";

const bblFadInOut = keyframes`
  0%, 80%, 100% { box-shadow: 0 2.5em 0 -1.3em; }
  40% { box-shadow: 0 2.5em 0 0; }
`;

export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const FullPageLoader = styled(LoaderWrapper)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  height: 100vh;
  width: 100vw;
`;

export const Loader = styled.div`
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  animation-fill-mode: both;
  animation: ${bblFadInOut} 1.8s infinite ease-in-out;
  color: ${({ theme }) => theme.colors.lichen};
  font-size: 7px;
  position: relative;
  text-indent: -9999em;
  transform: translateZ(0);
  animation-delay: -0.16s;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    border-radius: 50%;
    width: 2.5em;
    height: 2.5em;
    animation-fill-mode: both;
    animation: ${bblFadInOut} 1.8s infinite ease-in-out;
  }

  &::before {
    left: -3.5em;
    animation-delay: -0.32s;
  }

  &::after {
    left: 3.5em;
  }
`;
